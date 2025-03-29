import { Stack } from '@mui/material'
import IncidentList from '../../modules/incident/IncidentList'
import TodayIncidents from '../../modules/incident/TodayIncidents'

const IncidentOverview = () => {
  return (
    <Stack flexDirection={'column'}>
      <Stack>
        <TodayIncidents />
      </Stack>
      <Stack mt={4.5}>
        <IncidentList />
      </Stack>
    </Stack>
  )
}

export default IncidentOverview
