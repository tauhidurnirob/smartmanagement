import { Box, Typography, Grid, Button, Stack, IconButton } from '@mui/material'
import { FormikErrors, FormikTouched, useFormik, FormikProps } from 'formik'
import * as Yup from 'yup'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Plus } from '../../assets/icons/plus'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import { IUserCreate, IUserTraining } from '../../types/user'

interface ITrainingElementsTouched {
  name: boolean
  code: boolean
  refNo: boolean
}

const initTraining: IUserTraining = { name: '', code: '', refNo: '' }
const initTrainingTouched: ITrainingElementsTouched = { name: false, code: false, refNo: false }

const TrainingRecord = ({ formik }: { formik: FormikProps<IUserCreate> }) => {
  const handleAddNewTraining = async () => {
    const newTrainings = [...formik.values.staffTraining, { ...initTraining }]
    await formik.setFieldValue('staffTraining', newTrainings)

    const newTouched = [...(formik.touched?.staffTraining || [])]
    newTouched.push({ ...initTrainingTouched })
    await formik.setTouched({
      ...(formik.touched || {}),
      staffTraining: newTouched,
    })
  }

  const handleRemoveTraining = async (idx: number) => {
    const newTrainings = [...formik.values.staffTraining]
    newTrainings.splice(idx, 1)
    if (newTrainings.length > 0) {
      const newTouched = [...(formik.touched?.staffTraining || [])]
      newTouched.splice(idx, 1)
      await formik.setTouched({
        ...(formik.touched || {}),
        staffTraining: newTouched,
      })
    }
    await formik.setFieldValue('staffTraining', newTrainings)
  }

  const handleChangeTrainingName = async (idx: number, name: string) => {
    const newTrainings = [...formik.values.staffTraining]
    newTrainings[idx].name = name
    await formik.setFieldValue('staffTraining', newTrainings)
    await formik.setFieldTouched(`staffTraining[${idx}].name`, true)
  }

  const handleChangeTrainingCode = async (idx: number, code: string) => {
    const newTrainings = [...formik.values.staffTraining]
    newTrainings[idx].code = code
    await formik.setFieldValue('staffTraining', newTrainings)
    await formik.setFieldTouched(`staffTraining[${idx}].code`, true)
  }

  const handleChangeTrainingRefNo = async (idx: number, refNo: string) => {
    const newTrainings = [...formik.values.staffTraining]
    newTrainings[idx].refNo = refNo
    await formik.setFieldValue('staffTraining', newTrainings)
    await formik.setFieldTouched(`staffTraining[${idx}].refNo`, true)
  }

  return (
    <Box sx={{ pt: 3.5, pr: 4, pb: 5, pl: 5 }}>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
          External IUserTraining Record (SkillsFuture)
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Typography typography={'h6'} sx={{ fontSize: '1.125rem' }}>
          Course Name
        </Typography>
        <Button
          variant='contained'
          size='small'
          sx={{
            p: 1,
            ml: 3,
            minWidth: 0,
            background: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.main,
            '&:hover': {
              color: '#ffffff',
            },
          }}
          onClick={handleAddNewTraining}
        >
          <Plus sx={{ fontSize: '16px' }} />
        </Button>
      </Box>
      <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={{ lg: 5, xs: 2 }}>
        {formik.values.staffTraining.map((training, idx) => {
          const nameError =
            !!formik.errors.staffTraining?.[idx] &&
            !!(formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).name
          const nameHelpText =
            !!formik.errors.staffTraining?.[idx] &&
            typeof formik.errors.staffTraining[idx] !== 'string' &&
            (formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).name
              ? (formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).name
              : ''

          const codeError =
            !!formik.errors.staffTraining?.[idx] &&
            !!(formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).code
          const codeHelpText =
            !!formik.errors.staffTraining?.[idx] &&
            typeof formik.errors.staffTraining[idx] !== 'string' &&
            (formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).code
              ? (formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).code
              : ''

          const refNoError =
            !!formik.errors.staffTraining?.[idx] &&
            !!(formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).refNo
          const refNoHelpText =
            !!formik.errors.staffTraining?.[idx] &&
            typeof formik.errors.staffTraining[idx] !== 'string' &&
            (formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).refNo
              ? (formik.errors.staffTraining[idx] as FormikErrors<IUserTraining>).refNo
              : ''
          return (
            <Stack key={idx} flexDirection={'column'}>
              <Stack
                flexDirection={{ lg: 'row', xs: 'column' }}
                alignItems={{ lg: 'flex-start', xs: 'flex-end' }}
                gap={1}
              >
                <Stack
                  flexGrow={1}
                  flexDirection={'row'}
                  alignItems={'flex-start'}
                  gap={1}
                  width={{ lg: 'auto', xs: '100%' }}
                >
                  <Stack flexGrow={1}>
                    <Grid container spacing={{ lg: 2, xs: 1 }} display={'flex'}>
                      <Grid item xs={6}>
                        <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                          Course Name {idx + 1}
                        </Typography>
                        <TextFieldWithLabel
                          showLabel={false}
                          size='small'
                          fullWidth
                          placeholder='Course Name'
                          name='name'
                          value={training.name}
                          onChange={(e) => handleChangeTrainingName(idx, e.target.value)}
                          error={nameError}
                          helperText={nameHelpText}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                          Course Code
                        </Typography>
                        <TextFieldWithLabel
                          showLabel={false}
                          size='small'
                          fullWidth
                          placeholder='Course Code'
                          name='code'
                          value={training.code}
                          onChange={(e) => handleChangeTrainingCode(idx, e.target.value)}
                          error={codeError}
                          helperText={codeHelpText}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                          Ref No.
                        </Typography>
                        <TextFieldWithLabel
                          showLabel={false}
                          size='small'
                          fullWidth
                          placeholder='Ref No.'
                          name='refNo'
                          value={training.refNo}
                          onChange={(e) => handleChangeTrainingRefNo(idx, e.target.value)}
                          error={refNoError}
                          helperText={refNoHelpText}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack>
                    <IconButton sx={{ mt: 3.25 }} onClick={() => handleRemoveTraining(idx)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          )
        })}
      </Box>
    </Box>
  )
}

export default TrainingRecord
