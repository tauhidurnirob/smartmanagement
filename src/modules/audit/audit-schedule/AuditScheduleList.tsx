import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

import SearchField from '../../common/SearchField'
import ProjectSelect from '../project-sites/ProjectSelect'
import { ISelectItem, ITableHeadCell, TableData, TableDataFieldName } from '../../../types/common'
import LocationSelect from '../../location/LocationSelect'
import EnhancedTable from '../../common/EnhancedTable'
import { AUDIT_SCHEDULE_FREQUENCYS, AUDIT_TABLE_PROCESSED,ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
import RecycleBinNotificationBar from '../recycle-bin/RecycleBinNotificationBar'
import FrequencySelect from './FrequencySelect'
import Api from '../../../api'
import useDebounce from '../../../hooks/useDebounce'
import { IAuditSchedule } from '../../../types/audit'
import DeleteDialog from '../../common/DeleteDialog'
import ListOptionButton from '../../common/ListOptionButton'
import { DATE_FORMAT_WITHOUT_MIN } from '../../../constants/common'
import CustomDateRange from '../../common/CustomDateRange'
import { useDispatch } from 'react-redux'
import {
  _auditScheduleState,
  _getAuditScheduleRecycleState,
  _getAuditScheduleState,
} from '../../../store/_selectors'
import { _auditScheduleActions, _auditScheduleRecycleActions } from '../../../store/slices/audit'
import useAuth from '../../../hooks/useAuth'


interface IProps {
  processed?: null | AUDIT_TABLE_PROCESSED
  onChangeSelected?: (selected: number[]) => void
  onRemoveNotification?: () => void
  isRecycleBin?: boolean
}

const AuditScheduleList: FC<IProps> = ({
  processed,
  isRecycleBin,
  onChangeSelected,
  onRemoveNotification,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = isRecycleBin ? _getAuditScheduleRecycleState() : _getAuditScheduleState()
  const actions = isRecycleBin ? _auditScheduleRecycleActions : _auditScheduleActions

  const [deleteScheduleId, setDeleteScheduleId] = useState<number | null>(null)
  const [datePopupOn, setDatePopupOn] = useState(false)
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.schedule.viewTasksForCleaner)) {
      setIsVisible(true);
    }else{
      setIsVisible(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.schedule.deleteTasksForCleaner)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isVisible, setIsVisible] = useState(true);
  const [isDeletable, setIsDeletable] = useState(true);

  const debouncedSearch = useDebounce(state.search, 500)
  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const {
    data: auditList,
    isLoading: isLoadingAuditList,
    refetch: refretchAuditScheduleList,
    isUninitialized: isUninitializedList,
  } = Api.useGetAuditScheduleListQuery(
    {
      page: state.page,
      limit: state.limit,
      orderBy: state.orderBy,
      orderDir: state.orderDir,
      text: debouncedSearch,
      projectIds: projectIds,
      locationIds: locationIds,
      frequencyType: state.selectedFrequency.value as string,
      ...(state.dateRange.startDate
        ? { startDate: dayjs(state.dateRange.startDate).startOf('day').toISOString() }
        : {}),
      ...(state.dateRange.endDate
        ? { endDate: dayjs(state.dateRange.endDate).endOf('day').toISOString() }
        : {}),
    },
    { skip: isRecycleBin }
  )

  const {
    data: auditListInRecycleBin,
    isLoading: isLoadingAuditListInRecycleBin,
    refetch: refretchAuditScheduleListInRecycleBin,
    isUninitialized: isUninitializedInRecycleBin,
  } = Api.useGetAuditScheduleListInRecycleBinQuery(
    {
      page: state.page,
      limit: state.limit,
      orderBy: state.orderBy,
      orderDir: state.orderDir,
      text: debouncedSearch,
      projectIds: projectIds,
      locationIds: locationIds,
      frequencyType: state.selectedFrequency.value as string,
      ...(state.dateRange.startDate
        ? { startDate: dayjs(state.dateRange.startDate).startOf('day').toISOString() }
        : {}),
      ...(state.dateRange.endDate
        ? { endDate: dayjs(state.dateRange.endDate).endOf('day').toISOString() }
        : {}),
    },
    { skip: !isRecycleBin }
  )
  const [deleteSchedule, { isLoading: isLoadingDelete }] = Api.useDeleteAuditScheduleByIdMutation()
  const [deleteSchedulePermanenetly, { isLoading: isLoadingDeletePermanenetly }] =
    Api.useDeleteAuditScheduleListPermanentlyInRecycleBinMutation()

  const refetch = isRecycleBin ? refretchAuditScheduleListInRecycleBin : refretchAuditScheduleList
  const data = isRecycleBin ? auditListInRecycleBin : auditList
  const isLoading = isRecycleBin ? isLoadingAuditListInRecycleBin : isLoadingAuditList
  const isUninitialized = isRecycleBin ? isUninitializedInRecycleBin : isUninitializedList

  const [selected, setSelected] = useState<number[]>([])

  const handleEdit = (data: IAuditSchedule) => {
   
    if(isVisible){
        navigate(`/audit/schedule/${data.id}`)
    }
    else{
        toast.error('You do not have access to view and edit!')
    }
  
  }

  const handleDelete = (data: IAuditSchedule) => {
    setDeleteScheduleId(data.id)
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(actions.setSelectedProjects(items))
    if (state.selectedLocations.length > 0) {
      dispatch(actions.setSelectedLocations([]))
    }
  }

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(actions.setSelectedLocations(items))
  }

  const handleChangeFrequency = (frequency: ISelectItem) => {
    if (frequency.value === 'specific-date') {
      setDatePopupOn(true)
    } else {
      dispatch(actions.setSelectedFrequency(frequency))
      dispatch(
        actions.setDateRange({
          startDate: null,
          endDate: null,
        })
      )
    }
  }

  const handleSelect = (selected: number[]) => {
    setSelected(selected)
    if (onChangeSelected) {
      onChangeSelected(selected)
    }
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = state.orderBy === property && state.orderDir === 'asc'
    dispatch(actions.setOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(actions.setOrderBy(property as keyof IAuditSchedule))
  }

  const handleDeleteOneSchedule = () => {

    if(isDeletable){
      if (isRecycleBin) {
            deleteSchedulePermanenetly([deleteScheduleId as number])
              .then(() => {
                toast.success('Schedule deleted successfully')
                setDeleteScheduleId(null)
                refetch()
              })
              .catch((err) => {
                console.log('Failed to delete schedule: ', err)
                toast.error('Failed to delete schedule')
              })
          } else {
            deleteSchedule(deleteScheduleId as number)
              .then(() => {
                toast.success('Schedule deleted successfully')
                setDeleteScheduleId(null)
                refetch()
              })
              .catch((err) => {
                console.log('Failed to delete schedule: ', err)
                toast.error('Failed to delete schedule')
              })
          }
    }
    else{
      toast.error('You do not have access to delete!')
    }
   
  }

  useEffect(() => {
    if (
      processed === AUDIT_TABLE_PROCESSED.restored ||
      processed === AUDIT_TABLE_PROCESSED.deleted
    ) {
      refetch()
    }
  }, [processed])

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const headCells: ITableHeadCell[] = [
    {
      id: 'name',
      name: 'Schedule Name',
      render: (item: TableData) => {
        const { name } = item as IAuditSchedule
        return name
      },
    },
    {
      id: 'frequencyType',
      name: 'Frequency',
      render: (item: TableData) => {
        const { frequencyType, repeatOn } = item as IAuditSchedule
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
        const { timeStart } = item as IAuditSchedule
        return timeStart ? dayjs(timeStart).format(DATE_FORMAT_WITHOUT_MIN) : '_'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IAuditSchedule
        return project?.name || '_'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IAuditSchedule
        return location?.name || '_'
      },
    },
    {
      id: '',
      name: 'Assign to',
      render: (item: TableData) => {
        const { users } = item as IAuditSchedule
        return users?.map((a, idx) => `${a.fullName}${users?.length - 1 !== idx ? ', ' : ''}`)
      },
    },
    {
      id: 'notificationDescription',
      name: 'Notification Description',
      render: (item: TableData) => {
        const { notificationDescription } = item as IAuditSchedule
        return notificationDescription || ''
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IAuditSchedule
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

  return (
    <Box sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderRadius: 1.5, pt: 4.5, pb: 3.75, px: 3.75, bgcolor: '#ffffff' }}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={6} xs={12}>
            <Typography
              typography='h4'
              sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
            >
              Search
            </Typography>
            <SearchField
              placeholder='Search by Keyword'
              value={state.search}
              onChange={(e) => dispatch(actions.setSearch(e.target.value))}
              sx={{
                background: (theme) => theme.palette.grey[100],
                minWidth: 0,
                height: '40px',
                justifyContent: 'center',
              }}
            />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography
              typography='h4'
              sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
            >
              Project
            </Typography>
            <ProjectSelect
              hiddenLabel={true}
              selected={state.selectedProjects}
              onChange={handleChangeSelectedProjects}
              isRecycleBin={isRecycleBin}
            />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography
              typography='h4'
              sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
            >
              Location
            </Typography>
            <LocationSelect
              hiddenLabel={true}
              selected={state.selectedLocations}
              onChange={handleChangeSelectedLocations}
              isRecycleBin={isRecycleBin}
              projectIds={projectIds}
            />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Typography
              typography='h4'
              sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
            >
              Frequency
            </Typography>
            <FrequencySelect
              hiddenLabel={true}
              selected={state.selectedFrequency}
              onChange={handleChangeFrequency}
              options={AUDIT_SCHEDULE_FREQUENCYS}
            />
          </Grid>
        </Grid>
      </Box>

      <RecycleBinNotificationBar processed={processed} onRemove={onRemoveNotification} />

      <Box mt={3.5}>
        <EnhancedTable
          loading={isLoading}
          totalCount={data?.count || 0}
          data={data?.rows || []}
          page={state.page}
          rowsPerPage={state.limit}
          onPageChange={(p) => dispatch(actions.setPage(p))}
          onRowsPerPageChange={(l) => dispatch(actions.setLimit(l))}
          order={state.orderDir}
          orderBy={state.orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
        />
      </Box>

      <DeleteDialog
        open={!!deleteScheduleId}
        onClose={() => setDeleteScheduleId(null)}
        heading={'Are you sure you want to delete this schedule?'}
        subHeading={''}
        onDelete={() => handleDeleteOneSchedule()}
        onGoBack={() => setDeleteScheduleId(null)}
        loading={isLoadingDelete || isLoadingDeletePermanenetly}
      />

      <CustomDateRange
        open={datePopupOn}
        handleClose={() => setDatePopupOn(false)}
        value={state.dateRange}
        setValue={(val) => {
          dispatch(actions.setDateRange(val))
          dispatch(actions.setSelectedFrequency(AUDIT_SCHEDULE_FREQUENCYS[6]))
        }}
      />
    </Box>
  )
}

export default AuditScheduleList
