import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { Bar, BarChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { AUDIT_STATES } from '../../../helpers/constants'
import useClientSize from '../../../hooks/useClientSize'
import ReportChartBar from '../../common/ReportChartBar'

const ReportTypesColor: any = {
  passed: '#50CD89',
  overallFailure: '#F1416C',
  iuFailure: '#FE9136',
}
const ReportTypesLabel: any = {
  passed: 'Passed Audit',
  overallFailure: 'Overall Failure',
  iuFailure: 'IU Failure',
}

const LEGENDS = [
  { label: 'Passed Audit', color: ReportTypesColor.passed },
  { label: 'Overall Failure', color: ReportTypesColor.overallFailure },
  { label: 'IU Failure', color: ReportTypesColor.iuFailure },
]

interface Props {
  data: any
  selectedTypes?: Array<number>
  hasLegend?: boolean
}

const getMaxValue = (data: any) => {
  let res = 0
  data.forEach((el: any) => {
    const maxData = Math.max(...[el.passed, el.overallFailure, el.iuFailure])
    res = maxData > res ? maxData : res
  })
  return res
}

const MAX_Y_GRAPH_COUNT = 50
const LABEL_INTERVAL = 13 + 14 // [px]
const sxLeftLabel = {
  position: 'absolute',
  left: -25,
  bottom: 0,
  fontSize: 11,
  lineHeight: '14px',
  color: '#000000',
  fontWeight: 600,
  textAlign: 'right',
  minWidth: '80px',
}

const OverviewChart: FC<Props> = ({ data, selectedTypes, hasLegend }) => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const maxData = getMaxValue(data)

  const formatter = (value: number, name: string, props: any) => {
    const newName = ReportTypesLabel[name]
    return [value, newName, props]
  }

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '472px' }}>
      <Typography variant='h3' sx={{ fontSize: 18, textAlign: 'center' }}>
        Completed Audits
      </Typography>
      {hasLegend && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: { xs: 'wrap' },
            justifyContent: 'center',
            gap: 4,
            mt: 0.5,
          }}
        >
          {LEGENDS.map((legend, idx) => {
            return (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <Box
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: legend.color,
                  }}
                />
                <Typography
                  typography='subtitle1'
                  sx={{ fontWeight: 500, color: 'grey.800', lineHeight: 1.5, mt: 0.2 }}
                >
                  {legend.label}
                </Typography>
              </Box>
            )
          })}
        </Box>
      )}
      <Box
        ref={paperRef}
        sx={{ width: '100%', height: 'calc(100% - 60px)', position: 'relative', mt: 3 }}
      >
        <Typography sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 5 }}>Passed Audit</Typography>
        <Typography sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 4 }}>Overall Failure</Typography>
        <Typography sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 3 }}>IU Failure</Typography>
        <Typography sx={{ ...sxLeftLabel, bottom: LABEL_INTERVAL * 2 }}>Total Audit</Typography>
        <BarChart
          {...size}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          barGap={3}
        >
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis
            dataKey='date'
            fontSize={12}
            xAxisId='0'
            axisLine={false}
            tickLine={false}
            color='#B5B5C3'
            tickMargin={10}
          />
          <XAxis
            dataKey='passed'
            fontSize={12}
            xAxisId='1'
            axisLine={false}
            tickLine={false}
            tickMargin={19}
          />
          <XAxis
            dataKey='overallFailure'
            xAxisId='2'
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickMargin={17}
          />
          <XAxis
            dataKey='iuFailure'
            xAxisId='3'
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickMargin={15}
          />
          <XAxis
            dataKey='total'
            xAxisId='4'
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            height={55}
          />
          <Brush
            height={25}
            dataKey={'date'}
            startIndex={data.length <= 5 ? 0 : data.length - 6}
            endIndex={data.length - 1}
          />
          <YAxis
            type='number'
            tickCount={5}
            domain={[0, maxData < MAX_Y_GRAPH_COUNT ? MAX_Y_GRAPH_COUNT : maxData]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip formatter={formatter} />
          {(!selectedTypes ||
            selectedTypes.includes(AUDIT_STATES[0].value as number) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='passed'
              strokeWidth={0}
              fill={ReportTypesColor['passed']}
              barSize={20}
              shape={<ReportChartBar />}
            />
          )}
          {(!selectedTypes ||
            selectedTypes.includes(AUDIT_STATES[1].value as number) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='overallFailure'
              strokeWidth={0}
              fill={ReportTypesColor['overallFailure']}
              barSize={20}
              shape={<ReportChartBar />}
            />
          )}
          {/* {(!selectedTypes ||
            selectedTypes.includes(AUDIT_STATES[2].value as number) ||
            selectedTypes.length === 0) && (
            <Bar
              type='monotone'
              dataKey='iuFailure'
              strokeWidth={0}
              fill={ReportTypesColor['iuFailure']}
              barSize={20}
              shape={<ReportChartBar />}
            />
          )} */}
        </BarChart>
      </Box>
    </Box>
  )
}

export default OverviewChart
