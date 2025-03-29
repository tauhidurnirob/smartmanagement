import { FC, useRef, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import useClientSize from '../../../hooks/useClientSize'
import ReportChartBar from '../../common/ReportChartBar'
import dayjs from 'dayjs'

const ReportTypesColor: any = {
  area: '#3699FF',
  achieved: '#2BA579',
  total: '#FE9136',
}
const ReportTypesLabel: any = {
  area: 'Area For Improvement',
  achieved: 'Achieved',
  total: 'Total Task',
}

interface Props {
  data: any
}

const getMaxValue = (data: any) => {
  let res = 0
  data.forEach((el: any) => {
    const maxData = Math.max(...[el.passed, el.overallFailure, el.iuFailure])
    res = maxData > res ? maxData : res
  })
  return res
}

const MAX_Y_GRAPH_COUNT = 20
const LABEL_INTERVAL = 13 + 14 // [px]
const sxLeftLabel = {
  position: 'absolute',
  left: -16,
  bottom: 0,
  fontSize: 11,
  lineHeight: '21px',
  color: '#000000',
  fontWeight: 500,
  textAlign: 'right',
  minWidth: '130px',
}

const CustomLabel = (props: any) => {
  const {
    viewBox: { y },
    value,
    width,
    color,
  } = props
  return (
    <text
      offset='5'
      x='30'
      y={y + 18}
      fill={color}
      className='recharts-text recharts-label'
      textAnchor='middle'
      fontSize={16}
    >
      <tspan x='30' dy='0' dx={`${width / 2 - 10}`}>
        {value}
      </tspan>
    </text>
  )
}

const PerformanceOverviewSLAChart: FC<Props> = ({ data }) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const maxData = getMaxValue(data)

  const formattedData = useMemo(() => {
    return (data || []).map((item: any) => {
      const { date, area, achieved } = item
      const total = area + achieved
      const formattedDate = dayjs(date, 'YYYY-MM').format('MMM')
      return {
        ...item,
        total,
        date: formattedDate,
      }
    })
  }, [data])

  const formatter = (value: number, name: string, props: any) => {
    const newName = ReportTypesLabel[name]
    return [value, newName, props]
  }

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '290px' }}>
      <Box
        ref={paperRef}
        sx={{ width: '100%', height: '100%', minHeight: '290px', position: 'relative' }}
      >
        <BarChart
          {...size}
          data={formattedData}
          margin={{
            top: 10,
            right: 30,
            left: 100,
            bottom: 0,
          }}
          barGap={3}
          style={{ fontFamily: 'Roboto', fontWeight: 500 }}
        >
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis
            dataKey='date'
            fontSize={16}
            xAxisId='0'
            axisLine={false}
            tickLine={false}
            tickMargin={6}
            style={{ fill: '#000000' }}
          />
          <XAxis
            dataKey='area'
            fontSize={16}
            xAxisId='1'
            axisLine={false}
            tickLine={false}
            style={{ fill: ReportTypesColor['area'] }}
            label={
              <CustomLabel
                value='Area For Improvement'
                width={151}
                color={ReportTypesColor['area']}
              />
            }
          />
          <XAxis
            dataKey='achieved'
            xAxisId='2'
            fontSize={16}
            axisLine={false}
            tickLine={false}
            color='red'
            style={{ fill: ReportTypesColor['achieved'] }}
            label={<CustomLabel value='Achieved' width={59} color={ReportTypesColor['achieved']} />}
          />
          <XAxis
            dataKey='total'
            xAxisId='3'
            fontSize={16}
            axisLine={false}
            tickLine={false}
            style={{ fill: '#000' }}
            label={<CustomLabel value='Total' width={30} color={'#000'} />}
          />
          <Brush
            height={25}
            dataKey={'date'}
            startIndex={data.length <= 5 ? 0 : data.length - 6}
            endIndex={data.length - 1}
          />
          <YAxis
            type='number'
            tickCount={6}
            domain={[0, maxData < MAX_Y_GRAPH_COUNT ? MAX_Y_GRAPH_COUNT : maxData]}
            axisLine={false}
            tickLine={false}
            width={40}
            orientation='left'
          />
          <Tooltip formatter={formatter} />
          <Bar
            type='monotone'
            dataKey='area'
            strokeWidth={0}
            fill={ReportTypesColor['area']}
            barSize={10}
            style={{ marginLeft: 30 }}
          />
          <Bar
            type='monotone'
            dataKey='achieved'
            strokeWidth={0}
            fill={ReportTypesColor['achieved']}
            barSize={10}
          />
        </BarChart>
      </Box>
    </Box>
  )
}

export default PerformanceOverviewSLAChart
