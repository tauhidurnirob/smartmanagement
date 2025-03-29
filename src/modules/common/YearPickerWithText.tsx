import { FC, useRef, useState } from 'react'
import { Box, SxProps, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as BaseDatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import StyledTextField from './StyledTextField'
import { CalenderLight } from '../../assets/icons/calender-light'
import FilterLabel from './FilterLabel'
import useFullscreen from '../../hooks/useFullscreen'

interface IProps {
  label: string
  onChange: (value: Dayjs | null) => void
  date: Dayjs | null
  sxBtn?: SxProps
  sxLabel?: SxProps
  placeholder?: string
  hiddenLabel?: boolean
  maxDate?: any
  minDate?: any
}

const YearPickerWithText: FC<IProps> = ({
  label,
  onChange,
  date,
  placeholder,
  sxBtn,
  sxLabel,
  hiddenLabel,
  maxDate,
  minDate,
  year,
}: any) => {
  const { isFullscreen } = useFullscreen()

  const refContainer = useRef<any>()
  const popupRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box ref={refContainer}>
      {!hiddenLabel && label && <FilterLabel text={label} sx={{ ...(sxLabel || {}) }} />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BaseDatePicker
          open={open}
          onClose={handleClose}
          value={date}
          format='DD/MM/YYYY'
          views={['year']}
          onAccept={(newValue: Dayjs | null) => {
            onChange(newValue)
          }}
          closeOnSelect={true}
          reduceAnimations={true}
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
                    ref={popupRef}
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
                        {date.format('DD/MM/YYYY')}
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
                          Date
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
          }}
          slotProps={{
            popper: {
              sx: { zIndex: open ? 1400 : -10 },
              container: () => (isFullscreen ? refContainer.current : document.body),
            },
            desktopPaper: { sx: { display: open ? 'block' : 'none' } },
            desktopTransition: { timeout: { exit: 0 } },
            mobileTransition: { timeout: { exit: 0 } },
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default YearPickerWithText
