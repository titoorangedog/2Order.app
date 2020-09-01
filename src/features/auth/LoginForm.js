import useForm from 'react-hook-form';
import { InputField } from '@common/inputField';
import { InputPasswordField } from '@common/inputPasswordField';
import { ButtonSpinner } from '@features/shared/ButtonSpinner';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useEffect, useState, useMemo } from 'react';

const useStyles = makeStyles(theme => ({
  formContainer: {
    height: 'inherit',
    display: 'grid',
    gridTemplateRows: '2fr 1fr',
    gridTemplateAreas: '"fields" "buttons"',
    gridRowGap: theme.spacing(2),
    alignItems: 'center',
  },
  fieldsContainer: {
    gridArea: 'fields',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(4),
  },
  buttonsContainer: {
    gridArea: 'buttons',
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"login" "signup"',
    gridRowGap: theme.spacing(2),
    alignSelf: 'end',
  },
  loginButton: {
    gridArea: 'login',
  },
  signUpButton: {
    gridArea: 'signup',
  },
}));

export const LoginForm = props => {
  const classes = useStyles(props);
  const { isBusy, username, password, onLogin, onSignUp } = props;

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

  const [internalUsername, setInternalUsername] = useState('');
  const [internalPassword, setInternalPassword] = useState('');
  const handleUsernameChange = useCallback(event => setInternalUsername(event.target.value), [
    setInternalUsername,
  ]);
  const handlePasswordChange = useCallback(event => setInternalPassword(event.target.value), [
    setInternalPassword,
  ]);

  const handleLogin = useCallback(() => onLogin(internalUsername, internalPassword), [
    onLogin,
    internalUsername,
    internalPassword,
  ]);
  const handleSignUp = useCallback(() => onSignUp(), [onSignUp]);

  const validationScheme = useMemo(
    () => ({
      username: {
        required: true,
      },
      password: {
        required: true,
      },
    }),
    [],
  );

  useEffect(() => {
    setInternalUsername(username);
    setInternalPassword(password);
  }, [username, password, setInternalUsername, setInternalPassword]);

  return (
    <form className={classes.formContainer}>
      <div className={classes.fieldsContainer}>
        <InputField
          value={internalUsername}
          onChange={handleUsernameChange}
          name="username"
          {...formInputDeps}
          validations={validationScheme['username']}
          hideError
          placeholder={i18n._('Username')}
        />

        <InputPasswordField
          value={internalPassword}
          name="password"
          {...formInputDeps}
          validations={validationScheme['password']}
          onChange={handlePasswordChange}
        />
      </div>
      <div className={classes.buttonsContainer}>
        <ButtonSpinner
          color="primary"
          variant="contained"
          isBusy={isBusy}
          className={classes.loginButton}
          onClick={handleLogin}
          disabled={!isValid}
        >
          {i18n._('Login')}
        </ButtonSpinner>

        <Button color="primary" className={classes.signUpButton} onClick={handleSignUp}>
          {i18n._('Sign Up')}
        </Button>
      </div>
    </form>
  );
};
