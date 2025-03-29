import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { tmpMaintenances } from '../../modules/maintanance/overview/dummy'
import MaintenanceDetail from '../../modules/maintanance/overview/MaintenanceDetail'

const IncidentDetailPage = () => {
  const { id } = useParams()

  const maintenance = useMemo(() => {
    return tmpMaintenances.find((i) => i.id.toString() === id) || tmpMaintenances[0]
  }, [id])

  return <MaintenanceDetail maintenance={maintenance} />
}

export default IncidentDetailPage
