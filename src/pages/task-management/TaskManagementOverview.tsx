import { Box } from '@mui/material'

import TaskOverview from '../../modules/task-management/TaskOverview'
import TaskList from '../../modules/task-management/TaskList'

const TaskManagementOverview = () => {
  return (
    <Box>
      <TaskOverview />
      <Box sx={{ mt: 5 }}>
        <TaskList />
      </Box>
    </Box>
  )
}

export default TaskManagementOverview
