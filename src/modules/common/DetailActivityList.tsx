import { FC, useMemo, useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'

import EnhancedTable from './EnhancedTable'
import { ROW_PER_PAGE_OPTIONS } from '../../helpers/constants'
import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'
import { DATE_FORMAT_WITHOUT_ATSIGN } from '../../constants/common'
import { IUser } from '../../api/models'
import { IActivityLog } from '../../types/activity'

const tmpUser1 = { id: 6, fullName: 'superadmin' } as IUser
const tmpUser2 = { id: 5, fullName: 'device' } as IUser

export const tmpDeviceActivityLogList: IActivityLog[] = [
  {
    id: 1,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser1.id,
    actor: tmpUser1,
    action: 'Device updated',
    recordId: '1695',
  },
  {
    id: 2,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser1.id,
    actor: tmpUser1,
    action: 'Device updated',
    recordId: '1945',
  },
  {
    id: 3,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser1.id,
    actor: tmpUser1,
    action: 'Device updated',
    recordId: '1945',
  },
  {
    id: 4,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser2.id,
    actor: tmpUser2,
    action: 'Device fully charged',
    recordId: '1695',
  },
  {
    id: 5,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser2.id,
    actor: tmpUser2,
    action: 'Low battery',
    recordId: '1695',
  },
  {
    id: 6,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser1.id,
    actor: tmpUser1,
    action: 'Device updated',
    recordId: '1695',
  },
  {
    id: 7,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser2.id,
    actor: tmpUser2,
    action: 'Device fully charged',
    recordId: '1695',
  },
  {
    id: 8,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser2.id,
    actor: tmpUser2,
    action: 'Low battery',
    recordId: '1945',
  },
  {
    id: 9,
    createdAt: '2022-10-30T03:54:07.0000000Z',
    actorId: tmpUser1.id,
    actor: tmpUser1,
    action: 'Device updated',
    recordId: '1945',
  },
]

interface IProps {
  hasParameters?: boolean
  hiddenLabel?: boolean
  isActivityLog?: boolean
  logList?: { count: number; rows: IActivityLog[] }
  onLoad?: (options: { page: number; limit: number }) => void
}

const DetailActivityList: FC<IProps> = ({
  hiddenLabel,
  hasParameters,
  isActivityLog,
  logList,
  onLoad,
}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('desc')
  const [orderBy, setOrderBy] = useState<keyof IActivityLog>('id')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const dataTable = useMemo(() => {
    const data = logList || {
      count: tmpDeviceActivityLogList.length,
      rows: tmpDeviceActivityLogList,
    }
    return data
  }, [logList])

  console.log('dataTable: ', dataTable);
  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof IActivityLog)
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  useEffect(() => {
    if (onLoad) onLoad({ page, limit })
  }, [page, limit])

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Timestamp',
      tableCellSx: { pl: 4 },
      tableHeaderCellSx: { pl: 4 },
      render: (item: TableData) => {
        const { createdAt } = item as IActivityLog
        return createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_ATSIGN) : '-'
      },
    },
    {
      id: '',
      name: 'Action Done By',
      render: (item: TableData) => {
        const { actor } = item as IActivityLog
        return actor?.fullName || '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const { action } = item as IActivityLog
        return action ? action : '-'
      },
    },
    {
      id: '',
      name: 'Record ID',
      render: (item: TableData) => {
        const { recordId } = item as IActivityLog
        return recordId ? recordId : '-'
      },
    },
  ]

  if (hasParameters) {
    headCells.push({
      id: '',
      name: 'Parameters',
      tableCellSx: { width: '30%' },
      render: (item: TableData) => {
        const { parameters } = item as IActivityLog
        return parameters ? parameters : '-'
      },
    })
  }

  return (
    <Box>
      {!hiddenLabel && (
        <Box
          sx={{
            backgroundColor: '#ffffff',
            pt: 2.5,
            pb: 2,
            px: 4,
            borderBottom: '1px solid #EFF2F5',
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography variant='h3'>Activity Log</Typography>
        </Box>
      )}
      <EnhancedTable
        loading={false}
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
        hasCheckbox={false}
        selected={selectedIds}
        onSelect={handleSelect}
        onSelectIdFieldName={'id'}
        sx={{
          ...(!hiddenLabel && {
            '.MuiTableCell-root': { borderBottomColor: '#ffffff' },
            '> div': { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
          }),
          ...(isActivityLog && {
            '.MuiPaper-root': { px: 3.75, pt: 1.25, pb: 2 },
            '.MuiTableHead-root': {
              '.MuiTableRow-root': { bgcolor: '#fff', '.MuiTableCell-root': { color: 'grey.400' } },
            },
            '.MuiTableBody-root': {
              '.MuiTableRow-root:last-child': {
                '.MuiTableCell-root': {
                  borderBottom: 'none',
                },
              },
            },
          }),
        }}
      />
    </Box>
  )
}

export default DetailActivityList
