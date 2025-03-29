import { Box } from "@mui/material"
import MaintenanceProcedureCreateEdit from "../../modules/maintanance/procedures/MaintenanceProcedureCreateEdit"
import { To, useParams } from "react-router-dom"
import ButtonBack from "../../modules/common/ButtonBack"


const MaintenanceProcedureDetails = () => {
  const {id} = useParams()

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <MaintenanceProcedureCreateEdit procedureId={Number(id)} />
    </Box>
  )
}

export default MaintenanceProcedureDetails