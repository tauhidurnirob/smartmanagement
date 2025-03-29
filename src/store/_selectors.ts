/**
 *
 * Selectors for values in store
 *
 */
import { useSelector } from 'react-redux'
import { RootState } from './configureStore'
import { createSelector } from '@reduxjs/toolkit'

// Auth
export const _auth = (state: RootState) => state.auth
export const _user = createSelector(_auth, (auth) => auth.user)

// App
export const _app = (state: RootState) => state.app

// Audit
export const _auditOverviewState = (state: RootState) => state.auditOverview
export const _auditResultState = (state: RootState) => state.auditResult
export const _auditLogsState = (state: RootState) => state.auditLogs
export const _auditInsightState = (state: RootState) => state.auditInsight
export const _auditScheduleState = (state: RootState) => state.auditSchedule
export const _auditProjectSiteState = (state: RootState) => state.auditProjectSite
export const _auditFormTemplateState = (state: RootState) => state.auditFormTemplate
export const _auditLogsRecycleState = (state: RootState) => state.auditLogsRecycle
export const _auditScheduleRecycleState = (state: RootState) => state.auditScheduleRecycle
export const _auditProjectSiteRecycleState = (state: RootState) => state.auditProjectSiteRecycle
export const _auditFormTemplateRecycleState = (state: RootState) => state.auditFormTemplateRecycle
export const _auditProjectFormulaState = (state: RootState) => state.auditProjectFormula

// Feedback
export const _feedbackInboxState = (state: RootState) => state.feedbackInbox

// Hooks for selectors
export const _getAuth = () => useSelector(_auth)
export const _getUser = () => useSelector(_user)
export const _getAppState = () => useSelector(_app)

// Audit hooks
export const _getAuditOverviewState = () => useSelector(_auditOverviewState)
export const _getAuditResultState = () => useSelector(_auditResultState)
export const _getAuditLogsState = () => useSelector(_auditLogsState)
export const _getAuditInsightState = () => useSelector(_auditInsightState)
export const _getAuditScheduleState = () => useSelector(_auditScheduleState)
export const _getAuditProjectSiteState = () => useSelector(_auditProjectSiteState)
export const _getAuditFormTemplateState = () => useSelector(_auditFormTemplateState)
export const _getAuditLogsRecycleState = () => useSelector(_auditLogsRecycleState)
export const _getAuditScheduleRecycleState = () => useSelector(_auditScheduleRecycleState)
export const _getAuditProjectSiteRecycleState = () => useSelector(_auditProjectSiteRecycleState)
export const _getAuditFormTemplateRecycleState = () => useSelector(_auditFormTemplateRecycleState)
export const _getAuditProjectFormulaState = () => useSelector(_auditProjectFormulaState)

// Feedback hooks
export const _getFeedbackInboxState = () => useSelector(_feedbackInboxState)

// Settings
export const _settings = (state: RootState) => state.settings
export const _settingProjects = (state: RootState) => state.settings.project
export const _settingProjectLists = (state: RootState) => state.settings.project.list
export const _settingUsers = (state: RootState) => state.settings.settingUsersFilter

export const _getSettingProjects = () => useSelector(_settingProjectLists)
export const _getSettingUsers = () => useSelector(_settingUsers)

// Devices
export const _devices = (state: RootState) => state.devices
export const _deviceOverview = (state: RootState) => state.devices.overview
export const _deviceOverviewDeviceList = (state: RootState) => state.devices.overview.deviceList
export const _deviceControl = (state: RootState) => state.devices.control
export const _deviceControlList = (state: RootState) => state.devices.control.controlList
export const _deviceSwapDeviceList = (state: RootState) => state.devices.swap.deviceList
export const _deviceGroupList = (state: RootState) => state.devices.group.groupList
export const _deviceScheduleList = (state: RootState) => state.devices.schedule.scheduleList
export const _deviceLinkageList = (state: RootState) => state.devices.linkage.linkageList
export const _deviceLocationList = (state: RootState) => state.devices.location.locationList

export const _getDeviceOverviewDeviceList = () => useSelector(_deviceOverviewDeviceList)
export const _getDeviceControlList = () => useSelector(_deviceControlList)
export const _getDeviceSwapDeviceList = () => useSelector(_deviceSwapDeviceList)
export const _getDeviceGroupList = () => useSelector(_deviceGroupList)
export const _getDeviceScheduleList = () => useSelector(_deviceScheduleList)
export const _getDeviceLinkageList = () => useSelector(_deviceLinkageList)
export const _getDeviceLocationList = () => useSelector(_deviceLocationList)

// Incident
export const _incidents = (state: RootState) => state.incidents
export const _incidentTypeList = (state: RootState) => state.incidents.type.typeList
export const _incidentList = (state: RootState) => state.incidents.incident.incidentList
export const _incidentReport = (state: RootState) => state.incidents.report
export const _incidentReportFilters = (state: RootState) => state.incidents.report.filters
export const _incidentReportFileType = (state: RootState) => state.incidents.report.fileType

export const _getIncidentTypeList = () => useSelector(_incidentTypeList)
export const _getIncidentList = () => useSelector(_incidentList)
export const _getIncidentReportFilters = () => useSelector(_incidentReportFilters)
export const _getIncidentReportFileType = () => useSelector(_incidentReportFileType)

// Performance Management
export const _performanceManagements = (state: RootState) => state.performanceManagements
export const _taskListOverView = (state: RootState) => state.performanceManagements.taskListOverview.taskList
export const _taskAllocationSLAList = (state: RootState) =>
  state.performanceManagements.taskAllocation.slaList
export const _inHouseSopTrainingList = (state: RootState) =>
  state.performanceManagements.inHouseSopTraining
export const _inHouseOjtTrainingStatusList = (state: RootState) =>
  state.performanceManagements.inHouseOjtTrainingStatus
export const _staffFilter = (state: RootState) => state.performanceManagements.staffFilter
export const _attendanceFilters = (state: RootState) =>
  state.performanceManagements.attendanceFilter
export const _predictionDataList = (state: RootState) =>
  state.performanceManagements.predictionData.list
export const _taskAllocationRoutineList = (state: RootState) =>
  state.performanceManagements.taskAllocation.routineList
export const _taskAllocationPeriodicList = (state: RootState) =>
  state.performanceManagements.taskAllocation.periodicList
export const _taskAllocationAdhockList = (state: RootState) =>
  state.performanceManagements.taskAllocation.adhockList
export const _leaveApplicationFilters = (state: RootState) =>
  state.performanceManagements.leaveApplicationFilter
export const _ojtFilters = (state: RootState) => state.performanceManagements.ojtFilter
export const _performaceOverview = (state: RootState) => state.performanceManagements.performanceOverview
export const _performaceTriggeredAutomation = (state: RootState) => state.performanceManagements.performanceTriggeredAutomation
export const _performaceTriggeredAutomationLog = (state: RootState) => state.performanceManagements.performanceTriggeredAutomationLog

export const _getTaskListOverviewState = () => useSelector(_taskListOverView)
export const _getTaskAllocationSLAList = () => useSelector(_taskAllocationSLAList)
export const _getInHouseSopTrainingList = () => useSelector(_inHouseSopTrainingList)
export const _getInhouseOjtTrainingStatusList = () => useSelector(_inHouseOjtTrainingStatusList)
export const _getStaffFilters = () => useSelector(_staffFilter)
export const _getAttendanceFilters = () => useSelector(_attendanceFilters)
export const _getPredictionDataList = () => useSelector(_predictionDataList)
export const _getTaskAllocationRoutineList = () => useSelector(_taskAllocationRoutineList)
export const _getTaskAllocationPeriodicList = () => useSelector(_taskAllocationPeriodicList)
export const _getTaskAllocationAdhockList = () => useSelector(_taskAllocationAdhockList)
export const _getLeaveApplicationFilter = () => useSelector(_leaveApplicationFilters)
export const _getOjtFilter = () => useSelector(_ojtFilters)
export const _getPerformanceOverviewState = () => useSelector(_performaceOverview)
export const _getPerformanceTriggeredAutomationState = () => useSelector(_performaceTriggeredAutomation)
export const _getPerformanceTriggeredAutomationLogState = () => useSelector(_performaceTriggeredAutomationLog)


// notifications
export const _notificationFilters = (state: RootState) => state.notification

export const _getNotificationFilters = () => useSelector(_notificationFilters)

// alerts
export const _alertFilters = (state: RootState) => state.alert

export const _getAlertFilters = () => useSelector(_alertFilters)
