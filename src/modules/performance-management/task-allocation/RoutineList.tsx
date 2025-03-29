import React, { FC, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import RoutineTable from '../../common/RoutineTable';
import { ITaskRoutine } from '../../../types/performance-management';
import { IResList } from '../../../types/common';
import getGroupRoutineTasksByKeys from '../../../helpers/getGroupedRoutineTasksByKeys';
import BackDrop from '../../common/BackDrop';

interface IProps {
  data: IResList<ITaskRoutine> | undefined
  isLoading: boolean
}

const RoutineList: FC<IProps> = ({ data, isLoading }) => {
  const groupedTasks = useMemo(() => {
    return getGroupRoutineTasksByKeys(data?.rows, 'locationId')
  }, [data])
  const tasksArr: ITaskRoutine[][] = Object.values(groupedTasks);

  return (
    <Box sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
      {isLoading ? (
        <Box sx={{ position: 'relative', height: '60px' }}>
          <BackDrop />
        </Box>
      ) : !data?.rows?.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mb: 2, bgcolor: '#ffffff' }}>
          <Typography color='textSecondary' variant='h6'>
            No Available Records
          </Typography>
        </Box>
      ) : null}
      {
        tasksArr?.map((data, idx) =>{
          return (
            <Box mb={5} key={`routine_tasks_${idx}`}>
              <RoutineTable
                data={data}
                loading={false}
              />
            </Box>
          )
        })
      }
    </Box>
  );
};

export default RoutineList;
