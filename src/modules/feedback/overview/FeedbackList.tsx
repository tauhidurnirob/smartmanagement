import { Box, Typography } from '@mui/material'
import { FC, useState } from 'react'
import {
  ITableHeadCell,
  ITypeItemWithColor,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../../types/common'
import { FEEDBACK_STATUS_LIST, ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../../constants/common'
import CustomChip from '../../common/CustomChip'
import EnhancedTable from '../../common/EnhancedTable'
import { useNavigate } from 'react-router-dom'
import { IFeedback, IFeedbackListFilters } from '../../../types/feedback'
import FeedbackListFilterbar from './FeedbackListFilterBar'
import { tmpFeedbacks } from './dummy'
import ListOptionButton from '../../common/ListOptionButton'
import { TagIcon } from '../../../assets/icons/tag'
import { ActivityIcon } from '../../../assets/icons/activity'
import { DownloadBoxIcon } from '../../../assets/icons/download-box'
import DeleteDialog from '../../common/DeleteDialog'
import StatusChip from './StatusChip'

export const getFeedbackStatusInfo = (status: string) => {
  return FEEDBACK_STATUS_LIST.find((s) => s.label === status)
}

interface IProps {
  isArchive?: boolean
}

const FeedbackList:FC<IProps> = ({
  isArchive
}) => {
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [filters, setFilters] = useState<IFeedbackListFilters>({
    search: '',
    statuses: [],
    projects: [],
    locations: [],
    feedbackTypes: [],
    buildings: [],
    levels: [],
    areas: [],
    units: [],
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
  })
  const [archiveFeedbackOn, setArchiveFeedbackOn] = useState(false)

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as any)
  }

  const handleChangeFilters = (newFilters: IFeedbackListFilters) => {
    setFilters((filters) => ({ ...filters, ...newFilters }))
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IFeedback
        return project?.name
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IFeedback
        return location?.name
      },
    },
    {
      id: '',
      name: 'Feedback ID',
      render: (item: TableData) => {
        const { id } = item as IFeedback
        return id
      },
    },
    {
      id: '',
      name: 'Feedback Type',
      render: (item: TableData) => {
        const { feedbackType } = item as IFeedback
        return <CustomChip type={'default'} text={feedbackType as string} />
      },
    },
    {
      id: '',
      name: 'Date Triggered',
      render: (item: TableData) => {
        const { submittedAt } = item as IFeedback
        return dayjs(submittedAt).format(DATE_FORMAT)
      },
    },
    {
      id: '',
      name: 'Date Closed',
      render: (item: TableData) => {
        const { closedAt } = item as IFeedback
        return dayjs(closedAt).format(DATE_FORMAT)
      },
    },
    {
      id: '',
      name: 'TAT',
      render: (item: TableData) => {
        const { tat } = item as IFeedback
        return tat
      },
    },
    {
      id: '',
      name: 'Status',
      render: (item: TableData) => {
        const { status } = item as IFeedback
        const statusInfo = getFeedbackStatusInfo(status as string)
        return <StatusChip statusInfo={statusInfo as ITypeItemWithColor} onReOpen={() => null} />
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const { id } = item as IFeedback
        return (
          <ListOptionButton
            list={[
              {
                title: 'Tag & Re-assign Feedback',
                icon: TagIcon,
                onClick: () => navigate(`${id}`),
              },
              {
                title: 'Recent Activity',
                icon: ActivityIcon,
                onClick: () => navigate(`${id}/recent-activity`),
              },
              {
                title: 'Archive Feedback',
                icon: DownloadBoxIcon,
                onClick: () => setArchiveFeedbackOn(true),
              },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Box mt={3.5}>
        <FeedbackListFilterbar filters={filters} onChange={handleChangeFilters} />
      </Box>
      <Box mt={3.5}>
        <EnhancedTable
          loading={false}
          totalCount={tmpFeedbacks?.length || 0}
          data={tmpFeedbacks as any}
          page={page}
          rowsPerPage={limit}
          onPageChange={(p) => setPage(p)}
          onRowsPerPageChange={(l) => setLimit(l)}
          order={orderDir}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          hasCheckbox={false}
        />
      </Box>
      <DeleteDialog
        open={archiveFeedbackOn}
        onClose={() => setArchiveFeedbackOn(false)}
        heading='Are you sure you want to archive the selected feedback?'
        subHeading='Once archived, the feedback will be removed from the overview tab and moved to the archive tab.'
        loading={false}
        onGoBack={() => null}
        onDelete={() => null}
        isArchive={true}
      />
    </Box>
  )
}

export default FeedbackList
