import { useState } from 'react'
import { Box, Typography } from '@mui/material'

import WashroomOverviewFilterbar from '../../modules/washroom/WashroomOverviewFilterbar'
import { IWashroomOverviewFilters } from '../../types/washroom'
import WashroomOverviewList from '../../modules/washroom/WashroomOverviewList'
import { tmpWashroomOverviewList } from '../../modules/washroom/dummy'
import Api from '../../api'

const WashroomOverview = () => {
  const [filters, setFilters] = useState<IWashroomOverviewFilters>({
    search: '',
    statuses: [],
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
  })

  const handleChangeFilters = (newFilters: IWashroomOverviewFilters) => {
    setFilters((filters) => ({ ...filters, ...newFilters }))
  }

  console.log('tmpWashroomOverviewList: ', tmpWashroomOverviewList)

  const { data, isLoading, refetch, isUninitialized } = Api.useGetWashroomOverviewQuery({
    page: 1,
    limit: 100,
  })

  return (
    <Box>
      <Typography typography={'h3'} mb={3}>
        Overview
      </Typography>
      <Box sx={{ mt: 2.5 }}>
        <WashroomOverviewFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <WashroomOverviewList items={data} />
      </Box>
    </Box>
  )
}

export default WashroomOverview
