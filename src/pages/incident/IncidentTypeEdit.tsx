import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import IncidentTypeCreateEdit from '../../modules/incident/IncidentTypeCreateEdit'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'

const IncidentTypeEdit = () => {
  const { id } = useParams()

  const { data: incidentType, isFetching: isLoading } = Api.useGetIncidentTypeByIdQuery(Number(id))

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mt: 2 }}>
        <Box sx={{ position: 'relative', height: '30px' }}>
          <BackDrop size={30} />
        </Box>
      </Box>
    )
  }
  return <IncidentTypeCreateEdit incidentType={incidentType} />
}

export default IncidentTypeEdit
