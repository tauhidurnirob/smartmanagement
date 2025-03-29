import { FC } from 'react'
import { Card, Grid, Stack } from '@mui/material'

import FilterLabel from '../common/FilterLabel'
import SearchField from '../common/SearchField'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../types/common'
import RoleSelect from '../user/RoleSelect'
import { IUserListFilters } from '../../types/user'
import LocationSelect from '../location/LocationSelect'

interface IProps {
  filters: IUserListFilters
  onTextChange: (payload: string) => void
  onLocationChange: (payload: ISelectItem[]) => void
  onProjectChange: (payload: ISelectItem[]) => void
  onRoleChange: (payload: ISelectItem[]) => void
}

const UserListFilterbar: FC<IProps> = ({
  filters,
  onLocationChange,
  onProjectChange,
  onRoleChange,
  onTextChange,
}) => {
  return (
    <Card sx={{ pt: 4.5, pl: 3.75, pr: 3.75, pb: 4 }}>
      <Grid
        container
        columnSpacing={{ lg: 2, xs: 1 }}
        rowSpacing={{ lg: 0, xs: 2 }}
        flexGrow={1}
        alignItems={'flex-start'}
      >
        <Grid item md={3} xs={12}>
          <FilterLabel text='Search' sx={{ mb: 1 }} />
          <SearchField
            placeholder='Search by Keyword'
            value={filters.search}
            onChange={(e) => onTextChange(e.target.value)}
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              height: '40px',
              justifyContent: 'center',
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FilterLabel text='Project' sx={{ mb: 1 }} />
          <ProjectSelect
            hiddenLabel={true}
            selected={filters.projects}
            onChange={onProjectChange}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FilterLabel text='Location' sx={{ mb: 1 }} />
          <LocationSelect
            hiddenLabel={true}
            selected={filters.locations}
            onChange={onLocationChange}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <FilterLabel text='Role' sx={{ mb: 1 }} />
          <RoleSelect hiddenLabel={true} selected={filters.roles} onChange={onRoleChange} />
        </Grid>
      </Grid>
    </Card>
  )
}

export default UserListFilterbar
