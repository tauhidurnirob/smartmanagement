import { FC, useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Stack, Typography } from '@mui/material'

import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import EnhancedTable from '../../modules/common/EnhancedTable'
import ListOptionButton from '../../modules/common/ListOptionButton'
import { IUserListFilters } from '../../types/user'
import { IUser } from '../../api/models'
import UserListFilterbar from '../../modules/user/UserListFilterbar'
import getAvatarNameFromString from '../../helpers/getAvatarNameFromString'
import getColorFromString from '../../helpers/getColorFromString'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { _getStaffFilters } from '../../store/_selectors'
import { useDispatch } from 'react-redux'
import { actions as performanceActions } from '../../store/slices/performanceManagements'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { toast } from 'react-toastify'

const TaskStaffList: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.staff.viewEditStaffDetails)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);
  const { staffFilter } = performanceActions

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const {
    limit,
    orderBy,
    orderDir,
    page,
    search,
    selectedLocations,
    selectedProjects,
    selectedRoles,
  } = _getStaffFilters()

  const debouncedSearch = useDebounce(search, 500)
  const projectIds = useMemo(() => {
    return selectedProjects.map((p) => Number(p.value))
  }, [selectedProjects])

  const locationIds = useMemo(() => {
    return selectedLocations.map((p) => Number(p.value))
  }, [selectedLocations])

  const roleIds = useMemo(() => {
    return selectedRoles.map((p) => Number(p.value))
  }, [selectedRoles])

  const { data } = Api.useGetStaffListQuery({
    limit,
    page,
    orderBy,
    orderDir,
    locationIds,
    projectIds,
    roleIds,
    text: debouncedSearch,
  })

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    dispatch(staffFilter.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(staffFilter.setOrderBy(property as keyof IUser))
  }

  const handleEdit = (data: IUser) => {
    if(isEditable){
      navigate(`/performance-management/staff/list/${data?.id}`)
    }else{
      toast.error('You do not have access to edit!')
    }
  }

  const onTextChange = (payload: string) => {
    dispatch(staffFilter.setSearch(payload))
  }

  const onLocationChange = (payload: ISelectItem[]) => {
    dispatch(staffFilter.setSelectedLocations(payload))
  }

  const onProjectChange = (payload: ISelectItem[]) => {
    dispatch(staffFilter.setSelectedProjects(payload))
  }

  const onRoleChange = (payload: ISelectItem[]) => {
    dispatch(staffFilter.setSelectedRoles(payload))
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { fullName } = item as IUser
        const userName = fullName || '-'
        const aName = getAvatarNameFromString(userName, true)
        const bgColor = getColorFromString(userName)
        return (
          <Stack direction={'row'} gap={2.5} alignItems={'center'}>
            <Avatar
              sx={{
                color: '#ffffff',
                bgcolor: bgColor,
                width: '36px',
                height: '36px',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              {aName}
            </Avatar>
            <Typography typography={'h4'} fontSize={15} fontWeight={700} color='grey.800'>
              {userName}
            </Typography>
          </Stack>
        )
      },
    },
    {
      id: '',
      name: 'Role',
      render: (item: TableData) => {
        const { role } = item as IUser
        return role?.name || '-'
      },
    },
    {
      id: '',
      name: 'Contact Number',
      render: (item: TableData) => {
        const { phoneNumber } = item as IUser
        return phoneNumber || '-'
      },
    },
    {
      id: '',
      name: 'Email',
      render: (item: TableData) => {
        const { email } = item as IUser
        return email || '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { projects } = item as IUser
        const projectNames = (projects || []).map((p) => p.name).join(', ')
        return projectNames || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { locations } = item as IUser
        const locationNames = (locations || []).map((p) => p.name).join(', ')
        return locationNames || '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IUser
        return (
          <ListOptionButton list={[{ title: 'View & Edit', onClick: () => handleEdit(data) }]} />
        )
      },
    },
  ]

  const filters: IUserListFilters = {
    search: search,
    projects: selectedProjects,
    locations: selectedLocations,
    roles: selectedRoles,
  }

  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h3'>Staff List</Typography>
      </Stack>
      <Box mt={3}>
        <UserListFilterbar
          filters={filters}
          onLocationChange={onLocationChange}
          onProjectChange={onProjectChange}
          onRoleChange={onRoleChange}
          onTextChange={onTextChange}
        />
        <Box mt={2.75}>
          <EnhancedTable
            loading={false}
            totalCount={data?.count || 0}
            data={data?.rows || []}
            page={page}
            rowsPerPage={limit}
            onPageChange={(p) => dispatch(staffFilter.setPage(p))}
            onRowsPerPageChange={(l) => dispatch(staffFilter.setLimit(l))}
            order={orderDir}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            hasCheckbox={false}
            selected={selectedIds}
            onSelect={handleSelect}
            onSelectIdFieldName={'id'}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default TaskStaffList
