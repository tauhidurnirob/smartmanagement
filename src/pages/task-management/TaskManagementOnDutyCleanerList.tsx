import { Box, Typography } from '@mui/material'
import { To } from 'react-router-dom'

import ButtonBack from '../../modules/common/ButtonBack'
import TaskOnDutyCleanerList from '../../modules/task-management/TaskOnDutyCleanerList'

const TaskManagementOnDutyCleanerList = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={5.5}>
        List of Cleaner(s) on Duty Now
      </Typography>
      <Box sx={{ mt: 3.25 }}>
        <TaskOnDutyCleanerList />
      </Box>
    </Box>
  )
}

export default TaskManagementOnDutyCleanerList
