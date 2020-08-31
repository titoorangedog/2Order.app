import { buildPrivateRoute } from '@src/private.routes';

export const menuRoutes = {
  menuNew: buildPrivateRoute('/menu/new'),
  menuView: buildPrivateRoute('/menu/view/:id'),
  buildingComponentsView: buildPrivateRoute('/menu/view/:id/components'),
};
