import { Box } from "@mui/material"
import ButtonBack from "../../modules/common/ButtonBack"
import { To } from "react-router-dom"
import PerformanceOverviewTaskDetails from "../../modules/performance-management/overview/PerformanceOverviewTaskDetails"


const PerformanceOverviewTaskDetailsPage = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <PerformanceOverviewTaskDetails />
    </Box>
  )
}

export default PerformanceOverviewTaskDetailsPage