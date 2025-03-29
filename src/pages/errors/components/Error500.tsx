import { Box, Typography } from '@mui/material'

const Error500 = () => {
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
        Server is under maintenace.
      </Typography>
      <Typography fontSize='16px' fontWeight='bold' mt={1}>
        Please try again later.
      </Typography>
    </Box>
  )
}

export default Error500
