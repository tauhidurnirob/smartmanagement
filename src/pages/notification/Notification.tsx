import { Outlet } from 'react-router-dom'
import SuspensedView from '../../modules/common/SuspensedView'
import { Box } from '@mui/material'

const Notification = () => {
  return (
    <Box>
      <SuspensedView>
        <Outlet />
      </SuspensedView>
    </Box>
  )
}

export default Notification
