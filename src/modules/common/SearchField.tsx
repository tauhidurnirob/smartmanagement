import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { Search as SearchIcon } from '../../assets/icons/search-icon'

const SearchField = (props: TextFieldProps) => {
  const { sx, ...rest } = props
  return (
    <TextField
      variant='outlined'
      sx={{
        '& fieldset': { border: 'none' },
        '& .MuiInputBase-root': {
          background: 'inherit',
          pl: 0,
        },
        '& .MuiInputBase-input': {
          fontSize: '12px',
          lineHeight: '14px',
          fontWeight: 700,
          p: 0,
          height: 'fit-content',
          borderRadius: 0,
          background: 'inherit',
          '&::placeholder': {
            color: theme => theme.palette.grey[700]
          },
        },
        background: 'inherit',
        width: '100%',
        borderRadius: '6px',
        p: '10px 14px',
        ...(sx || {}),
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon sx={{ width: 10, height: 'auto' }} />
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  )
}

export default SearchField
