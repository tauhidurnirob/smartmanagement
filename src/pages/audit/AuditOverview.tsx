import { useMemo, useState } from 'react'
import { Box, Grid, Typography, Card, Stack } from '@mui/material'
import AuditMap from '../../modules/audit/overview/AuditMap'
import AuditSummaryCard from '../../modules/audit/overview/AuditSummaryCard'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import LocationSelect from '../../modules/location/LocationSelect'
import AuditReportTypeSelect from '../../modules/audit/overview/AuditReportTypeSelect'
import AuditReportCharts from '../../modules/audit/overview/AuditReportCharts'
import Api from '../../api'
import FormSelect from '../../modules/audit/FormSelector'
import SearchField from '../../modules/common/SearchField'
import useDebounce from '../../hooks/useDebounce'
import { _getAuditOverviewState } from '../../store/_selectors'
import { useDispatch } from 'react-redux'
import { _auditOverviewActions } from '../../store/slices/audit'
import FilterLabel from '../../modules/common/FilterLabel'
import dayjs from 'dayjs'

const AuditOverview = () => {
  const dispatch = useDispatch()
  const audit = _getAuditOverviewState()

  const debouncedSearch = useDebounce(audit.search, 500)

  const projectIds = useMemo(() => {
    return audit.selectedProjects.map((p) => Number(p.value))
  }, [audit.selectedProjects])

  const locationIds = useMemo(() => {
    return audit.selectedLocations.map((p) => Number(p.value))
  }, [audit.selectedLocations])

  const auditStates = useMemo(() => {
    return audit.selectedReportTypes.map((p) => Number(p.value))
  }, [audit.selectedReportTypes])

  const mapProjectIds = useMemo(() => {
    return audit.mapProjects.map((p) => Number(p.value))
  }, [audit.mapProjects])

  const mapLocationIds = useMemo(() => {
    return audit.mapLocations.map((p) => Number(p.value))
  }, [audit.mapLocations])

  const mapAuditStates = useMemo(() => {
    return audit.mapReportTypes.map((p) => Number(p.value))
  }, [audit.mapReportTypes])

  // const { data: overview } = Api.useGetAuditOverviewQuery({
  //   text: debouncedSearch,
  //   projectIds: mapProjectIds as number[],
  //   locationIds: mapLocationIds as number[],
  //   auditStates: mapAuditStates,
  //   ...(audit.mapStartDate
  //     ? { startDate: dayjs(audit.mapStartDate).startOf('day').toISOString() }
  //     : {}),
  //   ...(audit.mapEndDate ? { endDate: dayjs(audit.mapEndDate).endOf('day').toISOString() } : {}),
  // })

  const handleChangeForm = (form: number) => {
    dispatch(_auditOverviewActions.setSelectedForm(form))
  }
  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(_auditOverviewActions.setSelectedProjects(items))
  }

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(_auditOverviewActions.setSelectedLocations(items))
  }

  const handleChangeSelectedReportTypes = (items: ISelectItem[]) => {
    dispatch(_auditOverviewActions.setSelectedReportTypes(items))
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography typography={'h3'}>Overview</Typography>
      </Box>
      <Box
        sx={{
          mt: 3.75,
        }}
      >
        <SearchField
          placeholder='Search by Keyword'
          sx={{
            background: '#ffffff',
            minWidth: 0,
            height: '34px',
            width: '294px',
            justifyContent: 'center',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            mb: 1.75,
          }}
          value={audit.search}
          onChange={(e) => dispatch(_auditOverviewActions.setSearch(e.target.value))}
        />
        {/* <Grid container spacing={2.75}>
          <Grid item lg={9} xs={12}>
            <AuditMap search={debouncedSearch} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <AuditSummaryCard overview={overview} />
          </Grid>
        </Grid> */}
        <Box height={{xs: '100px', sm: '500px'}} overflow={'scroll'}>
          <AuditMap search={debouncedSearch} />
        </Box>
      </Box>
      <Box
        sx={{
          mt: 4,
        }}
      >
        <Stack
          direction={'row'}
          flexWrap={'wrap'}
          gap={2}
          alignItems={'center'}
          justifyContent={{xs: 'flex-start', sm: 'flex-end'}}
        >
          <FormSelect selected={audit.selectedForm} onChange={handleChangeForm} />
        </Stack>
      </Box>
      <Card
        sx={{
          mt: 3,
          p: 3,
          pr: 5,
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Report Type' />
            <AuditReportTypeSelect
              placeholder='All Report Type'
              hiddenLabel={true}
              selected={audit.selectedReportTypes}
              onChange={handleChangeSelectedReportTypes}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Project' />
            <ProjectSelect
              hiddenLabel={true}
              selected={audit.selectedProjects}
              onChange={handleChangeSelectedProjects}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Location' />
            <LocationSelect
              hiddenLabel={true}
              selected={audit.selectedLocations}
              onChange={handleChangeSelectedLocations}
              projectIds={projectIds}
            />
          </Grid>
        </Grid>
      </Card>
      <Box mt={3}>
        <AuditReportCharts
          projectIds={projectIds}
          locationIds={locationIds}
          auditStates={auditStates}
          formId={audit.selectedForm}
        />
      </Box>
    </Box>
  )
}

export default AuditOverview
