import { Box } from "@mui/material"
import ButtonBack from "../../modules/common/ButtonBack"
import { To } from "react-router-dom"
import MaintenanceCreateEdit from "../../modules/maintanance/schedule/MaintenanceCreateEdit"


const MaintenanceCreate = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Box>
        <MaintenanceCreateEdit />
      </Box>
    </Box>
  )
}

export default MaintenanceCreate