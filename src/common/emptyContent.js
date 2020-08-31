import React from 'react';
import { i18n } from '@common/i18n-loader';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  container: ({ responsive, padding }) => ({
    display: 'grid',
    height: '100%',
    padding: theme.spacing(responsive ? padding : 0, padding, padding),
    fontSize: '26px',
    fontWeight: '300',
    color: theme.palette.emptyContent.color,
    alignContent: 'center',
    textAlign: 'center',
    lineHeight: '1.5',
    letterSpacing: '1.15px',
    position: 'relative',
  }),
}));

export const EmptyContent = props => {
  const { locale, responsive, padding, children } = props;
  const validatedProps = {
    ...props,
    responsive: !!responsive ? true : false,
    padding: !!padding ? parseInt(padding) : 8,
  };
  const classes = useStyles(validatedProps);

  return (
    <div className={classes.container}>
      {i18n._(!!locale ? locale : !!children ? children : 'No locale given.')}
      {children}
    </div>
  );
};
