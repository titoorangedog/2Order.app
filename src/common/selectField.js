import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles(theme => ({
  selectError: {
    '& label.Mui-focused': {
      color: theme.palette.input.error + ' !important',
    },
    '& div:before': {
      borderBottom: '1px solid ' + theme.palette.input.error,
    },
    '& div:after': {
      borderBottom: '2px solid ' + theme.palette.input.error,
    },
  },
}));

export const SelectField = props => {
  const classes = useStyles(props);
  const {
    name,
    value,
    placeholder,
    onChange,
    keyItem,
    valueItem,
    items,
    register,
    setValue,
    triggerValidation,
    errors,
    validations,
    ...otherProps
  } = props;

  const [internalValue, setInternalValue] = useState('');

  useEffect(() => {
    if (!!register) {
      register({ name }, { required: true });
    }
  }, [register, name]);

  useEffect(() => {
    if (!!value) setInternalValue(value);
  }, [value]);

  const handleSelect = useCallback(
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

  return (
    <FormControl className={!!errors && !!errors[name] ? classes.selectError : ''}>
      <InputLabel shrink={false}>{placeholder}</InputLabel>
      <Select
        name={name}
        value={internalValue}
        inputProps={{
          style: { fontSize: '13px' },
        }}
        onChange={handleSelect}
        {...otherProps}
      >
        <MenuItem value="">
          <Trans>None</Trans>
        </MenuItem>
        {/* {!!items &&
          items.map((current, index) => (
            <MenuItem key={index} value={current[keyItem]}>
              {current[valueItem]}
            </MenuItem>
          ))} */}
      </Select>
    </FormControl>
  );
};
