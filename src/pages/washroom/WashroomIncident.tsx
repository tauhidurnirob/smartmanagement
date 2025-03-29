import { Stack } from '@mui/material'

import TodayIncidents from '../../modules/incident/TodayIncidents'
import IncidentList from '../../modules/incident/IncidentList'

const WashroomIncident = () => {
  return (
    <Stack flexDirection={'column'}>
      <Stack>
        <TodayIncidents label='Today’s Washroom Incident' />
      </Stack>
      <Stack mt={4.5}>
        <IncidentList isWashroom={true} />
      </Stack>
    </Stack>
  )
}

export default WashroomIncident
