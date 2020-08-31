import { SwipeableView } from '@common/swipeableView';
import { BuildingComponentsTiles } from '@features/menu/buildingView/buildingInspection/BuildingComponentsTiles';
import React from 'react';
import { i18n } from '@common/i18n-loader';
import { EmptyContent } from '@common/emptyContent';

export const BuildingComponentsView = props => {
  return (
    <SwipeableView tabs={[i18n._('List'), i18n._('Tiles'), i18n._('Gallery')]} defaultTab="2">
      <EmptyContent locale="Not implemented yet." />
      <BuildingComponentsTiles />
      <EmptyContent locale="Not implemented yet." />
    </SwipeableView>
  );
};
