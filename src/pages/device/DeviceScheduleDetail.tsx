import { useState,useEffect } from 'react'
import { To, useParams, useNavigate } from 'react-router'
import { Box, Button, Typography, Card, Stack } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import DeviceScheduleCreateEdit from '../../modules/device/DeviceScheduleCreateEdit'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../constants/common'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
const DeviceScheduleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isDeletable, setDeletable] = useState(false);

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.activationSchedule.deleteSchedule)) {
      setDeletable(true)
    }
  }, [])
  const {data, isLoading} = Api.useGetDeviceScheduleByIdQuery(Number(id))
  const [deleteSchedule, {isLoading: deleteLoading}] = Api.useDeleteDeviceScheduleByIdMutation()

  const [deleteScheduleId, setDeleteScheduleId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    deleteSchedule(id)
      .unwrap()
      .then(() => {
        toast.success('Device schedule has been deleted')
        setDeleteScheduleId(null)
        navigate('/device/activation-schedule')
      })
      .catch((err) => {
        console.log('Failed to delete device schedule: ', err)
        toast.error('Failed to delete device schedule')
      })
  }
  const checkDelete = (data : any) => {
    if(isDeletable){
      setDeleteScheduleId(data?.id)
    }else{
      toast.error('You do not have access to delete!')
    } 
  }
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={4}>
        Schedule Details
      </Typography>
      {
        isLoading &&
        <Box height={40}>
          <BackDrop size={30} />
        </Box>
      }
      {
        data &&
        <>
          <Card sx={{ mt: 2.25, py: 3.5, px: 3.75 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant='h4' sx={{ color: 'grey.800' }}>
                  {data.scheduleName || '-'}
                </Typography>
                <Stack sx={{ display: 'flex', gap: 1, mt: 2, flexDirection: 'row' }}>
                  <Typography variant='h5' color='grey.400'>
                    Created On:
                  </Typography>
                  <Typography variant='h5' color='grey.800'>
                    {dayjs(data.createdAt).format(DATE_FORMAT)}
                  </Typography>
                </Stack>
              </Box>
              <Box display={'flex'} gap={2} sx={{ py: 0 }}>
                <Button
                  variant='contained'
                  color='error'
                  sx={{ px: 2.5, py: 1.5, lineHeight: 1 }}
                  onClick={() => checkDelete(data?.id)}
                  disabled={!data}
                >
                  Delete shedule
                </Button>
              </Box>
            </Stack>
          </Card>
          <Box sx={{ mt: 2.5 }}>
            <DeviceScheduleCreateEdit deviceSchedule={data} />
          </Box>
          <DeleteDialog
            open={!!deleteScheduleId}
            onClose={() => setDeleteScheduleId(null)}
            heading={
              <span style={{ letterSpacing: '-0.055em' }}>
                Are you sure you want to delete the selected device schedule?
              </span>
            }
            subHeading={
              <span>
                This action cannot be undone, <br />
                so please be sure before proceeding.
              </span>
            }
            onDelete={() => handleDelete(data?.id as number)}
            onGoBack={() => setDeleteScheduleId(null)}
            loading={deleteLoading}
          />
        </>
      }
    </Box>
  )
}

export default DeviceScheduleDetail
