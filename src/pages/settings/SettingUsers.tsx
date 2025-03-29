import { FC, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'

import {
  IResList,
  ISelectItem,
  ITableHeadCell,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../types/common'
import { ROW_PER_PAGE_OPTIONS } from '../../constants/common'
import { FileUploadLight } from '../../assets/icons/file-upload-light'
import EnhancedTable from '../../modules/common/EnhancedTable'
import ListOptionButton from '../../modules/common/ListOptionButton'
import { Plus } from '../../assets/icons/plus'
import { IUserListFilters } from '../../types/user'
import { IUser } from '../../api/models'
import DeleteDialog from '../../modules/common/DeleteDialog'
import UserListFilterbar from '../../modules/user/UserListFilterbar'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { toast } from 'react-toastify'
import UserBatchUploadDialog from '../../modules/user/UserBatchUploadDialog'
import { _getSettingUsers } from '../../store/_selectors'
import { actions as settingActions } from '../../store/slices/settings'
import { useDispatch } from 'react-redux'

const SettingUsers: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { settingUsersFilter } = settingActions

  const {
    limit,
    orderBy,
    orderDir,
    page,
    search,
    selectedLocations,
    selectedProjects,
    selectedRoles,
  } = _getSettingUsers()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openBatchUpload, setOpenBatchUpload] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const [deleteUsers] = Api.useDeleteUsersMutation()

  const projectIds = useMemo(() => {
    return selectedProjects.map((p) => p.value as number)
  }, [selectedProjects])

  const locationIds = useMemo(() => {
    return selectedLocations.map((p) => p.value as number)
  }, [selectedLocations])

  const roleIds = useMemo(() => {
    return selectedRoles.map((p) => p.value as number)
  }, [selectedRoles])

  const {
    data: userList,
    isFetching: isLoading,
    refetch,
  } = Api.useGetUserListQuery({
    page: page,
    limit: limit,
    orderDir: orderDir,
    orderBy: orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
    roleIds: roleIds,
  })

  const handleGotoNewUser = () => {
    navigate('/settings/users/create')
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    dispatch(settingUsersFilter.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(settingUsersFilter.setOrderBy(property as keyof IUser))
  }

  const handleEdit = (data: IUser) => {
    navigate(`/settings/users/${data?.id}`)
  }

  const onTextChange = (payload: string) => {
    dispatch(settingUsersFilter.setSearch(payload))
  }

  const onLocationChange = (payload: ISelectItem[]) => {
    dispatch(settingUsersFilter.setSelectedLocations(payload))
  }

  const onProjectChange = (payload: ISelectItem[]) => {
    dispatch(settingUsersFilter.setSelectedProjects(payload))
  }

  const onRoleChange = (payload: ISelectItem[]) => {
    dispatch(settingUsersFilter.setSelectedRoles(payload))
  }
  const handleDelete = (user: IUser) => {
    setSelectedIds([user.id])
    setOpenDeleteModal(true)
  }

  const handleDeleteSelected = () => {
    deleteUsers({ ids: selectedIds })
      .unwrap()
      .then(() => {
        toast.success('Users have been deleted')
        setOpenDeleteModal(false)
        refetch()
        setSelectedIds([])
      })
      .catch((err) => {
        console.error('Failed to delete users: ', err)
        toast.error('Failed to delete users')
      })
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
  }

  const handleReload = () => {
    refetch()
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { fullName } = item as IUser
        return fullName || '-'
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
          <ListOptionButton
            list={[
              { title: 'View & Edit', onClick: () => handleEdit(data) },
              { title: 'Delete', onClick: () => handleDelete(data) },
            ]}
          />
        )
      },
    },
  ]

  const filters = {
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
        <Typography variant='h3'>User List</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={1.5} alignItems={'center'}>
          {selectedIds.length > 0 && (
            <Button
              variant='contained'
              color='error'
              onClick={() => setOpenDeleteModal(true)}
              size='small'
            >
              Delete Selected
            </Button>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Users
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<Plus sx={{ fontSize: '0.875rem !important' }} />}
            onClick={handleGotoNewUser}
          >
            Add User
          </Button>
        </Stack>
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
            loading={isLoading}
            totalCount={userList?.count || 0}
            data={userList?.rows || []}
            page={page}
            rowsPerPage={limit}
            onPageChange={(p) => dispatch(settingUsersFilter.setPage(p))}
            onRowsPerPageChange={(l) => dispatch(settingUsersFilter.setLimit(l))}
            order={orderDir}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            hasCheckbox={true}
            selected={selectedIds}
            onSelect={handleSelect}
            onSelectIdFieldName={'id'}
          />
        </Box>
      </Box>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={'Are you sure you’d like to delete this user data?'}
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDeleteSelected()}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={false}
      />
      <UserBatchUploadDialog
        open={openBatchUpload}
        onClose={handleCloseBatchUpload}
        onRefresh={handleReload}
      />
    </Box>
  )
}

export default SettingUsers
