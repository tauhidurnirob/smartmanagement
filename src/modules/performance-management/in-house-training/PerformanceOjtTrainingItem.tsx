import { FC, useState, useEffect } from 'react'
import { Box, Typography, Card, Grid, IconButton, Stack } from '@mui/material'
import { EditPen } from '../../../assets/icons/edit-pen'
import { TrashFillIcon } from '../../../assets/icons/trash-fill'
import { ClockIcon } from '@mui/x-date-pickers'
import { IOtjOverviewRes } from '../../../types/performance-management'
import dayjs from 'dayjs'
import { OJT_CREATED_AT_FORMAT, ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
import Api from '../../../api'
import DeleteDialog from '../../common/DeleteDialog'
import { toast } from 'react-toastify'
import useAuth from '../../../hooks/useAuth'

interface IProps {
  item: IOtjOverviewRes
  editClicked: () => void
}

const PerformanceOjtTrainingItem: FC<IProps> = ({ item, editClicked }) => {
  const [deleteOjt, { isLoading }] = Api.useDeleteOtjMutation()
  const [deleteOn, setDeleteOn] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const { user } = useAuth(); 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.deleteOJT)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);

  const handleDelete = () => {
    if(isDeletable){
      setIsLoadingDelete(true)
      deleteOjt(item.id)
        .then((res) => {
          toast.success('OJT deleted')
        })
        .catch((err) => {
          console.log('Failed to delete a OJT:', err)
          toast.error('Failed to delete a OJT')
        })
        .finally(() => {
          setIsLoadingDelete(false)
        })
    }else{
      toast.error('You do not have access to create!')
    }
  }
  return (
    <Card sx={{ boxShadow: 'none', p: 0, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px dashed rgba(126, 130, 153, 0.5)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction={'row'}>
          <Box>
            <Typography typography={'h4'}>{item.ojtName}</Typography>
            <Typography typography={'h5'} sx={{ mt: 1, color: (theme) => theme.palette.grey[500] }}>
              {`Created At: ${
                item.createdAt ? dayjs(item.createdAt).format(OJT_CREATED_AT_FORMAT) : '-'
              }`}
            </Typography>
          </Box>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton
            color='error'
            disabled={isLoading}
            size='medium'
            onClick={() => setDeleteOn(true)}
          >
            <TrashFillIcon sx={{ fontSize: 28 }} color='error' />
          </IconButton>
          <IconButton size='medium' color='primary' onClick={editClicked}>
            <EditPen fontSize='large' />
          </IconButton>
        </Stack>
      </Box>
      <Box sx={{ py: 2.5, px: 2 }}>
        <Box>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>Project</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>{item.projectName || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>Location</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>{item.locationName || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>Assign Role</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>{item.roleName || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>SOP Training</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>{item.sopName || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
          {/* <Typography typography={'body1'}>{item.sop}</Typography> */}
          <Stack direction={'row'} alignItems={'center'} gap={0.25}>
            <ClockIcon fontSize='small' />
            <Typography color={'grey.800'}>{item.durationOfCompletion || '--'}</Typography>
          </Stack>
        </Stack>
      </Box>
      <DeleteDialog
        open={deleteOn}
        onClose={() => setDeleteOn(false)}
        heading={'Are you sure you want to delete this OJT?'}
        onDelete={() => {
          setDeleteOn(false)
          handleDelete()
        }}
        onGoBack={() => setDeleteOn(false)}
        loading={isLoadingDelete}
      />
    </Card>
  )
}

export default PerformanceOjtTrainingItem
