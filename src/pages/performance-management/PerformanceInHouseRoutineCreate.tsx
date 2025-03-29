import { Box } from '@mui/material';
import ButtonBack from '../../modules/common/ButtonBack';
import RoutineTaskCreate from '../../modules/performance-management/task-allocation/RoutineTaskCreate';

const PerformanceInhouseRoutineCreate: React.FC = () => {
  return (
    <Box>
      <ButtonBack to={'/performance-management/task-allocation/routine-task'} />
      <RoutineTaskCreate />
    </Box>
  )
}

export default PerformanceInhouseRoutineCreate
