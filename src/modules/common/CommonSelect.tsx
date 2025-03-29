import { FC } from 'react'
import Select, { SelectProps } from '@mui/material/Select'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

/**
 * Customized Select
 *
 * @param props
 * @returns
 */
const CommonSelect: FC<SelectProps<string>> = (props) => {
  const { children, sx, ...rest } = props

  return (
    <Select
      IconComponent={KeyboardArrowDownIcon}
      MenuProps={{
        MenuListProps: {
          sx: {
            px: 1,
            '.MuiTypography-root': {
              fontWeight: 700,
              lineHeight: '14px',
            },
          },
        },
      }}
      sx={{
        '& .MuiSelect-select': {
          backgroundColor: (theme) => theme.palette.common.white,
          fontWeight: '700',
          fontSize: 12,
          lineHeight: '14px',
          color: '#A1A5B7',
          padding: '10px 37px 10px 14px',
          border: 'none',
          minHeight: 'fit-content !important',
          pr: '37px',
          span: {
            fontWeight: 700,
            lineHeight: '14px',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiSelect-icon': {
          fontSize: 14,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Select>
  )
}

export default CommonSelect