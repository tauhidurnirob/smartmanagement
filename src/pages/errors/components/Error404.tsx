import { Box, Typography } from '@mui/material'

const Error404 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography fontSize='35px' fontWeight='bold'>
        We are sorry...
      </Typography>
      <Typography fontSize='20px' fontWeight='bold' mt={2}>
        Page not found
      </Typography>
    </Box>
  )
}

export default Error404
