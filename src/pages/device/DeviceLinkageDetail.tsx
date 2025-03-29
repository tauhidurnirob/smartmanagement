import { useMemo } from 'react'
import { To, useParams } from 'react-router'
import { Box, Typography, Card, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import ButtonBack from '../../modules/common/ButtonBack'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import DeviceLinkageCreateEdit from '../../modules/device/DeviceLinkageCreateEdit'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import { LoadingButton } from '@mui/lab'

const DeviceLinkageDetail = () => {
  const { id: linkageId } = useParams()

  const navigate = useNavigate()

  const { data: deviceLinkage, isFetching: isLoading } = Api.useGetDeviceLinkageByIdQuery(
    Number(linkageId)
  )
  const [batchDeleteDeviceLinkages, { isLoading: isDeleting }] =
    Api.useBatchDeleteDeviceLinkagesMutation()

  const { linkageName, strCreatedAt } = useMemo(() => {
    const createdAt = deviceLinkage?.createdAt
    const linkageName = deviceLinkage?.linkageName

    const strCreatedAt = createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'

    return { strCreatedAt, linkageName }
  }, [deviceLinkage])

  const handleDeleteLinkage = () => {
    batchDeleteDeviceLinkages([Number(linkageId)])
      .unwrap()
      .then(() => {
        toast.success('Deleted the device linkage')
        navigate('/device/linkage')
      })
      .catch((err) => {
        console.error('Failed to delete the device linkage: ', err)
        toast.error('Failed to delete the device linkage')
      })
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={4}>
        Scene Details
      </Typography>
      {isLoading ? (
        <Card sx={{ display: 'flex', justifyContent: 'center', mt: 2.25, py: 3.5, px: 3.75 }}>
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
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
                  {linkageName || '-'}
                </Typography>
                <Stack sx={{ display: 'flex', gap: 1, mt: 2, flexDirection: 'row' }}>
                  <Typography variant='h5' color='grey.400' sx={{ minWidth: '6rem' }}>
                    Created On:
                  </Typography>
                  <Typography variant='h5' color='grey.800'>
                    {strCreatedAt}
                  </Typography>
                </Stack>
              </Box>
              <Box display={'flex'} gap={2} sx={{ py: 0 }}>
                <LoadingButton
                  variant='contained'
                  color='error'
                  sx={{ px: 2.5, py: 1.5, lineHeight: 1 }}
                  onClick={() => handleDeleteLinkage()}
                  loading={isDeleting}
                >
                  Delete Linkage
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
          <Box sx={{ mt: 2.5 }}>
            <DeviceLinkageCreateEdit deviceLinkage={deviceLinkage} />{' '}
          </Box>
        </>
      )}
    </Box>
  )
}

export default DeviceLinkageDetail
