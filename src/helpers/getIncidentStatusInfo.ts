import { INCIDENT_STATUS_LIST } from './constants'

export default function getIncidentStatusInfo(status: string) {
  return INCIDENT_STATUS_LIST.find((s) => s.value === status)
}
