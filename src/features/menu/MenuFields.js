import { MenuVoice } from '@src/common/menuVoice';
import { InputField } from '@common/inputField';
import { boardRoutes } from '@features/board/routes';
import * as sharedActions from '@features/shared/redux/actions';
import { i18n } from '@common/i18n-loader';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React, { useCallback, useMemo, useState } from 'react';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectMenuIsBusy } from './redux/selectors';
import { ButtonSpinner } from '@features/shared/ButtonSpinner';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Spinner } from '@features/shared/Spinner';

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'auto',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gridRowGap: theme.spacing(3),
    margin: theme.spacing(0, 3),
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  sections: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(2),
  },
  nextContainer: {
    placeContent: 'center',
    display: 'grid',
  },
  button: {
    borderRadius: '32px',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 8),
    boxShadow: 'none',
    fontSize: '13px',
    textTransform: 'none',
    fontWeight: '300',
    '&[disabled]': {
      backgroundColor: theme.palette.grey.main,
      color: theme.palette.common.white,
    },
  },
  abortButton: {
    boxShadow: 'none',
    fontSize: '13px',
    textTransform: 'none',
    fontWeight: '300',
    backgroundColor: 'transparent',
    padding: theme.spacing(1, 2),
    color: theme.palette.primary.main,
  },
  actionContainer: {
    placeContent: 'center',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const MenuFields = props => {
  const classes = useStyles(props);
  const { menuName, startTime, isBusy, onClickAbort, onClickSave, onChangeField } = props;

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

  const handleChangeMenuName = useCallback(
    e => {
      if (e && e.currentTarget && e.currentTarget.value) {
        const newValue = { name: 'menuName', value: `${e.currentTarget.value}` };
        onChangeField(newValue);
      }
    },
    [onChangeField],
  );

  const handleChangeStartTime = useCallback(
    e => {
      const newValue = { name: 'startTime', value: e };
      onChangeField(newValue);
    },
    [onChangeField],
  );

  const validationScheme = useMemo(
    () => ({
      menuName: {
        required: true,
        length: { min: 3, max: 255 },
      },
      startTime: {
        required: true,
        length: { max: 50 },
      },
    }),
    [],
  );

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <form className={classes.container}>
      <div className={classes.sections}>
        <MenuVoice title={i18n._('Menu info')}>
          <InputField
            name="menuName"
            placeholder={i18n._('Menu name:')}
            validations={validationScheme['menuName']}
            {...formInputDeps}
            value={menuName}
            onChange={handleChangeMenuName}
          />
        </MenuVoice>
        <MenuVoice title={i18n._('Start Time:')}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              value={startTime}
              onChange={handleChangeStartTime}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </MenuVoice>
      </div>
      <div className={classes.actionContainer}>
        <ButtonSpinner
          color="primary"
          variant="contained"
          isBusy={isBusy}
          className={classes.button}
          onClick={onClickSave}
          disabled={!isValid}
        >
          {i18n._('Save Menu')}
        </ButtonSpinner>

        <Button color="primary" className={classes.abortButton} onClick={onClickAbort}>
          {i18n._('Abort')}
        </Button>
      </div>
    </form>
  );
};
