import { IAudit } from '../types/audit'
import getAuditFormTemplateName from './getAuditFormTemplateName'

export default function getNameOfAssignmentByAudit(audit: IAudit) {
  const formTemplate = audit.formTemplate

  if (!formTemplate) return null
  return getAuditFormTemplateName(formTemplate)
}
