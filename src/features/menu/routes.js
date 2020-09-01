import { buildPrivateRoute } from '@src/private.routes';

export const menuRoutes = {
  menuNew: buildPrivateRoute('/menu/new'),
  menuView: buildPrivateRoute('/menu/view/:id'),
  menuComponentsView: buildPrivateRoute('/menu/view/:id/components'),
};
