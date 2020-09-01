import { BuildingCard } from '@common/buildingCard';
import { InputSearch } from '@common/inputSearch';
import * as sharedActions from '@features/shared/redux/actions';
import { Spinner } from '@features/shared/Spinner';
import FormControl from '@material-ui/core/FormControl';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import { map } from 'ramda';
import React, { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectBuildings, selectIsSearchBusy, selectIsBookmarkBusy } from './redux/selectors';
import { selectIsGetBoardBusy } from '@features/board/redux/selectors';
import { EmptyContent } from '@common/emptyContent';

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100%',
    display: 'grid',
    gridTemplateRows: `${theme.spacing(4)}px 1fr`,
    gridTemplateAreas: '"search" "results"',
    gridRowGap: theme.spacing(2),
    padding: theme.spacing(0, 3.5, 2),
  },
  results: {
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(1.5),
  },
  buttonsContainer: {
    placeContent: 'center',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(2),
  },
}));

export const BuildingSearchComponent = props => {
  const classes = useStyles(props);
  const {
    buildings,
    isSearchBusy,
    isGetBookmarkedBuildingsBusy,
    isBookmarkBusy,
    actions: { buildingSearch, buildingSearchBookmark },
  } = props;
  const inputFocus = useRef(null);

  useEffect(() => {
    setTimeout(() => inputFocus.current.focus(), 0);
  }, [inputFocus]);

  const handleChange = useCallback(value => buildingSearch(value), [buildingSearch]);
  const handleBookmark = useCallback(building => buildingSearchBookmark(building), [
    buildingSearchBookmark,
  ]);

  return (
    <div className={classes.container}>
      <FormControl className={classes.searchBar}>
        <InputSearch ref={inputFocus} onChange={handleChange} />
      </FormControl>
      {isSearchBusy || isGetBookmarkedBuildingsBusy ? (
        <Spinner />
      ) : (
        <>
          {!!buildings && !!buildings.length && (
            <div className={classes.results}>
              {map(
                b => (
                  <BuildingCard
                    key={'buildingSearch-' + b.id}
                    building={b}
                    buildingId={b.id}
                    qcCapexObjectType={b.qcCapexObjectTypeDescription}
                    street={b.street}
                    houseNumber={b.houseNumber}
                    zipCode={b.zipCode}
                    city={b.city}
                    isBusy={isBookmarkBusy[b.id]}
                    onClick={handleBookmark}
                  />
                ),
                buildings,
              )}
            </div>
          )}
          {!!buildings && !buildings.length && (
            <EmptyContent locale="No search results found." responsive />
          )}
          {!!buildings && !!buildings.length && (
            <div className={classes.buttonsContainer}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                disabled={true}
              >
                {i18n._('Load more')}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    buildings: selectBuildings(state),
    isSearchBusy: selectIsSearchBusy(state),
    isBookmarkBusy: selectIsBookmarkBusy(state),
    isGetBoardBusy: selectIsGetBoardBusy(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const BuildingSearch = connect(mapStateToProps, mapDispatchToProps)(BuildingSearchComponent);
