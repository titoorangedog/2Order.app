import { keys, reduce } from 'ramda';

const validatorResolver = {
  // Required field
  required: () => value => !!value && value.length >= 1,
  // Integer value
  integer: () => value => !isNaN(value) || (Number(value) === value && value % 1 === 0),
  // Floating value
  // TODO: Check if there is a way to check digits
  // without let entering so many 0 after the comma
  floating: opts => value =>
    (Number(value) === value && value % 1 !== 0) ||
    (!!opts.decimals &&
      parseFloat((Math.floor(value * 100) / 100).toFixed(2)) === parseFloat(value)),
  // Numeric value
  numeric: opts => validatorResolver['integer'](opts) || validatorResolver['floating'](opts),
  // Min or Max length (string: number of chars, numeric: number of units)
  length: opts => value =>
    (!!opts.max && value.length <= opts.max) || (!!opts.min && value.length >= opts.min),
  // Is in range
  range: opts => value => !!opts.max && !!opts.min && value <= opts.max && value >= opts.min,
};

export const MapValidators = validators =>
  reduce(
    (acc, key) => {
      acc[key] = validatorResolver[key](validators[key]);

      return acc;
    },
    {},
    keys(validators),
  );
