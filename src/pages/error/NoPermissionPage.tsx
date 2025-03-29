import { Box, Typography } from '@mui/material';

const NoPermissionPage = () =>  {
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
      <Typography fontSize="30px" fontWeight="bold" sx={{ color: theme=> theme.palette.primary.main }}>
        You have no permission to view this page!
      </Typography>
    </Box>
  );
}

export default NoPermissionPage