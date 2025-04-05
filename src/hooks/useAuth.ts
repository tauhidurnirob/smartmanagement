import { useDispatch } from 'react-redux';
import { _getAuth, _getUser } from '../store/_selectors';
import _actions from '../store/_actions';
import { LS2_EMAIL, SMART_CLEAN_EMAIL } from '../constants/common';
import getAllowedNavRoutes from '../helpers/getAllowedNavRoutes';
import { navRouteInfos } from '../routing/routes';
import { IUser } from '../api/models';
import { ROUTES } from '../helpers/constants';
import { AuditIcon } from '../assets/icons/audit';
import { co } from '@fullcalendar/core/internal-common';

const useAuth = () => {
  const dispatch = useDispatch();

  const auth = _getAuth();
  const user = _getUser();
  const token = auth.token;
  const isLs2 = auth.user?.email === LS2_EMAIL;
  const isSmartClean = auth.user?.email === SMART_CLEAN_EMAIL;

  const getRoutesInfo = (user?: IUser | null) => {
    const authUser = user || auth.user;
    const isRepressentative = authUser?.role?.name?.toLowerCase() === 'school representative';
    const userPermissions = authUser?.role?.permission?.permissions || [];
    console.log("userPermissions")
    console.log(userPermissions)
    const allowedRoutes = getAllowedNavRoutes(navRouteInfos, userPermissions);
    const auditModule = allowedRoutes?.filter((r) => r.label === 'Audit');

    const filteredRoutes = isLs2
      ? auditModule || []
      : isSmartClean ?
      []
      : allowedRoutes;

    const defaultRoute = filteredRoutes.length > 0 ? filteredRoutes[0].path : ROUTES.error404;

    return { filteredRoutes, defaultRoute };
  }

  const logout = () => {
    dispatch(_actions.logout());
  }

  return {
    auth,
    user,
    token,
    isLs2,
    isSmartClean,
    getRoutesInfo,
    logout,
  }
}

export default useAuth;
