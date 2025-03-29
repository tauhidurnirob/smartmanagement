import { outlinedInputClasses, styled, TextField } from '@mui/material'

const StyledTextField = styled(TextField)(({ theme }) => ({
  background: theme.palette.grey[800],
  borderRadius: '7px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '&:hover': {},
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: 'none',
    outline: 'none',
  },
  [`&.${outlinedInputClasses.focused}`]: {
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.error.main,
    },
  },
  [`.${outlinedInputClasses.root}`]: {
    [`&.${outlinedInputClasses.disabled}`]: {
      [`& .${outlinedInputClasses.notchedOutline}`]: {},
    },
    '&:hover': {
      [`&.${outlinedInputClasses.focused}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {},
      },
      [`&.${outlinedInputClasses.error}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: theme.palette.error.main,
        },
      },
      [`&.${outlinedInputClasses.disabled}`]: {
        [`& .${outlinedInputClasses.notchedOutline}`]: {},
      },
    },
  },
}))

export default StyledTextField
