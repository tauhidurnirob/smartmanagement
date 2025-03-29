import { Box, Card } from '@mui/material'
import PerformanceSopTrainingCreateEdit from '../../modules/performance-management/in-house-training/PerformanceSopTrainingCreateEdit'
import { useParams } from 'react-router-dom'
import BackDrop from '../../modules/common/BackDrop'
import Api from '../../api'

const PerformanceInHouseSopDetails = () => {
  const params = useParams()
  const id = Number(params.id)
  const { data, isFetching } = Api.useGetSopByIdQuery({ id })

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
        <PerformanceSopTrainingCreateEdit sop={data} />
      )}
    </Box>
  )
}

export default PerformanceInHouseSopDetails
