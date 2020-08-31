import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MapValidators } from './mapValidators';

const useStyles = makeStyles(theme => ({
  inputError: {
    '& > div:before': {
      borderBottom: '1px solid ' + theme.palette.input.error,
    },
    '& > div:after': {
      borderBottom: '2px solid ' + theme.palette.input.error,
    },
  },
}));

export const InputField = props => {
  const classes = useStyles(props);
  const {
    name,
    value,
    placeholder,
    readonly,
    onChange,
    onDebouncedChange,
    register,
    setValue,
    triggerValidation,
    validations,
    errors,
    hideError,
    ...otherProps
  } = props;
  const [internalValue, setInternalValue] = useState('');

  const [handleDebouncedChange, cancelDebounce, pendingDebounce] = useDebouncedCallback(
    value => onDebouncedChange(value),
    350,
    [onDebouncedChange],
  );

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
    if (!!value) setInternalValue(value);

    async function asyncEffect() {
      if (!!setValue && !!value && !!triggerValidation) {
        setValue(name, value);
        await triggerValidation({ name });
      }
    }
    asyncEffect();

    return () => cancelDebounce();
  }, [value, cancelDebounce, triggerValidation, name, setValue]);

  const handleChange = useCallback(
    async event => {
      const val = event.target.value;
      setInternalValue(val);

      if (!!onDebouncedChange) {
        handleDebouncedChange(val);
      }

      if (!!onChange) {
        onChange(event);
      }

      if (!!setValue && !!triggerValidation) {
        setValue(name, val);
        await triggerValidation({ name });
      }
    },
    [
      name,
      onChange,
      setInternalValue,
      handleDebouncedChange,
      onDebouncedChange,
      setValue,
      triggerValidation,
    ],
  );

  return (
    <TextField
      className={!!errors && !!errors[name] && !hideError ? classes.inputError : ''}
      name={name}
      value={internalValue}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" className={classes.label}>
            {placeholder}
          </InputAdornment>
        ),
        readOnly: !!readonly,
      }}
      onChange={event => handleChange(event)}
      onBlur={pendingDebounce}
      {...otherProps}
    />
  );
};
