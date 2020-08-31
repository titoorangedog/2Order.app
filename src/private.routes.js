export const privateRoutes = {
  master: '/private',
};

export const buildPrivateRoute = route => `${privateRoutes.master}${route}`;
