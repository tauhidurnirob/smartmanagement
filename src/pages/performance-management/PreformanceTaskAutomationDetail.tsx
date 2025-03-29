import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AutomationTaskCreateDetail from '../../modules/performance-management/task-allocation/AutomationTaskCreateDetail'
import ButtonBack from '../../modules/common/ButtonBack'
import Api from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DeleteDialog from '../../modules/common/DeleteDialog'
import BackDrop from '../../modules/common/BackDrop'
import dayjs from 'dayjs'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'

const PreformanceAutomationDetail = () => {
  const location = useLocation()
  const id = location.state?.id ? location.state.id : location.search.split('=')[1]
  const { data, error, isLoading } = Api.useGetTaskByIdQuery({ taskId: id })
  const [deleteOn, setDeleteOn] = useState(false)
  const navigate = useNavigate()
  const [deleteTasks, { isLoading: isLoadingDelete }] = Api.useDeleteTaskMutation()

  const { user } = useAuth(); 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAutomationTask)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);
  const handleDelete = () => {
    if(isDeletable){
      setDeleteOn(true)
    }else{
      toast.error('You do not have access to delete!')
    }
  }
  return (
    <Box>
      {isLoading && <BackDrop />}
      <ButtonBack to={'/performance-management/task-allocation/automation-task'} />
      <Box sx={{ ml: 4 }}>
        <Stack justifyContent={'space-between'} direction='row' alignItems={'center'} mt={4}>
          <Typography variant='h3'>Task Details</Typography>
        </Stack>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            mt: 4,
          }}
        >
          <Box sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', p: 2 }}>
            <Typography variant='h3'>{data?.taskActivity?.[0]?.name  || '_'}</Typography>
            <Box sx={{ display: 'flex', mt: 1.5 }}>
              <div style={{ fontSize: 14, color: '#B5B5C3' }}>Date Time Created:</div> &nbsp; &nbsp;
              <Typography variant='h5'>
                {dayjs(data?.createdAt).format('MM/DD/YYYY [@] LTS')}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              variant='contained'
              color='error'
              style={{ fontSize: 15, fontWeight: 400, padding: '12px 20px 12px 20px' }}
              onClick={handleDelete}
            >
              Delete Task
            </Button>
          </Box>
        </Card>
        <AutomationTaskCreateDetail detail={true} schedule={data} />
      </Box>
      {/* <AddNewAutomationDeveiceFrom></AddNewAutomationDeveiceFrom> */}
      <DeleteDialog
        open={deleteOn}
        onClose={() => setDeleteOn(false)}
        heading={'Are you sure you want to delete this Automation Task?'}
        subHeading={''}
        onDelete={() => {
          setDeleteOn(false)
          deleteTasks(id).then(() => {
            toast.success('Schedule deleted successfully')
            navigate('/performance-management/task-allocation/automation-task')
          })
        }}
        onGoBack={() => setDeleteOn(false)}
        loading={isLoadingDelete}
      />
    </Box>
  )
}

export default PreformanceAutomationDetail
