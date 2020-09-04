export const publicRoutes = {
  master: '/public',
};

export const buildPublicRoute = route => `${publicRoutes.master}${route}`;
