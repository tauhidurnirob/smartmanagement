import { FC, useRef, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Box, Typography, SxProps, Collapse, Popper } from '@mui/material'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

import { ArrowDown } from '../../assets/icons/arrow-down'
import { CalenderLight } from '../../assets/icons/calender-light'
import StyledTextField from './StyledTextField'
import useFullscreen from '../../hooks/useFullscreen'
import StyledAlert from './StyledAlert'

interface IProps {
  value: Dayjs | null
  onChange?: (value: Dayjs | null) => void
  onAccept?: (value: Dayjs | null) => void
  sx?: SxProps
  sxBtn?: object
  placeholder?: string
  hiddenArrowIcon?: boolean
  hasTime?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
  textColor?: string
  maxDate?: any
  minDate?: any
}

const SelectDate: FC<IProps> = ({
  value,
  onChange,
  sx,
  sxBtn,
  placeholder,
  hiddenArrowIcon,
  hasTime,
  onAccept,
  showErrorMessage,
  error,
  errorMessage,
  textColor,
  maxDate,
  minDate,
  ...rest
}) => {
  const { isFullscreen } = useFullscreen()

  const refContainer = useRef<any>()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box ref={refContainer}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          open={open}
          onClose={handleClose}
          openTo='day'
          views={hasTime ? ['year', 'month', 'day', 'hours', 'minutes'] : ['year', 'month', 'day']}
          viewRenderers={{
            hours: hasTime ? renderTimeViewClock : null,
            minutes: hasTime ? renderTimeViewClock : null,
            seconds: hasTime ? renderTimeViewClock : null,
          }}
          ampm={false}
          value={value}
          closeOnSelect={true}
          reduceAnimations={true}
          maxDate={maxDate}
          minDate={minDate}
          slots={{
            textField: (params) => {
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
                      p: '12px 35px 12px 16px',
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
                    {value ? (
                      <Typography
                        typography='h5'
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.143,
                          color: (theme) => (value && textColor) || theme.palette.grey[500],
                        }}
                      >
                        {dayjs(value).format(hasTime ? 'DD/MM/YYYY hh:mm A' : 'DD/MM/YYYY')}
                      </Typography>
                    ) : placeholder ? (
                      <Typography
                        typography='h5'
                        sx={{
                          fontWeight: 500,
                          lineHeight: 1.143,
                          color: (theme) => (value && textColor) || theme.palette.grey[500],
                        }}
                      >
                        {placeholder}
                      </Typography>
                    ) : (
                      <>
                        <CalenderLight
                          sx={{
                            fontSize: 14,
                            color: (theme) => (value && textColor) || theme.palette.grey[500],
                          }}
                        />
                        <Typography
                          typography='h5'
                          sx={{
                            fontWeight: 500,
                            ml: 1,
                            mt: 0.25,
                            lineHeight: 1.143,
                            color: (theme) => (value && textColor) || theme.palette.grey[500],
                          }}
                        >
                          Date
                        </Typography>
                      </>
                    )}
                    {!hiddenArrowIcon && (
                      <ArrowDown
                        sx={{
                          position: 'absolute',
                          top: 'calc(50% - 3px)',
                          right: 19,
                          fontSize: 7,
                          color: (theme) => theme.palette.grey[600],
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )
            },
            popper: (params) => {
              return <Popper {...params} />
            },
          }}
          slotProps={{
            popper: { container: () => (isFullscreen ? refContainer.current : document.body) },
          }}
          onChange={onChange ? onChange : () => {}}
          {...(onAccept ? { onAccept: onAccept } : {})}
          {...rest}
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

export default SelectDate
