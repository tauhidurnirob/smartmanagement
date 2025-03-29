import { Box, Typography } from '@mui/material';

const PageNotfound = () =>  {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '80vh'
      }}
    >
      <Typography fontSize="100px" fontWeight="bold" sx={{ color: theme=> theme.palette.primary.main }}>
        404
      </Typography>
      <Typography fontSize="30px" fontWeight="bold" sx={{ color: theme=> theme.palette.primary.main }}>
        The page you’re looking for doesn’t exist!
      </Typography>
    </Box>
  );
}

export default PageNotfound