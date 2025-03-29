import { Button, Stack } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { ErrorPageIcon } from '../../assets/icons/error-page'

const ErrorLayout = () => {
  const navigate = useNavigate()

  return (
    <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
      <ErrorPageIcon sx={{ mx: 'auto', width: 'auto', height: 'auto' }} />
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={5}>
        <Outlet />
      </Stack>
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={3}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            navigate('/', { replace: true })
          }}
        >
          Go to homepage
        </Button>
      </Stack>
    </Stack>
  )
}

export default ErrorLayout
