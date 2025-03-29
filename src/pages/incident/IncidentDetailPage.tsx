import { useParams } from 'react-router-dom'

import IncidentDetail from '../../modules/incident/IncidentDetail'
import Api from '../../api'

const IncidentDetailPage = () => {
  const { id } = useParams()

  const { data: incident } = Api.useGetIncidentByIdQuery(Number(id))

  return <IncidentDetail incident={incident} />
}

export default IncidentDetailPage
