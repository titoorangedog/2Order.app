import { SwipeableView } from '@common/swipeableView';
import { BuildingInspection } from '@features/menu/buildingView/BuildingInspection';
import { BuildingProperties } from '@features/menu/buildingView/BuildingProperties';
import { BuildingContacts } from '@features/menu/buildingView/BuildingContacts.js';
import React from 'react';
import { i18n } from '@common/i18n-loader';

export const MenuView = props => {
  return (
    <SwipeableView
      tabs={[i18n._('Properties'), i18n._('Inspection'), i18n._('Contacts')]}
      defaultTab="2"
    >
      {/* <BuildingProperties />
      <BuildingInspection />
      <BuildingContacts /> */}
    </SwipeableView>
  );
};
