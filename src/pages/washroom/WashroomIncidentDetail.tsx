import { useParams } from 'react-router-dom'

import IncidentDetail from '../../modules/incident/IncidentDetail'

const WashroomIncidentDetail = () => {
  const { id } = useParams()

  return <IncidentDetail isWashroom={true} />
}

export default WashroomIncidentDetail
