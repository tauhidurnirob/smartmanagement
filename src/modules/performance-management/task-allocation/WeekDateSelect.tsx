import { useEffect } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { ROW_PER_PAGE_OPTIONS, WEEK_DATE_LIST, WEEK_DATE_LIST_STRING } from '../../../helpers/constants'

interface IProps {
  selected: string | null
  onChange: (date: string) => void
}

const WeekDateSelect = ({ selected, onChange }: IProps) => {
  const selectedDate = WEEK_DATE_LIST_STRING.find((f) => f.value === selected)

  const handleChange = (date: string) => {
    onChange(date)
  }

  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      gap={1}
      alignItems={'center'}
      sx={{ px: 1.5, py: 2, background: '#FFFFFF', borderRadius: '8px' }}
    >
      {WEEK_DATE_LIST_STRING.map((date, idx) => {
        const isSelected = date.value === selected
        return (
          <Box
            key={idx}
            sx={{
              px: 2,
              py: 1.25,
              borderRadius: 1.5,
              backgroundColor: (theme) => (isSelected ? theme.palette.primary.light : '#ffffff'),
              cursor: 'pointer',
              color: (theme) => (isSelected ? theme.palette.primary.main : theme.palette.grey[600]),
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={() => handleChange(date.value as string)}
          >
            <Typography
              variant='subtitle1'
              sx={{
                color: 'inherit',
              }}
            >
              {date.label}
            </Typography>
          </Box>
        )
      })}
    </Stack>
  )
}

export default WeekDateSelect
