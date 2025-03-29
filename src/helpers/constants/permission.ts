import { IRolePermission } from '../../types/role'

// Role Permission
export const NEW_ROLE_ID = -1
export const NEW_ROLE = {
  id: NEW_ROLE_ID,
  name: '',
  isStaff: false,
  isAuditor: false,
  isCleaner: false,
  isSupervisor: false,
  permission: { permissions: [] },
}

export const ROLE_MOBILE_KEYS = {
  root: 'mobile-app',
  auditor: 'auditor',
  supervisor: 'supervisor',
  cleaner: 'cleaner',
}

export const ROLE_PERMISSION_KEYS = {
  dashboard: {
    root: 'dashboard',
    viewOverview: 'view-dashboard-overview',
    viewOverviewMapDetails: 'view-overview-map-and-details',
    viewCalendarSchedule: 'view-dashboard-calendar',
    downloadReport: 'download-report',
  },
  audit: {
    root: 'audit',
    overview: {
      root: 'overview-audit',
      viewAuditOverview: 'view-audit-overview',
      // addOrEditAudit: 'add-or-edit-audit',
      // createForm: 'create-a-form',
      // viewAuditLog: 'view-audit-logs',
    },
    performance: {
      root: 'performance-audit',
      viewInsight: 'view-audit-insight',
    },
    result: {
      root: 'result-audit',
      viewAuditResultData: 'view-audit-result',
      viewAuditResultDetails: 'view-audit-result-details-page',
    },
    log: {
      root: 'log-audit',
      viewAuditLogData: 'view-audit-log',
      viewAuditLogDetails: 'view-audit-log-details-page',
      deleteAuditList: 'delete-audit-log-list',
    },
    schedule: {
      root: 'schedule-audit',
      viewSchedule: 'view-audit-schedule',
      viewTasksForCleaner: 'view-tasks-for-cleaner',
      createTasksForCleaner: 'create-tasks-for-cleaner',
      deleteTasksForCleaner: 'delete-tasks-for-cleaner',
    },
    projectSite: {
      root: 'project-site',
      viewProjectSite: 'view-audit-project-site',
      viewProjectSiteFormula: 'view-audit-project-site-formula',
      addProjectSite: 'add-project-site',
      editProjectSite: 'edit-project-site',
      deleteProjectSite: 'delete-project-site',
    },
    auditFormTemplate: {
      root: 'audit-form-template',
      viewAuditFormTemplate: 'view-audit-audit-form-template',
      viewEditAuditFormTemplate: 'view-edit-audit-form-template',
      viewTemplateSettings: 'view-audit-form-template-settings',
      addAuditFormTemplate: 'add-audit-form-template',
    },
    recycle: {
      root: 'recycle-bin',
      viewRecycle: 'view-audit-recycle-bin',
      deleteOrRestoreRecycle: 'delete-or-restore-audit-recycle',
    },

  },
  device: {
    root: 'device',
    overview: {
      root: 'device-overview',
      viewDeviceOverview: 'view-device-overview',
      addDevice: 'add-device',
      editDevice: 'edit-device',
      deleteDevice: 'delete-device',
      viewDeviceDetails: 'view-device-details',
    },
    deviceControl: {
      root: 'device-control',
      viewDeviceControl: 'view-device-control',
      viewDeviceControlDetails: 'view-device-control-details',
    },
    deviceSwap: {
      root: 'device-swap',
      viewDeviceSwap: 'view-device-swap',
      deleteDeviceSwap: 'delete-device-swap',
      swapDevice: 'swap-device',
    },
    deviceGroup: {
      root: 'device-group',
      viewDeviceGroup: 'view-device-group',
      viewDetailsDeviceGroup: 'view-details-device-group',
      deleteDeviceGroup: 'delete-device-group',
      addDeviceGroup: 'add-device-group',
      editDeviceGroup: 'edit-device-group',
    },
    deviceLinkage: {
      root: 'device-linkage',
      viewDeviceLinkage: 'view-device-linkage',
      addNewScence: 'add-new-scene',
    },
    activationSchedule: {
      root: 'device-activation-schedule',
      viewDeviceActivationSchedule: 'view-device-activation-schedule',
      addNewSchedule: 'add-new-schedule',
      viewEditSchedule: 'view-edit-schedule',
      deleteSchedule: 'delete-schedule',
    },
    reports: {
      root: 'device-reports',
      viewDeviceReports: 'view-device-reports',
    },
    locationSettings: {
      root: 'device-location-settings',
      viewDeviceLocationSettings: 'view-device-location-settings',
      viewEditDeviceLocationSettings: 'view-edit-device-location-settings',
      deleteDeviceLocationSettings: 'delete-device-location-settings',
    },
    // viewDeviceList: 'view-device-overview',
    addAndControlDevice: 'view-device-control',
    swapDevice: 'view-device-swap',
    viewCreateDeviceScheduleOnAndOff: 'view-device-activation-schedule',
    groupingDevices: 'view-device-group',
    makeDeviceScene: 'make-device-scene',
    viewLinkage: 'view-device-linkage',
    viewReport: 'view-device-reports',
    locationSettingsView: 'view-device-location-settings',
  },
  maintenance: {
    root: 'maintenance',
    viewMaintenanceOverviewList: 'view-maintenance-overview',
    addNewScheduleForMaintenance: 'add-new-schedule-for-maintenance',
    viewMaintenanceScheduleList: 'view-maintenance-schedule',
    viewEditMaintenanceList: 'view-and-edit-maintenance-lists',
    deleteMaintenanceList: 'delete-maintenance-lists',
    viewMaintenanceReportList: 'view-maintenance-reports',
    viewMaintenanceProceduresList: 'view-maintenance-procedures',
  },
  incident: {
    root: 'incident',
    viewIncidentList: 'view-incident-overview',
    viewIncidentReportList: 'view-incident-report',
    addNewIncident: 'add-new-incident',
    viewIncidentType: 'view-incident-incident-type',
    acknowledgeAndIncidentEvent: 'acknowledge-and-incident-event',
    deleteIncidentList: 'delete-incident-lists',
  },
  feedback: {
    root: 'feedback',
    viewFeedbackOverviewPage: 'view-feedback-overview',
    viewFeedbackTemplatePage: 'view-feedback-form-template',
    viewInboxList: 'view-feedback-inbox',
    viewReport: 'view-feedback-report',
    viewLocation: 'view-feedback-location',
    viewArchive: 'view-feedback-archive',
    editAndAddNewFeedbackForm: 'edit-and-add-new-feedback-form',
    deleteFeedbackAssignments: 'delete-feedback-assignments',
  },
  notification: {
    root: 'notification',
    viewNotification: 'view-notification',
    viewDeviceNotification: 'view-device-notification',
    viewFeedbackNotification: 'view-feedback-notification',
    viewAuditNotification: 'view-audit-notification',
    acknowledgeAndDeleteNotification: 'acknowledge-and-delete-notification',
  },
  alert: {
    root: 'alert',
    viewAlert: 'view-alert',
    remindAlert: 'remind-alert',
    assignAlertToUser: 'assign-alert-to-user',
  },
  settings: {
    root: 'settings',
    users: {
      root: 'users',
      viewUsersPage: 'view-users-page',
      addOrEditUsers: 'add-or-edit-users',
      deleteUsers: 'delete-users',
    },
    roles: {
      root: 'roles-and-modules',
      viewRolesAndModulesPage: 'view-settings-roles',
      addOrEditRolesAndModules: 'add-or-edit-roles-and-modules',
    },
    locationData: {
      root: 'location-data',
      viewTypeAndLocationPage: 'view-type-and-location-page',
      addOrEditTypeAndLocations: 'add-or-edit-type-and-locations',
      deleteTypeAndLocations: 'delete-type-and-locations',
    },
  },
  reports: {
    root: 'reports',
    viewOverviewPage: 'view-overview-page',
    viewReport:'view-report',
    viewTurnAroundTimeReportPage: 'view-turn-around-time-report-page',
    viewFeedbackSummaryReportPage: 'view-feedback-summary-report-page',
    viewFeedbackLogPage: 'view-feedback-log-page',
    viewDataUsagePage: 'view-data-usage-page',
  },
  taskManagement:{
    root: 'taskManagement',
    overview: {
      root: 'overview-performance-management',
      viewOverview: 'view-performance-management-overview',
      viewOverviewDetails: 'view-overview-details-performance-management',
      deleteOverviewTask: 'delete-overview-performance-management',
    },
    taskAllocation: {
      root: 'task-allocation-performance-management',
      viewTaskAllocation: 'view-task-allocation-performance-management',
      initialSettingsRoot:'performance-management-task-allocation-init-settings',
      viewInitialSettings:'view-performance-management-task-allocation-init-settings',
      viewEditInitialSettings: 'view-edit-initial-setttings-task-allocation',
      viewRoutineTask: 'view-performance-management-task-allocation-routine-task',
      addRoutineTask: 'add-routine-task',
      viewPeriodicTask: 'view-performance-management-task-allocation-periodic-task',
      viewDetailsPeriodicTask: 'view-details-periodic-task-allocation',
      addPeriodicTask: 'add-periodic-task-allocation',
      deletePeriodicTask: 'delete-periodic-task-allocation',
      viewAdHocTask: 'view-performance-management-task-allocation-ad-hoc-task',
      addAdHocTask: 'add-adhoc-task-allocation',
      viewEditAdHocTask: 'view-edit-adhoc-task-allocation',
      deleteAdHocTask: 'delete-adhoc-task-allocation',
      viewAutomationTask: 'view-performance-management-task-allocation-automation-task',
      editAutomationTask: 'edit-automation-task-allocation',
      deleteAutomationTask: 'delete-automation-task-allocation',
      addAutomationTask: 'add-automation-task-allocation',
    },
    inHouseTraining: {
      root: 'inhouse-training-performance-management',
      viewSOPCleaningProcesses: 'view-performance-management-in-house-training-sop',
      addSOPCleaningProcesses: 'add-sop-cleaning-processes-performance-management',
      editSOPCleaningProcesses: 'edit-sop-cleaning-processes-performance-management',
      viewOJT: 'view-performance-management-in-house-training-ojt',
      addOJT: 'add-ojt-task-allocation',
      editOJT: 'edit-ojt-task-allocation',
      deleteOJT: 'delete-ojt-task-allocation',
      viewOJTTrainingStatus: 'view-ojt-training-status-task-allocation',
    },
    staff: {
      root: 'staff-performance-management',
      viewStaff: 'view-performance-management-staff-list',
      viewEditStaffDetails: 'view-edit-staff-details',
      deleteStaff: 'delete-staff',
      viewStaffAttendance: 'view-performance-management-staff-attendance',
      viewStaffLeaveApplication: 'view-performance-managemen-staff-leave',
      viewStaffLeaveDetails: 'view-staff-leave-details',
    },
    predictionDataList: {
      root: 'prediction-performance-management',
      viewPredictionPage: 'view-performance-management-prediction-data-list',
      viewPredictionDetails: 'view-details-prediction-performance-management',
    },
  },
  washroomManagement:{
    root: 'washroomManagement',
    overview: {
      root: 'washroomOverview',
      viewOverview: 'view-washroom-overview',
      viewOverviewDetails: 'view-washroom-overview-details',
    },
    incident: {
      root: 'washroomIncident',
      viewWashroomIncident: 'view-washroom-incident',
      viewWashroomIncidentDetails:'view-washroom-incident-details',
      addWashroomIncident: 'add-washroom-incident',
      editWashroomIncident: 'edit-washroom-incident',
      deleteWashroomIncident: 'delete-washroom-incident',
    },
    reports: {
      root: 'washroomReports',
      viewWashroomReports: 'view-washroom-reports',
      viewWashroomReportsDetails:'view-washroom-reports-details',
      addWashroomReports: 'add-washroom-reports',
      editWashroomReports: 'edit-washroom-reports',
      deleteWashroomReports: 'delete-washroom-reports',
    },
    locationSettings: {
      root: 'washroomLocationSettings',
      viewwashroomLocationSettings: 'view-washroom-location-settings',
      viewwashroomLocationSettingsDetails:'view-washroom-location-settings-details',
      addwashroomLocationSettings: 'add-washroom-reports',
      editwashroomLocationSettings: 'edit-washroom-reports',
      deletewashroomLocationSettings: 'delete-washroom-reports',
    },
    thresholdSettings: {
      root: 'washroomThresholdSettings',
      viewwashroomThresholdSettings: 'view-washroom-threshold-settings',
      viewwashroomThresholdSettingsDetails:'view-washroom-threshold-settings-details',
      addwashroomThresholdSettings: 'add-washroom-threshold-settings',
      editwashroomThresholdSettings: 'edit-washroom-threshold-settings',
      deletewashroomThresholdSettings: 'delete-washroom-threshold-settings',
    },
  },
  predictiveAnalysis:{
    root: 'predictiveAnalysis',
    viewWashroomStat: 'view-washroom-stat',
    viewResourceAloc: 'view-resource-alloc',
    viewConfig: 'view-config',
  },
  activityLog:{
    root: 'activitylog',
    auditLog: 'view-audit-log',
    devicelog: 'view-device-log',
    washroomlog: 'view-washroom-log',
    maintenancelog: 'view-maintenance-log',
    incidentLog: 'view-incident-log',
    feedbackLog: 'view-feedback-log',
    reportLog: 'view-report-log',
    userlog: 'view-user-log',
  },
}

export const ROUTE_PERMISSION_MAPPING = {
  dashboard: {
    root: [ROLE_PERMISSION_KEYS.dashboard.root],
    overview: [ROLE_PERMISSION_KEYS.dashboard.viewOverview],
    overviewDetail: [ROLE_PERMISSION_KEYS.dashboard.viewOverviewMapDetails],
    calendar: [ROLE_PERMISSION_KEYS.dashboard.viewCalendarSchedule],
  },
  incident: {
    root: [ROLE_PERMISSION_KEYS.incident.root],
    overview: [ROLE_PERMISSION_KEYS.incident.viewIncidentList],
    report: [ROLE_PERMISSION_KEYS.incident.viewIncidentReportList],
    incidentTypeList: [ROLE_PERMISSION_KEYS.incident.viewIncidentType],
    incidentTypeCreate: [ROLE_PERMISSION_KEYS.incident.addNewIncident],
    incidentTypeDetail: [ROLE_PERMISSION_KEYS.incident.addNewIncident],
    overviewCreate: [ROLE_PERMISSION_KEYS.incident.addNewIncident],
    overviewDetail: [ROLE_PERMISSION_KEYS.incident.addNewIncident],
  },
  audit: {
    root: [ROLE_PERMISSION_KEYS.audit.root],
    overview: [ROLE_PERMISSION_KEYS.audit.overview.root],
    overviewList: [ROLE_PERMISSION_KEYS.audit.overview.viewAuditOverview],
    overviewDetail: [ROLE_PERMISSION_KEYS.audit.overview.viewAuditOverview],
    insight: [ROLE_PERMISSION_KEYS.audit.performance.root],
    insightView: [ROLE_PERMISSION_KEYS.audit.performance.viewInsight],
    result: [ROLE_PERMISSION_KEYS.audit.result.root],
    resultList: [ROLE_PERMISSION_KEYS.audit.result.viewAuditResultData],
    resultDetail: [ROLE_PERMISSION_KEYS.audit.result.viewAuditResultDetails],
    log: [ROLE_PERMISSION_KEYS.audit.log.root],
    logList: [ROLE_PERMISSION_KEYS.audit.log.viewAuditLogData],
    logDetail: [ROLE_PERMISSION_KEYS.audit.log.viewAuditLogDetails],
    logListDelete: [ROLE_PERMISSION_KEYS.audit.log.deleteAuditList],
    scheduleList: [ROLE_PERMISSION_KEYS.audit.schedule.root],
    scheduleView: [ROLE_PERMISSION_KEYS.audit.schedule.viewSchedule],
    scheduleCreate: [ROLE_PERMISSION_KEYS.audit.schedule.createTasksForCleaner],
    scheduleDetail: [ROLE_PERMISSION_KEYS.audit.schedule.viewTasksForCleaner],
    scheduleDelete: [ROLE_PERMISSION_KEYS.audit.schedule.deleteTasksForCleaner],
    projectSiteList: [ROLE_PERMISSION_KEYS.audit.projectSite.root],
    projectSiteView: [ROLE_PERMISSION_KEYS.audit.projectSite.viewProjectSite],
    projectSiteCreate: [ROLE_PERMISSION_KEYS.audit.projectSite.addProjectSite],
    projectSiteEdit: [ROLE_PERMISSION_KEYS.audit.projectSite.editProjectSite],
    projectSiteDelete: [ROLE_PERMISSION_KEYS.audit.projectSite.deleteProjectSite],
    projectSiteFormula: [ROLE_PERMISSION_KEYS.audit.projectSite.viewProjectSiteFormula],
    formTemplateList: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.root],
    formTemplateView: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewAuditFormTemplate],
    formTemplateCreate: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.addAuditFormTemplate],
    formTemplateDetail: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewEditAuditFormTemplate],
    formTemplateSettings: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewTemplateSettings],
    ratingTemplateList: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.root],
    ratingTemplateCreate: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.root],
    ratingTemplateDetail: [ROLE_PERMISSION_KEYS.audit.auditFormTemplate.root],
    recycleBin: [ROLE_PERMISSION_KEYS.audit.recycle.root],
    recycleBinList: [ROLE_PERMISSION_KEYS.audit.recycle.viewRecycle],
    recycleBinDeleteRestore: [ROLE_PERMISSION_KEYS.audit.recycle.deleteOrRestoreRecycle],
    performanceDataList: [ROLE_PERMISSION_KEYS.audit.performance.root],
  },
  maintenance: {
    root: [ROLE_PERMISSION_KEYS.maintenance.root],
    overview: [ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceOverviewList],
    overviewDetail: [ROLE_PERMISSION_KEYS.maintenance.root],
    scheduleList: [ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceScheduleList],
    scheduleDetail: [ROLE_PERMISSION_KEYS.maintenance.viewEditMaintenanceList],
    scheduleCreate: [ROLE_PERMISSION_KEYS.maintenance.viewEditMaintenanceList],
    report: [ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceReportList],
    procedureList: [ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceProceduresList],
    procedureView: [ROLE_PERMISSION_KEYS.maintenance.root],
    procedureDetail: [ROLE_PERMISSION_KEYS.maintenance.root],
    procedureCreate: [ROLE_PERMISSION_KEYS.maintenance.root],
  },
  washroom: {
    root: [ROLE_PERMISSION_KEYS.washroomManagement.root],
    overviewRoot: [ROLE_PERMISSION_KEYS.washroomManagement.overview.root],
    overview: [ROLE_PERMISSION_KEYS.washroomManagement.overview.viewOverview],
    overviewDetails: [ROLE_PERMISSION_KEYS.washroomManagement.overview.viewOverviewDetails],
    incident: [ROLE_PERMISSION_KEYS.washroomManagement.incident.root],
    incidentList: [ROLE_PERMISSION_KEYS.washroomManagement.incident.viewWashroomIncident],
    incidentCreate: [ROLE_PERMISSION_KEYS.washroomManagement.incident.addWashroomIncident],
    incidentDetail: [ROLE_PERMISSION_KEYS.washroomManagement.incident.viewWashroomIncidentDetails],
    reports: [ROLE_PERMISSION_KEYS.washroomManagement.reports.root],
    reportList: [ROLE_PERMISSION_KEYS.washroomManagement.reports.viewWashroomReports],
    locationSetting: [ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.root],
    locationSettingList: [ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.viewwashroomLocationSettings],
    locationSettingDetail: [ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.viewwashroomLocationSettingsDetails],
    thresholingSettings: [ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.root],
    thresholingSettingsList: [ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.viewwashroomThresholdSettings],
    thresholingSettingsDetails: [ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.viewwashroomThresholdSettingsDetails],
    thresholingSettingsDelete: [ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.deletewashroomThresholdSettings],
  },
  feedback: {
    root: [ROLE_PERMISSION_KEYS.feedback.root],
    overview: [ROLE_PERMISSION_KEYS.feedback.viewFeedbackOverviewPage],
    overviewDetail: [ROLE_PERMISSION_KEYS.feedback.viewFeedbackOverviewPage],
    overviewRecentActivity: [ROLE_PERMISSION_KEYS.feedback.viewFeedbackOverviewPage],
    formTemplateList: [ROLE_PERMISSION_KEYS.feedback.viewFeedbackTemplatePage],
    inboxList: [ROLE_PERMISSION_KEYS.feedback.viewInboxList],
    inboxDetail: [ROLE_PERMISSION_KEYS.feedback.root],
    inboxLabel: [ROLE_PERMISSION_KEYS.feedback.root],
    report: [ROLE_PERMISSION_KEYS.feedback.viewReport],
    location: [ROLE_PERMISSION_KEYS.feedback.viewLocation],
    archive: [ROLE_PERMISSION_KEYS.feedback.viewArchive]
  },
  predictiveAnalysis: {
    root: [ROLE_PERMISSION_KEYS.predictiveAnalysis.root],
    student: [],
    washroom: [ROLE_PERMISSION_KEYS.predictiveAnalysis.viewWashroomStat],
    resourceAllocation: [ROLE_PERMISSION_KEYS.predictiveAnalysis.viewResourceAloc],
    configuration: [ROLE_PERMISSION_KEYS.predictiveAnalysis.viewConfig],
  },
  device: {
    root: [ROLE_PERMISSION_KEYS.device.root],
    overviewRoot: [ROLE_PERMISSION_KEYS.device.overview.root],
    overview: [ROLE_PERMISSION_KEYS.device.overview.viewDeviceOverview],
    // overviewCreate: [ROLE_PERMISSION_KEYS.device.viewDeviceList],
    // overviewDetail: [ROLE_PERMISSION_KEYS.device.viewDeviceList],
    deviceControl: [ROLE_PERMISSION_KEYS.device.deviceControl.root],
    deviceControlList: [ROLE_PERMISSION_KEYS.device.deviceControl.viewDeviceControl],
    // controlList: [ROLE_PERMISSION_KEYS.device.addAndControlDevice],
    // controlDetail: [ROLE_PERMISSION_KEYS.device.deviceControl.viewDeviceControlDetails],
    deviceSwapView: [ROLE_PERMISSION_KEYS.device.deviceSwap.root],
    deviceSwapViewList: [ROLE_PERMISSION_KEYS.device.deviceSwap.viewDeviceSwap],
    deviceGroup: [ROLE_PERMISSION_KEYS.device.deviceGroup.root],
    deviceGroupList: [ROLE_PERMISSION_KEYS.device.deviceGroup.viewDeviceGroup],
    // groupDetail: [ROLE_PERMISSION_KEYS.device.groupingDevices],
    deviceLinkage: [ROLE_PERMISSION_KEYS.device.deviceLinkage.root],
    deviceLinkageList: [ROLE_PERMISSION_KEYS.device.deviceLinkage.viewDeviceLinkage],
    // linkageView: [ROLE_PERMISSION_KEYS.device.viewLinkage],
    // linkageCreate: [ROLE_PERMISSION_KEYS.device.root],
    // linkageDetail: [ROLE_PERMISSION_KEYS.device.root],
    deviceActivationSchedule: [ROLE_PERMISSION_KEYS.device.activationSchedule.root],
    deviceActivationScheduleList: [ROLE_PERMISSION_KEYS.device.activationSchedule.viewDeviceActivationSchedule],
    // activationScheduleCreate: [ROLE_PERMISSION_KEYS.device.viewCreateDeviceScheduleOnAndOff],
    // activationScheduleDetail: [ROLE_PERMISSION_KEYS.device.viewCreateDeviceScheduleOnAndOff],
    deviceReport: [ROLE_PERMISSION_KEYS.device.reports.root],
    deviceReportList: [ROLE_PERMISSION_KEYS.device.reports.viewDeviceReports],
    // reportView: [ROLE_PERMISSION_KEYS.device.viewReport],
    deviceLocationSettings: [ROLE_PERMISSION_KEYS.device.locationSettings.root],
    deviceLocationSettingsList: [ROLE_PERMISSION_KEYS.device.locationSettings.viewDeviceLocationSettings],
    // locationSettingList: [ROLE_PERMISSION_KEYS.device.root],
    // locationSettingView: [ROLE_PERMISSION_KEYS.device.locationSettingsView],
    // locationSettingDetail: [ROLE_PERMISSION_KEYS.device.root],
  },
  settings: {
    root: [ROLE_PERMISSION_KEYS.settings.root],
    roleList: [ROLE_PERMISSION_KEYS.settings.users.root],
    users: [ROLE_PERMISSION_KEYS.settings.users.root],
    userList: [ROLE_PERMISSION_KEYS.settings.users.viewUsersPage],
    userCreate: [ROLE_PERMISSION_KEYS.settings.users.addOrEditUsers],
    userDetail: [ROLE_PERMISSION_KEYS.settings.users.addOrEditUsers],
    projectRoot: [ROLE_PERMISSION_KEYS.settings.locationData.root],
    projectList: [ROLE_PERMISSION_KEYS.settings.locationData.viewTypeAndLocationPage],
    projectDetail: [ROLE_PERMISSION_KEYS.settings.locationData.addOrEditTypeAndLocations],
  },
  alert: {
    root: [ROLE_PERMISSION_KEYS.alert.root],
    alertList: [ROLE_PERMISSION_KEYS.alert.viewAlert],
  },
  report: {
    root: [ROLE_PERMISSION_KEYS.reports.root],
  },
  notification: {
    root: [ROLE_PERMISSION_KEYS.notification.root],
  },
  activityLogs: {
    root: [ROLE_PERMISSION_KEYS.activityLog.root],
    audit: [ROLE_PERMISSION_KEYS.activityLog.auditLog],
    device: [ROLE_PERMISSION_KEYS.activityLog.devicelog],
    washroom: [ROLE_PERMISSION_KEYS.activityLog.washroomlog],
    maintenance: [ROLE_PERMISSION_KEYS.activityLog.maintenancelog],
    incident: [ROLE_PERMISSION_KEYS.activityLog.incidentLog],
    feedback: [ROLE_PERMISSION_KEYS.activityLog.feedbackLog],
    report: [ROLE_PERMISSION_KEYS.activityLog.reportLog],
    user: [ROLE_PERMISSION_KEYS.activityLog.userlog]
  },
  taskManagement: {
    root: [ROLE_PERMISSION_KEYS.taskManagement.root],
    overviewRoot: [ROLE_PERMISSION_KEYS.taskManagement.overview.root],
    overview: [ROLE_PERMISSION_KEYS.taskManagement.overview.viewOverview],
    overviewDetails: [ROLE_PERMISSION_KEYS.taskManagement.overview.viewOverviewDetails],
    deleteOverviewTask: [ROLE_PERMISSION_KEYS.taskManagement.overview.deleteOverviewTask],
    taskAllocation: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.root],
    taskAllocationView: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewTaskAllocation],
    initialSettingRoot: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.initialSettingsRoot],
    taskAllocationInitialSetting: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewInitialSettings],
    taskAllocationEditInitialSetting: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewEditInitialSettings],
    taskAllocationRoutineTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewRoutineTask],
    taskAllocationAddRoutineTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addRoutineTask],
    taskAllocationPeriodicTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewPeriodicTask],
    taskAllocationAddPeriodicTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addPeriodicTask],
    taskAllocationDeletePeriodicTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deletePeriodicTask],
    taskAllocationAdHocTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewAdHocTask],
    taskAllocationAddAdHocTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addAdHocTask],
    taskAllocationViewEditAdHocTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewEditAdHocTask],
    taskAllocationDeleteAdHocTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAdHocTask],
    taskAllocationAutomationTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewAutomationTask],
    taskAllocationAddAutomationTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addAutomationTask],
    taskAllocationEditAutomationTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.editAutomationTask],
    taskAllocationDeleteAutomationTask: [ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAutomationTask],
    inHouseTraining: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.root],
    inHouseTrainingSOP: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.viewSOPCleaningProcesses],
    inHouseTrainingSOPAdd: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.addSOPCleaningProcesses],
    inHouseTrainingSOPEdit: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.editSOPCleaningProcesses],
    inHouseTrainingViewOJT: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.viewOJT],
    inHouseTrainingAddOJT: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.addOJT],
    inHouseTrainingEditOJT: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.editOJT],
    inHouseTrainingDeleteOJT: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.deleteOJT],
    inHouseTrainingViewOJTTrainingStatus: [ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.viewOJTTrainingStatus],
    predictionData: [ROLE_PERMISSION_KEYS.taskManagement.predictionDataList.root],
    predictionDataList: [ROLE_PERMISSION_KEYS.taskManagement.predictionDataList.viewPredictionPage],
    predictionDataListDetails: [],
    overviewOnDuty: [],
    scheduling: [],
    staff: [ROLE_PERMISSION_KEYS.taskManagement.staff.root],
    staffList: [ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaff],
    staffDetail: [ROLE_PERMISSION_KEYS.taskManagement.staff.viewEditStaffDetails],
    staffDelete: [ROLE_PERMISSION_KEYS.taskManagement.staff.deleteStaff],
    staffAttendanceList: [ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffAttendance],
    staffLeaveList: [ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffLeaveApplication],
    staffLeaveDetail: [ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffLeaveDetails],
    taskActivityList: [],
    },
}

export const ROLE_PERMISSION_LIST: IRolePermission[] = [
  {
    label: 'Dashboard',
    key: ROLE_PERMISSION_KEYS.dashboard.root,
    items: [
      { label: 'View overview dashboard', key: ROLE_PERMISSION_KEYS.dashboard.viewOverview },
      {
        label: 'View overview map and details',
        key: ROLE_PERMISSION_KEYS.dashboard.viewOverviewMapDetails,
      },
      {
        label: 'View calendar and schedule',
        key: ROLE_PERMISSION_KEYS.dashboard.viewCalendarSchedule,
      },
      { label: 'Download report', key: ROLE_PERMISSION_KEYS.dashboard.downloadReport },
    ],
  },
  {
    label: 'Performance Management',
    key: ROLE_PERMISSION_KEYS.taskManagement.root,
    subPermissions: [
      {
        label: 'Overview',
        key: ROLE_PERMISSION_KEYS.taskManagement.overview.root,
        items: [
          {
            label: 'View performance management overview page',
            key: ROLE_PERMISSION_KEYS.taskManagement.overview.viewOverview,
          },
          {
            label: 'View performance management overview details page',
            key: ROLE_PERMISSION_KEYS.taskManagement.overview.viewOverviewDetails,
          },
          {
            label: 'Delete performance management overview task',
            key: ROLE_PERMISSION_KEYS.taskManagement.overview.deleteOverviewTask,
          },
        ],
      },
      {
        label: 'Task Allocation',
        key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.root,
        items: [
          {
            label: 'View initial settings page',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewInitialSettings,
          },
          {
            label: 'Edit initial settings',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewEditInitialSettings,
          },
          {
            label: 'View routine task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewRoutineTask,
          },
          {
            label: 'Add routine task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addRoutineTask,
          },
          {
            label: 'View periodic page',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewPeriodicTask,
          },
          {
            label: 'View periodic details page',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewDetailsPeriodicTask,
          },
          {
            label: 'Add periodic data',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addPeriodicTask,
          },
          {
            label: 'Delete periodic data',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deletePeriodicTask,
          },

          {
            label: 'View Ad-Hoc task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewAdHocTask,
          },
          {
            label: 'Add Ad-Hoc task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addAdHocTask,
          },
          {
            label: 'Edit Ad-Hoc task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewEditAdHocTask,
          },
          {
            label: 'Delete Ad-Hoc task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAdHocTask,
          },
          {
            label: 'View automation task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewAutomationTask,
          },
          {
            label: 'Add automation task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.addAutomationTask,
          },
          {
            label: 'Edit automation task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.editAutomationTask,
          },
          {
            label: 'Delete automation task',
            key: ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.deleteAutomationTask,
          },
        ],
      },
      {
        label: 'In-House Training',
        key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.root,
        items: [
          {
            label: 'View SOP(Cleaning Processess) page',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.viewSOPCleaningProcesses,
          },
          {
            label: 'Details or edit audit SOP(Cleaning Processess) data',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.editSOPCleaningProcesses,
          },
          {
            label: 'Add new SOP(Cleaning Processess)',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.addSOPCleaningProcesses,
          },
          {
            label: 'View OJT(On-The-Job) page',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.viewOJT,
          },
          {
            label: 'Edit OJT(On-The-Job)',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.editOJT,
          },
          {
            label: 'Add OJT(On-The-Job) training',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.addOJT,
          },
          {
            label: 'Delete OJT(On-The-Job) training',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.deleteOJT,
          },
          {
            label: 'View training status',
            key: ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.viewOJTTrainingStatus,
          },
        ],
      },
      {
        label: 'Staff',
        key: ROLE_PERMISSION_KEYS.taskManagement.staff.root,
        items: [
          {
            label: 'View staff list',
            key: ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaff,
          },
          {
            label: 'Edit staff list',
            key: ROLE_PERMISSION_KEYS.taskManagement.staff.viewEditStaffDetails,
          },
          {
            label: 'Delete staff list',
            key: ROLE_PERMISSION_KEYS.taskManagement.staff.deleteStaff,
          },
          {
            label: 'View Attendance list',
            key: ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffAttendance,
          },
          {
            label: 'View Leave list',
            key: ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffLeaveApplication,
          },
          {
            label: 'View Leave details',
            key: ROLE_PERMISSION_KEYS.taskManagement.staff.viewStaffLeaveDetails,
          },
        ],
      },
      {
        label: 'Prediction Data List',
        key: ROLE_PERMISSION_KEYS.taskManagement.predictionDataList.root,
        items: [
          {
            label: 'View predition data list',
            key: ROLE_PERMISSION_KEYS.taskManagement.predictionDataList.viewPredictionPage,
          },
          {
            label: 'View predition data details',
            key: ROLE_PERMISSION_KEYS.taskManagement.predictionDataList.viewPredictionDetails,
          },
        ],
      },
    ],
  },
  {
    label: 'Audit',
    key: ROLE_PERMISSION_KEYS.audit.root,
    subPermissions: [
      {
        label: 'Overview',
        key: ROLE_PERMISSION_KEYS.audit.overview.root,
        items: [
          {
            label: 'View audit overview page',
            key: ROLE_PERMISSION_KEYS.audit.overview.viewAuditOverview,
          },
          // { label: 'Add or edit audit', key: ROLE_PERMISSION_KEYS.audit.overview.addOrEditAudit },
          // { label: 'Create a form', key: ROLE_PERMISSION_KEYS.audit.overview.createForm },
         // { label: 'View audit logs', key: ROLE_PERMISSION_KEYS.audit.overview.viewAuditLog },
        ],
      },
      {
        label: 'Performance Data',
        key: ROLE_PERMISSION_KEYS.audit.performance.root,
        items: [
          {
            label: 'View audit performance data page',
            key: ROLE_PERMISSION_KEYS.audit.performance.viewInsight,
          },
        ],
      },
      {
        label: 'Audit Result',
        key: ROLE_PERMISSION_KEYS.audit.result.root,
        items: [
          {
            label: 'View audit result page',
            key: ROLE_PERMISSION_KEYS.audit.result.viewAuditResultData,
          },
          {
            label: 'View audit details page',
            key: ROLE_PERMISSION_KEYS.audit.result.viewAuditResultDetails,
          },

        ],
      },
      {
        label: 'Audit Log',
        key: ROLE_PERMISSION_KEYS.audit.log.root,
        items: [
          {
            label: 'View audit log page',
            key: ROLE_PERMISSION_KEYS.audit.log.viewAuditLogData,
          },
          {
            label: 'View audit details page',
            key: ROLE_PERMISSION_KEYS.audit.log.viewAuditLogDetails,
          },
          {
            label: 'Delete audit log',
            key: ROLE_PERMISSION_KEYS.audit.log.deleteAuditList,
          },
        ],
      },
      {
        label: 'Schedule',
        key: ROLE_PERMISSION_KEYS.audit.schedule.root,
        items: [
          {
            label: 'View tasks for cleaner',
            key: ROLE_PERMISSION_KEYS.audit.schedule.viewTasksForCleaner,
          },
          {
            label: 'Create tasks for cleaner',
            key: ROLE_PERMISSION_KEYS.audit.schedule.createTasksForCleaner,
          },
          {
            label: 'Delete tasks for cleaner',
            key: ROLE_PERMISSION_KEYS.audit.schedule.deleteTasksForCleaner,
          },
        ],
      },
      {
        label: 'Project Site',
        key: ROLE_PERMISSION_KEYS.audit.projectSite.root,
        items: [
          {
            label: 'View project site',
            key: ROLE_PERMISSION_KEYS.audit.projectSite.viewProjectSite,
          },
          {
            label: 'View project formula',
            key: ROLE_PERMISSION_KEYS.audit.projectSite.viewProjectSiteFormula,
          },
          {
            label: 'Add project formula',
            key: ROLE_PERMISSION_KEYS.audit.projectSite.addProjectSite,
          },
          {
            label: 'Edit project formula',
            key: ROLE_PERMISSION_KEYS.audit.projectSite.editProjectSite,
          },
          {
            label: 'Delete project formula',
            key: ROLE_PERMISSION_KEYS.audit.projectSite.deleteProjectSite,
          },
        ],
      },
      {
        label: 'Audit Form Template',
        key: ROLE_PERMISSION_KEYS.audit.auditFormTemplate.root,
        items: [
          {
            label: 'View form template',
            key: ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewAuditFormTemplate,
          },
          {
            label: 'Edit form template',
            key: ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewEditAuditFormTemplate,
          },
          {
            label: 'View template settings',
            key: ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewTemplateSettings,
          },
          {
            label: 'Add form template',
            key: ROLE_PERMISSION_KEYS.audit.auditFormTemplate.addAuditFormTemplate,
          },

        ],
      },
      {
        label: 'Recycle Bin',
        key: ROLE_PERMISSION_KEYS.audit.recycle.root,
        items: [
          {
            label: 'View form template',
            key: ROLE_PERMISSION_KEYS.audit.recycle.viewRecycle,
          },
          {
            label: 'Delete or restore recycle',
            key: ROLE_PERMISSION_KEYS.audit.recycle.deleteOrRestoreRecycle,
          },
        ],
      },
    ],
  },
  {
    label: 'Washroom Management',
    key: ROLE_PERMISSION_KEYS.washroomManagement.root,
    subPermissions: [
      {
        label: 'Overview',
        key: ROLE_PERMISSION_KEYS.washroomManagement.overview.root,
        items: [
          {
            label: 'View washroom management overview page',
            key: ROLE_PERMISSION_KEYS.washroomManagement.overview.viewOverview,
          },
          // {
          //   label: 'View washroom management overview details page',
          //   key: ROLE_PERMISSION_KEYS.washroomManagement.overview.viewOverviewDetails,
          // },
          // {
          //   label: 'Delete washroom management overview task',
          //   key: ROLE_PERMISSION_KEYS.taskManagement.overview.deleteOverviewTask,
          // },
        ],
      },
      {
        label: 'Incident',
        key: ROLE_PERMISSION_KEYS.washroomManagement.incident.root,
        items: [
          {
            label: 'View incident page',
            key: ROLE_PERMISSION_KEYS.washroomManagement.incident.viewWashroomIncident,
          },
          {
            label: 'View incident details page',
            key: ROLE_PERMISSION_KEYS.washroomManagement.incident.viewWashroomIncidentDetails,
          },
          {
            label: 'Edit incident info',
            key: ROLE_PERMISSION_KEYS.washroomManagement.incident.editWashroomIncident,
          },
          {
            label: 'Delete incident info',
            key: ROLE_PERMISSION_KEYS.washroomManagement.incident.deleteWashroomIncident,
          },
          {
            label: 'Add incident info',
            key: ROLE_PERMISSION_KEYS.washroomManagement.incident.addWashroomIncident,
          },
        ],
      },
      {
        label: 'Reports',
        key: ROLE_PERMISSION_KEYS.washroomManagement.reports.root,
        items: [
          {
            label: 'View reports page',
            key: ROLE_PERMISSION_KEYS.washroomManagement.reports.viewWashroomReports,
          },
          {
            label: 'View details reports',
            key: ROLE_PERMISSION_KEYS.washroomManagement.reports.viewWashroomReportsDetails,
          },

        ],
      },
      {
        label: 'Location Settings',
        key: ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.root,
        items: [
          {
            label: 'View location settings list',
            key: ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.viewwashroomLocationSettings,
          },
          {
            label: 'View details location settings list',
            key: ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.viewwashroomLocationSettingsDetails,
          },
          {
            label: 'Delete location settings list',
            key: ROLE_PERMISSION_KEYS.washroomManagement.locationSettings.deletewashroomLocationSettings,
          },
        ],
      },
      {
        label: 'Threshold Settings',
        key: ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.root,
        items: [
          {
            label: 'View threshold page',
            key: ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.viewwashroomThresholdSettings,
          },
          {
            label: 'Edit threshold data',
            key: ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.editwashroomThresholdSettings,
          },
        ],
      },
    ],
  },
  {
    label: 'Device',
    key: ROLE_PERMISSION_KEYS.device.root,
    subPermissions: [
      {
        label: 'Overview',
        key: ROLE_PERMISSION_KEYS.device.overview.root,
        items: [
          {
            label: 'View device overview page',
            key: ROLE_PERMISSION_KEYS.device.overview.viewDeviceOverview,
          },
          {
            label: 'Add device',
            key: ROLE_PERMISSION_KEYS.device.overview.addDevice,
          },
          {
            label: 'View device details page',
            key: ROLE_PERMISSION_KEYS.device.overview.viewDeviceDetails,
          },
          {
            label: 'Edit device details',
            key: ROLE_PERMISSION_KEYS.device.overview.editDevice,
          },
          {
            label: 'Delete device',
            key: ROLE_PERMISSION_KEYS.device.overview.deleteDevice,
          },
        ],
      },
      {
        label: 'Device Control',
        key: ROLE_PERMISSION_KEYS.device.deviceControl.root,
        items: [
          {
            label: 'View device control page',
            key: ROLE_PERMISSION_KEYS.device.deviceControl.viewDeviceControl,
          },
          {
            label: 'View device control details page',
            key: ROLE_PERMISSION_KEYS.device.deviceControl.viewDeviceControlDetails,
          },
        ],
      },
      {
        label: 'Device Swap',
        key: ROLE_PERMISSION_KEYS.device.deviceSwap.root,
        items: [
          {
            label: 'View device swap page',
            key: ROLE_PERMISSION_KEYS.device.deviceSwap.viewDeviceSwap,
          },
          {
            label: 'Swap device',
            key: ROLE_PERMISSION_KEYS.device.deviceSwap.swapDevice,
          },
          {
            label: 'Delete swap device',
            key: ROLE_PERMISSION_KEYS.device.deviceSwap.deleteDeviceSwap,
          },

        ],
      },
      {
        label: 'Device Group',
        key: ROLE_PERMISSION_KEYS.device.deviceGroup.root,
        items: [
          {
            label: 'View device group page',
            key: ROLE_PERMISSION_KEYS.device.deviceGroup.viewDeviceGroup,
          },
          {
            label: 'View details device group',
            key: ROLE_PERMISSION_KEYS.device.deviceGroup.viewDetailsDeviceGroup,
          },
          {
            label: 'Edit device group',
            key: ROLE_PERMISSION_KEYS.device.deviceGroup.editDeviceGroup,
          },
          {
            label: 'Create device group',
            key: ROLE_PERMISSION_KEYS.device.deviceGroup.addDeviceGroup,
          },
          {
            label: 'Delete device group',
            key: ROLE_PERMISSION_KEYS.device.deviceGroup.deleteDeviceGroup,
          },
        ],
      },
      {
        label: 'Device Linkage',
        key: ROLE_PERMISSION_KEYS.device.deviceLinkage.root,
        items: [
          {
            label: 'View device linkage page',
            key: ROLE_PERMISSION_KEYS.device.deviceLinkage.viewDeviceLinkage,
          },
          {
            label: 'Add New Scene',
            key: ROLE_PERMISSION_KEYS.device.deviceLinkage.addNewScence,
          },
        ],
      },
      {
        label: 'Activation Schedule',
        key: ROLE_PERMISSION_KEYS.device.activationSchedule.root,
        items: [
          {
            label: 'View activation schedule page',
            key: ROLE_PERMISSION_KEYS.device.activationSchedule.viewDeviceActivationSchedule,
          },
          {
            label: 'Add new schedule',
            key: ROLE_PERMISSION_KEYS.device.activationSchedule.addNewSchedule,
          },
          {
            label: 'View edit schedule',
            key: ROLE_PERMISSION_KEYS.device.activationSchedule.viewEditSchedule,
          },
          {
            label: 'Delete schedule',
            key: ROLE_PERMISSION_KEYS.device.activationSchedule.deleteSchedule,
          },
        ],
      },
      {
        label: 'Reports',
        key: ROLE_PERMISSION_KEYS.device.reports.root,
        items: [
          {
            label: 'View reports page',
            key: ROLE_PERMISSION_KEYS.device.reports.viewDeviceReports,
          },
        ],
      },
      {
        label: 'Location Settings',
        key: ROLE_PERMISSION_KEYS.device.locationSettings.root,
        items: [
          {
            label: 'View location settings page',
            key: ROLE_PERMISSION_KEYS.device.locationSettings.viewDeviceLocationSettings,
          },
          {
            label: 'View and edit location settings data',
            key: ROLE_PERMISSION_KEYS.device.locationSettings.viewEditDeviceLocationSettings,
          },
          // {
          //   label: 'Delete location settings data',
          //   key: ROLE_PERMISSION_KEYS.device.locationSettings.deleteDeviceLocationSettings,
          // },
        ],
      },
    ],
    // items: [
    //   { label: 'View device lists', key: ROLE_PERMISSION_KEYS.device.viewDeviceList },
    //   { label: 'Add and control device', key: ROLE_PERMISSION_KEYS.device.addAndControlDevice },
    //   { label: 'Swap device', key: ROLE_PERMISSION_KEYS.device.swapDevice },
    //   {
    //     label: 'View and create device schedule on and off',
    //     key: ROLE_PERMISSION_KEYS.device.viewCreateDeviceScheduleOnAndOff,
    //   },
    //   { label: 'Grouping devices', key: ROLE_PERMISSION_KEYS.device.groupingDevices },
    //   { label: 'Make device scene ', key: ROLE_PERMISSION_KEYS.device.makeDeviceScene },
    // ],
  },
  {
    label: 'Maintenance',
    key: ROLE_PERMISSION_KEYS.maintenance.root,
    items: [
      {
        label: 'View maintenance lists',
        key: ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceOverviewList,
      },
      {
        label: 'View maintenance schedule lists',
        key: ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceScheduleList,
      },
      {
        label: 'Add new schedule for maintenance',
        key: ROLE_PERMISSION_KEYS.maintenance.addNewScheduleForMaintenance,
      },
      {
        label: 'View and edit maintenance lists',
        key: ROLE_PERMISSION_KEYS.maintenance.viewEditMaintenanceList,
      },
      {
        label: 'Delete maintenance lists',
        key: ROLE_PERMISSION_KEYS.maintenance.deleteMaintenanceList,
      },
      {
        label: 'View report lists',
        key: ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceReportList,
      },
      {
        label: 'View procedure lists',
        key: ROLE_PERMISSION_KEYS.maintenance.viewMaintenanceProceduresList,
      },
    ],
  },
  {
    label: 'Incident',
    key: ROLE_PERMISSION_KEYS.incident.root,
    items: [
      { label: 'View incident lists', key: ROLE_PERMISSION_KEYS.incident.viewIncidentList },
      { label: 'Add new incident', key: ROLE_PERMISSION_KEYS.incident.addNewIncident },
      {
        label: 'Acknowledge and close incident event',
        key: ROLE_PERMISSION_KEYS.incident.acknowledgeAndIncidentEvent,
      },
      { label: 'Delete incident lists', key: ROLE_PERMISSION_KEYS.incident.deleteIncidentList },
      { label: 'View incident report lists', key: ROLE_PERMISSION_KEYS.incident.viewIncidentReportList },
      { label: 'View incident type lists', key: ROLE_PERMISSION_KEYS.incident.viewIncidentType },
    ],
  },
  {
    label: 'Feedback',
    key: ROLE_PERMISSION_KEYS.feedback.root,
    items: [
      {
        label: 'View feedback overview page',
        key: ROLE_PERMISSION_KEYS.feedback.viewFeedbackOverviewPage,
      },
      {
        label: 'Edit and add new feedback form',
        key: ROLE_PERMISSION_KEYS.feedback.editAndAddNewFeedbackForm,
      },
      {
        label: 'Delete feedback assignments',
        key: ROLE_PERMISSION_KEYS.feedback.deleteFeedbackAssignments,
      },
      {
        label: 'View feedback form template page',
        key: ROLE_PERMISSION_KEYS.feedback.viewFeedbackTemplatePage,
      },
      {
        label: 'View feedback inbox page',
        key: ROLE_PERMISSION_KEYS.feedback.viewInboxList,
      },
      {
        label: 'View feedback report page',
        key: ROLE_PERMISSION_KEYS.feedback.viewReport,
      },
      {
        label: 'View feedback location page',
        key: ROLE_PERMISSION_KEYS.feedback.viewLocation,
      },
      {
        label: 'View feedback archive page',
        key: ROLE_PERMISSION_KEYS.feedback.viewArchive,
      },
    ],
  },
  {
    label: 'Predictive Analysis',
    key: ROLE_PERMISSION_KEYS.predictiveAnalysis.root,
    items: [
      // {
      //   path: '/predictive-analysis/student-statistics',
      //   label: 'Student Statistics',
      //   permissions: [...ROUTE_PERMISSION_MAPPING.predictiveAnalysis.student],
      // },
      {
        label: 'Washroom Statistics',
        key: ROLE_PERMISSION_KEYS.predictiveAnalysis.viewWashroomStat,
      },
      {
        label: 'Resources Allocation',
        key: ROLE_PERMISSION_KEYS.predictiveAnalysis.viewResourceAloc,
      },
      {
        label: 'Configuration',
        key: ROLE_PERMISSION_KEYS.predictiveAnalysis.viewConfig,
      },
    ],
  },
  {
    label: 'Notification',
    key: ROLE_PERMISSION_KEYS.notification.root,
    items: [
      { label: 'View notification', key: ROLE_PERMISSION_KEYS.notification.viewNotification },
      {
        label: 'View device notification',
        key: ROLE_PERMISSION_KEYS.notification.viewDeviceNotification,
      },
      {
        label: 'View feedback notification',
        key: ROLE_PERMISSION_KEYS.notification.viewFeedbackNotification,
      },
      {
        label: 'View audit notification',
        key: ROLE_PERMISSION_KEYS.notification.viewAuditNotification,
      },
      {
        label: 'Acknowledge and delete notification',
        key: ROLE_PERMISSION_KEYS.notification.acknowledgeAndDeleteNotification,
      },
    ],
  },
  {
    label: 'Alert',
    key: ROLE_PERMISSION_KEYS.alert.root,
    items: [
      { label: 'View alert', key: ROLE_PERMISSION_KEYS.alert.viewAlert },
      { label: 'Remind alert', key: ROLE_PERMISSION_KEYS.alert.remindAlert },
      { label: 'Assign alert to user', key: ROLE_PERMISSION_KEYS.alert.assignAlertToUser },
    ],
  },
  {
    label: 'Settings',
    key: ROLE_PERMISSION_KEYS.settings.root,
    subPermissions: [
      {
        label: 'Users',
        key: ROLE_PERMISSION_KEYS.settings.users.root,
        items: [
          { label: 'View users page', key: ROLE_PERMISSION_KEYS.settings.users.viewUsersPage },
          { label: 'Add or edit users', key: ROLE_PERMISSION_KEYS.settings.users.addOrEditUsers },
          { label: 'Delete users', key: ROLE_PERMISSION_KEYS.settings.users.deleteUsers },
        ],
      },
      {
        label: 'Roles and modules',
        key: ROLE_PERMISSION_KEYS.settings.roles.root,
        items: [
          {
            label: 'View roles and modules page',
            key: ROLE_PERMISSION_KEYS.settings.roles.viewRolesAndModulesPage,
          },
          {
            label: 'Add or edit roles and modules',
            key: ROLE_PERMISSION_KEYS.settings.roles.addOrEditRolesAndModules,
          },
        ],
      },
      {
        label: 'Location Data',
        key: ROLE_PERMISSION_KEYS.settings.locationData.root,
        items: [
          {
            label: 'View type and location page',
            key: ROLE_PERMISSION_KEYS.settings.locationData.viewTypeAndLocationPage,
          },
          {
            label: 'Add or edit type and locations',
            key: ROLE_PERMISSION_KEYS.settings.locationData.addOrEditTypeAndLocations,
          },
          {
            label: 'Delete type and locations',
            key: ROLE_PERMISSION_KEYS.settings.locationData.deleteTypeAndLocations,
          },
        ],
      },
    ],
  },
  {
    label: 'Reports',
    key: 'reports',
    items: [
      { label: 'View overview page', key: 'view-overview-page' },
      {
        label: 'View turn around Time (TAT) report page',
        key: 'view-turn-around-time-report-page',
      },
      { label: 'View feedback summary report page', key: 'view-feedback-summary-report-page' },
      { label: 'View feedback log page', key: 'view-feedback-log-page' },
      { label: 'View data usage page', key: 'view-data-usage-page' },
    ],
  },
  {
    label: 'Mobile App',
    key: ROLE_MOBILE_KEYS.root,
    items: [
      { label: 'Auditor', key: ROLE_MOBILE_KEYS.auditor },
      { label: 'Supervisor', key: ROLE_MOBILE_KEYS.supervisor },
      { label: 'Cleaner', key: ROLE_MOBILE_KEYS.cleaner },
    ],
  },
]

