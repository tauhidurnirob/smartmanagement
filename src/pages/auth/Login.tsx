import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  Typography,
  Stack,
  FormControl,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import { toast } from 'react-toastify'
import Visibility from '@mui/icons-material/VisibilityOutlined'
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined'
import { useDispatch } from 'react-redux'

import Api from '../../api'
import _actions from '../../store/_actions'
import useAuth from '../../hooks/useAuth'

const settings = [
  {
    img: '/assets/images/auth/login-1.png',
    title: 'Your All In One Platform',
    description: 'For Seamless and Efficient Facility Management.',
  },
  {
    img: '/assets/images/auth/login-2.png',
    title: 'Why adopt smart facility management solutions?',
    description:
      'Managing multiple operations, resources, crowd, facilities and statistics is a complex and challenging process.',
  },
  {
    img: '/assets/images/auth/login-3.png',
    title: 'Workforce Optimization',
    description: 'Streamline your workforce by integrating individual solutions into one.',
  },
]

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { getRoutesInfo } = useAuth()

  const [login] = Api.useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      const showToastError = () => {
        toast.error(
          <span className='d-flex flex-column align-items-center fs-4 fw-bold'>
            <span>Incorrect email or password.</span>
            <span>Please check again.</span>
          </span>,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored',
            closeOnClick: true,
            className: 'notification',
            bodyClassName: 'notification-body',
            hideProgressBar: true,
            closeButton: false,
            draggable: false,
            icon: false,
            autoClose: false,
          }
        )
      }
      try {
        const data: any = await login({ email: values.email, password: values.password }).unwrap()

        // Save Login
        dispatch(_actions.login(data as any))
        const { defaultRoute } = getRoutesInfo(data.userInfo)
        navigate(defaultRoute)
      } catch (error) {
        console.error(error)
        dispatch(_actions.login({ payload: { userInfo: null, token: null } }))
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
        showToastError()
      }
    },
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <Box sx={{ px: 2, py: 3, height: '100%', width: '100%' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item lg={5} xs={12} order={{ lg: 1, xs: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              pt: { lg: 0, xs: 15 },
              pb: { lg: 0, xs: 8 },
            }}
          >
            <Grid container direction='column' justifyContent='center' alignItems='center'>
              <Grid item sx={{ mb: 5 }}>
                <img src='/assets/images/logo/logo-with-letter.png' />
              </Grid>
              <Grid item sx={{ mb: 8 }}>
                <Typography variant='h1' sx={{ fontWeight: '600' }}>
                  Sign In
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    variant='outlined'
                  >
                    <OutlinedInput
                      type='email'
                      value={formik.values.email}
                      name='email'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      inputProps={{}}
                      placeholder='Email'
                      sx={{
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.grey[400],
                        },
                        '&:hover $notchedOutline': {
                          borderColor: (theme) => theme.palette.primary.light,
                        },
                      }}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <FormHelperText error id='standard-weight-helper-text-email-login'>
                        {formik.errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    sx={{ mt: 2 }}
                  >
                   <OutlinedInput
                      id='outlined-adornment-password-login'
                      type={showPassword ? 'text' : 'password'}
                      value={formik.values.password}
                      name='password'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                            size='large'
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder='Password'
                      inputProps={{}}
                      sx={{
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.grey[400],
                        },
                        '&:hover $notchedOutline': {
                          borderColor: (theme) => theme.palette.primary.light,
                        },
                      }}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <FormHelperText error>{formik.errors.password}</FormHelperText>
                    )}
                  </FormControl>
                  {formik.errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{formik.errors.submit}</FormHelperText>
                    </Box>
                  )}
                  <Box sx={{ mt: 7 }}>
                    <Button
                      disabled={formik.isSubmitting || !formik.isValid}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                      color='primary'
                    >
                      Sign in
                    </Button>
                  </Box>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='end'
                    spacing={1}
                    sx={{ mt: 1.5 }}
                  >
                    <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
                      <Typography
                        variant='subtitle1'
                        color='gray.900'
                        sx={{
                          textDecoration: 'none',
                          cursor: 'pointer',
                          opacity: 0.3,
                          '&:hover': {
                            opacity: 1.0,
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                      >
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Stack>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          lg={7}
          xs={12}
          order={{
            lg: 2,
            xs: 1,
          }}
        >
          <Box
            sx={{
              borderRadius: 5,
              background: (theme) => theme.palette.primary.main,
              height: '100%',
            }}
          >
            <Carousel showStatus={false} showArrows={false} className='h-100'>
              {settings.map(({ title, description, img }, idx) => {
                return (
                  <Box
                    key={idx}
                    justifyContent={{
                      lg: 'start',
                      xs: 'center',
                    }}
                    alignItems='center'
                    flexDirection={'column'}
                    sx={{
                      display: 'flex !important',
                      height: '100%',
                      marginTop: {
                        lg: '151px',
                        xs: '0',
                      },
                    }}
                  >
                    <Box sx={{ maxWidth: '687px' }}>
                      <img src={img} style={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Typography
                      variant='h1'
                      sx={{
                        mt: 12,
                        color: (theme) => theme.palette.common.white,
                        fontWeight: 600,
                        fontSize: 35,
                        maxWidth: '405px',
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant='h3'
                      sx={{
                        mt: 2,
                        color: (theme) => theme.palette.common.white,
                        fontWeight: 400,
                        fontSize: 22,
                        maxWidth: '545px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {description}
                    </Typography>
                  </Box>
                )
              })}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
