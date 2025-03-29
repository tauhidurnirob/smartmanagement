import { FC } from 'react'
import { Box, Card, Divider, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import {
  IAuditInsightAvgPeformanceIU,
  IAuditInsightAvgScoreElement,
  IAuditInsightTopFailedItem,
} from '../../../types/audit'
import BackDrop from '../../common/BackDrop'

interface IProps {
  title: string
  isFailedList?: boolean
  isElement?: boolean
  headerItems: string[]
  data:
    | IAuditInsightTopFailedItem[]
    | IAuditInsightAvgScoreElement[]
    | IAuditInsightAvgPeformanceIU[]
  isLoading?: boolean
    
}

const AuditInsightCard: FC<IProps> = ({ title, isFailedList, data, headerItems, isElement, isLoading }) => {
  return (
    <Card sx={{ p: 0, width: '100%', height: '100%', position: 'relative' }}>
      {isLoading && <BackDrop />}
      <Box sx={{ px: 2, pt: 3, pb: 2 }}>
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', color: (theme) => theme.palette.grey[700] }}
        >
          {title}
        </Typography>
      </Box>
      <Divider light />
      <Stack direction={'column'} sx={{ px: 5, py: 2 }}>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ py: 0.5 }}>
          {headerItems.map((item, idx) => {
            return (
              <Typography
                key={idx}
                variant='caption'
                fontSize={14}
                sx={{ fontWeight: 600, color: (theme) => theme.palette.grey[500] }}
              >
                {item}
              </Typography>
            )
          })}
        </Stack>
        <Divider light sx={{ mb: 1 }} />
        {
          data.length === 0 &&
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Typography color='textSecondary' variant='h6'>
              No Available Records
            </Typography>
          </Box>
        }
        {data.map((item, idx) => {
          return (
            <Stack
              key={idx}
              direction={'row'}
              justifyContent={'space-between'}
              sx={{
                py: 1,
                alignItems: 'center',
                '&:not(&:last-of-type)': {
                  borderBottom: '1px dashed rgba(218, 218, 218, 0.3)',
                },
              }}
            >
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 700, color: (theme) => theme.palette.grey[800] }}
              >
                {item.name}
              </Typography>
              {isFailedList ? (
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: 400,
                    color: (theme) => theme.palette.grey[500],
                    width: '75px',
                  }}
                >
                  {(item as IAuditInsightTopFailedItem).count}/
                  {(item as IAuditInsightTopFailedItem).total}
                </Typography>
              ) : (
                <Box
                  sx={{
                    width: '88px',
                    background: (theme) => theme.palette.success.light,
                    borderRadius: '20px',
                    py: 0.75,
                    px: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant='caption'
                    sx={{
                      fontWeight: 700,
                      lineHeight: '14px',
                      color: (theme) => theme.palette.success.main,
                    }}
                  >
                    {isElement
                      ? (item as IAuditInsightAvgScoreElement).score
                      : `${(item as IAuditInsightAvgPeformanceIU).performance}%`}
                  </Typography>
                </Box>
              )}
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}

export default AuditInsightCard
