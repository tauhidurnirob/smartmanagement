import { Box, CircularProgress, Stack, SxProps, Typography } from '@mui/material'

interface IProps {
  text?: string
  size?: string | number
  sx?: SxProps
}

const BackDrop: React.FC<IProps> = ({ text, size, sx }) => {
  return (
    <Stack
      sx={{
        zIndex: 1000,
        position: 'absolute',
        width: '100%',
        background: '#ffffff',
        height: '100%',
        top: '0',
        left: '0',
        ...(sx || {}),
      }}
      alignItems='center'
      justifyContent='center'
    >
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={size || '40px'} />
      </Box>
      {text && <Typography>{text}</Typography>}
    </Stack>
  )
}

export default BackDrop
