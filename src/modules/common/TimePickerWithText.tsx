import { FC, useState } from 'react'
import { Box, SxProps, Typography, Popper, Collapse } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker as BaseTimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

import StyledTextField from './StyledTextField'
import { CalenderLight } from '../../assets/icons/calender-light'
import FilterLabel from './FilterLabel'
import StyledAlert from './StyledAlert'

const TIME_FORMAT = 'hh:mm A'

interface IProps {
  label: string
  onChange: (value: Dayjs | null) => void
  date: Dayjs | string | null
  sxBtn?: SxProps
  placeholder?: string
  hiddenLabel?: boolean
  maxTime?: any
  minTime?: any
  required?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
}

const TimePickerWithText: FC<IProps> = ({
  label,
  labelStyles,
  onChange,
  date,
  placeholder,
  sxBtn,
  hiddenLabel,
  maxTime,
  minTime,
  required,
  showErrorMessage,
  error,
  errorMessage,
}: any) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      {!hiddenLabel && label && <FilterLabel text={label} required={required} />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BaseTimePicker
          open={open}
          onClose={handleClose}
          value={date}
          format={TIME_FORMAT}
          views={['hours', 'minutes']}
          ampm={false}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          maxTime={maxTime}
          minTime={minTime}
          onAccept={(newValue: Dayjs | null) => {
            onChange(newValue)
          }}
          orientation='landscape'
          slots={{
            textField: (params: any) => {
              return (
                <Box sx={{ position: 'relative' }}>
                  <StyledTextField
                    {...params}
                    sx={{
                      position: 'absolute',
                      visibility: 'hidden',
                      zIndex: 1,
                      width: '100%',
                      height: '100%',
                      '.MuiInputBase-root': {
                        width: '100%',
                        height: '100%',
                      },
                      '.MuiInputBase-input': {
                        width: '100%',
                        height: '100%',
                        p: 0,
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      p: '12px 40px 12px 16px',
                      bgcolor: (theme) => theme.palette.grey[100],
                      borderRadius: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      width: '100%',
                      ...(sxBtn || {}),
                    }}
                    onClick={handleOpen}
                  >
                    {date ? (
                      <Typography
                        typography='h5'
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.143,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        {date.format(TIME_FORMAT)}
                      </Typography>
                    ) : placeholder ? (
                      <Typography
                        typography='h5'
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.143,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        {placeholder}
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          typography='h5'
                          sx={{
                            fontWeight: 500,
                            ml: 1,
                            mt: 0.25,
                            lineHeight: 1.143,
                            color: (theme) => theme.palette.grey[500],
                          }}
                        >
                          Time
                        </Typography>
                      </>
                    )}
                    <CalenderLight
                      sx={{
                        fontSize: 17,
                        color: (theme) => theme.palette.grey[500],
                        position: 'absolute',
                        top: 'calc(50% - 8.5px)',
                        right: 13,
                      }}
                    />
                  </Box>
                </Box>
              )
            },
            popper: (params) => {
              return <Popper {...params} />
            },
          }}
        />
      </LocalizationProvider>
      {showErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {errorMessage}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default TimePickerWithText
