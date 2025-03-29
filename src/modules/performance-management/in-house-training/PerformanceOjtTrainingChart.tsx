import { Box, Card } from '@mui/material'
import { useRef } from 'react'
import { Bar, XAxis, YAxis, CartesianGrid, LabelList, BarChart } from 'recharts'
import useClientSize from '../../../hooks/useClientSize'
import Api from '../../../api'

interface DataType {
  name: string
  uv: number
  pv: number
  diff: number
}

// const data = [
//   {
//     name: "Cleaning of Toilet",
//     uv: 90,
//     pv: 200,
//     diff: 110
//   },
//   {
//     name: "Washing Hand",
//     uv: 175,
//     pv: 240,
//     diff: 75
//   },
//   {
//     name: "Introduction to Facility Management webapp",
//     uv: 60,
//     pv: 100,
//     diff: 40
//   },
//   {
//     name: "Someone Fall Down",
//     uv: 194,
//     pv: 220,
//     diff: 26
//   },
//   {
//     name: "Safety near he escalator",
//     uv: 220,
//     pv: 220,
//     diff: 0
//   }
// ];

const PerformanceOjtTrainingChart = () => {
  const paperRef = useRef<any>(null)
  const size = useClientSize(paperRef)

  const { data: rawData, isLoading } = Api.useGetOtjBySopQuery()

  const data: DataType[] = rawData
    ? rawData.map(({ complete, sopName, incomplete }) => {
        const total = incomplete + complete
        return {
          name: sopName,
          uv: complete,
          pv: total,
          diff: incomplete,
        }
      })
    : []

  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props
    const dataIndex = props.index
    const pv = data[dataIndex].pv
    const uv = data[dataIndex].uv
    const yOffset = 12

    return (
      <g>
        <text
          x={x + width / 1.8}
          y={y + yOffset}
          fill='#fff'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {uv}/{pv}
        </text>
      </g>
    )
  }

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <Box
        ref={paperRef}
        sx={{ width: '100%', height: '100%', minHeight: '290px', position: 'relative' }}
      >
        <BarChart
          {...size}
          layout='vertical'
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis type='number' />
          <YAxis dataKey='name' type='category' width={300} />
          <Bar dataKey='uv' barSize={20} stackId='a' fill='#63ABFD'>
            <LabelList dataKey='uv' content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey='diff' barSize={20} stackId='a' fill='#E8F3FF' />
        </BarChart>
      </Box>
    </Card>
  )
}

export default PerformanceOjtTrainingChart
