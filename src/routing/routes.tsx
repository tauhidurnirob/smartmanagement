import { RouteObject, Navigate, Outlet } from 'react-router-dom'
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Dashboard from '../pages/dashboard/Dashboard'

import { IRouteInfo } from '../types/route'
import PrivateLayout from './PrivateLayout'
import PublicLayout from './PublicLayout'
import { DashboardIcon } from '../assets/icons/dashboard'
import { AuditIcon } from '../assets/icons/audit'
import Audit from '../pages/audit/Audit'
import Incident from '../pages/incident/Incident'
import { IncidentIcon } from '../assets/icons/incident'
import { MaintenanceIcon } from '../assets/icons/maintenance'
import Maintenance from '../pages/maintenance/Maintanance'
import Washroom from '../pages/washroom/Washroom'
import { WashroomIcon } from '../assets/icons/washroom'
import Device from '../pages/device/Device'
import { DeviceIcon } from '../assets/icons/device'
import Feedback from '../pages/feedback/Feedback'
import { FeedbackIcon } from '../assets/icons/feedback'
import reactLazyWithRetry from '@fatso83/retry-dynamic-import/react-lazy'
import TaskManagement from '../pages/task-management/TaskManagement'
import { SettingIcon } from '../assets/icons/settings'
import Settings from '../pages/settings/Settings'
import AlertList from '../pages/alert/AlertList'
import { ReportIcon } from '../assets/icons/report'
import Report from '../pages/report/Report'
import NotificationList from '../pages/notification/NotificationList'
import { ActivityLogIcon } from '../assets/icons/activity-log'
import ActivityLog from '../pages/activity-log/ActivityLog'
import PredictiveAnalysis from '../pages/predictive-analysis/PredictiveAnalysis'
import { ROUTES, ROUTE_PERMISSION_MAPPING } from '../helpers/constants'
import ErrorLayout from '../pages/errors/ErrorLayout'
import Error403 from '../pages/errors/components/Error403'
import Error404 from '../pages/errors/components/Error404'
import Error500 from '../pages/errors/components/Error500'
import PermissionWrapper from './PermissionWrapper'
import { PerformanceIcon } from '../assets/icons/performance'
import Performance from '../pages/performance-management/Performance'
import PerformanceTaskAllocationAutomationTaskFlowChart from '../pages/performance-management/PerformanceTaskAllocationAutomationTaskFlowChart'
import DeviceAction from '../pages/device/DeviceAction'
import DeviceValueList from '../pages/device/DeviceValueList'

const DashboardOverview = reactLazyWithRetry(
  () => import(/* webpackChunkName: "dashboard-overview */ '../pages/dashboard/DashboardOverview')
)
const DashboardCalendar = reactLazyWithRetry(
  () => import(/* webpackChunkName: "dashboard-calendar */ '../pages/dashboard/DashboardCalendar')
)
const DashboardOverviewDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "dashboard-overview-detail */ '../pages/dashboard/DashboardOverviewDetail'
    )
)
const AuditOverview = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-overview */ '../pages/audit/AuditOverview')
)

const AuditInsight = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-insight */ '../pages/audit/AuditInsight')
)
const AuditFormula = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-formula */ '../pages/audit/AuditFormula')
)

const PerformanceTaskAllocationRoutineTaskcreate = reactLazyWithRetry(
  () => import('../pages/performance-management/PerformanceInHouseRoutineCreate')
)

const AuditFormulaCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-formula-create */ '../pages/audit/AuditFormulaCreate')
)

const AuditSchedule = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-schedule-list */ '../pages/audit/AuditSchedule')
)

const AuditScheduleCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-schedule-create */ '../pages/audit/AuditScheduleCreate')
)

const AuditScheduleEdit = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-schedule-edit */ '../pages/audit/AuditScheduleEdit')
)

const AuditProjectSite = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-project-site */ '../pages/audit/AuditProjectSite')
)

const AuditProjectSiteCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "audit-project-site-create */ '../pages/audit/AuditProjectSiteCreate'
    )
)
const AuditFormTemplate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-form-template */ '../pages/audit/AuditFormTemplate')
)
const AuditFormTemplateCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "audit-form-template-create */ '../pages/audit/AuditFormTemplateCreate'
    )
)
const AuditRecycleBin = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-recycle-bin */ '../pages/audit/AuditRecycleBin')
)
const AuditDetails = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-details */ '../pages/audit/AuditDetails')
)
const AuditResult = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-result */ '../pages/audit/AuditResult')
)
const AuditLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-result */ '../pages/audit/AuditLog')
)
const AuditRatingTemplateCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "audit-rating-template-create */ '../pages/audit/AuditRatingTemplateCreate'
    )
)
const AuditRatingTemplateEdit = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "audit-rating-template-edit */ '../pages/audit/AuditRatingTemplateEdit'
    )
)
const AuditRatingView = reactLazyWithRetry(
  () => import(/* webpackChunkName: "audit-rating-view */ '../pages/audit/AuditRatingView')
)
// Maintanance module

const MaintanenceOverview = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "maintanance-overview */ '../pages/maintenance/MaintenanceOverview')
)
const MaintenanceDetail = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "maintanance-detail */ '../pages/maintenance/MaintenanceDetailPage')
)
const MaintanenceSchedule = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "maintanance-schedule */ '../pages/maintenance/MaintenanceSchedule')
)
const MaintanenceScheduleCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "maintanance-schedule-create */ '../pages/maintenance/MaintenanceCreate'
    )
)
const MaintanenceScheduleDetails = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "maintanance-schedule-details */ '../pages/maintenance/MaintenanceScheduleDetailPage'
    )
)
const MaintanenceReports = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "maintanance-reports */ '../pages/maintenance/MaintenanceReports')
)
const MaintanenceProcedures = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "maintanance-procedures */ '../pages/maintenance/MaintenanceProcedures'
    )
)
const MaintanenceProcedureDetails = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "maintanance-procedure-details */ '../pages/maintenance/MaintenanceProcedureDetails'
    )
)
const MaintanenceProcedureCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "maintanance-procedure-create */ '../pages/maintenance/MaintenanceProcedureCreate'
    )
)

const IncidentOverview = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-overview */ '../pages/incident/IncidentOverview')
)
const IncidentReport = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-report */ '../pages/incident/IncidentReport')
)
const IncidentTypes = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-types */ '../pages/incident/IncidentTypes')
)
const IncidentTypeCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-type-create */ '../pages/incident/IncidentTypeCreate')
)
const IncidentTypeEdit = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-type-edit */ '../pages/incident/IncidentTypeEdit')
)
const IncidentCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-create */ '../pages/incident/IncidentCreate')
)
const IncidentDetail = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-detail */ '../pages/incident/IncidentDetailPage')
)

const WashroomOverview = reactLazyWithRetry(
  () => import(/* webpackChunkName: "washroom-overview */ '../pages/washroom/WashroomOverview')
)
const WashroomIncident = reactLazyWithRetry(
  () => import(/* webpackChunkName: "washroom-incident */ '../pages/washroom/WashroomIncident')
)
const WashroomIncidentCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "washroom-incident-create */ '../pages/washroom/WashroomIncidentCreate'
    )
)
const WashroomIncidentDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "washroom-incident-detail */ '../pages/washroom/WashroomIncidentDetail'
    )
)
const WashroomReports = reactLazyWithRetry(
  () => import(/* webpackChunkName: "washroom-reports */ '../pages/washroom/WashroomReports')
)
const WashroomLocationSettings = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "washroom-location-settings */ '../pages/washroom/WashroomLocationSettings'
    )
)
const WashroomLocationSettingsDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "washroom-location-detail */ '../pages/washroom/WashroomLocationSettingsDetail'
    )
)
const WashroomThresholdSettings = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "washroom-threshold-settings */ '../pages/washroom/WashroomThresholdSettings'
    )
)

const DeviceOverview = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-overview */ '../pages/device/DeviceOverview')
)
const DeviceDetail = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-detail */ '../pages/device/DeviceDetail')
)
const DeviceCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-create */ '../pages/device/DeviceCreate')
)
const DeviceControl = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-control-list */ '../pages/device/DeviceControl')
)
const DeviceControlDetail = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-control-detail */ '../pages/device/DeviceControlDetail')
)
const DeviceSwap = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-swap-list */ '../pages/device/DeviceSwap')
)
const DeviceGroup = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-group-list */ '../pages/device/DeviceGroup')
)
const DeviceGroupDetail = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-group-list */ '../pages/device/DeviceGroupDetail')
)
const DeviceGroupCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-group-list */ '../pages/device/DeviceGroupCreate')
)
const DeviceLinkage = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-linkage-list */ '../pages/device/DeviceLinkage')
)
const DeviceLinkageDetail = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-linkage-detail */ '../pages/device/DeviceLinkageDetail')
)
const DeviceLinkageCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-linkage-create */ '../pages/device/DeviceLinkageCreate')
)
const DeviceSchedule = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-schedule-list */ '../pages/device/DeviceSchedule')
)
const DeviceScheduleDetail = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "device-schedule-detail */ '../pages/device/DeviceScheduleDetail')
)
const DeviceScheduleCreate = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "device-schedule-create */ '../pages/device/DeviceScheduleCreate')
)
const DeviceReports = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-reports */ '../pages/device/DeviceReports')
)
const DeviceLocationSettings = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "device-location-settings */ '../pages/device/DeviceLocationSettings'
    )
)
const DeviceLocationSettingDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "device-location-setting-detail */ '../pages/device/DeviceLocationSettingDetail'
    )
)

// Feedback module

const FeedbackeOverview = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-overview */ '../pages/feedback/FeedbackOverview')
)
const FeedbackDetails = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-details */ '../pages/feedback/FeedbackDetailsPage')
)
const FeedbackRecentActivity = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "feedback-recent-activity */ '../pages/feedback/FeedbackRecentActivity'
    )
)
const FeedbackFormTemplate = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "feedback-form-template */ '../pages/feedback/FeedbackFormTemplate')
)
const FeedbackFormTemplateCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "feedback-form-template */ '../pages/feedback/FeedbackFormTemplateCreate'
    )
)
const FeedbackFormDetails = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "feedback-form-details */ '../pages/feedback/FeedbackFormDetailsPage'
    )
)
const FeedbackInbox = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-inbox */ '../pages/feedback/FeedbackInbox')
)
const FeedbackReport = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-report */ '../pages/feedback/FeedbackReport')
)
const FeedbackLocation = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-location */ '../pages/feedback/FeedbackLocation')
)
const FeedbackArchive = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-archive */ '../pages/feedback/FeedbackArchive')
)
const FeedbackRatingTemplateCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "feedback-rating-template-create */ '../pages/feedback/FeedbackRatingTemplateCreate'
    )
)
const FeedbackRatingTemplateEdit = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "feedback-rating-template-edit */ '../pages/feedback/FeedbackRatingTemplateEdit'
    )
)
const FeedbackRatingView = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-rating-view */ '../pages/feedback/FeedbackRatingView')
)

// Settings module
const SettingRoles = reactLazyWithRetry(
  () => import(/* webpackChunkName: "setting-roles */ '../pages/settings/SettingRoles')
)
const SettingUsers = reactLazyWithRetry(
  () => import(/* webpackChunkName: "setting-users */ '../pages/settings/SettingUsers')
)
const SettingProjects = reactLazyWithRetry(
  () => import(/* webpackChunkName: "setting-projects */ '../pages/settings/SettingProjects')
)
const UserDetail = reactLazyWithRetry(
  () => import(/* webpackChunkName: "setting-user-detail */ '../pages/settings/UserDetail')
)
const UserCreate = reactLazyWithRetry(
  () => import(/* webpackChunkName: "setting-user-create */ '../pages/settings/UserCreate')
)
const SettingProjectDetail = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "setting-project-detail */ '../pages/settings/SettingProjectDetail')
)

// Activity Logs
const AuditActivityLog = reactLazyWithRetry(
  () =>
    import(/* webpackChunkName: "audit-activity-log" */ '../pages/activity-log/AuditActivityLog')
)
const DeviceActivityLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "device-activity-log" */ '../pages/activity-log/DeviceLog')
)
const WashroomActivityLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "washroom-activity-log" */ '../pages/activity-log/WashroomLog')
)
const MaintenanceActivityLog = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "maintenance-activity-log" */ '../pages/activity-log/MaintenanceLog'
    )
)
const IncidentActivityLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "incident-activity-log" */ '../pages/activity-log/IncidentLog')
)
const FeedbackActivityLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "feedback-activity-log" */ '../pages/activity-log/FeedbackLog')
)
const ReportActivityLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "report-activity-log" */ '../pages/activity-log/ReportLog')
)
const UserActivityLog = reactLazyWithRetry(
  () => import(/* webpackChunkName: "user-activity-log" */ '../pages/activity-log/UserLog')
)

// Predictive Analysis
const StudentStatistics = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "studuent-statistics" */ '../pages/predictive-analysis/StudentStatistics'
    )
)
const WashroomStatistics = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "washroom-statistics" */ '../pages/predictive-analysis/WashroomStatistics'
    )
)
const ResourcesAllocation = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "resources-allocation" */ '../pages/predictive-analysis/ResourcesAllocation'
    )
)
const PredictiveAnalysisConfiguration = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "predictive-analysis-configuration" */ '../pages/predictive-analysis/PredictiveAnalysisConfiguration'
    )
)

// Task Management
const TaskManagementOverview = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-overview */ '../pages/task-management/TaskManagementOverview'
    )
)
const TaskManagementOnDutyCleanerList = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-overview */ '../pages/task-management/TaskManagementOnDutyCleanerList'
    )
)
const TaskSchedule = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-schedule */ '../pages/task-management/TaskSchedule'
    )
)
const TaskStaffList = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-staff-list */ '../pages/task-management/TaskStaffList'
    )
)
const TaskStaffAttendance = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-staff-attendance */ '../pages/task-management/TaskStaffAttendance'
    )
)
const TaskStaffLeave = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-staff-leave */ '../pages/task-management/TaskStaffLeave'
    )
)
const TaskStaffLeaveDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-staff-leave-detail */ '../pages/task-management/TaskStaffLeaveDetail'
    )
)
const TaskActivity = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "task-management-activity */ '../pages/task-management/TaskActivity'
    )
)

// Performance Management
const PerformanceOverview = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-overview */ '../pages/performance-management/PerformanceOverview'
    )
)
const PerformanceOverviewTaskDetailsPage = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-overview-task-details */ '../pages/performance-management/PerformanceOverviewTaskDetailsPage'
    )
)
const PerformanceTaskAllocationInitSetting = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-init-setting */ '../pages/performance-management/PerformanceTaskAllocationInitSetting'
    )
)
const PerformanceTaskAllocationInitSettingDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-init-setting-detail */ '../pages/performance-management/PerformanceTaskAllocationInitSettingDetail'
    )
)
const PerformanceTaskAllocationRoutineTask = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-routine-task */ '../pages/performance-management/PerformanceTaskAllocationRoutineTask'
    )
)
const PerformanceTaskAllocationPeriodicTask = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-periodic-task */ '../pages/performance-management/PerformanceTaskAllocationPeriodicTask'
    )
)

const PerformanceTaskAllocationPeriodicTaskcreate = reactLazyWithRetry(
  () => import('../pages/performance-management/PerformanceInHousePeriodicCreate')
)

const PerformanceTaskAllocationAdHocTask = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-ad-hoc-task */ '../pages/performance-management/PerformanceTaskAllocationAdHocTask'
    )
)
const PerformanceTaskAllocationAdHocTaskCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-ad-hoc-task */ '../pages/performance-management/PerformanceTaskAllocationAdHocTaskCreate'
    )
)
const PerformanceTaskAllocationAdHocTaskDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-ad-hoc-task */ '../pages/performance-management/PerformanceTaskAllocationAdHocTaskDetail'
    )
)
const PerformanceTaskAllocationAutomationTask = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-automation-task */ '../pages/performance-management/PerformanceTaskAllocationAutomationTask'
    )
)
const PerformanceTaskAllocationAutomationTaskCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-automation-task-create */ '../pages/performance-management/PerformanceTaskAllocationAutomationTaskCreate'
    )
)
const PreformanceTaskAutomationDetail = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-automation-task-create */ '../pages/performance-management/PreformanceTaskAutomationDetail'
    )
)

const PerformanceTaskAllocationAutomationTaskFlowCharts = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-task-allocation-automation-task-create */ '../pages/performance-management/PerformanceTaskAllocationAutomationTaskFlowChart'
    )
)
const PerformanceInHouseOjtTraining = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-in-house-ojt-training */ '../pages/performance-management/PerformanceInHouseOjtTraining'
    )
)
const PerformanceInHouseOjtTrainingCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-in-house-ojt-training-create */ '../pages/performance-management/PerformanceInHouseOjtCreate'
    )
)
const PerformanceInHouseOjtTrainingStatus = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-in-house-ojt-status */ '../pages/performance-management/PerformanceInHouseOjtStatus'
    )
)
const PerformanceInHouseSopTraining = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-in-house-sop-training */ '../pages/performance-management/PerformanceInHouseSopTraining'
    )
)
const PerformanceInHouseSopTrainingCreate = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-in-house-sop-training-create */ '../pages/performance-management/PerformanceInHouseSopCreate'
    )
)
const PerformanceInHouseSopTrainingDetails = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-in-house-sop-training-details */ '../pages/performance-management/PerformanceInHouseSopDetails'
    )
)
const PerformanceStaff = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-staff */ '../pages/performance-management/PerformanceStaff'
    )
)
const PerformancePredictionDataList = reactLazyWithRetry(
  () =>
    import(
      /* webpackChunkName: "performance-management-prediction-data-list */ '../pages/performance-management/PerformancePredictionDataList'
    )
)

// Route List for left navbar
export const navRouteInfos: IRouteInfo[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
    children: [
      {
        path: '/dashboard/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.dashboard.overview,
        ],
      },
      {
        path: '/dashboard/calendar',
        label: 'Calendar',
        permissions: [...ROUTE_PERMISSION_MAPPING.dashboard.calendar],
      },
    ],
  },
  {
    path: '/performance-management',
    label: 'Performance Management',
    icon: PerformanceIcon,
    children: [
      {
        path: '/performance-management/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
          ...ROUTE_PERMISSION_MAPPING.taskManagement.overviewRoot,
          ...ROUTE_PERMISSION_MAPPING.taskManagement.overview,
        ],
      },
      {
        path: '/performance-management/task-allocation',
        label: 'Task Allocation',
        childrenLabel: 'Performance Management System',
        children: [
          {
            path: '/performance-management/task-allocation/init-settings',
            label: 'Initial Settings',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocation,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocationInitialSetting,
            ],
          },
          {
            path: '/performance-management/task-allocation/routine-task',
            label: 'Routine Task',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocation,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocationRoutineTask,
            ],
          },
          {
            path: '/performance-management/task-allocation/periodic-task',
            label: 'Periodic Task',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocation,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocationPeriodicTask,
            ],
          },
          {
            path: '/performance-management/task-allocation/ad-hoc-task',
            label: 'Ad-Hoc Task',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocation,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocationAdHocTask,
            ],
          },
          {
            path: '/performance-management/task-allocation/automation-task',
            label: 'Automation Task',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocation,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.taskAllocationAutomationTask,
            ],
          },
        ],
        
      },
      {
        path: '/performance-management/in-house-training',
        label: 'In-House Training',
        children: [
          {
            path: '/performance-management/in-house-training/sop',
            label: 'SOP (Cleaning Processes)',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.inHouseTraining,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.inHouseTrainingSOP,
            ],
          },
          {
            path: '/performance-management/in-house-training/ojt',
            label: 'OJT (On-The-Job)',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.inHouseTraining,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.inHouseTrainingViewOJT,
            ],
          },
        ],
      },
      {
        path: '/performance-management/staff',
        label: 'Staff',
        children: [
          {
            path: '/performance-management/staff/list',
            label: 'Staff List',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.staff,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.staffList,
            ],
          },
          {
            path: '/performance-management/staff/attendance',
            label: 'Staff Attendance',
            permissions: [...ROUTE_PERMISSION_MAPPING.taskManagement.staff,...ROUTE_PERMISSION_MAPPING.taskManagement.staffAttendanceList],
          },
          {
            path: '/performance-management/staff/leave',
            label: 'Staff Leave Application',
            permissions: [
              ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.staff,
              ...ROUTE_PERMISSION_MAPPING.taskManagement.staffLeaveList,
            ],
          },
        ],
      },
      {
        path: '/performance-management/prediction-data-list',
        label: 'Prediction Data List',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.taskManagement.root,
          ...ROUTE_PERMISSION_MAPPING.taskManagement.predictionData,
          ...ROUTE_PERMISSION_MAPPING.taskManagement.predictionDataList,
        ],
      },
    ],
  },
  {
    path: '/audit',
    label: 'Audit',
    icon: AuditIcon,
    children: [
      {
        path: '/audit/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.overview,
          ...ROUTE_PERMISSION_MAPPING.audit.overviewList,
        ],
      },
      {
        path: '/audit/insight',
        label: 'Performance Data',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.insight,
          ...ROUTE_PERMISSION_MAPPING.audit.insightView],
      },
      {
        path: '/audit/result',
        label: 'Audit Result',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.result,
          ...ROUTE_PERMISSION_MAPPING.audit.resultList,
        ],
      },
      {
        path: '/audit/log',
        label: 'Audit Log',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.log,
          ...ROUTE_PERMISSION_MAPPING.audit.logList,
        ],
      },
      {
        path: '/audit/schedule',
        label: 'Schedule',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.scheduleList,
          ...ROUTE_PERMISSION_MAPPING.audit.scheduleView,
        ],
      },
      {
        path: '/audit/project-site',
        label: 'Project Site',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.projectSiteList,
          ...ROUTE_PERMISSION_MAPPING.audit.projectSiteView,
        ],
      },
      {
        path: '/audit/audit-form-template',
        label: 'Audit Form Template',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.formTemplateList,
          ...ROUTE_PERMISSION_MAPPING.audit.formTemplateView,
        ],
      },
      {
        path: '/audit/recycle-bin',
        label: 'Recycle Bin',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.audit.root,
          ...ROUTE_PERMISSION_MAPPING.audit.recycleBin,
          ...ROUTE_PERMISSION_MAPPING.audit.recycleBinList],
      },
    ],
  },
  {
    path: '/device',
    label: 'Device',
    icon: DeviceIcon,
    children: [
      {
        path: '/device/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.overviewRoot,
          ...ROUTE_PERMISSION_MAPPING.device.overview,
        ],
      },
      {
        path: '/device/device-list',
        label: 'Device List',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.overviewRoot,
          ...ROUTE_PERMISSION_MAPPING.device.overview,
        ],
      },
      {
        path: '/device/control',
        label: 'Device Control',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceControl,
          ...ROUTE_PERMISSION_MAPPING.device.deviceControlList,
        ],
      },
      {
        path: '/device/swap',
        label: 'Device Swap',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceSwapView,
          ...ROUTE_PERMISSION_MAPPING.device.deviceSwapViewList],
      },
      {
        path: '/device/group',
        label: 'Device Group',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceGroup,
          ...ROUTE_PERMISSION_MAPPING.device.deviceGroupList,
        ],
      },
      {
        path: '/device/linkage',
        label: 'Device Linkage',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceLinkage,
          ...ROUTE_PERMISSION_MAPPING.device.deviceLinkageList,
        ],
      },
      {
        path: '/device/activation-schedule',
        label: 'Activation Schedule',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceActivationSchedule,
          ...ROUTE_PERMISSION_MAPPING.device.deviceActivationScheduleList,
        ],
      },
      {
        path: '/device/reports',
        label: 'Reports',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceReport,
          ...ROUTE_PERMISSION_MAPPING.device.deviceReportList],
      },
      {
        path: '/device/location-settings',
        label: 'Location Settings',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.device.root,
          ...ROUTE_PERMISSION_MAPPING.device.deviceLocationSettings,
          ...ROUTE_PERMISSION_MAPPING.device.deviceLocationSettingsList,
        ],
      },
    ],
  },
  {
    path: '/washroom',
    label: 'Washroom Management',
    icon: WashroomIcon,
    children: [
      {
        path: '/washroom/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.washroom.root,
          ...ROUTE_PERMISSION_MAPPING.washroom.overviewRoot,
          ...ROUTE_PERMISSION_MAPPING.washroom.overview],
      },
      {
        path: '/washroom/incident',
        label: 'Incident',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.washroom.root,
          ...ROUTE_PERMISSION_MAPPING.washroom.incident,
          ...ROUTE_PERMISSION_MAPPING.washroom.incidentList,
        ],
      },
      {
        path: '/washroom/reports',
        label: 'Reports',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.washroom.root,
          ...ROUTE_PERMISSION_MAPPING.washroom.reports,
          ...ROUTE_PERMISSION_MAPPING.washroom.reportList],
      },
      {
        path: '/washroom/location-settings',
        label: 'Location Settings',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.washroom.root,
          ...ROUTE_PERMISSION_MAPPING.washroom.locationSetting,
          ...ROUTE_PERMISSION_MAPPING.washroom.locationSettingList,
        ],
      },
      {
        path: '/washroom/threshold-settings',
        label: 'Threshold Settings',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.washroom.root,
          ...ROUTE_PERMISSION_MAPPING.washroom.thresholingSettings,
          ...ROUTE_PERMISSION_MAPPING.washroom.thresholingSettingsList],
      },
    ],
  },
  {
    path: '/maintenance',
    label: 'Maintenance',
    icon: MaintenanceIcon,
    children: [
      {
        path: '/maintenance/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.maintenance.overview,
          ...ROUTE_PERMISSION_MAPPING.maintenance.overviewDetail,
        ],
      },
      {
        path: '/maintenance/schedule',
        label: 'Schedule',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.maintenance.scheduleList,
          ...ROUTE_PERMISSION_MAPPING.maintenance.scheduleCreate,
          ...ROUTE_PERMISSION_MAPPING.maintenance.scheduleDetail,
        ],
      },
      {
        path: '/maintenance/reports',
        label: 'Reports',
        permissions: [...ROUTE_PERMISSION_MAPPING.maintenance.report],
      },
      {
        path: '/maintenance/procedures',
        label: 'Procedures',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.maintenance.procedureList,
          ...ROUTE_PERMISSION_MAPPING.maintenance.procedureCreate,
          ...ROUTE_PERMISSION_MAPPING.maintenance.procedureDetail,
        ],
      },
    ],
  },
  {
    path: '/incident',
    label: 'Incident',
    icon: IncidentIcon,
    children: [
      {
        path: '/incident/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.incident.overview,
          ...ROUTE_PERMISSION_MAPPING.incident.overviewDetail,
          ...ROUTE_PERMISSION_MAPPING.incident.overviewCreate,
        ],
      },
      {
        path: '/incident/report',
        label: 'Report',
        permissions: [...ROUTE_PERMISSION_MAPPING.incident.report],
      },
      {
        path: '/incident/incident-type',
        label: 'Incident Type',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.incident.incidentTypeList,
          ...ROUTE_PERMISSION_MAPPING.incident.incidentTypeCreate,
          ...ROUTE_PERMISSION_MAPPING.incident.incidentTypeDetail,
        ],
      },
    ],
  },
  {
    path: '/feedback',
    label: 'Feedback',
    icon: FeedbackIcon,
    children: [
      {
        path: '/feedback/overview',
        label: 'Overview',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.feedback.overview,
          
        ],
      },
      {
        path: '/feedback/form-template',
        label: 'Feedback Form Template',
        permissions: [...ROUTE_PERMISSION_MAPPING.feedback.formTemplateList],
      },
      {
        path: '/feedback/inbox',
        label: 'Inbox',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.feedback.inboxList,
          ...ROUTE_PERMISSION_MAPPING.feedback.inboxDetail,
          ...ROUTE_PERMISSION_MAPPING.feedback.inboxLabel,
        ],
      },
      {
        path: '/feedback/report',
        label: 'Report',
        permissions: [...ROUTE_PERMISSION_MAPPING.feedback.report],
      },
      {
        path: '/feedback/location',
        label: 'Location Data',
        permissions: [...ROUTE_PERMISSION_MAPPING.feedback.location],
      },
      {
        path: '/feedback/archive',
        label: 'Archive',
        permissions: [...ROUTE_PERMISSION_MAPPING.feedback.archive],
      },
    ],
  },
  {
    path: '/predictive-analysis',
    label: 'Predictive Analysis',
    icon: RemoveRedEyeOutlinedIcon,
    children: [
      // {
      //   path: '/predictive-analysis/student-statistics',
      //   label: 'Student Statistics',
      //   permissions: [...ROUTE_PERMISSION_MAPPING.predictiveAnalysis.student],
      // },
      {
        path: '/predictive-analysis/washroom-statistics',
        label: 'Washroom Statistics',
        permissions: [...ROUTE_PERMISSION_MAPPING.predictiveAnalysis.washroom],
      },
      {
        path: '/predictive-analysis/resources-allocation',
        label: 'Resources Allocation',
        permissions: [...ROUTE_PERMISSION_MAPPING.predictiveAnalysis.resourceAllocation],
      },
      {
        path: '/predictive-analysis/configuration',
        label: 'Configuration',
        permissions: [...ROUTE_PERMISSION_MAPPING.predictiveAnalysis.configuration],
      },
    ],
  },
  {
    path: '/notification',
    label: 'Notification',
    icon: NotificationImportantOutlinedIcon,
    permissions: [...ROUTE_PERMISSION_MAPPING.notification.root],
  },
  {
    path: '/alert',
    label: 'Alert',
    icon: NotificationImportantOutlinedIcon,
    permissions: [...ROUTE_PERMISSION_MAPPING.alert.alertList],
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: SettingIcon,
    children: [
      {
        path: '/settings/roles',
        label: 'Role and Module Assignment',
        permissions: [...ROUTE_PERMISSION_MAPPING.settings.roleList],
      },
      {
        path: '/settings/users',
        label: 'Users',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.settings.userList,
          ...ROUTE_PERMISSION_MAPPING.settings.userDetail,
          ...ROUTE_PERMISSION_MAPPING.settings.userCreate,
        ],
      },
      {
        path: '/settings/projects',
        label: 'Projects',
        permissions: [
          ...ROUTE_PERMISSION_MAPPING.settings.projectList,
          ...ROUTE_PERMISSION_MAPPING.settings.projectDetail,
        ],
      },
    ],
  },
  {
    path: '/report',
    label: 'Report',
    icon: ReportIcon,
    permissions: [...ROUTE_PERMISSION_MAPPING.report.root],
  },
  {
    path: '/activity-logs',
    label: 'Activity Log',
    icon: ActivityLogIcon,
    children: [
      {
        path: '/activity-logs/audit',
        label: 'Audit Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.audit],
      },
      {
        path: '/activity-logs/device',
        label: 'Device Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.device],
      },
      {
        path: '/activity-logs/washroom',
        label: 'Washroom Management Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.washroom],
      },
      {
        path: '/activity-logs/maintenance',
        label: 'Maintenance Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.maintenance],
      },
      {
        path: '/activity-logs/incident',
        label: 'Incident Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.incident],
      },
      {
        path: '/activity-logs/feedback',
        label: 'Feedback Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.feedback],
      },
      {
        path: '/activity-logs/report',
        label: 'Report Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.report],
      },
      {
        path: '/activity-logs/user',
        label: 'User Log',
        permissions: [...ROUTE_PERMISSION_MAPPING.activityLogs.user],
      },
    ],
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: (
      <PermissionWrapper allowedPermissions={[]}>
        <Dashboard />
      </PermissionWrapper>
    ),
    children: [
       { index: false, element: <Navigate to='/dashboard/overview' /> },
      {
        path: 'overview',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DashboardOverview />
              </PermissionWrapper>
            ),
          },
          {
            path: ':locationId',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.dashboard.overviewDetail}
              >
                <DashboardOverviewDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'calendar',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.dashboard.calendar}>
            <DashboardCalendar />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'incident',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.root}>
        <Incident />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/incident/overview' /> },
      {
        path: 'overview',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.overview}>
            <IncidentOverview />
          </PermissionWrapper>
        ),
      },
      {
        path: 'report',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.report}>
            <IncidentReport />
          </PermissionWrapper>
        ),
      },
      {
        path: 'incident-type',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.incidentTypeList}
          >
            <IncidentTypes />
          </PermissionWrapper>
        ),
      },
      {
        path: 'incident-type/create',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.incidentTypeCreate}
          >
            <IncidentTypeCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'incident-type/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.incidentTypeDetail}
          >
            <IncidentTypeEdit />
          </PermissionWrapper>
        ),
      },
      {
        path: 'overview/create',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.overviewCreate}>
            <IncidentCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'overview/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.incident.overviewDetail}>
            <IncidentDetail />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'audit',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.root}>
        <Audit />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/audit/overview' /> },
      {
        path: 'overview',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.overviewList}>
            <AuditOverview />
          </PermissionWrapper>
        ),
      },
      {
        path: 'overview/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.overviewDetail}>
            <AuditDetails />
          </PermissionWrapper>
        ),
      },
      {
        path: 'insight',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.insight}>
            <AuditInsight />
          </PermissionWrapper>
        ),
      },
      {
        path: 'result',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.resultList}>
            <AuditResult />
          </PermissionWrapper>
        ),
      },
      {
        path: 'result/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.resultDetail}>
            <AuditDetails />
          </PermissionWrapper>
        ),
      },
      {
        path: 'log',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.logList}>
            <AuditLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'log/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.logDetail}>
            <AuditDetails />
          </PermissionWrapper>
        ),
      },
      {
        path: 'schedule',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.scheduleList}>
            <AuditSchedule />
          </PermissionWrapper>
        ),
      },
      {
        path: 'schedule/create',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.scheduleCreate}>
            <AuditScheduleCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'schedule/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.scheduleDetail}>
            <AuditScheduleEdit />
          </PermissionWrapper>
        ),
      },
      {
        path: 'project-site',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.projectSiteList}>
            <AuditProjectSite />
          </PermissionWrapper>
        ),
      },
      {
        path: 'project-site/create',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.projectSiteCreate}>
            <AuditProjectSiteCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'project-site/formula',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.projectSiteFormula}>
            <AuditFormula />
          </PermissionWrapper>
        ),
      },
      {
        path: 'project-site/formula/add',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.projectSiteFormula}>
            <AuditFormulaCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'audit-form-template',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.formTemplateList}>
            <AuditFormTemplate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'audit-form-template/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.formTemplateDetail}>
            <AuditFormTemplateCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'audit-form-template/rating-view',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.ratingTemplateList}>
            <AuditRatingView />
          </PermissionWrapper>
        ),
      },
      {
        path: 'audit-form-template/rating-template/create',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.ratingTemplateCreate}
          >
            <AuditRatingTemplateCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'audit-form-template/rating-template/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.ratingTemplateDetail}
          >
            <AuditRatingTemplateEdit />
          </PermissionWrapper>
        ),
      },
      {
        path: 'audit-form-template/create',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.formTemplateCreate}>
            <AuditFormTemplateCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'recycle-bin',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.recycleBin}>
            <AuditRecycleBin />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'maintenance',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.root}>
        <Maintenance />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/maintenance/overview' /> },
      {
        path: 'overview',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.overview}>
            <MaintanenceOverview />
          </PermissionWrapper>
        ),
      },
      {
        path: 'overview/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.overviewDetail}
          >
            <MaintenanceDetail />
          </PermissionWrapper>
        ),
      },
      {
        path: 'schedule',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.scheduleList}>
            <MaintanenceSchedule />
          </PermissionWrapper>
        ),
      },
      {
        path: 'schedule/create',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.scheduleCreate}
          >
            <MaintanenceScheduleCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'schedule/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.scheduleDetail}
          >
            <MaintanenceScheduleDetails />
          </PermissionWrapper>
        ),
      },
      {
        path: 'reports',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.report}>
            <MaintanenceReports />
          </PermissionWrapper>
        ),
      },
      {
        path: 'procedures',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.procedureList}
          >
            <MaintanenceProcedures />
          </PermissionWrapper>
        ),
      },
      {
        path: 'procedures/create',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.procedureCreate}
          >
            <MaintanenceProcedureCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'procedures/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.maintenance.procedureDetail}
          >
            <MaintanenceProcedureDetails />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'washroom',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.root}>
        <Washroom />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/washroom/overview' /> },
      {
        path: 'overview',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.overview}>
            <WashroomOverview />
          </PermissionWrapper>
        ),
      },
      {
        path: 'incident',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.incidentList}
              >
                <WashroomIncident />
              </PermissionWrapper>
            ),
          },
          {
            path: 'create',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.incidentCreate}
              >
                <WashroomIncidentCreate />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.incidentDetail}
              >
                <WashroomIncidentDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'reports',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.reports}>
            <WashroomReports />
          </PermissionWrapper>
        ),
      },
      {
        path: 'location-settings',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.locationSettingList}
              >
                <WashroomLocationSettings />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.locationSettingDetail}
              >
                <WashroomLocationSettingsDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'threshold-settings',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.washroom.thresholingSettings}
          >
            <WashroomThresholdSettings />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'feedback',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.root}>
        <Feedback />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/feedback/overview' /> },
      {
        path: 'overview',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.overview}>
            <FeedbackeOverview />
          </PermissionWrapper>
        ),
      },
      {
        path: 'overview/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.overviewDetail}>
            <FeedbackDetails />
          </PermissionWrapper>
        ),
      },
      {
        path: 'overview/:id/recent-activity',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.overviewRecentActivity}
          >
            <FeedbackRecentActivity />
          </PermissionWrapper>
        ),
      },
      {
        path: 'form-template',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.formTemplateList}
          >
            <FeedbackFormTemplate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'form-template/create',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.formTemplateList}
          >
            <FeedbackFormTemplateCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'form-template/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.formTemplateList}
          >
            <FeedbackFormDetails />
          </PermissionWrapper>
        ),
      },
      {
        path: 'form-template/rating-view',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.ratingTemplateList}>
            <FeedbackRatingView />
          </PermissionWrapper>
        ),
      },
      {
        path: 'form-template/rating-template/create',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.ratingTemplateCreate}
          >
            <FeedbackRatingTemplateCreate />
          </PermissionWrapper>
        ),
      },
      {
        path: 'form-template/rating-template/:id',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.audit.ratingTemplateDetail}
          >
            <FeedbackRatingTemplateEdit />
          </PermissionWrapper>
        ),
      },
      {
        path: 'inbox',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.inboxList}>
            <FeedbackInbox />
          </PermissionWrapper>
        ),
      },
      {
        path: 'inbox/:id',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.inboxDetail}>
            <FeedbackInbox />
          </PermissionWrapper>
        ),
      },
      {
        path: 'inbox/label',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.inboxLabel}>
            <FeedbackInbox />
          </PermissionWrapper>
        ),
      },
      {
        path: 'report',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.report}>
            <FeedbackReport />
          </PermissionWrapper>
        ),
      },
      {
        path: 'location',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.location}>
            <FeedbackLocation />
          </PermissionWrapper>
        ),
      },
      {
        path: 'archive',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.feedback.overview}>
            <FeedbackArchive />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'predictive-analysis',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.predictiveAnalysis.root}>
        <PredictiveAnalysis />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/predictive-analysis/student-statistics' /> },
      {
        path: 'student-statistics',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.predictiveAnalysis.student}
          >
            <StudentStatistics />
          </PermissionWrapper>
        ),
      },
      {
        path: 'washroom-statistics',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.predictiveAnalysis.washroom}
          >
            <WashroomStatistics />
          </PermissionWrapper>
        ),
      },
      {
        path: 'resources-allocation',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.predictiveAnalysis.resourceAllocation}
          >
            <ResourcesAllocation />
          </PermissionWrapper>
        ),
      },
      {
        path: 'configuration',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.predictiveAnalysis.configuration}
          >
            <PredictiveAnalysisConfiguration />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'device',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.device.root}>
        <Device />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/device/overview' /> },
      {
        path: 'overview',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceOverview />
              </PermissionWrapper>
            ),
          },
          {
            path: 'create',
            element: (
              <PermissionWrapper
                allowedPermissions={[]}
              >
                <DeviceCreate />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={[]}
              >
                <DeviceDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'device-list',
        element: (
          <PermissionWrapper allowedPermissions={[]}>
            <DeviceValueList />
          </PermissionWrapper>
        ),
      },
      {
        path: 'control',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceControl />
              </PermissionWrapper>
            ),
          },
          {
            path: ':locationId',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceControlDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'swap',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceSwap />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'group',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceGroup />
              </PermissionWrapper>
            ),
          },
          {
            path: 'create',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceGroupCreate />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceGroupDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'linkage',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceLinkage />
              </PermissionWrapper>
            ),
          },
          {
            path: 'create',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceLinkageCreate />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceLinkageDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'activation-schedule',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.device.deviceActivationSchedule}
              >
                <DeviceSchedule />
              </PermissionWrapper>
            ),
          },
          {
            path: 'create',
            element: (
              <PermissionWrapper
                allowedPermissions={[]}
              >
                <DeviceScheduleCreate />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={[]}
              >
                <DeviceScheduleDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'reports',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <DeviceReports />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'location-settings',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.device.deviceLocationSettings}
              >
                <DeviceLocationSettings />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={[]}
              >
                <DeviceLocationSettingDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'settings',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.root}>
        <Settings />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/settings/roles' /> },
      {
        path: 'roles',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.roleList}>
            <SettingRoles />
          </PermissionWrapper>
        ),
      },
      {
        path: 'users',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.users}>
            <Settings />
          </PermissionWrapper>
        ),
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.userList}>
                <SettingUsers />
              </PermissionWrapper>
            ),
          },
          {
            path: 'create',
            element: (
              <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.userCreate}>
                <UserCreate />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.userDetail}>
                <UserDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'projects',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.projectRoot}>
            <Settings />
          </PermissionWrapper>
        ),
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.projectList}>
                <SettingProjects />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.settings.projectDetail}
              >
                <SettingProjectDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: 'alert',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.alert.root}>
        <AlertList />
      </PermissionWrapper>
    ),
  },
  {
    path: 'report',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.report.root}>
        <Report />
      </PermissionWrapper>
    ),
  },
  {
    path: 'notification',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.notification.root}>
        <NotificationList />
      </PermissionWrapper>
    ),
  },
  {
    path: 'activity-logs',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.root}>
        <ActivityLog />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/activity-logs/audit' /> },
      {
        path: 'audit',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.audit}>
            <AuditActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'device',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.device}>
            <DeviceActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'washroom',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.washroom}>
            <WashroomActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'maintenance',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.maintenance}>
            <MaintenanceActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'incident',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.incident}>
            <IncidentActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'feedback',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.feedback}>
            <FeedbackActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'report',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.report}>
            <ReportActivityLog />
          </PermissionWrapper>
        ),
      },
      {
        path: 'user',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.activityLogs.user}>
            <UserActivityLog />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'task-management',
    element: (
      <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.root}>
        <TaskManagement />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/task-management/overview' /> },
      {
        path: 'overview',
        element: <TaskManagement />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.overview}
              >
                <TaskManagementOverview />
              </PermissionWrapper>
            ),
          },
          {
            path: 'on-duty',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.overviewOnDuty}
              >
                <TaskManagementOnDutyCleanerList />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'scheduling',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.scheduling}
          >
            <TaskSchedule />
          </PermissionWrapper>
        ),
      },
      {
        path: 'staff-list',
        element: <TaskManagement />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffList}
              >
                <TaskStaffList />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffDetail}
              >
                <UserDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'staff-attendance',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffAttendanceList}
          >
            <TaskStaffAttendance />
          </PermissionWrapper>
        ),
      },
      {
        path: 'staff-leave',
        element: <TaskManagement />,
        children: [
          {
            index: true,
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffLeaveList}
              >
                <TaskStaffLeave />
              </PermissionWrapper>
            ),
          },
          {
            path: ':id',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffLeaveDetail}
              >
                <TaskStaffLeaveDetail />
              </PermissionWrapper>
            ),
          },
        ],
      },
      {
        path: 'task-activity',
        element: (
          <PermissionWrapper
            allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.taskActivityList}
          >
            <TaskActivity />
          </PermissionWrapper>
        ),
      },
    ],
  },
  {
    path: 'performance-management',
    element: (
      <PermissionWrapper allowedPermissions={[]}>
        <Performance />
      </PermissionWrapper>
    ),
    children: [
      { index: true, element: <Navigate to='/performance-management/overview' /> },
      {
        path: 'overview',
        element: <PerformanceOverview />,
      },
      {
        path: 'overview/task/:id',
        element: <PerformanceOverviewTaskDetailsPage />,
      },
      {
        path: 'task-allocation',
        element: (
          <PermissionWrapper allowedPermissions={[]}>
            <Performance />
          </PermissionWrapper>
        ),
        children: [
          {
            index: true,
            element: <Navigate to='/performance-management/task-allocation/init-settings' />,
          },
          {
            path: 'init-settings',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <Performance />
              </PermissionWrapper>
            ),
            children: [
              {
                index: true,
                element: <PerformanceTaskAllocationInitSetting />,
              },
              {
                path: ':id',
                element: <PerformanceTaskAllocationInitSettingDetail />,
              },
            ],
          },
          {
            path: 'routine-task',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <Performance />
              </PermissionWrapper>
            ),
            children: [
              {
                index: true,
                element: <PerformanceTaskAllocationRoutineTask />,
              },
              {
                path: ':create',
                element: <PerformanceTaskAllocationRoutineTaskcreate />,
              },
            ],
          },
          {
            path: 'periodic-task',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <Performance />
              </PermissionWrapper>
            ),
            children: [
              {
                index: true,
                element: <PerformanceTaskAllocationPeriodicTask />,
              },
              {
                path: ':id',
                element: <PerformanceTaskAllocationPeriodicTaskcreate />,
              },
            ],
          },
          {
            path: 'periodic-task/create',
            element: <PerformanceTaskAllocationPeriodicTaskcreate />,
          },
          {
            path: 'ad-hoc-task',
            element: <PerformanceTaskAllocationAdHocTask />,
          },
          {
            path: 'ad-hoc-task/create',
            element: <PerformanceTaskAllocationAdHocTaskCreate />,
          },
          {
            path: 'ad-hoc-task/:id',
            element: <PerformanceTaskAllocationAdHocTaskDetail />,
          },
          {
            path: 'automation-task',
            element: <PerformanceTaskAllocationAutomationTask />,
          },
          {
            path: 'automation-task/create',
            element: <PerformanceTaskAllocationAutomationTaskCreate />,
          },
          {
            path: 'automation-task/detail',
            element: <PreformanceTaskAutomationDetail />,
          },
          {
            path: 'automation-task/flowchart',
            element: <PerformanceTaskAllocationAutomationTaskFlowChart />,
          },
        ],
      },
      {
        path: 'in-house-training',
        element: (
          <PermissionWrapper allowedPermissions={[]}>
            <Performance />
          </PermissionWrapper>
        ),
        children: [
          {
            index: true,
            element: <Navigate to='/performance-management/in-house-training/sop' />,
          },
          {
            path: 'sop',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <PerformanceInHouseSopTraining />
              </PermissionWrapper>
            ),
          },
          {
            path: 'sop/create',
            element: <PerformanceInHouseSopTrainingCreate />,
          },
          {
            path: 'sop/:id',
            element: <PerformanceInHouseSopTrainingDetails />,
          },
          {
            path: 'ojt',
            element: (
              <PermissionWrapper allowedPermissions={[]}>
                <PerformanceInHouseOjtTraining />
              </PermissionWrapper>
            ),
          },
          {
            path: 'ojt/create',
            element: <PerformanceInHouseOjtTrainingCreate />,
          },
          {
            path: 'ojt/training-status',
            element: <PerformanceInHouseOjtTrainingStatus />,
          },
          {
            path: 'routine-task',
            element: <PerformanceTaskAllocationRoutineTask />,
          },
        ],
      },
      {
        path: 'staff',
        element: (
          <PermissionWrapper allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.root}>
            <TaskManagement />
          </PermissionWrapper>
        ),
        children: [
          { index: true, element: <Navigate to='/performance-management/staff/list' /> },
          {
            path: '/performance-management/staff/list',
            element: <TaskManagement />,
            children: [
              {
                index: true,
                element: (
                  <PermissionWrapper
                    allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffList}
                  >
                    <TaskStaffList />
                  </PermissionWrapper>
                ),
              },
              {
                path: ':id',
                element: (
                  <PermissionWrapper
                    allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffDetail}
                  >
                    <UserDetail />
                  </PermissionWrapper>
                ),
              },
            ],
          },
          {
            path: '/performance-management/staff/attendance',
            element: (
              <PermissionWrapper
                allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffAttendanceList}
              >
                <TaskStaffAttendance />
              </PermissionWrapper>
            ),
          },
          {
            path: '/performance-management/staff/leave',
            element: <TaskManagement />,
            children: [
              {
                index: true,
                element: (
                  <PermissionWrapper
                    allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffLeaveList}
                  >
                    <TaskStaffLeave />
                  </PermissionWrapper>
                ),
              },
              {
                path: ':id',
                element: (
                  <PermissionWrapper
                    allowedPermissions={ROUTE_PERMISSION_MAPPING.taskManagement.staffLeaveDetail}
                  >
                    <TaskStaffLeaveDetail />
                  </PermissionWrapper>
                ),
              },
            ],
          },
        ],
      },
      {
        path: 'prediction-data-list',
        element: <PerformancePredictionDataList />,
      },
    ],
  },
]

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Navigate to='/login' /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> }
    ],
  },
  {
    path: '/device-action',
    element: <DeviceAction />
  },
  {
    path: '/',
    element: <PrivateLayout />,
    children: privateRoutes,
  },
  {
    path: 'error',
    element: <ErrorLayout />,
    children: [
      { index: true, element: <Navigate to='/error/404' /> },
      { path: '403', element: <Error403 /> },
      { path: '404', element: <Error404 /> },
      { path: '500', element: <Error500 /> },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.error404} /> },
]
