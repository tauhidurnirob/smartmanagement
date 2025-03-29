import { EIncidentStatus, INCIDENT_COMMAND_LIST } from './constants'

export default function getIncidentCommandInfoForStatus(status: string | null) {
  switch (status) {
    case EIncidentStatus.PendingAcknowledgement:
      return INCIDENT_COMMAND_LIST[0]

    case EIncidentStatus.InProgress:
    case EIncidentStatus.Overdue:
      return INCIDENT_COMMAND_LIST[1]

    default:
      return null
  }
}
