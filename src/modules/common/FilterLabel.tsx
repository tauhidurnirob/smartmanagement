import { Typography } from '@mui/material'
import { FC } from 'react'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'

interface IProps {
  text: string
  sx?: any
  required?: boolean
  className?: string
  hiddenLabel?: boolean
}

const FilterLabel: FC<IProps> = ({ text, sx, required, className, hiddenLabel }) => {
  return (
    <Typography
      hidden={!!hiddenLabel}
      className={className}
      sx={{
        fontSize: '16px',
        fontWeight: 500,
        marginBottom: 2,
        color: (theme) => theme.palette.grey[700],
        ...sx,
      }}
    >
      {text}
      {required && <RequiredItem />}
    </Typography>
  )
}

export default FilterLabel
