import { FC, useMemo, useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Grid, Stack } from '@mui/material'
import { toast } from 'react-toastify'
import { createSearchParams, useNavigate } from 'react-router-dom'

import {
  IResList,
  ISelectItem,
  ITableHeadCell,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../../types/common'
import { IAudit, IAuditLogMoreFilters } from '../../../types/audit'
import { AUDIT_TABLE_PROCESSED,ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
import SearchField from '../../common/SearchField'
import ProjectSelect from '../project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import SelectDate from '../../common/SelectDate'
import { MoreFilters } from '../../../assets/icons/more-filters'
import RecycleBinNotificationBar from '../recycle-bin/RecycleBinNotificationBar'
import EnhancedTable from '../../common/EnhancedTable'
import AuditLogListMoreFilterModal from './AuditLogListMoreFilterModal'
import ListOptionButton from '../../common/ListOptionButton'
import Api from '../../../api'
import CustomChip from '../../common/CustomChip'
import FilterLabel from '../../common/FilterLabel'
import DeleteDialog from '../../common/DeleteDialog'
import FileSaver from 'file-saver'
import { useDispatch } from 'react-redux'
import { _auditLogActions, _auditLogRecycleActions } from '../../../store/slices/audit'
import useAuth from '../../../hooks/useAuth'
import getFileNameByAudit from '../../../helpers/getFileNameByAudit'

interface IProps {
  processed: null | AUDIT_TABLE_PROCESSED
  onChangeSelected?: (selected: number[]) => void
  onRemoveNotification: () => void
  selectedProjects: ISelectItem[]
  setSelectedProjects: (selected: ISelectItem[]) => void
  selectedLocations: ISelectItem[]
  setSelectedLocations: (selected: ISelectItem[]) => void
  startDate: Dayjs | null
  setStartDate: (date: Dayjs | null) => void
  endDate: Dayjs | null
  setEndDate: (date: Dayjs | null) => void
  filters: IAuditLogMoreFilters
  setFilters: (filters: IAuditLogMoreFilters) => void
  page: number
  setPage: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  orderBy: string
  setOrderBy: (sortBy: keyof IAudit) => void
  orderDir: OrderDirection
  setOrderDir: (orderDir: OrderDirection) => void
  search: string
  setSearch: (search: string) => void
  dataTable: IResList<IAudit> | undefined
  loading: boolean
  isRecycleBin?: boolean
  refetch: () => void
  formTypeId: number | null
}

const AuditLogList: FC<IProps> = ({
  processed,
  onChangeSelected,
  onRemoveNotification,
  selectedProjects,
  setSelectedProjects,
  selectedLocations,
  setSelectedLocations,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filters,
  setFilters,
  page,
  setPage,
  limit,
  setLimit,
  orderBy,
  setOrderBy,
  orderDir,
  setOrderDir,
  search,
  setSearch,
  dataTable,
  loading,
  isRecycleBin,
  refetch,
  formTypeId
}) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [openMoreFilters, setOpenMoreFilters] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [deleteData, setDeleteData] = useState<IAudit | null>(null)

  const projectIds = useMemo(() => {
    return selectedProjects.map((p) => Number(p.value))
  }, [selectedProjects])

  const [deleteLogOne, { isLoading: isLoadingDelete }] = Api.useDeleteAuditLogByIdMutation()
  const [deleteLogPermanenetly, { isLoading: isLoadingDeletePermanenetly }] =
    Api.useDeleteAuditLogListPermanentlyInRecycleBinMutation()
  const [downloadAudit, { isLoading: isdownloading }] = Api.useDownloadAuditByIdMutation()

  const _isDeleting = isRecycleBin ? isLoadingDeletePermanenetly : isLoadingDelete

  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.log.viewAuditLogDetails)) {
      setIsVisible(true);
    }else{
      setIsVisible(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.log.deleteAuditList)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isVisible, setIsVisible] = useState(true);
  const [isDeletable, setIsDeletable] = useState(true);
  const handleDownloadAudit = (audit: IAudit) => {
    downloadAudit({ id: audit.id })
      .unwrap()
      .then((res) => {
        console.log(res)
        if (res) {
          const fileType = 'application/pdf'
          const fileNameWithoutExtension = getFileNameByAudit(audit)
          const fileName= `${fileNameWithoutExtension}.pdf`
          const blob = new Blob([res], {
            type: fileType,
          })
          FileSaver.saveAs(blob, fileName)
          toast.success('Download successful!')
        }
      })
      .catch((err) => {
        console.log('Failed to download audit: ', err)
        toast.error(err?.data?.message || 'Failed to download audit')
      })
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    setSelectedProjects(items)
    if (selectedLocations.length > 0) {
      setSelectedLocations([])
    }
  }

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    setSelectedLocations(items)
  }

  const handleMoreFilters = (inFilters: { performances: number[]; audits: number[] }) => {
    setFilters(inFilters)
    setOpenMoreFilters(false)
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
  }

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleSelect = (selected: number[]) => {
    setSelected(selected)
    if (onChangeSelected) {
      onChangeSelected(selected)
    }
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof IAudit)
  }

  const handleEdit = (data: IAudit) => {
    if(isVisible){
      const locationId = data?.location?.id
      if (!locationId) {
        toast.error('Audit is not assigned to any location!')
        return
      }
      const month = dayjs(data?.submittedAt).format('M')
      const year = dayjs(data?.submittedAt).format('YYYY')
      navigate({
        pathname: `/audit/log/${locationId}`,
        search: `?${createSearchParams({
          month: month,
          year: year,
          formTypeId: String(formTypeId)
        })}`,
      })
    }else{
      toast.error('You do not have access to view details!')
    }
    
  }

  const handleDelete = (data: IAudit) => {
    if(isDeletable){
      if (isRecycleBin) {
        deleteLogPermanenetly([data.id as number])
          .then(() => {
            toast.success('Log deleted successfully')
            dispatch(_auditLogRecycleActions.setPage(1))
            refetch()
            setDeleteData(null)
          })
          .catch((err) => {
            console.log('Failed to delete log: ', err)
            toast.error('Failed to delete log')
          })
      } else {
        deleteLogOne(data.id as number)
          .then(() => {
            toast.success('Log deleted successfully')
            dispatch(_auditLogActions.setPage(1))
            refetch()
            setDeleteData(null)
          })
          .catch((err) => {
            console.log('Failed to delete log: ', err)
            toast.error('Failed to delete log')
          })
      }
    }else{
        toast.error('You do not have access to delete!')
    }
  
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Audit ID',
      render: (item: TableData) => {
        const { id } = item as IAudit
        return id || '-'
      },
    },
    {
      id: '',
      name: 'Audit Created on',
      render: (item: TableData) => {
        const { submittedAt } = item as IAudit
        return submittedAt ? dayjs(submittedAt).format('DD-MM-YYYY hh:mm:ss') : '-'
      },
    },
    {
      id: '',
      name: 'Form Type and Name',
      render: (item: TableData) => {
        const { formTemplate } = item as IAudit
        return `[${formTemplate?.formType?.name?.toString()?.padStart(2, '0') || '-'}] ${
          formTemplate?.name || '-'
        }`
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IAudit
        return location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Audit Number',
      render: (item: TableData) => {
        const { auditNumber } = item as IAudit
        return typeof auditNumber === 'number' ? auditNumber : '-'
      },
    },
    {
      id: '',
      name: 'Performance',
      render: (item: TableData) => {
        const { performance } = item as IAudit
        return (
          <CustomChip
            type={performance >= 70 ? 'success' : 'error'}
            text={typeof performance === 'number' ? `${performance.toFixed(2)}%` : '-'}
          />
        )
      },
    },
    {
      id: '',
      name: 'Remarks',
      render: (item: TableData) => {
        const { remarks } = item as IAudit
        return remarks || '-'
      },
    },
    {
      id: '',
      name: 'User',
      render: (item: TableData) => {
        const { user } = item as IAudit
        return user?.fullName || ''
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IAudit
        return (
          <ListOptionButton
            list={[
              ...(isRecycleBin ? [] : [{ title: 'View', onClick: () => handleEdit(data) }]),
              { title: 'Download', onClick: () => handleDownloadAudit(data) },
              { title: 'Delete', onClick: () => setDeleteData(data) },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderRadius: 1.5, pt: 4.5, pb: 3.75, px: 3.75, bgcolor: '#ffffff' }}>
        <Stack
          direction={{ lg: 'row', xs: 'column' }}
          alignItems='flex-start'
          justifyContent='space-between'
          columnGap={{ lg: 1.5, xs: 1 }}
          rowGap={2.5}
        >
          <Grid
            container
            columnSpacing={{ lg: 1.25, xs: 1 }}
            rowSpacing={{ lg: 1.25, xs: 2.5 }}
            flexGrow={1}
          >
            <Grid item xs={12} md={2}>
              <FilterLabel text='Search' />
              <SearchField
                placeholder='Search by Keyword'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  minWidth: 0,
                  height: '40px',
                  justifyContent: 'center',
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FilterLabel text='Project' />
              <ProjectSelect
                hiddenLabel={true}
                selected={selectedProjects}
                onChange={handleChangeSelectedProjects}
                isRecycleBin={isRecycleBin}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FilterLabel text='Location' />
              <LocationSelect
                hiddenLabel={true}
                selected={selectedLocations}
                onChange={handleChangeSelectedLocations}
                isRecycleBin={isRecycleBin}
                projectIds={projectIds}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FilterLabel text='Start Date' />
              <SelectDate
                value={startDate}
                onAccept={(date) => setStartDate(date)}
                maxDate={endDate}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FilterLabel text='End Date' />
              <SelectDate
                value={endDate}
                onAccept={(date) => setEndDate(date)}
                minDate={startDate}
              />
            </Grid>
          </Grid>
          <Box>
            <FilterLabel text='More' />
            <Box
              sx={{
                display: 'flex',
                cursor: 'pointer',
                bgcolor: (theme) => theme.palette.grey[200],
                p: 1,
                borderRadius: 1.5,
              }}
              onClick={handleOpenMoreFilters}
            >
              <MoreFilters sx={{ fontSize: 23, color: (theme) => theme.palette.primary.main }} />
            </Box>
          </Box>
        </Stack>
      </Box>

      <RecycleBinNotificationBar processed={processed} onRemove={onRemoveNotification} />

      <Box mt={1.5}>
        <EnhancedTable
          loading={loading}
          totalCount={dataTable?.count || 0}
          data={dataTable?.rows || []}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => setPage(p)}
          onRowsPerPageChange={(l) => setLimit(l)}
          order={orderDir}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={true}
          selected={selected}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
        />
      </Box>

      <AuditLogListMoreFilterModal
        open={openMoreFilters}
        filters={filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
      <DeleteDialog
        open={!!deleteData}
        onClose={() => setDeleteData(null)}
        heading={'Are you sure you want to delete this audit log?'}
        onDelete={() => handleDelete(deleteData as IAudit)}
        onGoBack={() => setDeleteData(null)}
        loading={isLoadingDelete}
      />
    </Box>
  )
}

export default AuditLogList
