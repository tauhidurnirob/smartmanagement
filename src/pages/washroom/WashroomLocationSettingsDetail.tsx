import { FC } from 'react'
import { useParams } from 'react-router-dom'

import LocationSettingsDetail from '../../modules/location/LocationSettingsDetail'

const WashroomLocationDetail: FC = () => {
  const { id } = useParams()

  return <LocationSettingsDetail locationId={Number(id)} />
}

export default WashroomLocationDetail
