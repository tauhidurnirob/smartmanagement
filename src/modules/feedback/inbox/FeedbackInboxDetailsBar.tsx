import { IconButton, Stack } from "@mui/material"
import { IEmail, IInboxFilter } from "../../../types/feedback"
import { FC } from "react"
import FeedbackInboxPagination from "./FeedbackInboxPagination"
import { InboxIcon } from '../../../assets/icons/inbox'
import { TrashDuotoneIcon } from "../../../assets/icons/trash-duotone"
import { ArchiveIcon } from "../../../assets/icons/archive"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface IProps {
  page: number
  setPage: (value: number) => void
  data: IEmail[],
  onBack: () => void
}

const FeedbackInboxDetailsBar:FC<IProps> = ({
  page,
  setPage,
  data,
  onBack
}) => {

  const handleChangePage = (page: number) => {
    setPage(page)
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
      sx={{borderBottom: theme => `1px solid ${theme.palette.divider}`}}
    >
      <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
        <Stack direction={'row'} alignItems={'center'} gap={1} >
          <IconButton
            sx={{color: 'grey.500'}}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{color: 'grey.500', background: theme => theme.palette.grey[100], borderRadius: '6px'}}
          >
            <InboxIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{color: 'grey.500', background: theme => theme.palette.grey[100], borderRadius: '6px'}}
          >
            <TrashDuotoneIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{color: 'grey.500', background: theme => theme.palette.grey[100], borderRadius: '6px'}}
          >
            <ArchiveIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
        <FeedbackInboxPagination
          count={4}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Stack>
    </Stack>
  )
}

export default FeedbackInboxDetailsBar