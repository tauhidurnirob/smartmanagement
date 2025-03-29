import { Box } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import AutomationTaskCreateDetail from '../../modules/performance-management/task-allocation/AutomationTaskCreateDetail'

const PerformanceTaskAllocationAutomationTaskCreate = () => {
  return (
    <Box>
      <ButtonBack to={'/performance-management/task-allocation/automation-task'} />
      <AutomationTaskCreateDetail />
    </Box>
  )
}

export default PerformanceTaskAllocationAutomationTaskCreate
