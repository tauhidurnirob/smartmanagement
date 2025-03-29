import { Box } from "@mui/material"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { tmpMaintenances } from "../../modules/maintanance/overview/dummy"
import MaintenanceScheduleDetails from "../../modules/maintanance/schedule/MaintenanceScheduleDetails"


const MaintenanceScheduleDetailPage = () => {
  const { id } = useParams()

  const maintenance = useMemo(() => {
    return tmpMaintenances.find((i) => i.id.toString() === id) || tmpMaintenances[0]
  }, [id])
  return (
    <Box>
      <MaintenanceScheduleDetails maintenance={maintenance} />
    </Box>
  )
}

export default MaintenanceScheduleDetailPage