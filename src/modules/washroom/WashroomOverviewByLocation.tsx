import { useState } from 'react'
import { Box } from '@mui/material'

import { IWashroomOverviewFilters } from '../../types/washroom'
import WashroomOverviewList from './WashroomOverviewList'
import { tmpWashroomOverviewList } from './dummy'
import WashroomOverviewByLocationFilterbar from './WashroomOverviewByLocationFilterbar'

const WashroomOverviewByLocation = () => {
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

  return (
    <Box>
      <Box sx={{}}>
        <WashroomOverviewByLocationFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <WashroomOverviewList items={tmpWashroomOverviewList} />
      </Box>
    </Box>
  )
}

export default WashroomOverviewByLocation
