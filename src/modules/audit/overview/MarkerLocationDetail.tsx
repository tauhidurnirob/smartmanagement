import { FC } from 'react'
import { Box, Card, IconButton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { Closecross } from '../../../assets/icons/close-cross'
import { ArrowRightCircle } from '../../../assets/icons/arrow-right-circle'
import { IAuditLocationListItem } from '../../../types/audit'
import { toast } from 'react-toastify'
import { AVERAGE_PERFORMANCE_MARKER } from '../../../constants/common'
interface IProps {
  location: IAuditLocationListItem
  open: boolean
  onClose: () => void
}

const MarkerLocationDetail: FC<IProps> = ({ open, location, onClose }) => {
  const navigate = useNavigate()
  
  const handleGotoDetail = () => {
    const locationId = location?.id
    if(!locationId) {
      toast.error('Audit is not assigned to any location!')
      return
    }
    const month = dayjs(location?.latestSubmittedAt).format('M')
    const year = dayjs(location?.latestSubmittedAt).format('YYYY')

    navigate({
      pathname: `/audit/overview/${locationId}`,
      search: `?${createSearchParams({
        month: month,
        year: year,
      })}`
    });
  }
  const avgPerformance = parseFloat((location.avgPerformance || 0).toFixed(2));
    let isGreater = false
    if (avgPerformance >= AVERAGE_PERFORMANCE_MARKER) {
        // Your logic for avgPerformance >= 70 goes here
        isGreater = true
    }
  return (

    <Card
      sx={{
        position: 'absolute',
        left: '0px',
        marginLeft: 0,
        bottom: 'calc(100% + 10px)',
        zIndex: 10,
        width: '300px',
        pt: 2.5,
        pb: 2,
        pl: 3,
        pr: 2.5,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        visibility: open ? 'visible' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8, p: 0.5 }}
        onClick={() => {
          onClose()
        }}
      >
        <Closecross sx={{ fontSize: 20, color: (theme) => theme.palette.grey[700] }} />
      </IconButton>
      <Typography variant='h4' sx={{ fontWeight: 700, color: (theme) => theme.palette.grey[800] }}>
        {location.name}
      </Typography>
      <Typography
        variant='caption'
        sx={{ fontWeight: 500, color: (theme) => theme.palette.grey[500], mt: 0.5 }}
      >
        {dayjs(location.latestSubmittedAt).format('DD/MM/YYYY hh:mm A')}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1.5, alignItems: 'center', gap: 1 }}>
        <Typography
          sx={{ fontSize: '14px', fontWeight: 500, color: (theme) => theme.palette.grey[800] }}
        >
          Average Performance:
        </Typography>
        
        <Box
          sx={{
            px: 1.5,
            py: 0.75,
            bgcolor: (theme) => (isGreater ? theme.palette.success.light : theme.palette.error.light),
            borderRadius: 2,
          }}
        >
          <Typography
            variant='caption'
            sx={{ fontWeight: 700, color: (theme) => (isGreater ? theme.palette.success.main : theme.palette.warning.main) }}
          >
            {(location.avgPerformance || 0).toFixed(2)}%
          </Typography>
        </Box>
        <IconButton sx={{ ml: 'auto', p: 0 }} onClick={handleGotoDetail}>
          <ArrowRightCircle sx={{ color: (theme) => theme.palette.grey[700], fontSize: 19 }} />
        </IconButton>
      </Box>
    </Card>
  )
}

export default MarkerLocationDetail
