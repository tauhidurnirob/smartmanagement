import { To, useParams } from 'react-router'
import { Box, Typography } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import DeviceControlDetailByLocation from '../../modules/device/DeviceControlDetailByLocation'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'

const DeviceControlDetail = () => {
  const { locationId } = useParams()

  const { data: location, isFetching: isLoading } = Api.useGetLocationByIdQuery(Number(locationId))

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mt: 4 }}>
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
          </Box>
        </Box>
      ) : (
        <>
          <Typography variant='h3' mt={4} mb={3.5}>
            {location?.name || '-'}
          </Typography>
          {typeof locationId === 'string' && (
            <DeviceControlDetailByLocation locationId={Number(locationId)} />
          )}
        </>
      )}
    </Box>
  )
}

export default DeviceControlDetail
