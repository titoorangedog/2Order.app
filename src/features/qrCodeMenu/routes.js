import { buildPublicRoute } from '@src/public.routes';

export const qrCodeMenuRoutes = {
  qrCodeMenu: buildPublicRoute('/qrcodemenu/:idClub/:idMenu'),
};
