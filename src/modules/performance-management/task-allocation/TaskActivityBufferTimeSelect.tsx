import { FC, useState, useRef } from 'react'
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

interface IProps {
  sx?: SxProps
  sxBtn?: SxProps
  textColor?: string
  bufferTime: string
}

const TaskActivityBufferTimeSelect: FC<IProps> = ({ sx, sxBtn, textColor, bufferTime }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const refContainer = useRef<HTMLDivElement | null>(null)

  const { isFullscreen } = useFullscreen()

  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')

  const handleToggleOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.stopPropagation()
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
            {bufferTime || ''}
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
        <Paper sx={{ py: 1.25, px: 1.5, maxWidth: '400px' }}>
          <Stack
            sx={{
              width: '100%',
              overflowY: 'auto',
            }}
            gap={1}
          >
            <TextField
              id='outlined-controlled'
              label=''
              name='time'
              placeholder='Buffer Time'
              value={time}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTime(event.target.value)
              }}
              sx={{ '.MuiInputBase-input': { py: 2, px: 1 } }}
            />
          </Stack>
          <Stack direction='row' gap={2} justifyContent={'center'} mt={3}>
            <Button variant='text' size='small' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' size='small'>
              Save
            </Button>
          </Stack>
        </Paper>
      </Popover>
    </Box>
  )
}

export default TaskActivityBufferTimeSelect
