import { BuildingSection } from '@common/buildingSection';
import { InputField } from '@common/inputField';
import { boardRoutes } from '@features/board/routes';
import * as sharedActions from '@features/shared/redux/actions';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React, { useCallback, useMemo } from 'react';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectMenuIsBusy } from './redux/selectors';
import { useState } from 'react';
import { SelectField } from '@common/selectField';
import { ButtonSpinner } from '@features/shared/ButtonSpinner';

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

export const MenuNewComponent = props => {
  const classes = useStyles(props);
  const {
    isBusy,
    actions: { push, menuSave },
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

  const handleAbort = useCallback(() => push(boardRoutes.board), [push]);

  const [designation, setDesignation] = useState('');
  const [egId, setEgId] = useState('');
  const [buildYear, setBuildYear] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetSupplement, setStreetSupplement] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [indexYear, setIndexYear] = useState('');
  const [buildingInsuranceValue, setBuildingInsuranceValue] = useState('');
  const [buildingVolume, setBuildingVolume] = useState('');

  const handleChangeDesignation = useCallback(e => setDesignation(e.currentTarget.value), []);
  const handleChangeEgId = useCallback(e => setEgId(e.currentTarget.value), []);
  const handleChangeBuildYear = useCallback(e => setBuildYear(e.currentTarget.value), []);
  const handleChangeStreet = useCallback(e => setStreet(e.currentTarget.value), []);
  const handleChangeHouseNumber = useCallback(e => setHouseNumber(e.currentTarget.value), []);
  const handleChangeStreetSupplement = useCallback(
    e => setStreetSupplement(e.currentTarget.value),
    [],
  );
  const handleChangeZipCode = useCallback(e => setZipCode(e.currentTarget.value), []);
  const handleChangeCity = useCallback(e => setCity(e.currentTarget.value), []);
  const handleChangeIndexYear = useCallback(e => setIndexYear(e.currentTarget.value), []);
  const handleChangeBuildingInsuranceValue = useCallback(
    e => setBuildingInsuranceValue(e.currentTarget.value),
    [],
  );
  const handleChangeBuildingVolume = useCallback(e => setBuildingVolume(e.currentTarget.value), []);

  const handleMenuSave = useCallback(
    () =>
      menuSave({
        description: designation,
        egId: egId,
        buildYear: buildYear,
        street: street,
        houseNumber: houseNumber,
        streetSupplement: streetSupplement,
        zipCode: zipCode,
        city: city,
        insuranceIndexYear: indexYear,
        insuranceValue: buildingInsuranceValue,
        insuranceBuildingVolume: buildingVolume,
      }),
    [
      menuSave,
      designation,
      egId,
      buildYear,
      street,
      houseNumber,
      streetSupplement,
      zipCode,
      city,
      indexYear,
      buildingInsuranceValue,
      buildingVolume,
    ],
  );

  const validationScheme = useMemo(
    () => ({
      qccapexobjecttypeid: {
        required: true,
        integer: true,
      },
      designation: {
        required: true,
        length: { max: 50 },
      },
      buildYear: {
        required: true,
        integer: true,
        length: { min: 4, max: 4 },
        range: { min: 1000, max: 2999 },
      },
      street: {
        required: true,
        length: { max: 50 },
      },
      house_number: {
        required: true,
        length: { max: 10 },
      },
      zip_code: {
        required: true,
        integer: true,
        length: { min: 4, max: 4 },
        range: { min: 1000, max: 9999 },
      },
      city: {
        required: true,
      },
      index_year: {
        required: true,
        integer: true,
        length: { min: 4, max: 4 },
        range: { min: 1000, max: 2999 },
      },
      building_insurance_value: {
        required: true,
        length: { max: 8 },
        floating: { decimals: 2 },
      },
      building_volume: {
        required: true,
        integer: true,
      },
    }),
    [],
  );

  return (
    <form className={classes.container}>
      <div className={classes.sections}>
        <BuildingSection title={i18n._('Building Properties')}>
          <InputField
            name="designation"
            placeholder={i18n._('Designation')}
            validations={validationScheme['designation']}
            {...formInputDeps}
            value={designation}
            onChange={handleChangeDesignation}
          />
          <InputField
            name="egid"
            placeholder={i18n._('EGID')}
            value={egId}
            onChange={handleChangeEgId}
          />
          <InputField
            name="buildYear"
            placeholder={i18n._('Year of construction')}
            validations={validationScheme['buildYear']}
            {...formInputDeps}
            value={buildYear}
            onChange={handleChangeBuildYear}
          />
        </BuildingSection>
        <BuildingSection title={i18n._('Address')}>
          <InputField
            name="street"
            placeholder={i18n._('Street')}
            validations={validationScheme['street']}
            {...formInputDeps}
            value={street}
            onChange={handleChangeStreet}
          />
          <InputField
            name="house_number"
            placeholder={i18n._('House number')}
            validations={validationScheme['house_number']}
            {...formInputDeps}
            value={houseNumber}
            onChange={handleChangeHouseNumber}
          />
          <InputField
            name="street_supplement"
            placeholder={i18n._('Street supplement')}
            value={streetSupplement}
            onChange={handleChangeStreetSupplement}
          />
          <InputField
            name="zip_code"
            placeholder={i18n._('ZIP Code')}
            validations={validationScheme['zip_code']}
            {...formInputDeps}
            value={zipCode}
            onChange={handleChangeZipCode}
          />
          <InputField
            name="city"
            placeholder={i18n._('City')}
            validations={validationScheme['city']}
            {...formInputDeps}
            value={city}
            onChange={handleChangeCity}
          />
        </BuildingSection>
        <BuildingSection title={i18n._('Building Insurance')}>
          <InputField
            name="index_year"
            placeholder={i18n._('Index Year')}
            validations={validationScheme['index_year']}
            {...formInputDeps}
            value={indexYear}
            onChange={handleChangeIndexYear}
          />
          <InputField
            name="building_insurance_value"
            placeholder={i18n._('Value')}
            validations={validationScheme['building_insurance_value']}
            {...formInputDeps}
            value={buildingInsuranceValue}
            onChange={handleChangeBuildingInsuranceValue}
          />
          <InputField
            name="building_volume"
            placeholder={i18n._('Volume')}
            validations={validationScheme['building_volume']}
            {...formInputDeps}
            value={buildingVolume}
            onChange={handleChangeBuildingVolume}
          />
        </BuildingSection>
      </div>
      <div className={classes.actionContainer}>
        <ButtonSpinner
          color="primary"
          variant="contained"
          isBusy={isBusy}
          className={classes.button}
          onClick={handleMenuSave}
          disabled={!isValid}
        >
          {i18n._('Create building')}
        </ButtonSpinner>

        <Button color="primary" className={classes.abortButton} onClick={handleAbort}>
          {i18n._('Abort')}
        </Button>
      </div>
    </form>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    isBusy: selectMenuIsBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const MenuNew = connect(mapStateToProps, mapDispatchToProps)(MenuNewComponent);
