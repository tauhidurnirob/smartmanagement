const ReportChartBar = (props: any) => {
  const { fill, x, y, width, height, name, background } = props

  const borderRadius = Math.min(height, 4)
  const getBorderPoint = (d: number) => Math.min(d, borderRadius)
  return (
    <path
      strokeWidth='0'
      fill={fill}
      name={name}
      width={width}
      height={height}
      x={x}
      y={y}
      radius='0'
      d={`M ${x},${y + borderRadius} 
          C ${x},${y + getBorderPoint(1.79087)} ${x + getBorderPoint(1.79086)},${y} ${
        x + borderRadius
      },${y}
          H ${x + width - borderRadius} 
          C ${x + width - getBorderPoint(1.79087)},${y} ${x + width},${
        y + getBorderPoint(1.79086)
      } ${x + width},${y + borderRadius} 
          V ${y + height}
          h ${-width}
          Z`}
    />
  )
}

export default ReportChartBar
