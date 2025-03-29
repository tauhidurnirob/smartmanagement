import { AuditScheduleApi } from './audit-schedule-api'
import { LocationApi } from './location-api'
import { ProjectApi } from './project-api'
import { UserApi } from './user-api'
import { AuditProejctSiteApi } from './audit-project-site-api'
import { AuditFormulaApi } from './audit-formula-api'
import { AuditLogApi } from './audit-log-api'
import { AuditRecycleBinApi } from './audit-recycle-bin-api'
import { AuditFormTemplateApi } from './audit-form-template-api'
import { AuditFormTypeApi } from './audit-form-type-api'
import { AuditApi } from './audit-api'
import { AuditResultApi } from './audit-result-api'
import { AuditInsightApi } from './audit-insight-api'
import { AuditRatingTemplateApi } from './audit-rating-template-api'
import { UploadApi } from './upload-api'
import { RoleApi } from './role-api'
import { BuildingApi } from './building-api'
import { LevelApi } from './level-api'
import { AreaApi } from './area-api'
import { UnitApi } from './unit-api'
import { DeviceApi } from './device-api'
import { DeviceTypeApi } from './device-type-api'
import { DeviceActivityApi } from './device-activity-api'
import { DeviceGroupApi } from './device-group-api'
import { DeviceScheduleApi } from './device-schedule-api'
import { DeviceLinkageApi } from './device-linkage-api'
import { DeviceLocationApi } from './device-location-api'
import { IncidentTypeApi } from './incident-type-api'
import { IncidentApi } from './incident-api'
import { TaskApi } from './task-api'
import { StaffApi } from './staff-api'
import { PerformanceTaskActivityApi } from './performance-task-activity-api'
import { SopApi } from './sop-api'
import { OtjApi } from './otj-api'
import { PerformanceTaskOverviewApi } from './performance-overview-api'
import { NotificationApi } from './notification-api'
import { AlertApi } from './alert-api'

const Api = {
  ...UserApi,
  ...AuditScheduleApi,
  ...ProjectApi,
  ...AuditProejctSiteApi,
  ...AuditFormulaApi,
  ...LocationApi,
  ...AuditLogApi,
  ...AuditRecycleBinApi,
  ...AuditFormTemplateApi,
  ...AuditFormTypeApi,
  ...AuditApi,
  ...AuditResultApi,
  ...AuditInsightApi,
  ...AuditRatingTemplateApi,
  ...UploadApi,
  ...RoleApi,
  ...BuildingApi,
  ...LevelApi,
  ...AreaApi,
  ...UnitApi,
  ...DeviceApi,
  ...DeviceTypeApi,
  ...DeviceActivityApi,
  ...DeviceGroupApi,
  ...DeviceScheduleApi,
  ...DeviceLinkageApi,
  ...IncidentTypeApi,
  ...DeviceLocationApi,
  ...IncidentApi,
  ...TaskApi,
  ...StaffApi,
  ...PerformanceTaskActivityApi,
  ...SopApi,
  ...OtjApi,
  ...PerformanceTaskOverviewApi,
  ...NotificationApi,
  ...AlertApi,
  reducers: {
    [UserApi.reducerPath]: UserApi.reducer,
    [AuditScheduleApi.reducerPath]: AuditScheduleApi.reducer,
    [ProjectApi.reducerPath]: ProjectApi.reducer,
    [LocationApi.reducerPath]: LocationApi.reducer,
    [AuditProejctSiteApi.reducerPath]: AuditProejctSiteApi.reducer,
    [AuditFormulaApi.reducerPath]: AuditFormulaApi.reducer,
    [AuditLogApi.reducerPath]: AuditLogApi.reducer,
    [AuditRecycleBinApi.reducerPath]: AuditRecycleBinApi.reducer,
    [AuditFormTemplateApi.reducerPath]: AuditFormTemplateApi.reducer,
    [AuditFormTypeApi.reducerPath]: AuditFormTypeApi.reducer,
    [AuditApi.reducerPath]: AuditApi.reducer,
    [AuditResultApi.reducerPath]: AuditResultApi.reducer,
    [AuditInsightApi.reducerPath]: AuditInsightApi.reducer,
    [AuditRatingTemplateApi.reducerPath]: AuditRatingTemplateApi.reducer,
    [UploadApi.reducerPath]: UploadApi.reducer,
    [RoleApi.reducerPath]: RoleApi.reducer,
    [BuildingApi.reducerPath]: BuildingApi.reducer,
    [LevelApi.reducerPath]: LevelApi.reducer,
    [AreaApi.reducerPath]: AreaApi.reducer,
    [UnitApi.reducerPath]: UnitApi.reducer,
    [DeviceApi.reducerPath]: DeviceApi.reducer,
    [DeviceTypeApi.reducerPath]: DeviceTypeApi.reducer,
    [DeviceActivityApi.reducerPath]: DeviceActivityApi.reducer,
    [DeviceGroupApi.reducerPath]: DeviceGroupApi.reducer,
    [DeviceScheduleApi.reducerPath]: DeviceScheduleApi.reducer,
    [DeviceLinkageApi.reducerPath]: DeviceLinkageApi.reducer,
    [IncidentTypeApi.reducerPath]: IncidentTypeApi.reducer,
    [DeviceLocationApi.reducerPath]: DeviceLocationApi.reducer,
    [IncidentApi.reducerPath]: IncidentApi.reducer,
    [TaskApi.reducerPath]: TaskApi.reducer,
    [StaffApi.reducerPath]: StaffApi.reducer,
    [PerformanceTaskActivityApi.reducerPath]: PerformanceTaskActivityApi.reducer,
    [SopApi.reducerPath]: SopApi.reducer,
    [OtjApi.reducerPath]: OtjApi.reducer,
    [PerformanceTaskOverviewApi.reducerPath]: PerformanceTaskOverviewApi.reducer,
    [NotificationApi.reducerPath]: NotificationApi.reducer,
    [AlertApi.reducerPath]: AlertApi.reducer,
  },
  middlewares: [
    UserApi.middleware,
    AuditScheduleApi.middleware,
    ProjectApi.middleware,
    LocationApi.middleware,
    AuditProejctSiteApi.middleware,
    AuditFormulaApi.middleware,
    AuditLogApi.middleware,
    AuditRecycleBinApi.middleware,
    AuditFormTemplateApi.middleware,
    AuditFormTypeApi.middleware,
    AuditApi.middleware,
    AuditResultApi.middleware,
    AuditInsightApi.middleware,
    AuditRatingTemplateApi.middleware,
    UploadApi.middleware,
    RoleApi.middleware,
    BuildingApi.middleware,
    LevelApi.middleware,
    AreaApi.middleware,
    UnitApi.middleware,
    DeviceApi.middleware,
    DeviceTypeApi.middleware,
    DeviceActivityApi.middleware,
    DeviceGroupApi.middleware,
    DeviceScheduleApi.middleware,
    DeviceLinkageApi.middleware,
    IncidentTypeApi.middleware,
    DeviceLocationApi.middleware,
    IncidentApi.middleware,
    TaskApi.middleware,
    StaffApi.middleware,
    PerformanceTaskActivityApi.middleware,
    SopApi.middleware,
    OtjApi.middleware,
    PerformanceTaskOverviewApi.middleware,
    NotificationApi.middleware,
    AlertApi.middleware,
  ],
}

export default Api
