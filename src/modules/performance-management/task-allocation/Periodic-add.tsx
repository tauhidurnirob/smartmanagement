import React, { useEffect, useState } from 'react'
import { Box, Card, Typography } from '@mui/material'
import ButtonBack from '../../../modules/common/ButtonBack'
import PerformancePeriodictaskTrainingCreateForm from '../../../modules/performance-management/in-house-training/PerformancePeriodicTrainingCreateForm'
import Api from '../../../api'
import { useNavigate, useParams } from 'react-router-dom'
import BackDrop from '../../common/BackDrop'
import { LoadingButton } from '@mui/lab'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../../constants/common'
import { toast } from 'react-toastify'
import DeleteDialog from '../../common/DeleteDialog'
import useAuth from '../../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
const RoutineCreateEdit: React.FC = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)
  const isEdit = !Number.isNaN(id)
  const [fetch, { data, isFetching }] = Api.useLazyGetTaskByIdQuery()

  const [openDeleteTask, setDeleteTask] = useState<boolean>(false)

  const [deleteTask, { isLoading: isLoadingDelete }] = Api.useDeleteTaskMutation()

  useEffect(() => {
    if (isEdit) {
      fetch({ taskId: Number(id) })
    }
  }, [])
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deletePeriodicTask)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);
  const handleDeleteTask = () => {
    if(isDeletable){
      setDeleteTask(true)
    }else{
      toast.error('You do not have access to delete!')
    }
  }

  const handleDeleteAdHocTask = () => {
    setDeleteTask(false)  
    deleteTask(id).then(() => {
      toast.success('Task has been deleted successfully')
      navigate('/performance-management/task-allocation/ad-hoc-task')
    })
  }

  return (
    <Box>
      {isFetching ? (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            py: 3.75,
            px: 4,
          }}
        >
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
          </Box>
        </Card>
      ) : (
        <>
          <ButtonBack to={'/performance-management/task-allocation/periodic-task'} />
          {
            isEdit &&
            <Card sx={{ mt: 3, pt: 3.75, pb: 3.75, pl: 4.375, pr: 4, display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h2' color='grey.800' mb={1}>
                    {data?.taskActivity?.[0]?.name}
                  </Typography>
                  <Typography variant='h5' color='grey.400'>
                    Date Time Created: <b>{dayjs(data?.createdAt).format(DATE_FORMAT)}</b>
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  height: '100%',
                  width: { lg: 'auto', xs: '100%' },
                }}
              >
                <Box sx={{}}>
                  <LoadingButton
                    variant='contained'
                    color='error'
                    sx={{ px: 2.5, py: 1.5, lineHeight: 1 }}
                    onClick={handleDeleteTask}
                    loading={isLoadingDelete}
                  >
                    Delete Task
                  </LoadingButton>
                </Box>
              </Box>
            </Card>
          }
          <PerformancePeriodictaskTrainingCreateForm task={data} />
          <DeleteDialog
            open={openDeleteTask}
            onClose={() => setDeleteTask(false)}
            heading={'Are you sure you want to delete this Task?'}
            onDelete={() => handleDeleteAdHocTask()}
            onGoBack={() => setDeleteTask(false)}
            loading={isLoadingDelete}
          />
        </>
      )}
    </Box>
  )
}

export default RoutineCreateEdit
