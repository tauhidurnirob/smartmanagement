import { FC, useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { AUDIT_TABLE_PROCESSED } from '../../../helpers/constants'
import AuditLogList from './AuditLogList'
import useDebounce from '../../../hooks/useDebounce'
import Api from '../../../api'
import { useDispatch } from 'react-redux'
import { _getAuditLogsRecycleState, _getAuditLogsState } from '../../../store/_selectors'
import { _auditLogRecycleActions } from '../../../store/slices/audit'

interface IProps {
  processed: null | AUDIT_TABLE_PROCESSED
  onChangeSelected?: (selected: number[]) => void
  onRemoveNotification: () => void
}

const AuditLogListRecycle: FC<IProps> = ({ processed, onChangeSelected, onRemoveNotification }) => {
  const dispatch = useDispatch()
  const state = _getAuditLogsRecycleState()

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
    () => state.filters.audits.map((i) => String(i)),
    [state.filters.audits]
  )
  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const { data, isLoading, refetch, isUninitialized } = Api.useGetAuditLogListInRecycleBinQuery({
    page: state.page,
    limit: state.limit,
    orderDir: state.orderDir,
    orderBy: state.orderBy,
    text: debouncedSearch,
    projectIds: projectIds as number[],
    locationIds: locationIds as number[],
    ...(fromDate ? { startDate: fromDate } : {}),
    ...(toDate ? { endDate: toDate } : {}),
    performance: state.filters.performances,
    auditNumber: auditNumber,
  })

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

  return (
    <AuditLogList
      onChangeSelected={onChangeSelected}
      processed={processed}
      onRemoveNotification={onRemoveNotification}
      selectedProjects={state.selectedProjects}
      setSelectedProjects={(val) => dispatch(_auditLogRecycleActions.setSelectedProjects(val))}
      selectedLocations={state.selectedLocations}
      setSelectedLocations={(val) => dispatch(_auditLogRecycleActions.setSelectedLocations(val))}
      startDate={state.startDate}
      setStartDate={(date) => dispatch(_auditLogRecycleActions.setStartDate(date))}
      endDate={state.endDate}
      setEndDate={(date) => dispatch(_auditLogRecycleActions.setEndDate(date))}
      filters={state.filters}
      setFilters={(val) => dispatch(_auditLogRecycleActions.setFilters(val))}
      page={state.page}
      setPage={(val) => dispatch(_auditLogRecycleActions.setPage(val))}
      limit={state.limit}
      setLimit={(val) => dispatch(_auditLogRecycleActions.setLimit(val))}
      orderDir={state.orderDir}
      setOrderDir={(val) => dispatch(_auditLogRecycleActions.setOrderDir(val))}
      orderBy={state.orderBy}
      setOrderBy={(val) => dispatch(_auditLogRecycleActions.setOrderBy(val))}
      search={state.search}
      setSearch={(val) => dispatch(_auditLogRecycleActions.setSearch(val))}
      dataTable={data}
      loading={isLoading}
      isRecycleBin={true}
      refetch={refetch}
      formTypeId={state.selectedForm}
    />
  )
}

export default AuditLogListRecycle
