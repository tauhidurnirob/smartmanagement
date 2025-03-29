import auditFormTemplateSlice from "./auditFormTemplate"
import auditFormTemplateRecycleSlice from "./auditFormTemplateRecycle"
import auditInsightSlice from "./auditInsight"
import auditLogSlice from "./auditLogs"
import auditLogRecycleSlice from "./auditLogsRecycle"
import auditOverviewSlice from "./auditOverview"
import auditProjectFormulaSlice from "./auditProjectFormula"
import auditProjectSiteSlice from "./auditProjectSite"
import auditProjectSiteRecycleSlice from "./auditProjectSiteRecycle"
import auditResultSlice from "./auditResult"
import auditScheduleSlice from "./auditSchedule"
import auditScheduleRecycleSlice from "./auditScheduleRecycle"

const AuditReducers = {
  [auditOverviewSlice.name]: auditOverviewSlice.reducer,
  [auditResultSlice.name]: auditResultSlice.reducer,
  [auditLogSlice.name]: auditLogSlice.reducer,
  [auditInsightSlice.name]: auditInsightSlice.reducer,
  [auditScheduleSlice.name]: auditScheduleSlice.reducer,
  [auditProjectSiteSlice.name]: auditProjectSiteSlice.reducer,
  [auditFormTemplateSlice.name]: auditFormTemplateSlice.reducer,
  [auditLogRecycleSlice.name]: auditLogRecycleSlice.reducer,
  [auditScheduleRecycleSlice.name]: auditScheduleRecycleSlice.reducer,
  [auditProjectSiteRecycleSlice.name]: auditProjectSiteRecycleSlice.reducer,
  [auditFormTemplateRecycleSlice.name]: auditFormTemplateRecycleSlice.reducer,
  [auditProjectFormulaSlice.name]: auditProjectFormulaSlice.reducer,
}
const _auditOverviewActions = {
  ...auditOverviewSlice.actions
}
const _auditResultActions = {
  ...auditResultSlice.actions
}
const _auditLogActions = {
  ...auditLogSlice.actions
}
const _auditInsightActions = {
  ...auditInsightSlice.actions
}
const _auditScheduleActions = {
  ...auditScheduleSlice.actions
}
const _auditProjectSiteActions = {
  ...auditProjectSiteSlice.actions
}
const _auditFormTemplateActions = {
  ...auditFormTemplateSlice.actions
}
const _auditLogRecycleActions = {
  ...auditLogRecycleSlice.actions
}
const _auditScheduleRecycleActions = {
  ...auditScheduleRecycleSlice.actions
}
const _auditProjectSiteRecycleActions = {
  ...auditProjectSiteRecycleSlice.actions
}
const _auditFormTemplateRecycleActions = {
  ...auditFormTemplateRecycleSlice.actions
}
const _auditProjectFormulaActions = {
  ...auditProjectFormulaSlice.actions
}

export {
  AuditReducers,
  _auditOverviewActions,
  _auditResultActions,
  _auditLogActions,
  _auditInsightActions,
  _auditScheduleActions,
  _auditProjectSiteActions,
  _auditFormTemplateActions,
  _auditLogRecycleActions,
  _auditScheduleRecycleActions,
  _auditProjectSiteRecycleActions,
  _auditFormTemplateRecycleActions,
  _auditProjectFormulaActions,

}
