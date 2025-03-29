import { Box, Checkbox, Chip, Stack, Typography } from "@mui/material"
import { FC, useState } from "react"
import { IEmail, IInboxFilter } from "../../../types/feedback"
import { tmpEmails } from "./dummy"
import FilterInboxFilterBar from "./FeedbackInboxFilterBar"
import dayjs from "dayjs"
import { ISelectItem } from "../../../types/common"
import { useNavigate } from "react-router-dom"

interface IItemProps {
  email: IEmail
  selected: boolean
  handleSelect: (id: number, v: boolean) => void
  onClick: () => void
}
const InboxItem:FC<IItemProps> = ({
  email,
  selected,
  handleSelect,
  onClick
}) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'flex-start'}
      gap={4}
      minHeight={'60px'}
      px={3}
      py={2}
      flexWrap={'wrap'}
      sx={{
        borderBottom: theme => `1px solid ${theme.palette.divider}`
      }}
      onClick={onClick}
    >
      <Stack direction={'row'} gap={2} >
        <Checkbox sx={{p: 0}} size="small" checked={selected} onChange={(e) => handleSelect(email.id, e.target.checked)} />
        <Typography >{email.sender}</Typography>
      </Stack>
      <Box flex={1}>
        <Typography
        fontSize={'14px'}
        >
          {email.subject} - 
          <Box component={'span'} sx={{color: 'text.secondary'}} >
            {email.content}
          </Box>
        </Typography>
        {
          email.label &&
          <Chip label={email.label} size="small" sx={{mt: 1, background: theme => theme.palette.yellow.main, color: '#ffffff'}} />
        }
      </Box>
      <Typography color={'text.secondary'}>{email.receivedAt}</Typography>
    </Stack>
  )
}

interface IProps {
  labels: ISelectItem[]
}
const FeedbackInboxList:FC<IProps> = ({labels}) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<IInboxFilter>({
    selectedIds: [],
    status: [],
    labels: [],
    search: '',
    startDate: dayjs().startOf('month'),
    endDate: dayjs(),
    page: 1
  })

  const handleSelect = (id: number, value: boolean) => {
    if (filters.selectedIds.includes(id)) {
      const newSelected = filters.selectedIds?.filter((itemId) => itemId !== id) || []
      setFilters({...filters, selectedIds: newSelected})
    } else {
      setFilters({...filters, selectedIds:[id, ...(filters.selectedIds || [])]})
    }
  }
  return (
    <Box>
      <FilterInboxFilterBar filters={filters} onChange={(val) => setFilters(val)} data={tmpEmails} labels={labels} />
      {
        tmpEmails?.map(email => {
          return (
            <InboxItem
              email={email}
              selected={filters.selectedIds.includes(email.id)}
              handleSelect={handleSelect}
              onClick={() => navigate(`${email.id}`)}
            />
          )
        })
      }
    </Box>
  )
}

export default FeedbackInboxList