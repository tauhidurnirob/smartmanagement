import { useMemo } from 'react'
import { Box, Card, Divider, Grid, Typography } from '@mui/material'

import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { ISelectItem } from '../../types/common'
import AuditInsightCard from '../../modules/audit/audit-insight/AuditInsightCard'
import SelectDate from '../../modules/common/SelectDate'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { _auditInsightActions } from '../../store/slices/audit'
import { useDispatch } from 'react-redux'
import { _getAuditInsightState } from '../../store/_selectors'
import dayjs from 'dayjs'
import AuditInsightLocationPerformance from '../../modules/audit/audit-insight/AuditInsightLocationPerformance'
import FormSelect from '../../modules/audit/FormSelector'

const AuditInsight = () => {
  const dispatch = useDispatch()
  const state = _getAuditInsightState()

  const debouncedSearch = useDebounce(state.search, 500)
  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const handleChangeForm = (form: number) => {
    dispatch(_auditInsightActions.setSelectedFormType(form))
  }

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(_auditInsightActions.setSelectedLocations(items))
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(_auditInsightActions.setSelectedProjects(items))
  }

  const { data: auditInsights, isLoading, isFetching } = Api.useGetAuditInsightsQuery({
    projectIds,
    locationIds,
    text: debouncedSearch,
    ...(state.selectedFormType !== null ? { formTypeId: state.selectedFormType } : {}),
    ...(state.startDate ? { startDate: dayjs(state.startDate).startOf('day').toISOString() } : {}),
    ...(state.endDate ? { endDate: dayjs(state.endDate).endOf('day').toISOString() } : {}),
  }, {skip: !state.selectedFormType})

  const {data: locations, isLoading: locLoading} = Api.useGetAuditInsightTopLocationsQuery({
    ...(state.selectedFormType !== null ? { formTypeId: state.selectedFormType } : {}),
    ...(state.startDate ? { startDate: dayjs(state.startDate).startOf('day').toISOString() } : {}),
    ...(state.endDate ? { endDate: dayjs(state.endDate).endOf('day').toISOString() } : {}),
  }, {skip: !state.selectedFormType})

  const topFailedLocations = useMemo(() => {
    const value = locations?.topFailed?.map((item) => ({name: item.location.name, score: item.failedPercent}))
    return value
  }, [locations])
  const topPerformingLocations = useMemo(() => {
    const value = locations?.topPerformance?.map((item) => ({name: item.location.name, score: item.avgPerformance}))
    return value
  }, [locations])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography typography={'h3'}>Performance Data</Typography>
      </Box>
      <FormSelect selected={state.selectedFormType} onChange={handleChangeForm} />
      <Card sx={{ mt: 2.25, pt: 3.5, px: 5, pb: 4 }}>
        <Grid container spacing={{ lg: 1.5, xs: 1 }}>
          <Grid item md={2} xs={12}>
            <Box>
              <FilterLabel text='Search' />
              <SearchField
                placeholder='Search by Keyword'
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  minWidth: 0,
                  height: '40px',
                  justifyContent: 'center',
                }}
                value={state.search}
                onChange={(e) => dispatch(_auditInsightActions.setSearch(e.target.value))}
              />
            </Box>
          </Grid>
          <Grid item md={3} xs={12}>
            <ProjectSelect selected={state.selectedProjects} onChange={handleChangeSelectedProjects} />
          </Grid>
          <Grid item md={3} xs={12}>
            <LocationSelect selected={state.selectedLocations} onChange={handleChangeSelectedLocations} projectIds={projectIds} />
          </Grid>
          <Grid item md={2} xs={12}>
            <FilterLabel text='Start Date' />
            <SelectDate
              value={state.startDate}
              onAccept={(date) => dispatch(_auditInsightActions.setStartDate(date))}
              maxDate={state.endDate}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <FilterLabel text='End Date' />
            <SelectDate
              value={state.endDate}
              onAccept={(date) => dispatch(_auditInsightActions.setEndDate(date))}
              minDate={state.startDate}
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={2} sx={{ mt: 2.25 }}>
        <Grid item lg={6} xs={12}>
          <AuditInsightCard
            title={'Top Failed Inspection Units'}
            data={auditInsights?.topFailedIUs || []}
            isFailedList={true}
            headerItems={['INSPECTION UNIT', 'FAILED RATIO']}
            isLoading={isLoading || isFetching}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <AuditInsightCard
            title={'Average Performance by Inspection Unit'}
            data={auditInsights?.topAvgPerformanceByIU || []}
            headerItems={['INSPECTION UNIT', 'AVG PERFORMANCE %']}
            isLoading={isLoading || isFetching}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <AuditInsightCard
            title={'Top Failed Elements'}
            data={auditInsights?.topFailedElements || []}
            isFailedList={true}
            headerItems={['ELEMENT', 'FAILED RATIO']}
            isLoading={isLoading || isFetching}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <AuditInsightCard
            title={'Average Score by Element'}
            data={auditInsights?.topAvgScoreByElement || []}
            headerItems={['ELEMENT', 'AVG SCORE']}
            isElement={true}
            isLoading={isLoading || isFetching}
          />
        </Grid>
      </Grid>
      <Divider sx={{mt: 4}} />
      <Typography variant='h4' mt={3}>Location Based Performance</Typography>
      <Grid container spacing={2} sx={{ mt: 2.25 }}>
        <Grid item lg={6} xs={12}>
          <AuditInsightCard
            title={'Top 5 Underperforming Locations'}
            data={topFailedLocations || []}
            headerItems={['LOCATION', 'AVG PERFORMANCE %']}
            isElement={true}
            isLoading={locLoading}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <AuditInsightCard
            title={'Top 5 Performing Locations'}
            data={topPerformingLocations || []}
            headerItems={['LOCATION', 'AVG PERFORMANCE %']}
            isElement={true}
            isLoading={locLoading}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <AuditInsightLocationPerformance />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AuditInsight
