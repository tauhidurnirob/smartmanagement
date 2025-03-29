import { Checkbox, IconButton, Stack } from '@mui/material'
import { IEmail, IInboxFilter } from '../../../types/feedback'
import { FC } from 'react'
import MultipleSelect from '../../common/MultipleSelect'
import { FEEDBACK_INBOX_STATUS_LIST } from '../../../helpers/constants'
import { ISelectItem } from '../../../types/common'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchField from '../../common/SearchField'
import DatePickerWithText from '../../common/DatePickerWithText'
import { Dayjs } from 'dayjs'
import FeedbackInboxPagination from './FeedbackInboxPagination'
import { InboxIcon } from '../../../assets/icons/inbox'
import { TrashDuotoneIcon } from '../../../assets/icons/trash-duotone'
import { ArchiveIcon } from '../../../assets/icons/archive'
import LabelDialog from './LabelDialog'

interface IProps {
  filters: IInboxFilter
  onChange: (value: IInboxFilter) => void
  data: IEmail[]
  labels: ISelectItem[]
}

const FilterInboxFilterBar: FC<IProps> = ({ filters, onChange, data, labels }) => {
  const handleChangeStatus = (status: ISelectItem[]) => {
    onChange({ ...filters, status })
  }
  const handleChangeSearch = (search: string) => {
    onChange({ ...filters, search })
  }
  const handleChangeStartDate = (startDate: Dayjs | null) => {
    onChange({ ...filters, startDate })
  }
  const handleChangeEndDate = (endDate: Dayjs | null) => {
    onChange({ ...filters, endDate })
  }
  const handleChangePage = (page: number) => {
    onChange({ ...filters, page })
  }
  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      onChange({ ...filters, selectedIds: data?.map((v) => v.id) })
    } else {
      onChange({ ...filters, selectedIds: [] })
    }
  }

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={3}
      py={4}
      gap={2}
      flexWrap={'wrap'}
    >
      <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Checkbox
            size='small'
            sx={{ p: 0 }}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <MultipleSelect
            items={FEEDBACK_INBOX_STATUS_LIST}
            selectedItems={filters.status}
            onChange={handleChangeStatus}
            labelForAll='All'
            modalWidth='140px'
            sx={{
              '& .MuiBox-root': {
                background: 'transparent',
                '& .MuiTypography-root': {
                  maxWidth: '100px',
                },
              },
            }}
          />
          <RefreshIcon fontSize='small' sx={{ color: (theme) => theme.palette.grey[500] }} />
        </Stack>
        {!!filters.selectedIds.length && (
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <IconButton
              size='small'
              sx={{
                color: 'grey.500',
                background: (theme) => theme.palette.grey[100],
                borderRadius: '6px',
              }}
            >
              <InboxIcon />
            </IconButton>
            <IconButton
              size='small'
              sx={{
                color: 'grey.500',
                background: (theme) => theme.palette.grey[100],
                borderRadius: '6px',
              }}
            >
              <TrashDuotoneIcon />
            </IconButton>
            <IconButton
              size='small'
              sx={{
                color: 'grey.500',
                background: (theme) => theme.palette.grey[100],
                borderRadius: '6px',
              }}
            >
              <ArchiveIcon />
            </IconButton>
            <LabelDialog labels={labels} />
          </Stack>
        )}
      </Stack>
      <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
        <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
          <SearchField
            placeholder='Search by Keyword'
            value={filters.search}
            onChange={(e) => handleChangeSearch(e.target.value)}
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              height: '40px',
              justifyContent: 'center',
              width: 'fit-content',
            }}
          />
          <DatePickerWithText
            date={filters.startDate}
            onChange={handleChangeStartDate}
            label={''}
            placeholder='Start Date'
            maxDate={filters.endDate}
          />
          <DatePickerWithText
            date={filters.endDate}
            onChange={handleChangeEndDate}
            label={''}
            placeholder='End Date'
            maxDate={filters.endDate}
          />
        </Stack>
        <FeedbackInboxPagination
          count={4}
          rowsPerPage={10}
          page={filters.page}
          onPageChange={handleChangePage}
        />
      </Stack>
    </Stack>
  )
}

export default FilterInboxFilterBar
