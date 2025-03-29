import { Box, Theme, TextFieldProps, Typography, Collapse } from '@mui/material'
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx'

import StyledAlert from './StyledAlert'
import StyledTextField from './StyledTextField'

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
  rows?: number
  minRows?: number
  sx?: SxProps<Theme>
}

const TextareaWithLabel: React.FC<Props & TextFieldProps> = ({
  showErrorMessage = true,
  name,
  label,
  error,
  helperText,
  required,
  height,
  fontWeight,
  showLabel = true,
  fontSize,
  rows,
  minRows,
  sx,
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
          '&.MuiFormControl-root': {
            background: 'transparent',
          },
          '& .MuiInputBase-input': {
            fontWeight: fontWeight,
            height: '100%',
            p: '9px 16px',
            bgcolor: (theme) => theme.palette.grey[100],
            borderRadius: 1.5,
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderRadius: 1.5,
            border: 'none',
          },
          ...sx,
        }}
        rows={rows}
        minRows={minRows}
        multiline
      />
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

export default TextareaWithLabel
