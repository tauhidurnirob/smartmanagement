import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import Sidebar from '../../modules/common/sidebar/Sidebar'
import appSlice from '../../store/slices/app'
import { _getAppState, _getAuth } from '../../store/_selectors'
import useAuth from '../../hooks/useAuth'

const SidebarWrapper = () => {
  const dispatch = useDispatch()
  const app = _getAppState()

  const { getRoutesInfo, auth } = useAuth()

  const routes = useMemo(() => {
    const { filteredRoutes } = getRoutesInfo(auth.user || null)
    return filteredRoutes
  }, [auth])

  return (
    <Sidebar
      open={app.sidebarOpen}
      mobileOpen={app.mobileSidebarOpen}
      onClose={() => {
        dispatch(appSlice.actions.setSidebarOpen(false))
        dispatch(appSlice.actions.setMobileSidebarOpen(false))
      }}
      onOpen={() => {
        dispatch(appSlice.actions.setSidebarOpen(true))
        dispatch(appSlice.actions.setMobileSidebarOpen(true))
      }}
      links={routes}
    />
  )
}

export default SidebarWrapper
