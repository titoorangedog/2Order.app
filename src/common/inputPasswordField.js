// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useCallback, useEffect, useState } from 'react';
import { MapValidators } from './mapValidators';

const useStyles = makeStyles(theme => ({
  inputRequired: {
    '& > div:before': {
      borderBottom: '1px solid ' + theme.palette.coral,
    },
    '& > div:after': {
      borderBottom: '2px solid ' + theme.palette.coral,
    },
  },
}));

export const InputPasswordField = props => {
  const classes = useStyles(props);
  const {
    value,
    name,
    onChange,
    register,
    setValue,
    triggerValidation,
    validations,
    errors,
    ...otherProps
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState('');

  useEffect(() => {
    if (!!register) {
      register(
        { name },
        {
          validate: MapValidators(validations),
        },
      );
    }
  }, [register, name, validations]);

  useEffect(() => {
    setInternalValue(value);

    async function asyncEffect() {
      if (!!setValue && !!value && !!triggerValidation) {
        setValue(name, value);
        await triggerValidation({ name });
      }
    }
    asyncEffect();
  }, [setInternalValue, value, triggerValidation, name, setValue]);

  const handleChange = useCallback(
    async event => {
      const val = event.target.value;

      setInternalValue(val);
      if (!!onChange) {
        onChange(event);
      }

      if (!!setValue && !!triggerValidation) {
        setValue(name, val);
        await triggerValidation({ name });
      }
    },
    [name, onChange, setInternalValue, setValue, triggerValidation],
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      className={!!errors && !!errors[name] ? classes.inputError : ''}
      name={name}
      value={internalValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.label}>
            {i18n._('Password')}
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputProps={{
        style: { textAlign: 'end', fontSize: '13px' },
      }}
      {...otherProps}
    />
  );
};
