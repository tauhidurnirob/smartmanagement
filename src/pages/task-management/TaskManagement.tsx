import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import SuspensedView from '../../modules/common/SuspensedView'

const TaskManagement = () => {
  return (
    <Box>
      <SuspensedView>
        <Outlet />
      </SuspensedView>
    </Box>
  )
}

export default TaskManagement
