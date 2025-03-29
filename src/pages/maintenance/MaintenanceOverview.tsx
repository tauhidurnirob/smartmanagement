import { Box, Stack, Typography } from "@mui/material"
import MaintenanceOverviewCard from "../../modules/maintanance/overview/MaintenanceOverviewCard"
import MaintenanceList from "../../modules/maintanance/overview/MaintenanceList"

const todayMaintanance = {
  sensors: 2,
  robots: 7,
  nonIot: 3
}
const tmrMaintanance = {
  sensors: 25,
  robots: 14,
  nonIot: 7
}

const MaintenanceOverview = () => {
  return (
    <Box>
      <Typography typography={'h3'} mb={3}>Overview</Typography>
      <Stack direction={'row'} justifyContent={'space-between'} gap={3} flexWrap={'wrap'} >
        <MaintenanceOverviewCard
          data={todayMaintanance}
          infoText={'Total maintenance today'}
        />
        <MaintenanceOverviewCard
          data={tmrMaintanance}
          infoText={'Total maintenance scheduled tomorrow'}
        />
      </Stack>
      <Box mt={3}>
        <MaintenanceList />
      </Box>
    </Box>
  )
}

export default MaintenanceOverview