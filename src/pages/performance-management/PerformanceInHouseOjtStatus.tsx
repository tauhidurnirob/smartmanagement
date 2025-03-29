import { Box } from "@mui/material"
import ButtonBack from "../../modules/common/ButtonBack"
import { To } from "react-router-dom"
import PerformanceOjtTrainingChart from "../../modules/performance-management/in-house-training/PerformanceOjtTrainingChart"
import PerformanceOjtTrainingStatusList from "../../modules/performance-management/in-house-training/PerformanceOjtTrainingStatusList"


const PerformanceInHouseOjtStatus = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To}/>
      <PerformanceOjtTrainingChart />
      <PerformanceOjtTrainingStatusList />
    </Box>
  )
}

export default PerformanceInHouseOjtStatus