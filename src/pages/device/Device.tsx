import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import SuspensedView from '../../modules/common/SuspensedView'

const Device = () => {
  return (
    <Box>
      <SuspensedView>
        <Outlet />
      </SuspensedView>
    </Box>
  )
}

export default Device
