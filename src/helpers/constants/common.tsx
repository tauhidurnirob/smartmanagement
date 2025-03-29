import { EIncidentTypeTimeUnit, IDeviceType } from '../../api/models'
import { ArchiveIcon } from '../../assets/icons/archive'
import { InboxIcon } from '../../assets/icons/inbox'
import { SentIcon } from '../../assets/icons/sent'
import { ISelectItem, ISelectItemWithColor, ITypeItemWithColor } from '../../types/common'
import { IFeedbackInboxTab } from '../../types/feedback'

export const MAX_FILE_SIZES = 5 * 1024 * 1024
export const ROW_PER_PAGE_OPTIONS = [10, 20, 30] as Array<number>
export const INITIAL_PAGE_NUMBER = 1
export const GOOGLE_MAP_API = import.meta.env.VITE_APP_GOOGLE_MAP_API
export const EXCEL_FILE_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

export const ROUTES = {
  login: '/login',
  audit: {
    root: '/audit',
  },
  dashboard: '/dashboard',
  error403: '/error/403',
  error404: '/error/404',
  error500: '/error/500',
}

export const WEEK_DATE_LIST: ISelectItem[] = [
  { label: 'Mon', value: 0 },
  { label: 'Tue', value: 1 },
  { label: 'Wed', value: 2 },
  { label: 'Thu', value: 3 },
  { label: 'Fri', value: 4 },
  { label: 'Sat', value: 5 },
  { label: 'Sun', value: 6 },
]

export const WEEK_DATE_LIST_STRING: ISelectItem[] = [
  { label: 'Mon', value: 'mon' },
  { label: 'Tue', value: 'tue' },
  { label: 'Wed', value: 'wed' },
  { label: 'Thu', value: 'thu' },
  { label: 'Fri', value: 'fri' },
  { label: 'Sat', value: 'sat' },
  { label: 'Sun', value: 'sun' },
]
export const WEEK_FULL_DATE_LIST_STRING: ISelectItem[] = [
  { label: 'Monday', value: 'mon' },
  { label: 'Tueday', value: 'tue' },
  { label: 'Wednesday', value: 'wed' },
  { label: 'Thursday', value: 'thu' },
  { label: 'Friday', value: 'fri' },
  { label: 'Saturday', value: 'sat' },
  { label: 'Sunday', value: 'sun' },
]

export const WEEK_FULL_DATE_LIST_NUMBEWR: ISelectItem[] = [
  { label: 'Monday', value: 1 },
  { label: 'Tueday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 0 },
]

export const TIME_UNIT = [
  { label: 'Hours', value: 'hours' },
  { label: 'Minutes', value: 'minutes' },
  { label: 'Seconds', value: 'seconds' },
]

export const TIME_OPTIONS = [
  { label: '5 mins', value: '5 mins' },
  { label: '10 mins', value: '10 mins' },
  { label: '20 mins', value: '20 mins' },
  { label: '30 mins', value: '30 mins' },
  { label: '1 hour', value: '1 hour' },
]

export type CHIP_TYPES = 'success' | 'error' | 'warning' | 'grey' | 'info' | 'default'

export const AUDIT_PASSED_THRESHOLDER = 70

export const AUDIT_STATES: ISelectItem[] = [
  { label: 'Passed Audit', value: 0 },
  { label: 'Overall Failure', value: 1 },
  { label: 'IU Failure', value: 2 }
]
export const AUDIT_STATES_AVG: ISelectItem[] = [
  { label: 'Average Passed', value: 0 },
  { label: 'Average Failed', value: 1 }
]

export enum AUDIT_TABLE_PROCESSED {
  restored = 0,
  deleted = 1,
}

export const AUDIT_SCHEDULE_FREQUENCYS: ISelectItem[] = [
  { label: 'All Frequencies', value: '' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Half Yearly', value: 'half-yearly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Specific Date', value: 'specific-date' },
]

export const AUDIT_SETTING_TIMEFRAMES: ISelectItem[] = [
  { label: '7 Days', value: '7-days' },
  { label: '14 Days', value: '14-days' },
  { label: '1 Month', value: '1-month' },
  { label: '3 Months', value: '3 Months' },
  { label: '6 Months', value: '6-months' },
  { label: '1 Year', value: '1-year' },
]

export const AUDIT_REPORT_TIMEFRAMES: ISelectItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]

export const mapCenter = {
  lat: 1.364987218529369,
  lng: 103.79966656591233,
}

// Audit Form Template
export const FORM_FIELD_TYPE = {
  TEXT: 'text',
  PARAGRAPH: 'paragraph',
  SHORT_DESCRIPTION: 'short-description',
  LONG_DESCRIPTION: 'long-description',
  DROPDOWN: 'dropdown',
  SINGLE_CHOISE: 'single-choise',
  MULTIPLE_CHOISE: 'multiple-choise',
  BUTTON: 'button',
  DIVIDER: 'divider',
  FULL_NAME: 'full-name',
  EMAIL: 'email',
  CONTACT_NUMBER: 'contact-number',
  ADDRESS: 'address',
  UPLOAD_FILE: 'upload-file',
  UPLOAD_IMAGE: 'upload-image',
  UPLOAD_VIDEO: 'upload-video',
  DATE_PICKER: 'date-picker',
  SCALE: 'scale',
  RATING: 'rating',
  SIGNATURE: 'signature',
  ROW: 'row',
  COLUMN: 'column',
}

// Audit Rating Style
export const AUDIT_RATING_STYLES: ISelectItem[] = [
  { label: 'Number', value: 0 },
  { label: 'Text', value: 1 },
  { label: 'Emoji', value: 2 },
]

// Incident Status
export enum EIncidentMediaType {
  Image = 'image',
  Video = 'video',
}

export enum EIncidentStatus {
  PendingAcknowledgement = 'pending-acknowledgement',
  InProgress = 'in-progress',
  Overdue = 'overdue',
  Closed = 'closed',
}

export const INCIDENT_COMMAND_LIST: ISelectItem[] = [
  {
    label: 'Acknowledge',
    value: 0,
  },
  { label: 'Complete', value: 1 },
]

export const INCIDENT_STATUS_LIST: ITypeItemWithColor[] = [
  {
    label: 'Pending Acknowledge',
    value: EIncidentStatus.PendingAcknowledgement,
    chipType: 'success',
  },
  { label: 'In Progress', value: EIncidentStatus.InProgress, chipType: 'warning' },
  { label: 'Overdue', value: EIncidentStatus.Overdue, chipType: 'error' },
  { label: 'Closed', value: EIncidentStatus.Closed, chipType: 'grey' },
]

// Incident Event Type
export enum EIncidentEventType {
  Trigger = 'trigger',
  Assign = 'assign',
  Status = 'status',
  Comment = 'comment',
  Complete = 'complete',
  Remove = 'remove',
}

export const INCIDENT_EVENT_TYPE_LIST: ISelectItem[] = [
  { label: 'Triggered', value: EIncidentEventType.Trigger },
  { label: 'Assigned', value: EIncidentEventType.Assign },
  { label: 'Status', value: EIncidentEventType.Status },
  { label: 'Commentted', value: EIncidentEventType.Comment },
  { label: 'Removed', value: EIncidentEventType.Remove },
  { label: 'Completed', value: EIncidentEventType.Complete },
]

// Incident Report Type
export const INCIDENT_REPORT_TYPE_LIST: ISelectItem[] = [
  { label: 'Event Overdue', value: 'event_overdue' },
  { label: 'Event Open', value: 'event_open' },
  { label: 'Event Closed', value: 'event_closed' },
]

// Incident Time Unit
export const INCIDENT_TIME_UNIT_LIST: ISelectItem[] = [
  { label: 'Minutes', value: EIncidentTypeTimeUnit.Minutes },
  { label: 'Hours', value: EIncidentTypeTimeUnit.Hours },
  { label: 'Days', value: EIncidentTypeTimeUnit.Days },
  { label: 'Years', value: EIncidentTypeTimeUnit.Years },
]

// Incident Time Init Value
export const INCIDENT_TIME_INIT_VALUE = { value: '', unit: INCIDENT_TIME_UNIT_LIST[0] }

// Dummy Data
export const tmpAuditOptions: ISelectItem[] = [
  { label: 'Audit 1', value: 1 },
  { label: 'Audit 2', value: 2 },
  { label: 'Audit 3', value: 3 },
  { label: 'Audit 4', value: 4 },
  { label: 'Audit 5', value: 5 },
  { label: 'Audit 6', value: 6 },
  { label: 'Audit 7', value: 7 },
  { label: 'Audit 8', value: 8 },
  { label: 'Audit 9', value: 9 },
]

// Maintenance

export const MAINTENANCE_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Pending Acknowledge', value: 'pending-acknowledge', chipType: 'success' },
  { label: 'In Progress', value: 'in-progress', chipType: 'warning' },
  { label: 'Overdue', value: 'overdue', chipType: 'error' },
  { label: 'Closed', value: 'closed', chipType: 'grey' },
]
export const MAINTENANCE_SCHEDULE_FREQUENCYS: ISelectItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Half Yearly', value: 'half-yearly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'One Time Maintenance', value: 'one-time-maintenance' },
]

export const MONTHS: ISelectItem[] = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

export const MAINTENANCE_REPORT_TYPE_LIST: ISelectItem[] = [
  { label: 'Failed Maintenance', value: 'failed_maintenance' },
  { label: 'Robot Maintenance', value: 'robot_maintenance' },
  { label: 'Sensor Maintenance', value: 'sensor_maintenance' },
  { label: 'Non IoT Maintenance', value: 'non_iot_maintenance' },
]

export const DOWNLOAD_FILE_TYPES = [
  { label: 'PDF', value: 'pdf' },
  { label: 'Excel', value: 'excel' },
]

// Washroom
export const WASHROOM_STATUS_LIST: ISelectItemWithColor[] = [
  { label: 'High', value: 'high', color: 'error.main' },
  { label: 'Medium', value: 'medium', color: 'yellow.main' },
  { label: 'Normal', value: 'normal', color: '#181C32' },
]

// Washroom Report Type
export const WASHROOM_REPORT_TYPE_LIST: ISelectItem[] = [
  { label: 'Ammonia Rating', value: 'ammonia_rating' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Towel Dispenser', value: 'towel_dispenser' },
  { label: 'Smoke Sensor', value: 'smoke_sensor' },
  { label: 'Emergency Button', value: 'emergency_button' },
  { label: 'Wet Floor Sensor', value: 'wet_floor_sensor' },
  { label: 'Smart Bin', value: 'smart_bin' },
  { label: 'Occupancy Sensor', value: 'occupancy_sensor' },
]

// Feedback

export const FEEDBACK_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Pending Acknowledgement', value: 'pending-acknowledgement', chipType: 'success' },
  { label: 'In Progress', value: 'in-progress', chipType: 'warning' },
  { label: 'Overdue', value: 'overdue', chipType: 'error' },
  { label: 'Closed', value: 'closed', chipType: 'grey' },
]

export const FEEDBACK_TYPE_LIST: ISelectItem[] = [
  { label: 'Complaint', value: 'complaint' },
  { label: 'Rating', value: 'rating' },
  { label: 'Compliment', value: 'compliment' },
  { label: 'Suggestion', value: 'suggestion' },
]

export const FEEDBACK_INBOX_TABS: IFeedbackInboxTab[] = [
  { label: 'Inbox', value: 'inbox', icon: InboxIcon },
  { label: 'Sent', value: 'sent', icon: SentIcon },
  { label: 'Archive', value: 'archive', icon: ArchiveIcon },
]
export const FEEDBACK_INBOX_STATUS_LIST: ISelectItem[] = [
  { label: 'Read', value: 'read' },
  { label: 'Unread', value: 'unread' },
]
export const FEEDBACK_REPORT_TYPE_TYPE_LIST: ISelectItem[] = [
  { label: 'Complaint', value: 'complaint' },
  { label: 'Compliment', value: 'compliment' },
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Others', value: 'others' },
]

// Device type list
export const DEVICE_TYPE_LIST: IDeviceType[] = [
  { id: 1, deviceType: 'Ammonia Sensor' } as IDeviceType,
  { id: 2, deviceType: 'People counting' } as IDeviceType,
  { id: 3, deviceType: 'Paper Towel Dispenser' } as IDeviceType,
  { id: 4, deviceType: 'Smoke Sensor' } as IDeviceType,
  { id: 5, deviceType: 'Emergency Button' } as IDeviceType,
  { id: 6, deviceType: 'Wet Floor Sensor' } as IDeviceType,
  { id: 7, deviceType: 'Smart Bin' } as IDeviceType,
  { id: 8, deviceType: 'Occupancy Sensor' } as IDeviceType,
  { id: 9, deviceType: 'Cleaning' } as IDeviceType,
  { id: 10, deviceType: 'RFID' } as IDeviceType,
  { id: 11, deviceType: 'Door Controller' } as IDeviceType,
  { id: 12, deviceType: 'Light' } as IDeviceType,
  { id: 13, deviceType: 'Motion' } as IDeviceType,
  { id: 14, deviceType: 'Humidity' } as IDeviceType,
  { id: 15, deviceType: 'AirCon' } as IDeviceType,
  { id: 16, deviceType: 'Door' } as IDeviceType,
]

// Sensor Frequency list
export const SENSOR_FREQUENCY_LIST: ISelectItem[] = [
  { label: '1 hours', value: '1 hours' },
  { label: '3 hours', value: '3 hours' },
  { label: '6 hours', value: '6 hours' },
  { label: '12 hours', value: '12 hours' },
  { label: 'Daily', value: 'Daily' },
]

// Device Status List
export enum EDeviceStatus {
  Online = 'online',
  Offline = 'offline',
  BatteryLow = 'battery-low',
  Error = 'error',
}

export const DEVICE_STATUS_LIST: ISelectItemWithColor[] = [
  { label: 'Online', value: EDeviceStatus.Online, color: 'success.main', chipType: 'success' },
  { label: 'Offline', value: EDeviceStatus.Offline, color: 'grey.700', chipType: 'grey' },
  {
    label: 'Battery Low',
    value: EDeviceStatus.BatteryLow,
    color: 'yellow.main',
    chipType: 'warning',
  },
  { label: 'Error', value: EDeviceStatus.Error, color: 'error.main', chipType: 'error' },
]

// Device Control Create Status
export enum EDeviceControlAction {
  On = 'on',
  Off = 'off',
}

// Device Battery Status List
export const DEVICE_BATTERY_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Normal', value: 'normal', chipType: 'success' },
  { label: 'Warning', value: 'warning', chipType: 'warning' },
  { label: 'Error', value: 'error', chipType: 'error' },
]

// Device Floor Map
export enum EDeviceMapType {
  OnlyView,
  EditableUnitNodes,
  AddableDevice,
  EditableDevice,
}

export enum EDeviceLinkageControlType {
  On = 'on',
  Off = 'off',
}

export enum EDeviceLinkageType {
  If = 'if',
  Then = 'then',
}

export const DEVICE_LINKAGE_CONDITION_STATUS_LIST: ISelectItem[] = [
  { label: 'On', value: EDeviceLinkageControlType.On },
  { label: 'Off', value: EDeviceLinkageControlType.Off },
]

export const DEVICE_SCHEDULE_STATUS_LIST: ISelectItem[] = [
  { label: 'On', value: 'on' },
  { label: 'Off', value: 'off' },
]

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const DEVICE_SCHEDULE_FREQUENCYS: ISelectItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'One Time Schedule', value: 'one-time-schedule' },
]

export const DASHBOARD_CALENDAR_TYPES: ISelectItem[] = [
  { label: 'Day', value: 'timeGridDay' },
  { label: 'Week', value: 'timeGridWeek' },
  { label: 'Month', value: 'dayGridMonth' },
  { label: 'Year', value: 'multiMonthYear' },
]

export const DASHBOARD_CALENDAR_EVENT_TYPES: ISelectItemWithColor[] = [
  { label: 'Task Management', value: 'taskManagement', color: 'primary.main' },
  { label: 'Maintenance', value: 'maintenance', color: 'yellow.main' },
  { label: 'Audit', value: 'audit', color: 'success.main' },
  { label: 'Device', value: 'device', color: 'error.main' },
]

export const REPORT_TYPE_LIST: ISelectItem[] = [
  { label: 'Audit Report', value: 0 },
  { label: 'Device IoT Report', value: 1 },
  { label: 'Maintenance Report', value: 2 },
  { label: 'Incident Report', value: 3 },
  { label: 'Feedback Report', value: 4 },
]

export const PREDICTIVE_ANALYSIS_SETTING_TIMEFRAMES: ISelectItem[] = [
  { label: '7 Days', value: '7-days' },
  { label: '14 Days', value: '14-days' },
  { label: '1 Month', value: '1-month' },
  { label: '3 Months', value: '3-Months' },
  { label: '6 Months', value: '6-months' },
  { label: '1 Year', value: '1-year' },
]

// Task Completion
export const TASK_COMPLETION_TIMEFRAMES: ISelectItem[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]

// Task Staff Attendance
export const TASK_STAFF_ATTENDANCE_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Absent', value: 0, chipType: 'error' },
  { label: 'Present', value: 1, chipType: 'success' },
  { label: 'On Leave', value: 2, chipType: 'grey' },
]

// Task Staff Attendance
export const TASK_STAFF_OTJ_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Incomplete', value: 0, chipType: 'error' },
  { label: 'Complete', value: 1, chipType: 'success' },
]

// Task Staff Leave
export const TASK_STAFF_LEAVE_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Pending Approval', value: 0, chipType: 'success' },
  { label: 'Approved', value: 1, chipType: 'grey' },
  { label: 'Rejected', value: 2, chipType: 'error' },
]

export const LEAVE_CATEGORY_LIST: ISelectItem[] = [
  { label: 'Sick Leave', value: 'Sick Leave' },
  { label: 'Annual Leave', value: 'Annual Leave' },
  { label: 'Off-in-Lieu', value: 'Off-in-Lieu' },
  { label: 'Unpaid Leave', value: 'Unpaid Leave' },
]

export const LEAVE_TYPE_LIST: ISelectItem[] = [
  { label: 'Full-Day', value: 0 },
  { label: 'Half-Day (AM)', value: 1 },
  { label: 'Half-Day (PM)', value: 2 },
]

export const PERFORMANCE_OJT_TRAINING_STATUS: ITypeItemWithColor[] = [
  { label: 'Complete', value: 'Complete', chipType: 'success' },
  { label: 'Incomplete', value: 'Incomplete', chipType: 'error' },
]

export const PREMISE_CATEGORY_LIST: ISelectItem[] = [
  { label: 'Commercial Premises', value: 'commercial' },
  { label: 'Residential Estates & Amenities ', value: 'residential' },
  { label: 'Retail Food & Beverage (F&B) Establishments', value: 'retail' },
]

export const TASK_ACTIVITY_LIST: ISelectItem[] = [
  { label: 'Ad-Hoc - Urgent', value: 'urgent', id: 1, name: 'Ad-Hoc - Urgent' },
  // { label: 'Ad-Hoc - Routine ', value: 'routine' },
  { label: 'Ad-Hoc - Non Urgent', value: 'non-urgent', id: 2, name: 'Ad-Hoc - Non Urgent' },
]

export const RESPONSE_TIME_LIST: ISelectItem[] = [
  { label: 'Ad-Hoc - Urgent', value: 'Ad-Hoc - Urgent', id: 1, name: 'Ad-Hoc - Urgent' },
  // { label: 'Ad-Hoc - Routine ', value: 'routine' },
  { label: 'Ad-Hoc - Non Urgent', value: 'Ad-Hoc - Non Urgent', id: 2, name: 'Ad-Hoc - NonUrgent' },
]

export const TAST_LIST: ISelectItem[] = [
  { label: 'Pending', value: 0 },
  { label: 'Progress', value: 1 },
  { label: 'Closed', value: 2 },
  { label: 'Overdue', value: 3 },
  { label: 'Completed', value: 4 },
]

// Task Status
export const TASK_STATUS_LIST: ITypeItemWithColor[] = [
  { label: 'Pending Acknowledge', value: 0, chipType: 'warning' },
  { label: 'In Progress', value: 1, chipType: 'default' },
  { label: 'Overdue', value: 2, chipType: 'error' },
  { label: 'Closed', value: 3, chipType: 'grey' },
  { label: 'Completed', value: 4, chipType: 'success' },
]

export const DEVICE_TYPE_WITH_IMG: { label: string; url: string }[] = [
  { label: 'Ammonia Sensor', url: '/assets/images/devices/ammonia-sensor.png' },
  { label: 'Cleaning', url: '/assets/images/devices/robot.png' },
  { label: 'Air Refresher', url: '/assets/images/devices/india-air-refresher.png' },
  { label: 'Robot', url: '/assets/images/devices/robot.png' },
  { label: 'Air Blower', url: '/assets/images/devices/air-blower.png' },
  { label: 'Smart Bin (Motor)', url: '/assets/images/devices/soap-sensor.png' },
  { label: 'People Counter', url: '/assets/images/devices/people-counter.png' },
  { label: 'Soap sensor', url: '/assets/images/devices/soap-sensor.png' },
  {
    label: 'Paper Towel Dispenser',
    url: '/assets/images/devices/paper-towel-dispenser-jilian.png',
  },
  { label: 'Wet Detector', url: '/assets/images/devices/wet-detector.png' },
  { label: 'Smart Bin', url: '/assets/images/devices/smart-bin.png' },
  { label: 'Tissue Roll', url: '/assets/images/devices/tissue-roll.png' },
  { label: 'Cubicle Occupancy Monitor', url: '/assets/images/devices/c-occupancy-monitor.png' },
  { label: 'Soap Dispenser (JieLian)', url: '/assets/images/devices/soap-dispenser-jilian.png' },
  {
    label: 'Paper Towel Dispenser (JieLian)',
    url: '/assets/images/devices/paper-towel-dispenser-jilian.png',
  },
]
