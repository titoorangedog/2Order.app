import { SelectField } from '@common/selectField';
import { ButtonSpinner } from '@features/shared/ButtonSpinner';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useState } from 'react';
import useForm from 'react-hook-form';

const useStyles = makeStyles(theme => ({
  container: {
    height: 'inherit',
    display: 'grid',
    gridTemplateRows: `1fr 1.5fr auto`,
    gridTemplateAreas: '"text" "fields" "buttons"',
    gridRowGap: theme.spacing(4),
    placeItems: 'center',
  },
  textContainer: {
    gridArea: 'text',
    color: theme.palette.emptyContent.color,
    justifySelf: 'start',
    fontSize: '18px',
    fontWeight: '300',
    alignSelf: 'end',
  },
  fieldsContainer: {
    gridArea: 'fields',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(4),
    alignSelf: 'start',
    width: '100%',
  },
  buttonsContainer: {
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"login" "abort"',
    gridRowGap: theme.spacing(2),
    placeItems: 'center',
  },
  loginButton: {
    gridArea: 'login',
  },
  abortButton: {
    gridArea: 'abort',
  },
}));

export const LoginSelectCustomer = props => {
  const classes = useStyles(props);
  const { isBusy, customers, onSelectCustomer, onAbort } = props;

  const {
    register,
    setValue,
    triggerValidation,
    errors,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const formInputDeps = { register, setValue, triggerValidation, errors };

  const [customer, setCustomer] = useState('');

  const handleCustomerChange = useCallback(event => setCustomer(event.target.value), [setCustomer]);
  const handleSelectCustomer = useCallback(() => onSelectCustomer(customer), [
    onSelectCustomer,
    customer,
  ]);

  return (
    <form className={classes.container}>
      <div className={classes.textContainer}>
        {i18n._('Please select the desired environment.')}
      </div>
      <div className={classes.fieldsContainer}>
        <SelectField
          name="customer"
          value={customer}
          onChange={handleCustomerChange}
          placeholder={i18n._('Environment')}
          keyItem="id"
          valueItem="id"
          items={customers}
          {...formInputDeps}
        />
      </div>
      <div className={classes.buttonsContainer}>
        <ButtonSpinner
          isBusy={isBusy}
          color="primary"
          variant="contained"
          className={classes.loginButton}
          onClick={handleSelectCustomer}
          disabled={!isValid}
        >
          {i18n._('Next')}
        </ButtonSpinner>

        <Button color="primary" className={classes.abortButton} onClick={onAbort}>
          {i18n._('Abort')}
        </Button>
      </div>
    </form>
  );
};
