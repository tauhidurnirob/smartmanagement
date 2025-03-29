import { FC, useState, useRef, useEffect, useMemo } from 'react'
import {
  Box,
  Typography,
  Popover,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stack,
  Button,
} from '@mui/material'
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'

import useClientSize from '../../hooks/useClientSize'
import { IUserWorkHour } from '../../api/models'
import { DATE_FORMAT_ONLY_TIME_WITHOUT_AM } from '../../constants/common'

const OPTIONS = [
  { label: 'Non-working Day', value: 'no-time' },
  { label: 'Select work time', value: 'select-time' },
]

interface IProps {
  hour: IUserWorkHour
  onChange: (value: IUserWorkHour) => void
}

const WorkTimeSelector: FC<IProps> = ({ hour, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [type, setType] = useState<string>(OPTIONS[0].value)
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [invalids, setInvalids] = useState<boolean[]>([true, true])

  const btnRef = useRef<HTMLDivElement | null>(null)
  const btnSize = useClientSize(btnRef)

  const isInvalid = type === OPTIONS[1].value && (invalids.includes(true) || !startDate || !endDate)

  const labelHour = useMemo(() => {
    if (hour === null) {
      return OPTIONS[0].label
    } else {
      const strStartDate = hour.start
      const strEndDate = hour.end
      return `${strStartDate}-${strEndDate}`
    }
  }, [hour])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setType(OPTIONS[0].value)
    setStartDate(null)
    setEndDate(null)
    setInvalids([true, true])
  }

  const handleChangeType = (_e: any, value: string) => {
    setType(value)
  }

  const handleChangeTime = (value: any, error: any) => {
    setStartDate(value[0])
    setEndDate(value[1])
    setInvalids([error.validationError[0] !== null, error.validationError[1] !== null])
  }

  const handleSave = () => {
    if (type === OPTIONS[0].value) {
      onChange(null)
    } else {
      if (startDate && endDate) {
        onChange({
          start: startDate.format(DATE_FORMAT_ONLY_TIME_WITHOUT_AM),
          end: endDate.format(DATE_FORMAT_ONLY_TIME_WITHOUT_AM),
        })
      } else {
        onChange(null)
      }
    }

    handleClose()
  }

  useEffect(() => {
    if (hour === null) {
      setType(OPTIONS[0].value)
      setStartDate(null)
      setEndDate(null)
      setInvalids([true, true])
    } else {
      setType(OPTIONS[1].value)
      setStartDate(dayjs(hour.start, DATE_FORMAT_ONLY_TIME_WITHOUT_AM))
      setEndDate(dayjs(hour.end, DATE_FORMAT_ONLY_TIME_WITHOUT_AM))
      setInvalids([false, false])
    }
  }, [hour])

  const open = Boolean(anchorEl)

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          py: 1.5,
          px: 2,
          bgcolor: 'grey.100',
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          width: '100%',
        }}
        ref={btnRef}
      >
        <Typography variant='h5' sx={{ color: 'grey.800' }}>
          {labelHour}
        </Typography>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{ paper: { sx: { py: 2, px: 1.5, minWidth: btnSize.width } } }}
      >
        <Stack direction={'column'} gap={3}>
          <FormControl>
            <RadioGroup
              aria-labelledby='work-time-selecter-radio-buttons-group'
              name='work-time-selecter-radio-buttons-group'
              value={type}
              onChange={handleChangeType}
              sx={{ gap: 1 }}
            >
              {OPTIONS.map((item, idx) => {
                const { label, value } = item

                return (
                  <FormControlLabel
                    key={`option-item-${idx}`}
                    value={value}
                    control={<Radio />}
                    label={label}
                    sx={{
                      '&.MuiFormControlLabel-root': { mx: 0 },
                      '.MuiButtonBase-root': { p: 0, pr: 1 },
                    }}
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiInputTimeRangeField
              ampm={false}
              disabled={type !== OPTIONS[1].value}
              slotProps={{
                textField: ({ position }) => ({
                  label: position === 'start' ? 'From' : 'To',
                  size: 'small',
                  sx: {
                    '.MuiInputBase-input': {
                      width: 80,
                    },
                  },
                }),
              }}
              value={[startDate, endDate]}
              onChange={handleChangeTime}
            />
          </LocalizationProvider>
          <Stack direction={'row'} justifyContent={'center'} gap={3}>
            <Button>Cancel</Button>
            <Button variant='contained' disabled={isInvalid} onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Box>
  )
}

export default WorkTimeSelector
