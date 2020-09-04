import { buildPrivateRoute } from '@src/private.routes';

export const menuRoutes = {
  menuNew: buildPrivateRoute('/menu/new'),
  menuEdit: buildPrivateRoute('/menu/edit/:id'),
  menuView: buildPrivateRoute('/menu/view/:id'),
  menuDelete: buildPrivateRoute('/menu/delete/:id'),
  menuComponentsView: buildPrivateRoute('/menu/view/:id/components'),
};
