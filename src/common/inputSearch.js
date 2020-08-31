import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import { Icon } from '@common/icon';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { i18n } from '@common/i18n-loader';

const useStyles = makeStyles(theme => ({
  searchBar: {},
  searchInput: {
    height: '32px',
    '& .MuiInput-formControl': {
      borderRadius: '8px',
      background: theme.palette.input.search.background,
      transition: 'background 0.3s ease-in-out',
      '&.Mui-focused': {
        background: theme.palette.input.search.hover.background,
      },
    },
    '& input': {
      height: '100%',
      padding: theme.spacing(0, 0, 0, 1.5),
      color: theme.palette.input.search.text.content,
      '&::placeholder': {
        color: theme.palette.input.search.text.placeholder,
      },
    },
    '& > div:before': {
      content: 'none',
    },
    '& > div:after': {
      content: 'none',
    },
  },
  emptyButton: {
    cursor: 'pointer',
    height: 'auto',
    margin: '0',
    padding: theme.spacing(0, 1.5),
  },
}));

export const InputSearch = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const { onChange, name, value } = props;
  const [inputValue, setInputValue] = useState('');

  const [handleDebouncedChange] = useDebouncedCallback(value => onChange(value), 1500, [onChange]);

  useEffect(() => {
    if (!!value) setInputValue(value);
  }, [value]);

  const handleChange = useCallback(
    event => {
      setInputValue(event.target.value);
      handleDebouncedChange(event.target.value);
    },
    [setInputValue, handleDebouncedChange],
  );

  const handleEmpty = useCallback(
    e => {
      setInputValue('');
      ref.current.focus();
    },
    [ref],
  );

  return (
    <TextField
      onChange={handleChange}
      name={name}
      value={inputValue}
      className={classes.searchInput}
      placeholder={i18n._('Search')}
      InputProps={{
        endAdornment: !!inputValue && (
          <InputAdornment position="start" className={classes.emptyButton} onClick={handleEmpty}>
            <Icon name="IconCross" size="10" vAlign="baseline" paletteColor="input.empty" />
          </InputAdornment>
        ),
      }}
      inputProps={{
        style: { textAlign: 'left' },
        ref: ref,
      }}
    />
  );
});
