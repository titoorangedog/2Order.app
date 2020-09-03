import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  section: {
    display: 'grid',
    gridTemplateRows: 'min-content auto',
    gridTemplateAreas: '"subtitle" "content"',
    gridRowGap: theme.spacing(1),
  },
  sectionSubTitle: {
    gridArea: 'subtitle',
    color: theme.palette.form.section.title,
    padding: '0 ' + theme.spacing(1.5) + 'px',
    fontSize: '14px',
  },
  sectionContent: {
    gridArea: 'content',
    backgroundColor: theme.palette.form.section.background,
    borderRadius: '8px',
    padding: theme.spacing(2) + 'px ' + theme.spacing(2.5) + 'px ' + theme.spacing(2.5) + 'px',
    display: 'grid',
    gridAutoFlow: 'row',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(3),
  },
}));

export const MenuVoice = props => {
  const classes = useStyles(props);
  const { title, children } = props;

  return (
    <div className={classes.section}>
      <div className={classes.sectionSubTitle}>{title}</div>
      <div className={classes.sectionContent}>{children}</div>
    </div>
  );
};
