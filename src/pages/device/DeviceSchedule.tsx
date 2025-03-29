import { useMemo, useState,useEffect } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import { IDeviceScheduleListFilters, IDeviceSchedule } from '../../types/device'
import ListOptionButton from '../../modules/common/ListOptionButton'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { CalendarSchedule } from '../../assets/icons/calendar-schedule'
import DeviceScheduleListFilterbar from '../../modules/device/DeviceScheduleListFilterbar'
import Api from '../../api'
import { useDispatch } from 'react-redux'
import _actions from '../../store/_actions'
import useDebounce from '../../hooks/useDebounce'
import { _getDeviceScheduleList } from '../../store/_selectors'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { toast } from 'react-toastify'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
const DeviceScheduleItem = ({ schedule }: { schedule: IDeviceSchedule }) => {
  const { devices } = useMemo(() => {
    const { devices } = schedule
    return {
      devices
    }
  }, [schedule])

  return (
    <Stack
      sx={{
        gap: 2,
        borderRadius: 2,
        border: `1px dashed #00A3FF`,
        py: 2,
        px: 2.5,
      }}
    >
      {
        !schedule.devices.length &&
        <Stack direction={'row'} alignItems={'center'} gap={2} >
          <Typography variant='h4' sx={{ fontWeight: 700, color: '#00A3FF' }}>
            All {schedule.deviceType.deviceType}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              borderRadius: 1,
              backgroundColor: 'grey.50',
              p: 0.5,
            }}
          >
            <Typography variant='h4' sx={{ color: 'grey.800' }}>
              {schedule?.status || '-'}
            </Typography>
          </Box>
        </Stack>
      }
      {
        devices?.map((device) => {
          return (
            <Stack direction={'row'} alignItems={'center'} gap={2} >
              <Typography variant='h4' sx={{ fontWeight: 700, color: '#00A3FF' }}>
                {device.identificationNo}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  borderRadius: 1,
                  backgroundColor: 'grey.50',
                  p: 0.5,
                }}
              >
                <Typography variant='h4' sx={{ color: 'grey.800' }}>
                  {schedule?.status || '-'}
                </Typography>
              </Box>
            </Stack>
          )
        })
      }
    </Stack>
  )
}

const DeviceSchedule = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isAddable, setAddable] = useState(false);
  const [isDeletable, setDeletable] = useState(false);
  const [isEditable, setEditable] = useState(false);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.activationSchedule.addNewSchedule)) {
      setAddable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.activationSchedule.deleteSchedule)) {
      setDeletable(true)
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.activationSchedule.viewEditSchedule)) {
      setEditable(true)
    }
  }, [])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [deleteSingleSchedule, setDeleteSingleSchedule] = useState<number | null>(null)

  const { pagination, filters } = _getDeviceScheduleList()

  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const buildingIds = useMemo(() => {
    return filters.buildings.map((p) => Number(p.value))
  }, [filters.buildings])

  const levelIds = useMemo(() => {
    return filters.levels.map((p) => Number(p.value))
  }, [filters.levels])

  const areaIds = useMemo(() => {
    return filters.areas.map((p) => Number(p.value))
  }, [filters.areas])

  const unitIds = useMemo(() => {
    return filters.units.map((p) => Number(p.value))
  }, [filters.units])

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.schedule.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.schedule.setOrderBy(property as keyof IDeviceSchedule))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.schedule.setLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.schedule.setPage(page))
  }

  const handleChangeFilters = (newFilters: IDeviceScheduleListFilters) => {
    dispatch(_actions.devices.schedule.setFilters({ ...filters, ...newFilters }))
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetDeviceScheduleListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
    buildingIds: buildingIds,
    levelIds: levelIds,
    areaIds: areaIds,
    unitIds: unitIds
  })
  const [deleteSchedule, {isLoading: deleteLoading}] = Api.useDeleteDeviceScheduleByIdMutation()
  const [deleteMultiple, {isLoading: deleteMultipleLoading}] = Api.useBatchDeleteDeviceSchedulesMutation()

  const handleGotoNewIncident = () => {
    if(isAddable){
      navigate('/device/activation-schedule/create')
    }else{
      toast.error('You do not have access to add!')
    }   
  }

  const handleEdit = (data: IDeviceSchedule) => {
    if(isEditable){
      navigate(`/device/activation-schedule/${data?.id}`)
    }else{
      toast.error('You do not have access to edit!')
    } 
  }
  const checkDelete = (data : any) => {
    if(isDeletable){
      if(data==null){
        setOpenDeleteModal(true)
      }else{
        setDeleteSingleSchedule(data.id) 
      }
      
    }else{
      toast.error('You do not have access to delete!')
    } 
  }

  const handleDelete = (id: number) => {
    console.log("handleDelete")
    deleteSchedule(id)
      .unwrap()
      .then(() => {
        toast.success('Device schedule has been deleted')
        setDeleteSingleSchedule(null)
      })
      .catch((err) => {
        console.log('Failed to delete device schedule: ', err)
        toast.error('Failed to delete device schedule')
      })
  }

  const handleDeleteSelected = () => {
    console.log("handleDeleteselect")
    deleteMultiple(selectedIds)
      .unwrap()
      .then(() => {
        toast.success('Device schedules have been deleted')
        setOpenDeleteModal(false)
      })
      .catch((err) => {
        console.log('Failed to delete device schedules: ', err)
        toast.error('Failed to delete schedules')
      })
  }

  const headCells: ITableHeadCell[] = [
    {
      id: 'scheduleName',
      name: 'Schedule Name',
      render: (item: TableData) => {
        const { scheduleName } = item as IDeviceSchedule
        return  scheduleName
      }
    },
    {
      id: '',
      name: 'Frequency',
      render: (item: TableData) => {
        const { frequencyType, repeatOn } = item as IDeviceSchedule
        const repeatOnArr = repeatOn?.split(',')
        return frequencyType === 'weekly' ? (
          <Typography fontWeight={'600'}>
            {frequencyType} ({' '}
            {repeatOnArr?.map((r, idx) => (idx === repeatOnArr.length - 1 ? r : `${r}, `))} )
          </Typography>
        ) : (
          frequencyType
        )
      },
    },
    {
      id: '',
      name: 'Start Date & Time',
      render: (item: TableData) => {
        const { timeStart } = item as IDeviceSchedule
        return timeStart ? dayjs(timeStart).format(DATE_FORMAT_WITHOUT_MIN) : '_'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IDeviceSchedule
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IDeviceSchedule
        return location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Building',
      render: (item: TableData) => {
        const { building } = item as IDeviceSchedule
        return building?.name || '-'
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item: TableData) => {
        const { level } = item as IDeviceSchedule
        return level?.name || '-'
      },
    },
    {
      id: '',
      name: 'Area',
      render: (item: TableData) => {
        const { area } = item as IDeviceSchedule
        return area?.name || '-'
      },
    },
    {
      id: '',
      name: 'Unit',
      render: (item: TableData) => {
        const { unit } = item as IDeviceSchedule
        return unit?.name || '-'
      },
    },
    {
      id: '',
      name: 'Activity',
      render: (item: TableData) => {
        return <DeviceScheduleItem schedule={item as IDeviceSchedule} />
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IDeviceSchedule
        return (
          <ListOptionButton
            list={[
              { title: 'View & Edit', onClick: () => handleEdit(data) },
              { title: 'Delete', onClick: () => checkDelete("single") },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h3'>Activation Schedule</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          {selectedIds.length > 0 && (
            <Button
              variant='contained'
              size='small'
              color='error'
              onClick={() => checkDelete(null)}
            >
              Delete Selected
            </Button>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<CalendarSchedule sx={{ color: '#4DBFFF' }} />}
            onClick={handleGotoNewIncident}
          >
            Add New Schedule
          </Button>
        </Stack>
      </Stack>
      <Box mt={3.25}>
        <DeviceScheduleListFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={3}>
          <EnhancedTable
            loading={false}
            totalCount={data?.count || 0}
            data={data?.rows || []}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeLimit}
            order={pagination.orderDir}
            orderBy={pagination.orderBy}
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
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the selected device schedule(s)?
          </span>
        }
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDeleteSelected()}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={deleteMultipleLoading}
      />
      <DeleteDialog
        open={!!deleteSingleSchedule}
        onClose={() => setDeleteSingleSchedule(null)}
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the selected device schedule?
          </span>
        }
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDelete(deleteSingleSchedule as number)}
        onGoBack={() => setDeleteSingleSchedule(null)}
        loading={deleteLoading}
      />
    </Box>
  )
}

export default DeviceSchedule
