import { Box, TextField, Typography, Popper } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

interface IProps {
  fieldName: string
}

const DateField: FC<IProps> = ({ fieldName }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>
        {fieldName}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={value}
          onChange={setValue}
          ampm={false}
          closeOnSelect={true}
          reduceAnimations={true}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          slots={{
            textField: (params) => (
              <TextField fullWidth {...params} sx={{ '.MuiInputBase-input': { p: '12px' } }} />
            ),
            popper: (params) => {
              return <Popper {...params} />
            },
          }}
          slotProps={{
            popper: { container: () => document.body },
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default DateField
