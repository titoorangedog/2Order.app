import { EmptyContent } from '@common/emptyContent';
import * as actions from '@features/menu/redux/actions';
import * as sharedActions from '@features/shared/redux/actions';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const BuildingContactsComponent = props => {
  return <EmptyContent locale="Not implemented yet." />;
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const BuildingContacts = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildingContactsComponent);
