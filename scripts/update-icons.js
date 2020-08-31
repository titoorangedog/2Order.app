const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

// Folder where all the icons are defined to be used
const inputIconsFile = './src/common/icons.template.js';
const outputIconsFile = './src/common/icons.js';
// Folder where are located all the images
const iconsFolder = './src/images/icons/ui';
const iconsComponentsFolder = './src/images/icons/building-components';

// Read all the locale file lines
// SEE: https://gist.github.com/narciso-dev/b690593f1ebe41de65be25c9be2b7c9c
function readLines(input) {
  const output = new stream.PassThrough({ objectMode: true });
  const rl = readline.createInterface({
    input: fs.createReadStream(input),
  });
  rl.on('line', line => {
    output.write(line);
  });
  rl.on('close', () => {
    output.destroy();
  });
  return output;
}

// Replace dashes and camelcase the string
// SEE: https://stackoverflow.com/a/6009452
function camelCase(string) {
  return string.replace(/_([a-z0-9])/gi, function(all, letter) {
    return letter.toUpperCase();
  });
}

// Get all the files in the folder
function getFilesNames(dir, digits = true) {
  const filesNames = [];
  const filesNamesCamelCase = [];

  const files = fs.readdirSync(dir);
  files.forEach(function(file) {
    filesNames.push(file);
    filesNamesCamelCase.push(
      camelCase(file.split('.')[0])
        .replace(new RegExp(`[\\s${!!digits ? '0' : ''}]`, 'gi'), '')
        .replace('Zeichenfläche', ''),
    );
  });
  return [filesNames, filesNamesCamelCase];
}

// Add line on the passed file
function addLine(outputFileStream, line = '') {
  outputFileStream.write(`${line}\n`);
}

// Main function
(async () => {
  const [filesNames, filesNamesCamelCase] = await getFilesNames(iconsFolder);
  const [filesNamesComponents, filesNamesComponentsCamelCase] = await getFilesNames(
    iconsComponentsFolder,
    false,
  );
  const outputFile = fs.createWriteStream(outputIconsFile);

  for await (const line of readLines(inputIconsFile, outputIconsFile)) {
    addLine(outputFile, line);
    // 1. Add the import of the image
    if (!!line.includes('$appendImports')) {
      for await (const [index, filename] of filesNames.entries()) {
        addLine(
          outputFile,
          `import { ReactComponent as ${filesNamesCamelCase[index]} } from '@icons/ui/${filename}';`,
        );
      }
    }
    if (!!line.includes('$appendComponentsImports')) {
      for await (const [index, filename] of filesNamesComponents.entries()) {
        addLine(
          outputFile,
          `import { ReactComponent as Icon${filesNamesComponentsCamelCase[index]} } from '@icons/building-components/${filename}';`,
        );
      }
    }

    // 2. Add the file name in the object with the correlated name
    if (!!line.includes('$appendIcons')) {
      for await (const filename of filesNamesCamelCase) {
        addLine(outputFile, `  ${filename}: ${filename},`);
      }
    }

    if (!!line.includes('$appendComponentsIcons')) {
      for await (const filename of filesNamesComponentsCamelCase) {
        addLine(outputFile, `  ${filename}: Icon${filename},`);
      }
    }
  }
})();
