import { useState, useEffect } from 'react'
import { To, } from 'react-router'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Card, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import ButtonBack from '../../modules/common/ButtonBack'
import BackDrop from '../../modules/common/BackDrop'
import DeleteDialog from '../../modules/common/DeleteDialog'
import PerformanceAdHocTaskCreateEdit from "../../modules/performance-management/task-allocation/PerformanceAdHocTaskCreateEdit"
import Api from '../../api'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../constants/common'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'

const PerformanceTaskAllocationAdHocTaskDetail = () => {
  const [openDeleteTask, setDeleteTask] = useState<boolean>(false)

  const [deleteTask, { isLoading: isLoadingDelete }] = Api.useDeleteTaskMutation()

  const navigate = useNavigate()

  const { id } = useParams()
  const isEdit = !!id


  const { data, isLoading } = Api.useGetTaskByIdQuery(
    { taskId: Number(id) },
    {
      skip: !isEdit,
    }
  )
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAdHocTask)) {
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
      toast.error('You do not have permission to delete!')
    }
   
  }

  const handleDeleteAdHocTask = () => {
    setDeleteTask(false)  
    deleteTask(Number(id)).then(() => {
      toast.success('Task has been deleted successfully')
      navigate('/performance-management/task-allocation/ad-hoc-task')
    })
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={4.75} ml={2.75}>
        Task Details
      </Typography>
      {isLoading ? (
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
          <Box sx={{ mt: 2.5 }}>
            <PerformanceAdHocTaskCreateEdit data={data} />
          </Box>
        </>
      )}
      <DeleteDialog
        open={openDeleteTask}
        onClose={() => setDeleteTask(false)}
        heading={'Are you sure you want to delete this Task?'}
        onDelete={() => handleDeleteAdHocTask()}
        onGoBack={() => setDeleteTask(false)}
        loading={isLoadingDelete}
      />
    </Box>
  )
}

export default PerformanceTaskAllocationAdHocTaskDetail