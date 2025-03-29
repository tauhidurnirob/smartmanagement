import { Box } from "@mui/material"
import ProjectFormulaGroupAddEdit from "../../modules/audit/project-sites/ProjectFormulaGroupAddEdit"
import ButtonBack from "../../modules/common/ButtonBack"
import { To } from "react-router-dom"


const AuditFormulaCreate = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <ProjectFormulaGroupAddEdit />
    </Box>
  )
}

export default AuditFormulaCreate