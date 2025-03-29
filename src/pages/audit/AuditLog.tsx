import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Box, Button, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import FileSaver from 'file-saver'
import { DownloadLight } from '../../assets/icons/download-light'
import AuditLogList from '../../modules/audit/audit-logs/AuditLogList'
import {
  AUDIT_TABLE_PROCESSED,
  DOWNLOAD_FILE_TYPES,
  INITIAL_PAGE_NUMBER,
} from '../../helpers/constants'
import { TDownloadFileFormat } from '../../types/common'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import DeleteDialog from '../../modules/common/DeleteDialog'
import FormSelect from '../../modules/audit/FormSelector'
import { useDispatch } from 'react-redux'
import { _getAuditLogsState } from '../../store/_selectors'
import { _auditLogActions } from '../../store/slices/audit'
import ButtonDownload from '../../modules/common/ButtonDownload'
import { DATE_FORMAT_FOR_DOWNLOAD } from '../../constants/common'

const AuditLog = () => {
  const dispatch = useDispatch()
  const state = _getAuditLogsState()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [processed, setProcessed] = useState<null | AUDIT_TABLE_PROCESSED>(null)

  const [downloadAuditLogListByFilter, { isLoading: isDownloadingByFilter }] =
    Api.useDownloadAuditLogListByFilterMutation()
  const [downloadAuditLogListByIds, { isLoading: isDownloadingSelected }] =
    Api.useDownloadAuditLogListByIdsMutation()

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const debouncedSearch = useDebounce(state.search, 500)

  const { fromDate, toDate } = useMemo(() => {
    let fromDate: string | null = null
    let toDate: string | null = null

    if (state.startDate) {
      fromDate = dayjs(state.startDate).startOf('day').toISOString()
    }
    if (state.endDate) {
      toDate = dayjs(state.endDate).endOf('day').toISOString()
    }

    return {
      fromDate,
      toDate,
    }
  }, [state.startDate, state.endDate])
  const auditNumber = useMemo(
    () => state.filters.audits.map((i: any) => String(i)),
    [state.filters.audits]
  )
  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const handleChangeForm = (form: number) => {
    dispatch(_auditLogActions.setSelectedForm(form))
  }
  const handleChangeSelected = (selected: number[]) => {
    setSelectedIds(selected)
  }
  const handleRemoveNotification = () => {
    setProcessed(null)
  }

  const handleDownload = (type: TDownloadFileFormat) => {
    if (selectedIds.length > 0) {
      downloadAuditLogListByIds({ ids: selectedIds, fileFormat: type })
        .unwrap()
        .then((res) => {
          if (res) {
            if (type === 'pdf') {
              const blob = new Blob([res])
              FileSaver.saveAs(blob, `audit_logs.zip`)
            } else {
              const format = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              const blob = new Blob([res], {
                type: format,
              })
              FileSaver.saveAs(blob, `audit_logs.xlsx`)
            }
          } else {
            toast.error('Failed to download audit logs. The response is empty')
          }
        })
        .catch((err) => {
          console.log('Failed to download audit logs: ', err)
          toast.error(err?.data?.message || 'Failed to download audit logs')
        })
    } else {
      downloadAuditLogListByFilter({
        orderDir: state.orderDir,
        orderBy: state.orderBy,
        text: debouncedSearch,
        projectIds: projectIds,
        locationIds: locationIds,
        performance: state.filters.performances,
        ...(fromDate ? { startDate: fromDate } : {}),
        ...(toDate ? { endDate: toDate } : {}),
        auditNumber: auditNumber,
        formTypeId: state.selectedForm,
        fileFormat: type,
      })
        .unwrap()
        .then((res) => {
          if (res) {
            const fileName = `audit_logs - ${dayjs(fromDate).format(
              DATE_FORMAT_FOR_DOWNLOAD
            )}_${dayjs(toDate).format(DATE_FORMAT_FOR_DOWNLOAD)}`
            if (type === 'pdf') {
              const blob = new Blob([res])
              FileSaver.saveAs(blob, `${fileName}.zip`)
            } else {
              const format = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              const blob = new Blob([res], {
                type: format,
              })
              FileSaver.saveAs(blob, `${fileName}.xlsx`)
            }
          } else {
            toast.error('Failed to download audit logs. The response is empty')
          }
        })
        .catch((err) => {
          console.log('Failed to download audit logs: ', err)
          toast.error(err?.data?.message || 'Failed to download audit logs')
        })
    }
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetAuditLogListQuery({
    page: state.page,
    limit: state.limit,
    orderDir: state.orderDir,
    orderBy: state.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
    performance: state.filters.performances,
    ...(fromDate ? { startDate: fromDate } : {}),
    ...(toDate ? { endDate: toDate } : {}),
    auditNumber: auditNumber,
    formTypeId: state.selectedForm,
  }, {skip: !state.selectedForm})

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const [DeleteMultiple, { isLoading: isLoadingDelete }] = Api.useDeleteMultipleAuditLogMutation()

  const handleDelete = () => {
    DeleteMultiple(selectedIds)
      .then(() => {
        toast.success('Audit logs have been deleted')
        setOpenDeleteModal(false)
        dispatch(_auditLogActions.setPage(INITIAL_PAGE_NUMBER))
        refetch()
      })
      .catch((err) => {
        console.log('Failed to delete logs: ', err)
        toast.error('Failed to delete logs')
      })
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
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          <Typography variant='h3'>Audit Log</Typography>
          {data?.rows && data?.rows.length > 0 && (
            <ButtonDownload
              options={DOWNLOAD_FILE_TYPES}
              onClick={(file) => handleDownload(file.value as TDownloadFileFormat)}
              isLoading={isDownloadingByFilter || isDownloadingSelected}
            >
              <DownloadLight sx={{ fontSize: 15, mr: 1.25 }} />
              {selectedIds.length ? 'Download Selected' : 'Download All'}
            </ButtonDownload>
          )}
          {selectedIds.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setOpenDeleteModal(true)}>
              Delete Selected
            </Button>
          )}
        </Stack>
        <FormSelect selected={state.selectedForm} onChange={handleChangeForm} />
      </Stack>
      <Box mt={4}>
        <AuditLogList
          onChangeSelected={handleChangeSelected}
          processed={processed}
          onRemoveNotification={handleRemoveNotification}
          selectedProjects={state.selectedProjects}
          setSelectedProjects={(val) => dispatch(_auditLogActions.setSelectedProjects(val))}
          selectedLocations={state.selectedLocations}
          setSelectedLocations={(val) => dispatch(_auditLogActions.setSelectedLocations(val))}
          startDate={state.startDate}
          setStartDate={(date) => dispatch(_auditLogActions.setStartDate(date))}
          endDate={state.endDate}
          setEndDate={(date) => dispatch(_auditLogActions.setEndDate(date))}
          filters={state.filters}
          setFilters={(val) => dispatch(_auditLogActions.setFilters(val))}
          page={state.page}
          setPage={(val) => dispatch(_auditLogActions.setPage(val))}
          limit={state.limit}
          setLimit={(val) => dispatch(_auditLogActions.setLimit(val))}
          orderDir={state.orderDir}
          setOrderDir={(val) => dispatch(_auditLogActions.setOrderDir(val))}
          orderBy={state.orderBy}
          setOrderBy={(val) => dispatch(_auditLogActions.setOrderBy(val))}
          search={state.search}
          setSearch={(val) => dispatch(_auditLogActions.setSearch(val))}
          dataTable={data}
          loading={isLoading}
          refetch={refetch}
          formTypeId = {state.selectedForm}
        />
      </Box>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={'Are you sure you want to delete the selected audit(s)?'}
        onDelete={() => handleDelete()}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={isLoadingDelete}
      />
    </Box>
  )
}

export default AuditLog
