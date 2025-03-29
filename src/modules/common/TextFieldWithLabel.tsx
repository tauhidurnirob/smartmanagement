import { Box, Theme, TextFieldProps, Typography, Collapse } from '@mui/material'
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx'

import StyledTextField from './StyledTextField'
import StyledAlert from './StyledAlert'
import { RefObject } from 'react'

const root: SxProps<Theme> = {
  width: '100%',
}

interface Props {
  name: string
  showErrorMessage?: boolean
  height?: string
  fontWeight?: number | string
  showLabel?: boolean
  fontSize?: string
  refInput?: RefObject<HTMLInputElement>
  sx?: SxProps<Theme>
  textColor?: string
  bgcolor?: string
}

const TextFieldWithLabel: React.FC<Props & TextFieldProps> = ({
  showErrorMessage = true,
  name,
  label,
  error,
  helperText,
  required,
  children,
  height = '42px',
  fontWeight,
  showLabel = true,
  fontSize,
  refInput,
  sx,
  textColor,
  bgcolor,
  ...rest
}) => {
  return (
    <Box sx={root}>
      {showLabel && (
        <Typography fontWeight='600' fontSize={fontSize || '14px'} mb='8px'>
          {label}{' '}
          {!!required && (
            <Typography component='span' fontWeight='600' color='error'>
              *
            </Typography>
          )}
        </Typography>
      )}
      <StyledTextField
        {...rest}
        name={name}
        error={error}
        fullWidth
        sx={{
          // border: (theme) => (error ? `1px solid ${theme.palette.error.main}` : ''),
          height: height,
          lineHeight: height,
          '&.MuiFormControl-root': {
            background: 'transparent',
          },
          '& .MuiInputBase-root': {
            borderRadius: 1.5,
          },
          '& .MuiInputBase-input': {
            boxSizing: 'border-box',
            fontWeight: fontWeight,
            height: '100%',
            p: '0 16px',
            bgcolor: (theme) => {
              if (!bgcolor) {
                return theme.palette.grey[100]
              }
            },
            borderRadius: 1.5,
            color: textColor,
            '&::placeholder': {
              fontSize: '14px',
              fontWeight: 700,
              opacity: 1,
              color: 'grey.500',
            },
          },
          '& .MuiOutlinedInput-root': { height: '100%', color: textColor },
          ...sx,
        }}
        inputRef={refInput}
      >
        {children}
      </StyledTextField>
      {showErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {helperText}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default TextFieldWithLabel
