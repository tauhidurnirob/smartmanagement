import { Box, Card, Grid, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { IFeedbackeportFilters } from "../../types/feedback"
import dayjs from "dayjs"
import { ISelectItem } from "../../types/common"
import FilterLabel from "../../modules/common/FilterLabel"
import FeedbackReportTypeSelect from "../../modules/feedback/report/FeedbackReportTypeSelect"
import ProjectSelect from "../../modules/audit/project-sites/ProjectSelect"
import LocationSelect from "../../modules/location/LocationSelect"
import FeedbackReportCharts from "../../modules/feedback/report/FeedbackReportCharts"


const FeedbackReport = () => {
  const [filters, setFilters] = useState<IFeedbackeportFilters>({
    reportTypes: [],
    projects: [],
    locations: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
  })

  const projectIds = useMemo(
    () => filters.projects.map((i) => i.value as number),
    [filters.projects]
  )

  const locationIds = useMemo(
    () => filters.locations.map((i) => i.value as number),
    [filters.locations]
  )

  const handleChangeProjects = (projects: ISelectItem[]) => {
    setFilters({ ...filters, projects })
  }

  const handleChangeLocations = (locations: ISelectItem[]) => {
    setFilters({ ...filters, locations })
  }

  const handleChangeReportTypes = (reportTypes: ISelectItem[]) => {
    setFilters({ ...filters, reportTypes })
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
        <Typography typography={'h3'}>Reports</Typography>
      </Box>
      <Card
        sx={{
          mt: 2.5,
          p: 3,
          pr: 5,
        }}
      >
        <Grid container columnSpacing={7} rowSpacing={3}>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Report Type' />
            <FeedbackReportTypeSelect
              placeholder='All Report'
              hiddenLabel={true}
              selected={filters.reportTypes}
              onChange={handleChangeReportTypes}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Project' />
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <FilterLabel text='Location' />
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
              projectIds={projectIds}
            />
          </Grid>
        </Grid>
      </Card>
      <Box mt={5.5}>
        <FeedbackReportCharts projectIds={projectIds} locationIds={locationIds} />
      </Box>
    </Box>
  )
}

export default FeedbackReport