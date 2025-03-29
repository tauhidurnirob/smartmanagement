import { IField } from '../modules/audit/audit-form-template/form-builder/FormBuilder'
import { AUDIT_STATES, FORM_FIELD_TYPE } from './constants'

export const titleCase = (string: string) => {
  if (!string) return
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

export const createArrayByLength = (length: number) => {
  const newArr = []
  for (let i = 0; i < length; i++) {
    newArr.push(i)
  }
  return newArr
}

export const getAuditStatusLabelByValue = (value: number) => {
  const status = AUDIT_STATES.find((i) => i.value === value)

  return status ? status.label : 'None'
}

export const flatToTreeJSON = (fields: IField[]) => {
  const fieldMap: any[] = []
  fields?.forEach((field) => fieldMap.push(field))
  fields?.forEach((field) => {
    if (field.parent) {
      const parent = fieldMap.find((a) => a.id === field.parent)
      if (parent) {
        ;(parent.children = parent.children || []).push(field)
      }
    }
  })
  return fields?.filter((field) => {
    return !field.parent
  })
}

export const treeToFlatJSON = (tree: IField[]) => {
  const flatArray: IField[] = []

  const traverseTree = (node: IField) => {
    flatArray.push({ ...node, children: undefined })
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverseTree)
    }
  }

  tree.forEach(traverseTree)

  return flatArray
}

export const auditFormTemplateFieldValidate = (element: Partial<IField>) => {
  if(element.type !== FORM_FIELD_TYPE.ROW &&
    element.type !== FORM_FIELD_TYPE.COLUMN &&
    element.type !== FORM_FIELD_TYPE.RATING &&
    element.fieldName?.toLowerCase() !== 'location' &&
    element.fieldName?.toLowerCase() !== 'remarks' &&
    element.fieldName?.toLowerCase() !== 'audit number'
  ) return true

  return false
}