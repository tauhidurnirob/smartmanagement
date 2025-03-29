import { FC } from 'react'
import { KeyboardArrowDown as KeyboardArrowDownIcon, SvgIconComponent } from '@mui/icons-material'
import { Box, Collapse, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material'
import { ISelectItem } from '../../types/common'
import BackDrop from './BackDrop'
import StyledAlert from './StyledAlert'

interface IProps {
  width: number | string
  value: ISelectItem | null
  onChange: (val: ISelectItem) => void
  options: ISelectItem[]
  sx?: SxProps<Theme>
  color?: any
  placeholder?: ISelectItem
  isLoading?: boolean
  error?: boolean
  helperText?: React.ReactNode
  textColor?: string
  height?: 'small' | 'medium' | 'large'
  icon?: SvgIconComponent
  [x: string]: any
}

const SimpleSelect: FC<IProps> = ({
  icon,
  value,
  onChange,
  options,
  width,
  height,
  sx,
  color,
  placeholder,
  isLoading,
  error,
  hiddenErrorMessage,
  helperText,
  textColor,
  ...rest
}) => {
  const handleChange = (event: SelectChangeEvent<ISelectItem>) => {
    const newSelected = options?.find(
      (f) => f.value === event.target.value || f.label === event.target.value
    )
    onChange(newSelected || (options?.[0] as ISelectItem))
  }

  return (
    <Box position='relative'>
      <Select
        IconComponent={icon ? icon : KeyboardArrowDownIcon}
        value={value || placeholder || ''}
        renderValue={(value) => {
          return value.label
        }}
        onChange={handleChange}
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
            fontWeight: '700',
            fontSize: 14,
            lineHeight: '14px',
            padding: height === 'small' ? '12px 37px 12px 19px' : '14px 37px 14px 19px',
            border: 'none',
            minHeight: 'fit-content !important',
            span: {
              fontWeight: 700,
              lineHeight: '14px',
            },
            background: (theme) => theme.palette.grey[100],
            color: (theme) => (value && color ? color : theme.palette.grey[500]),
            borderRadius: '6px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiSelect-icon': {
            fontSize: 16,
          },
          width: width || '100%',
          ...sx,
        }}
        {...rest}
      >
        {!isLoading &&
          options?.map((v: ISelectItem, index: number) => {
            const isSelected = v.value === value?.value
            return (
              <MenuItem
                key={index}
                value={v.value || ''}
                selected={v.value === value?.value}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                  px: 1.25,
                  fontWeight: 700,
                  color: (theme) =>
                    isSelected ? theme.palette.primary.main : theme.palette.grey[500],
                  bgcolor: (theme) => (isSelected ? theme.palette.primary.light : '#ffffff'),
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.primary.light,
                    color: (theme) => theme.palette.primary.main,
                    borderRadius: '5px',
                  },
                }}
              >
                {v.label}
              </MenuItem>
            )
          })}
      </Select>
      {isLoading && <BackDrop size={'30px'} />}
      {!hiddenErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {helperText}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default SimpleSelect
