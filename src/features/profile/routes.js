import { buildPrivateRoute } from '@src/private.routes';

export const profileRoutes = {
  profile: buildPrivateRoute('/profile'),
};
