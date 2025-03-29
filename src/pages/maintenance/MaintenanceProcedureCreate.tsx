import { Box } from "@mui/material"
import MaintenanceProcedureCreateEdit from "../../modules/maintanance/procedures/MaintenanceProcedureCreateEdit"
import ButtonBack from "../../modules/common/ButtonBack"
import { To } from "react-router-dom"


const MaintenanceProcedureCreate = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <MaintenanceProcedureCreateEdit />
    </Box>
  )
}

export default MaintenanceProcedureCreate