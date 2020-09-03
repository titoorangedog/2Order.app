import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useMemo, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectMenuIsBusy, selectCurrentMenuInfo } from './redux/selectors';
import { routerActions } from 'connected-react-router';
import * as sharedActions from '@features/shared/redux/actions';
import * as actions from './redux/actions';
import clsx from 'clsx';
import { i18n } from '@common/i18n-loader';
import { EmptyContent } from '@common/emptyContent';
import { MenuVoice } from '@src/common/menuVoice';
import { InputField } from '@common/inputField';
import { ButtonSpinner } from '@features/shared/ButtonSpinner';
import Button from '@material-ui/core/Button';
import useForm from 'react-hook-form';
import { boardRoutes } from '@features/board/routes';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'min-content auto',
    gridTemplateAreas: '"title" "content"',
    gridRowGap: theme.spacing(3),
    margin: theme.spacing(0, 3),
    borderRadius: '12px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
    backgroundColor: theme.palette.card.background,
    padding: theme.spacing(1, 1.5),
  },
  section: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"header" "content"',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
  },
  sectionHeaderInfo: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    padding: theme.spacing(2, 2, 1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"title" "bottom"',
    gridRowGap: theme.spacing(1),
  },
  sectionHeaderCommon: {
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    padding: theme.spacing(2, 2, 1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"title" "bottom"',
    gridRowGap: theme.spacing(1),
  },
  sectionHeaderTitle: {
    gridArea: 'title',
    color: theme.palette.primary.contrastText,
    fontSize: '20px',
    fontWeight: '400',
  },
  sectionNameContent: {
    background: theme.palette.card.background,
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    color: theme.palette.card.color,
    padding: theme.spacing(2, 2.5),
  },
  sectionNameContainer: {
    background: theme.palette.card.list.border,
    display: 'grid',
    gridAutoRows: `minmax(${theme.spacing(6)}px, min-content)`,
    gridAutoColumns: '100%',
    gridAutoFlow: 'row',
    gridRowGap: '1px',
  },
  sectionName: {
    background: theme.palette.card.background,
    display: 'grid',
    gridTemplateColumns: `auto ${theme.spacing(4)}px`,
    gridTemplateRows: 'min-content',
    gridTemplateAreas: '"title icon"',
    alignContent: 'center',
    padding: theme.spacing(3, 0),
    '&:first-child': {
      padding: theme.spacing(1, 0, 3),
    },
    '&:last-child': {
      padding: theme.spacing(3, 0, 2),
    },
  },
  sectionNameWithSubtitle: {
    gridRowGap: theme.spacing(2),
    gridTemplateRows: 'min-content min-content',
    gridTemplateAreas: '"title" "subtitle"',
    alignContent: 'space-between',
  },
  sectionNameTitle: {
    display: 'grid',
    gridArea: 'title',
    fontSize: '19px',
    fontWeight: '500',
  },
  sectionNameSubtitle: {
    gridArea: 'subtitle',
    fontSize: '12px',
    color: 'red',
    fontWeight: '300',
  },

  actionContainer: {
    placeContent: 'center',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(2),
    padding: theme.spacing(2),
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
}));

export const MenuDeleteComponent = props => {
  const classes = useStyles(props);
  const {
    menu,
    isBusy,
    actions: { menuDelete, push },
  } = props;

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
  const [menuName, setMenuName] = useState('');

  const validationScheme = useMemo(
    () => ({
      menuName: {
        required: true,
        length: { min: 3, max: 255 },
      },
    }),
    [],
  );

  const handleChangeMenuName = useCallback(e => setMenuName(e.currentTarget.value), []);
  const handleAbort = useCallback(() => push(boardRoutes.board), [push]);
  const handleMenuDelete = useCallback(() => {
    menuDelete(menuName);
  }, [menuDelete, menuName]);

  return (
    <>
      {!!menu || isBusy ? (
        <div className={classes.container}>
          <div className={classes.inspection}>
            <div className={clsx(classes.sectionHeaderInfo, classes.sectionHeaderCommon)}>
              <div className={classes.sectionHeaderTitle}>{i18n._('Menu Info')}</div>
            </div>
            <div className={classes.sectionNameContent}>
              <div className={classes.sectionNameContainer}>
                <div className={clsx(classes.sectionName, classes.sectionNameWithSubtitle)}>
                  <div className={classes.sectionNameTitle}>{menu.name}</div>
                  <div className={classes.sectionNameSubtitle}>
                    {i18n._('Start time')} {menu.startTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className={classes.sections}>
              <MenuVoice title={i18n._('To confirm the delete retype the Menu name')}>
                <InputField
                  name="menuName"
                  placeholder={i18n._('Menu name')}
                  validations={validationScheme['menuName']}
                  {...formInputDeps}
                  value={menuName}
                  onChange={handleChangeMenuName}
                />
              </MenuVoice>
            </div>
            <div className={classes.actionContainer}>
              <ButtonSpinner
                color="primary"
                variant="contained"
                isBusy={isBusy}
                className={classes.button}
                onClick={handleMenuDelete}
                disabled={!isValid}
              >
                {i18n._('Delete Menu')}
              </ButtonSpinner>

              <Button color="primary" className={classes.abortButton} onClick={handleAbort}>
                {i18n._('Abort')}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <EmptyContent locale={i18n._(`Menu doesn't exist`)} responsive></EmptyContent>
      )}
    </>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    menu: selectCurrentMenuInfo(state),
    isGetSectionsBusy: selectMenuIsBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const MenuDelete = connect(mapStateToProps, mapDispatchToProps)(MenuDeleteComponent);
