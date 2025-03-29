import { Box } from '@mui/material'
import SuspensedView from '../../modules/common/SuspensedView'
import { Outlet } from 'react-router-dom'

const PredictiveAnalysis = () => {
  return (
    <Box>
      <SuspensedView>
        <Outlet />
      </SuspensedView>
    </Box>
  )
}

export default PredictiveAnalysis
