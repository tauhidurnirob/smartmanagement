import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Api from '../../api'

enum FORGOT_PASSWORD_STPES {
  emailSender = 0,
  validOtp = 1,
  resetPassword = 2,
}

const EmailSender = ({ onNext }: { onNext: (email: string) => void }) => {
  const [loading, setLoading] = useState(false)
  const [requestPassword] = Api.useRequestPasswordMutation()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    }),
    onSubmit: async (values, { setStatus }) => {
      setLoading(true)
      requestPassword({ email: values.email })
        .unwrap()
        .then((data: any) => {
          setStatus({ success: true })
          onNext(values.email)
        })
        .catch((err) => {
          console.error('request password error: ', err)
          setStatus({ success: false })
          toast.error('Email is incorrect')
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Grid
        container
        alignItems={'center'}
        direction={'column'}
        sx={{ width: { lg: '413px', xs: '100%' } }}
      >
        <Grid item sx={{ mt: 3.25 }}>
          <Typography typography={'h1'}>Forget Password?</Typography>
        </Grid>
        <Grid item sx={{ mt: 0.625 }}>
          <Typography
            typography={'h4'}
            sx={{
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            Please enter your email address to receive a verification code
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 2, width: '100%' }}>
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
              placeholder='Enter your email address'
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error id='standard-weight-helper-text-email-login'>
                {formik.errors.email}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item sx={{ mt: 2, width: '100%' }}>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid}
            loading={loading}
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}

const ValidateOTP = ({
  email: email,
  onNext,
}: {
  email: string
  onNext: (otpCode: string) => void
}) => {
  const [validateOTP] = Api.useValidateOTPMutation()
  const [requestPassword] = Api.useRequestPasswordMutation()
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().max(255).required('Code is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const otpCode = values.code
      validateOTP({ email, otp: otpCode })
        .unwrap()
        .then(() => {
          // Go to next step for resetting password
          onNext(values.code)
        })
        .catch((err) => {
          console.error('validate otp code error: ', err)
          toast.error(err.message || 'OTP code is invalid')
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  const handleResend = () => {
    // resend OTP code through email
    formik.setSubmitting(true)
    requestPassword({ email })
      .unwrap()
      .then((data: any) => {
        toast.success(data.data?.message || 'Resent validation code')
      })
      .catch((err) => {
        console.error('resend otp code error: ', err)
        toast.error('A resend code is failed.')
      })
      .finally(() => {
        formik.setSubmitting(false)
      })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Grid
        container
        alignItems={'center'}
        direction={'column'}
        sx={{ width: { lg: '413px', xs: '100%' } }}
      >
        <Grid item sx={{ mt: 3.25 }}>
          <Typography typography={'h1'}>Validation Code</Typography>
        </Grid>
        <Grid item sx={{ mt: 0.625 }}>
          <Typography
            typography={'h4'}
            sx={{
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            Please key in the validation code sent to your email
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 2, width: '100%' }}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.code && formik.errors.code)}
            variant='outlined'
          >
            <OutlinedInput
              type='string'
              value={formik.values.code}
              name='code'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              inputProps={{}}
              placeholder='Enter your validation code'
            />
            {formik.touched.code && formik.errors.code && (
              <FormHelperText error id='standard-weight-helper-text-code-login'>
                {formik.errors.code}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item sx={{ mt: 2, width: '100%' }}>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || formik.isSubmitting}
            loading={formik.isSubmitting}
          >
            Continue
          </LoadingButton>
        </Grid>
        <Grid item sx={{ mt: 1.5, width: '100%' }}>
          <LoadingButton
            fullWidth
            size='small'
            variant='text'
            color='inherit'
            onClick={() => handleResend()}
            disabled={formik.isSubmitting}
            sx={{ py: 0, opacity: 0.3, '&:hover': { opacity: 1.0 } }}
            loading={formik.isSubmitting}
            loadingPosition='end'
          >
            Resend validation code
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}

const ResetPassword = ({ email, code }: { email: string; code: string }) => {
  const navigate = useNavigate()
  const [sendChangePassword] = Api.useChangePasswordByEmailMutation()

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string().max(255).required('New Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), ''], "New Password and Confirm Password didn't match")
        .required('Password confirmation is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      sendChangePassword({
        email: email,
        otp: code,
        newPassword: values.newPassword,
      })
        .unwrap()
        .then(() => {
          // Go to login page
          navigate('/login')
        })
        .catch((err) => {
          console.log('change password error: ', err)
          toast.error('Failed to change password')
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Grid
        container
        alignItems={'center'}
        direction={'column'}
        sx={{ width: { lg: '413px', xs: '100%' } }}
      >
        <Grid item sx={{ mt: 3.25 }}>
          <Typography typography={'h1'}>Reset Password</Typography>
        </Grid>
        <Grid item sx={{ mt: 0.625 }}>
          <Typography
            typography={'h4'}
            sx={{
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            Please enter your new password
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 2, width: '100%' }}>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            variant='outlined'
          >
            <OutlinedInput
              type='password'
              value={formik.values.newPassword}
              name='newPassword'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              inputProps={{}}
              placeholder='New Password'
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <FormHelperText error id='standard-weight-helper-text-newPassword-login'>
                {formik.errors.newPassword}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            variant='outlined'
            sx={{ mt: 2 }}
          >
            <OutlinedInput
              type='password'
              value={formik.values.confirmPassword}
              name='confirmPassword'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              inputProps={{}}
              placeholder='Confirm New Password'
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <FormHelperText error id='standard-weight-helper-text-confirmPassword-login'>
                {formik.errors.confirmPassword}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item sx={{ mt: 2, width: '100%' }}>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid || formik.isSubmitting}
            loading={formik.isSubmitting}
          >
            Update Password
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}

const ForgotPassword = () => {
  const [step, setStep] = useState<number>(FORGOT_PASSWORD_STPES.emailSender)
  const [params, setParams] = useState<{
    email: string
    code: string
  }>({
    email: '',
    code: '',
  })
  const handleNextEmail = (email: string) => {
    setStep(FORGOT_PASSWORD_STPES.validOtp)
    setParams((params) => ({ ...params, email }))
  }
  const handleNextValidOtp = (code: string) => {
    setStep(FORGOT_PASSWORD_STPES.resetPassword)
    setParams((params) => ({ ...params, code }))
  }
  const handleBackStep = () => {
    let backStep = FORGOT_PASSWORD_STPES.emailSender
    switch (step) {
      case FORGOT_PASSWORD_STPES.emailSender:
        backStep = FORGOT_PASSWORD_STPES.emailSender
        break
      case FORGOT_PASSWORD_STPES.validOtp:
        backStep = FORGOT_PASSWORD_STPES.emailSender
        break
      case FORGOT_PASSWORD_STPES.resetPassword:
        backStep = FORGOT_PASSWORD_STPES.validOtp
        break
      default:
        break
    }

    setStep(backStep)
  }
  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        minHeight: '100vh',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid container direction='column' alignItems={'center'}>
        <Grid item sx={{ mb: 2.5 }} xs={12}>
          <img src='/assets/images/logo/logo-with-letter.png' />
        </Grid>
        <Grid item sx={{ mt: 0 }} xs={12}>
          <Card sx={{ py: 3.75, px: 3, width: { lg: '596px', xs: '100%' } }}>
            <Grid container direction={'column'}>
              <Grid item>
                <Button
                  color='inherit'
                  sx={{ p: 0, pr: 1, minWidth: 0, opacity: 0.3, '&:hover': { opacity: 1 } }}
                  onClick={handleBackStep}
                  disabled={step === FORGOT_PASSWORD_STPES.emailSender}
                >
                  <ChevronLeft />
                  <Typography typography={'subtitle1'}>Back</Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                {step === FORGOT_PASSWORD_STPES.emailSender && (
                  <EmailSender onNext={handleNextEmail} />
                )}
                {step === FORGOT_PASSWORD_STPES.validOtp && (
                  <ValidateOTP email={params.email} onNext={handleNextValidOtp} />
                )}
                {step === FORGOT_PASSWORD_STPES.resetPassword && (
                  <ResetPassword email={params.email} code={params.code} />
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ForgotPassword
