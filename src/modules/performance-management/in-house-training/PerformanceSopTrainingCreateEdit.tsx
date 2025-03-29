import { Box, Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material'
import { FC, useEffect } from 'react'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { FormikErrors, useFormik } from 'formik'
import * as Yup from 'yup'
import { Plus } from '../../../assets/icons/plus'
import deepCopy from '../../../helpers/deepCopy'
import MaintenanceProcedureStep from '../../maintanance/procedures/MaintenanceProcedureStep'
import {
  IImg,
  IPerformanceInhouseSopReqBody,
  IPerformanceSopTrainingCreateEdit,
  ISopTrainingList,
  ISopTrainingReqBody,
  ISopTrainingRes,
} from '../../../types/performance-management'
import { ISelectItem } from '../../../types/common'
import TimeTakenSelect from './TimeTakenSelect'
import { TIME_OPTIONS } from '../../../helpers/constants'
import Api from '../../../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initFormikValues: IPerformanceSopTrainingCreateEdit = {
  sopName: '',
  remark: '',
  timeTakenSop: null,
  sopTrainingList: [],
}
const initStep: ISopTrainingList = { text: '', images: [] }
const initStepTouched = { text: false }

interface IProps {
  sop?: ISopTrainingRes
}
const PerformanceSopTrainingCreateEdit: FC<IProps> = ({ sop }) => {
  const isDetails = !!sop

  const theme = useTheme()
  const navigate = useNavigate()
  const [uploadFile] = Api.useUploadFileMutation()
  const [createSop, { isLoading: isCreating }] = Api.useCreateSopMutation()
  const [updateSop, { isLoading: isUpdating }] = Api.useUpdateSopMutation()

  const formik = useFormik<IPerformanceSopTrainingCreateEdit>({
    enableReinitialize: true,
    initialValues: { ...initFormikValues },
    validationSchema: Yup.object().shape({
      sopName: Yup.string().max(250).required('Procedure name is required'),
      remark: Yup.string(),
      timeTakenSop: Yup.object().required('Time taken is required'),
      sopTrainingList: Yup.array(
        Yup.object().shape({
          text: Yup.string().max(255).required('Step deccription is required'),
          images: Yup.array(),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)
        const sopTrainingList: ISopTrainingReqBody[] = await Promise.all(
          values.sopTrainingList.map(async (item) => {
            const sopTrainingPicture = await Promise.all(
              item.images.map(async (img) => {
                if (img.file) {
                  const res = await uploadFile(img.file).unwrap()
                  return { uri: res?.fileUrl || '' }
                } else {
                  return { uri: img.url }
                }
              })
            )

            return {
              listText: item.text,
              sopTrainingPicture,
            }
          })
        )

        const reqBody: IPerformanceInhouseSopReqBody = {
          sopName: values.sopName,
          remark: values.remark,
          timeTakenSop: (values.timeTakenSop?.value || '') as string,
          sopTrainingList,
        }

        if (isDetails) {
          updateSop({ id: sop.id, body: reqBody })
            .unwrap()
            .then(() => {
              toast.success('Updated the SOP (Cleaning Processes)')
            })
            .catch((err) => {
              console.log('Failed to update the SOP (Cleaning Processes): ', err)
              toast.error('Failed to update the SOP (Cleaning Processes)')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          createSop(reqBody)
            .unwrap()
            .then(() => {
              toast.success('Created a new SOP (Cleaning Processes)')
              navigate('/performance-management/in-house-training/sop')
            })
            .catch((err) => {
              console.log('Failed to create a SOP (Cleaning Processes): ', err)
              toast.error('Failed to create a SOP (Cleaning Processes)')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in saving procedure: ', err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (sop && sop.id) {
      const parsedList: ISopTrainingList[] = sop.sopTrainingList.map((item) => {
        return {
          text: item.listText,
          images: item.sopTrainingPicture.map((pic) => ({ url: pic.uri })),
        }
      })

      initFormikValues.sopName = sop.sopName
      initFormikValues.remark = sop.remark
      initFormikValues.timeTakenSop = { label: sop.timeTakenSop, value: sop.timeTakenSop }
      initFormikValues.sopTrainingList = parsedList

      formik.setValues(initFormikValues)
    }
  }, [])

  const handleAddNewSop = () => {
    const newSops = [...formik.values.sopTrainingList, { ...initStep }]
    formik.setFieldValue('sopTrainingList', newSops)

    const newTouched = [...(formik.touched?.sopTrainingList || [])]
    newTouched.push({ ...initStepTouched })
    formik.setTouched({
      ...(formik.touched || {}),
      sopTrainingList: newTouched,
    })
  }

  const handleRemoveSop = (index: number) => {
    const newSops = [...formik.values.sopTrainingList]
    newSops.splice(index, 1)
    formik.setFieldValue('sopTrainingList', newSops)

    const newTouched = [...(formik.touched?.sopTrainingList || [])]
    newTouched.splice(index, 1)
    formik.setTouched({
      ...(formik.touched || {}),
      sopTrainingList: newTouched,
    })
  }

  const handleChangeTime = (time: ISelectItem) => {
    formik.setFieldValue('timeTakenSop', time)
  }

  const handleImageRemove = (imgIdx: number, listIdx: number) => {
    const newSteps = [...formik.values.sopTrainingList]
    newSteps[listIdx].images.splice(imgIdx, 1)
    formik.setFieldValue('sopTrainingList', newSteps)
  }

  const setImages = (imgs: IImg[], index: number) => {
    const newSteps = [...formik.values.sopTrainingList]
    newSteps[index].images = imgs
    formik.setFieldValue('sopTrainingList', newSteps)
  }

  const handleTextChange = async (idx: number, text: string) => {
    const newLists = [...formik.values.sopTrainingList]
    newLists[idx].text = text
    await formik.setFieldValue('sopTrainingList', newLists)
    await formik.setFieldTouched(`sopTrainingList[${idx}].name`, true)
  }

  const handleAddSop = () => {
    formik.handleSubmit()
  }

  return (
    <Card sx={{ mt: 3 }}>
      <Box sx={{ px: 3.75, pt: 5.25, pb: 2.5 }}>
        <Typography variant='h3'>{isDetails ? 'SOP Details' : 'Add New SOP'}</Typography>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
              >
                SOP Name
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextFieldWithLabel
                showLabel={false}
                name='sopName'
                placeholder='SOP name'
                value={formik.values.sopName}
                onChange={(e) => {
                  formik.setFieldValue('sopName', e.target.value)
                }}
                error={!!formik.errors.sopName && formik.touched.sopName}
                helperText={formik.errors.sopName}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
              >
                Remark
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextareaWithLabel
                label={''}
                name={'remark'}
                value={formik.values.remark}
                placeholder={'Write a Remark'}
                rows={4}
                hiddenLabel={true}
                onChange={(e) => formik.setFieldValue('remark', e.target.value)}
                error={!!formik.errors.remark && formik.touched.remark}
                helperText={formik.errors.remark}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                Time Taken to Complete SOP
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TimeTakenSelect
                hiddenLabel={true}
                placeholder={{label: 'Time Taken to Complete SOP', value: ''}}
                selected={formik.values.timeTakenSop as ISelectItem}
                onChange={handleChangeTime}
                textColor={theme.palette.grey[800]}
                options={TIME_OPTIONS.filter((f) => !!f.value)}
                error={!!formik.errors.timeTakenSop && !!formik.touched.timeTakenSop}
                helperText={formik.errors.timeTakenSop as string}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Box sx={{ mt: 5.5, display: 'flex', alignItems: 'center' }}>
            <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
              SOP
              <RequiredItem />
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
              onClick={handleAddNewSop}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          <Typography mt={1}>
            Supported format: jpg, jpeg, png, mp4. Max file size is 5 MB
          </Typography>
          {formik.values.sopTrainingList?.map((list, idx) => {
            const textError =
              !!formik.errors.sopTrainingList?.[idx] &&
              !!(formik.errors.sopTrainingList[idx] as FormikErrors<ISopTrainingList>).text
            const textErrorMsg =
              !!formik.errors.sopTrainingList?.[idx] &&
              typeof formik.errors.sopTrainingList[idx] !== 'string' &&
              (formik.errors.sopTrainingList[idx] as FormikErrors<ISopTrainingList>).text
                ? (formik.errors.sopTrainingList[idx] as FormikErrors<ISopTrainingList>).text
                : ''
            return (
              <MaintenanceProcedureStep
                key={`sop-${idx}`}
                label={`SOP List ${idx + 1}`}
                placeholder={`List ${idx + 1}`}
                fieldName={`sopTrainingList[${idx}].name`}
                error={textError}
                errorMsg={textErrorMsg as string}
                images={list.images}
                text={list.text}
                handleImageRemove={handleImageRemove}
                setImages={setImages}
                handleTextChange={handleTextChange}
                index={idx}
                onRemove={() => handleRemoveSop(idx)}
              />
            )
          })}
        </Box>
      </Box>
      <Divider light />
      <Box
        sx={{
          px: 3.75,
          pt: 2.5,
          pb: 3.75,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 3,
        }}
      >
        <Button
          variant='text'
          color='inherit'
          sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
        >
          Cancel
        </Button>
        {!isDetails && (
          <Button disabled={!formik.isValid || formik.isSubmitting || isCreating} onClick={handleAddSop} variant='contained' color='primary'>
            Add SOP
          </Button>
        )}
        {isDetails && (
          <Button disabled={!formik.isValid || formik.isSubmitting || isUpdating} onClick={handleAddSop} variant='contained' color='primary'>
            Save
          </Button>
        )}
      </Box>
    </Card>
  )
}

export default PerformanceSopTrainingCreateEdit
