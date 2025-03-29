import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'

import { _getAuth } from '../store/_selectors'
import SidebarWrapper from './common/SidebarWrapper'
import HeaderWrapper from './common/HeaderWrapper'
import { ROUTES } from '../helpers/constants'
import useAuth from '../hooks/useAuth'

const PrivateLayout = () => {
  const { auth, isLs2, isSmartClean } = useAuth()

  const { pathname } = useLocation()

  if (!auth.user || isSmartClean) {
    return <Navigate to={ROUTES.login} />
  }

  if (isLs2 && !pathname.startsWith(ROUTES.audit.root)) {
    return <Navigate to={ROUTES.audit.root} />
  }

  return (
    <Box display='flex' width='100%'>
      <SidebarWrapper />
      <Box component='main' sx={{ flexGrow: 1, minWidth: 0 }}>
        <HeaderWrapper />
        <Box width='100%' p={{ xs: '30px 12px 20px 12px', md: '40px 25px 20px 7px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default PrivateLayout
