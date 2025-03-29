import { Box } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import ProjectTemplateFormula from '../../modules/audit/project-sites/ProjectTemplateFormula'
import ProjectFormulaGroupList from '../../modules/audit/project-sites/ProjectFormulaGroupList'

const AuditFormula = () => {
  return (
    <Box>
      <ButtonBack to={'/audit/project-site'} />
      <Box mt={3.75}>
        <ProjectFormulaGroupList />
      </Box>
    </Box>
  )
}

export default AuditFormula
