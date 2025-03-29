import { FC, useMemo } from 'react'
import { Card, Grid, Stack, Box, Typography, Divider } from '@mui/material'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import CustomChip from '../../common/CustomChip'
import Api from '../../../api'
import { ITaskCompletionStatus } from '../../../api/models'

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, position: 'relative' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant='determinate'
          sx={{
            height: 25,
            borderRadius: '53px',
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: '#00854233',
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: '#008542',
            },
          }}
          {...props}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          ...(props.value >= 15
            ? { right: `${100 - props.value}%`, mr: 1.25 }
            : { left: `${props.value}%`, ml: 1 }),
        }}
      >
        <Typography variant='h4' color='white'>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

interface IProps {
  data?: any
}

const PerformanceOverviewCompletionStatus: FC<IProps> = ({}) => {
  const { data, isFetching } = Api.useGetTaskCompletionStatusQuery()

  const items = useMemo(() => {
    const items: ITaskCompletionStatus[] = []

    let totalTasks = 0
    let totalComplete = 0

    Object.entries(data || {}).forEach(([key, value]) => {
      const total = value.complete + value.incomplete
      totalTasks += total
      totalComplete += value.complete

      items.push({
        label: key,
        total: total,
        value: value.complete,
      })
    })

    items.unshift({
      label: 'Total Task',
      total: totalTasks,
      value: totalComplete,
    })

    return items
  }, [data])

  return (
    <Card sx={{ pt: 3, pl: 2.5, pr: 3, pb: 3.75 }}>
      <Stack direction='column' rowGap={{ lg: 3.75, xs: 3 }}>
        <Typography typography={'h3'} color='grey.800'>
          Completion Status
        </Typography>
        {items.map((item, idx) => {
          const { label, total, value } = item
          const percent = parseFloat(((value / total) * 100).toFixed())
          return (
            <Stack key={`performance-completion-status-item-${idx}`} direction='column'>
              <Stack direction='row' justifyContent={'space-between'} alignItems={'center'}>
                <Typography typography={'h4'} color='grey.800' fontWeight={500} mt={0.75}>
                  {label}
                </Typography>
                <CustomChip type={'success'} text={`${value}/${total}`} sx={{ fontSize: '1rem' }} />
              </Stack>
              <LinearProgressWithLabel value={percent} />
              <Divider sx={{ mt: 2, borderStyle: 'dashed' }} light />
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}

export default PerformanceOverviewCompletionStatus
