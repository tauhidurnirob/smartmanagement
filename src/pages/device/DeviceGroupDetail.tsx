import { useMemo,useEffect,useState } from 'react'
import { To, useParams } from 'react-router'
import { Box, Typography, Card, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import DeviceGroupCreateEdit from '../../modules/device/DeviceGroupCreateEdit'
import ButtonBack from '../../modules/common/ButtonBack'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'

const DeviceGroupDetail = () => {
  const { id: groupId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isDeletable, setDeletable] = useState(false);
  
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceGroup.deleteDeviceGroup)) {
      setDeletable(true)
    }
  }, [])
  const { data: deviceGroup, isFetching: isLoading } = Api.useGetDeviceGroupByIdQuery(
    Number(groupId)
  )
  const [batchDeleteDeviceGroups, { isLoading: isDeleting }] =
    Api.useBatchDeleteDeviceGroupsMutation()

  const { groupName, strUpdatedAt, strCreatedAt } = useMemo(() => {
    const updatedAt = deviceGroup?.updatedAt
    const createdAt = deviceGroup?.createdAt
    const groupName = deviceGroup?.groupName

    const strUpdatedAt = updatedAt ? dayjs(updatedAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
    const strCreatedAt = createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'

    return { strUpdatedAt, strCreatedAt, groupName }
  }, [deviceGroup])

  const handleDeleteGroup = () => {
    if(isDeletable){
      batchDeleteDeviceGroups([Number(groupId)])
      .unwrap()
      .then(() => {
        toast.success('Deleted the device group')
        navigate('/device/group')
      })
      .catch((err) => {
        console.error('Failed to delete the device group: ', err)
        toast.error('Failed to delete the device group')
      })
    }else{
      toast.error('You do not have access to delete!')
    } 
    
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={4}>
        Group Details
      </Typography>
      {isLoading ? (
        <Card sx={{ mt: 2.25, py: 3.5, px: 3.75 }}>
          <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }}>
            <BackDrop size='20px' />
          </Box>
        </Card>
      ) : (
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
                  {groupName || '-'}
                </Typography>
                <Stack sx={{ display: 'flex', gap: 1, mt: 1, flexDirection: 'row' }}>
                  <Typography variant='h5' color='grey.400' sx={{ minWidth: '6rem' }}>
                    Created On:
                  </Typography>
                  <Typography variant='h5' color='grey.800'>
                    {strCreatedAt}
                  </Typography>
                </Stack>
                <Stack sx={{ display: 'flex', gap: 1, mt: 1, flexDirection: 'row' }}>
                  <Typography variant='h5' color='grey.400' sx={{ minWidth: '6rem' }}>
                    Updated On:
                  </Typography>
                  <Typography variant='h5' color='grey.800'>
                    {strUpdatedAt}
                  </Typography>
                </Stack>
              </Box>
              <Box display={'flex'} gap={2} sx={{ py: 0 }}>
                <LoadingButton
                  variant='contained'
                  color='error'
                  sx={{ px: 2.5, py: 1.5, lineHeight: 1 }}
                  loading={isDeleting}
                  onClick={() => handleDeleteGroup()}
                >
                  Delete Group
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
          <Box sx={{ mt: 2.5 }}>
            <DeviceGroupCreateEdit deviceGroup={deviceGroup} />
          </Box>
        </>
      )}
    </Box>
  )
}

export default DeviceGroupDetail
