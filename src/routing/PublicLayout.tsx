import { useMemo } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { _getAuth } from '../store/_selectors'
import useAuth from '../hooks/useAuth'

const PublicLayout = () => {
  const { auth, getRoutesInfo } = useAuth()

  // const defaultRoute = useMemo(() => {
  //   const { defaultRoute } = getRoutesInfo(auth.user || null)
  //   return defaultRoute
  // }, [auth])

   // Get filtered routes based on authentication information
   const { filteredRoutes } = useMemo(() => {
    return getRoutesInfo(auth.user || null);
  }, [auth, getRoutesInfo]);
  // Get the first route's children if available
    const firstRouteChildren = filteredRoutes.length > 0 ? filteredRoutes[0].children : [];
    let finalRoute = "/dashboard/overview";
    // If filteredRoutes is undefined, return null or a default component
    if (!firstRouteChildren) {
      return null; // Or return a default component or loading indicator
    }else{
      finalRoute = firstRouteChildren?.[0]?.path;
    }
 
    if (auth.user) {
      return <Navigate to={finalRoute} />
    }

    return <Outlet />
}

export default PublicLayout
