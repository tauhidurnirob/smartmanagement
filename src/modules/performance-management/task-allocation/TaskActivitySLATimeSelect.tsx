import { FC, useState, useRef, useEffect } from 'react'
import {
  Box,
  Popover,
  Paper,
  Typography,
  Stack,
  SxProps,
  FormControl,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import useFullscreen from '../../../hooks/useFullscreen'
import { ISlaTime } from '../../../types/performance-management'
import { getSlaTimeString } from '../../../helpers/getSlaTimeString'

interface IProps {
  sx?: SxProps
  sxBtn?: SxProps
  textColor?: string
  slaTime: ISlaTime | null
  setSlaTime: (v: ISlaTime | null) => void
  isBuffer?: boolean
}

const TaskActivitySLATimeSelect: FC<IProps> = ({ sx, sxBtn, textColor, slaTime, setSlaTime, isBuffer }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const refContainer = useRef<HTMLDivElement | null>(null)

  const { isFullscreen } = useFullscreen()

  const [open, setOpen] = useState(false)
  const [type, setType] = useState(false)
  const [days, setDays] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const handleToggleOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.stopPropagation()
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    setType(value === 'true')
  }

  const handleSave = () => {
    if (type === false) {
      setSlaTime(null)
    }
    else {
      setSlaTime({
        days: Number(days),
        hours: Number(hours),
        minutes: Number(minutes)
      })
    }
    setOpen(false)
  }

  useEffect(() => {
    if(slaTime) {
      setType(true)
    }
    if(slaTime?.days) {
      setDays(String(slaTime?.days))
    }
    if(slaTime?.hours) {
      setHours(String(slaTime?.hours))
    }
    if(slaTime?.minutes) {
      setMinutes(String(slaTime?.minutes))
    }
  }, [slaTime])

  return (
    <Box sx={{ ...(sx || {}) }} ref={refContainer}>
      <Box
        ref={ref}
        sx={{
          background: (theme) => theme.palette.grey[100],
          borderRadius: 1.5,
          p: '12px 35px 12px 16px',
          position: 'relative',
          minHeight: '40px',
          cursor: 'pointer',
          ...(sxBtn ?? {}),
        }}
        onClick={handleToggleOpen}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: 0.65, columnGap: 2 }}>
          <Typography
            fontSize={'14px'}
            color={textColor || 'grey.500'}
            fontWeight={700}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: 'calc(100% - 24px)',
            }}
          >
            {slaTime ? getSlaTimeString(slaTime) : (isBuffer ? 'No Buffer Time' : 'No SLA Time')}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(50% - 8px)',
            right: 10,
            p: 0,
            color: (theme) => theme.palette.grey[600],
            fontSize: '12px',
          }}
        >
          {open ? (
            <ExpandLessIcon sx={{ fontSize: '16px' }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: '16px' }} />
          )}
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        container={() => (isFullscreen ? refContainer.current : document.body)}
      >
        <Paper sx={{ py: 1.25, px: 1.5, maxWidth: '240px' }}>
          <Stack
            sx={{
              width: '100%',
              overflowY: 'auto',
            }}
            gap={1}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby='sla-time-label'
                name='sla-time'
                value={type}
                onChange={handleChangeType}
                sx={{ '.MuiRadio-root': { py: 1 } }}
              >
                <FormControlLabel value={false} control={<Radio />} label= {isBuffer ? 'No Buffer Time' : 'No SLA Time'} />
                <FormControlLabel value={true} control={<Radio />} label={isBuffer ? 'Select Buffer Time' : 'Select SLA Time'} />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id='outlined-controlled'
                  label=''
                  name='days'
                  fullWidth
                  placeholder='Days'
                  value={days}
                  type='number'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDays(event.target.value)
                  }}
                  sx={{ '.MuiInputBase-input': { py: 2, px: 1 } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='outlined-controlled'
                  label=''
                  name='hours'
                  placeholder='Hours'
                  value={hours}
                  type='number'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setHours(event.target.value)
                  }}
                  sx={{ '.MuiInputBase-input': { py: 2, px: 1 } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id='outlined-controlled'
                  label=''
                  name='minutes'
                  placeholder='Minutes'
                  value={minutes}
                  type='number'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMinutes(event.target.value)
                  }}
                  sx={{ '.MuiInputBase-input': { py: 2, px: 1 } }}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  id='outlined-controlled'
                  label=''
                  name='time'
                  placeholder='hh:mm'
                  value={time}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setTime(event.target.value)
                  }}
                  sx={{ '.MuiInputBase-input': { py: 2, px: 1 } }}
                />
              </Grid> */}
            </Grid>
          </Stack>
          <Stack direction='row' gap={2} justifyContent={'center'} mt={3}>
            <Button variant='text' size='small' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' size='small' onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Paper>
      </Popover>
    </Box>
  )
}

export default TaskActivitySLATimeSelect
