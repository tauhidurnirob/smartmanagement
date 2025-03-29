import { IAuditFormTemplate } from '../types/audit'

export default function getAuditFormTemplateName(formTemplate: IAuditFormTemplate) {
  const formTypeNumber = formTemplate?.formType?.name

  if (!formTemplate) return null
  return `[${
    typeof formTypeNumber !== 'undefined' ? formTypeNumber.toString().padStart(2, '0') : '-'
  }] ${formTemplate.name || '-'}`
}
