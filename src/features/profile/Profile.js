import { InputField } from '@common/inputField';
import * as authActions from '@features/auth/redux/actions';
import { selectLanguage } from '@features/shared/redux/selectors';
import { Spinner } from '@features/shared/Spinner';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import { ButtonSpinner } from '@features/shared/ButtonSpinner';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectUserProfile, selectIsGetUserProfileBusy } from './redux/selectors';
import { version } from '@src/version.json';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr auto min-content',
    gridTemplateAreas: '"form" "buttons" "version"',
    gridRowGap: theme.spacing(3),
    padding: theme.spacing(1),
  },
  formContainer: {
    gridArea: 'form',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(4),
    padding: theme.spacing(2, 4),
  },
  buttonContainer: {
    gridArea: 'buttons',
    alignSelf: 'end',
    justifySelf: 'center',
  },
  button: {
    borderRadius: '32px',
    backgroundColor: theme.palette.error.main,
    padding: theme.spacing(1, 10),
    boxShadow: 'none',
    fontSize: '13px',
    textTransform: 'none',
    fontWeight: '300',
  },
  version: {
    gridArea: 'version',
    alignSelf: 'end',
    justifySelf: 'end',
    fontSize: '11px',
    color: theme.palette.input.label.color,
  },
}));

export const ProfileComponent = props => {
  const {
    isBusy,
    userProfile,
    actions: { authLogout },
  } = props;
  const classes = useStyles(props);

  if (isBusy) {
    return <Spinner />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <InputField
          readonly={true}
          value={`${userProfile.forname} ${userProfile.lastname}`}
          placeholder={i18n._('Name')}
        ></InputField>
        <InputField
          readonly={true}
          value={userProfile.memberRole}
          placeholder={i18n._('Role')}
        ></InputField>
        <InputField
          readonly={true}
          value={userProfile.mail}
          placeholder={i18n._('Email')}
        ></InputField>
        <InputField
          readonly={true}
          value={userProfile.mobile}
          placeholder={i18n._('Mobile')}
        ></InputField>
        <InputField
          readonly={true}
          value={userProfile.customerId}
          placeholder={i18n._('Customer')}
        ></InputField>
      </div>
      <div className={classes.buttonContainer}>
        <ButtonSpinner
          color="secondary"
          variant="contained"
          isBusy={isBusy}
          className={classes.loginButton}
          onClick={authLogout}
        >
          {i18n._('Logout')}
        </ButtonSpinner>
      </div>
      <div className={classes.version}>
        {i18n._('Version')}: {version}
      </div>
    </div>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    language: selectLanguage(state),
    userProfile: selectUserProfile(state),
    isBusy: selectIsGetUserProfileBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...authActions }, dispatch),
  };
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
