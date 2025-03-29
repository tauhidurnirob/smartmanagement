import { Box, Typography, Button, Stack } from '@mui/material'

import { Schedule } from '../../assets/icons/schedule'
import AuditScheduleList from '../../modules/audit/audit-schedule/AuditScheduleList'
import { useNavigate } from 'react-router'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import Api from '../../api'
import DeleteDialog from '../../modules/common/DeleteDialog'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
const AuditSchedule = () => {
  const navigate = useNavigate()

  const handleAdd = () => {
    if(isCreatable){
      navigate('/audit/schedule/create')
    }else{
      toast.error('You do not have access to create!')
    }
   
  }
  const [selected, setSelected] = useState<number[]>([])
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)

  const [deleteSchedules, { isLoading }] = Api.useDeleteMultipleAuditScheduleMutation()

  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.schedule.viewTasksForCleaner)) {
      setIsVisible(true);
    }else{
      setIsVisible(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.schedule.deleteTasksForCleaner)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.schedule.createTasksForCleaner)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  }, []);
  const [isVisible, setIsVisible] = useState(true);
  const [isDeletable, setIsDeletable] = useState(true);
  const [isCreatable, setIsCreatable] = useState(true);
  const handleDelete = () => {
    if(isDeletable){
      try {
        deleteSchedules(selected)
          .unwrap()
          .then((res) => {
            toast.success(`Successfully deleted`)
          })
          .catch((err) => {
            console.log('Failed to delete ', err)
            toast.error('Failed to delete')
          })
          .finally(() => {
            setSelected([])
            setDeleteDialog(false)
          })
      } catch (err: any) {
        console.error(err)
      }
    }else{
      toast.error('You do not have access to delete!')
    }
  
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography typography={'h3'}>Schedule</Typography>
        <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap'>
          {selected.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setDeleteDialog(true)}>
              Delete Selected
            </Button>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            onClick={handleAdd}
          >
            <Schedule sx={{ color: '#4DBFFF', fontSize: 19, mr: 1.25 }} />
            Add New Schedule
          </Button>
        </Stack>
      </Box>
      <Box mt={4}>
        <AuditScheduleList onChangeSelected={setSelected} />
      </Box>
      <DeleteDialog
        heading='Are you sure you want to delete?'
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        loading={isLoading}
        onGoBack={() => setDeleteDialog(false)}
        onDelete={handleDelete}
      />
    </Box>
  )
}

export default AuditSchedule
