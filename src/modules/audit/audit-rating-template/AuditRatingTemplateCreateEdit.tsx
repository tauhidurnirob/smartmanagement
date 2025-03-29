import { FC } from 'react'
import { To, useNavigate } from 'react-router-dom'
import {
  Card,
  IconButton,
  Stack,
  Box,
  Typography,
  Divider,
  Checkbox,
  Button,
  Switch,
  styled,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import {
  IRatingTemplate,
  IRatingTemplateElementItem,
  IReqRatingTemplateCreate,
  RatingMappingItem,
} from '../../../types/audit'
import { ISelectItem } from '../../../types/common'
import { AUDIT_RATING_STYLES } from '../../../helpers/constants'
import { CloseDuotone } from '../../../assets/icons/close-duotone'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import AuditRatingScores from './AuditRatingScores'
import AuditRatingElements from './AuditRatingElements'
import Api from '../../../api'
import deepCopy from '../../../helpers/deepCopy'
import ButtonBack from '../../common/ButtonBack'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { RequiredItem } from '../audit-schedule/AuditScheduleDetail'

const initialElements: IRatingTemplateElementItem[] = []

const RatingText: RatingMappingItem[] = [
  {
    label: 'Very Poor',
    rating: 0,
  },
  {
    label: 'Poor',
    rating: 1,
  },
  {
    label: 'Average',
    rating: 2,
  },
  {
    label: 'Good',
    rating: 3,
  },
  {
    label: 'Very Good',
    rating: 4,
  },
]

interface IFormikValues {
  inspectionUnit: string
  allowUploadImage: boolean
  allowWriteRemark: boolean
  allowUploadImageMandatory: boolean
  allowWriteRemarkMandatory: boolean
  allowNAOption: boolean
  ratingStyle: ISelectItem
  ratingStart: string
  ratingEnd: string
  ratingNumber: string
  failRating: string
  elements: IRatingTemplateElementItem[]
  ratingTextMapping: RatingMappingItem[]
  remark: string
}

const getInitialValue = (data: IRatingTemplate | undefined) => {
  return {
    inspectionUnit: data?.inspectionUnit ?? '',
    allowUploadImage: data?.allowUploadImage ?? false,
    allowWriteRemark: data?.allowWriteRemark ?? false,
    allowUploadImageMandatory: data?.allowUploadImageMandatory ?? false,
    allowWriteRemarkMandatory: data?.allowWriteRemarkMandatory ?? false,
    allowNAOption: data?.allowNAOption ?? false,
    ratingStyle:
      AUDIT_RATING_STYLES?.find((f) => f.value === data?.style) ?? AUDIT_RATING_STYLES[0],
    ratingStart: data?.ratingStart ?? '1',
    ratingEnd: data?.ratingEnd ?? '10',
    ratingNumber: data?.numberOfRating ?? '5',
    failRating: data?.failRating ?? '3',
    elements: data?.elements ?? initialElements,
    ratingTextMapping: data?.mapping ?? [...RatingText],
    remark: data?.remark ?? '',
  } as IFormikValues
}

interface IProps {
  ratingTemplate?: IRatingTemplate
}

const CheckboxItem: FC<{
  label: string
  selected: boolean
  onClick: (v: boolean) => void
}> = ({ label, selected, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Checkbox
        checked={selected}
        onChange={(e) => onClick(e.target.checked)}
        inputProps={{ 'aria-label': 'controlled' }}
        sx={{ py: 0, pl: 0, pr: 2 }}
      />
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 700,
          color: (theme) => (selected ? theme.palette.primary.main : theme.palette.grey[500]),
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'primary.main',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))

const AuditRatingTemplateCreateEdit: FC<IProps> = ({ ratingTemplate }) => {
  const isEdit = !!ratingTemplate && !!ratingTemplate.id

  const navigate = useNavigate()

  const [createRating, { isLoading: isCreating }] = Api.useCreateAuditRatingTemplateMutation()
  const [updateRating, { isLoading: isUpdating }] = Api.useUpdateAuditRatingTemplateMutation()

  const isLoading = isCreating || isUpdating

  const formik = useFormik<IFormikValues>({
    initialValues: getInitialValue(ratingTemplate),
    validationSchema: Yup.object().shape({
      inspectionUnit: Yup.string().max(255).required('Inspection unit is required'),
    }),
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)
      try {
        const req = {
          inspectionUnit: values.inspectionUnit,
          allowUploadImage: values.allowUploadImage,
          allowWriteRemark: values.allowWriteRemark,
          allowUploadImageMandatory: values.allowUploadImageMandatory,
          allowWriteRemarkMandatory: values.allowWriteRemarkMandatory,
          allowNAOption: values.allowNAOption,
          style: values.ratingStyle.value,
          ratingStart: Number(values.ratingStart),
          ratingEnd: Number(values.ratingEnd),
          failRating: Number(values.failRating),
          numberOfRating: Number(values.ratingNumber),
          mapping:
            values.ratingStyle.value === AUDIT_RATING_STYLES[2].value
              ? RatingText
              : values.ratingTextMapping,
          elements: values.elements,
          remark: values.remark,
        } as IReqRatingTemplateCreate
        if (isEdit) {
          updateRating({ id: Number(ratingTemplate.id), data: req })
            .unwrap()
            .then(() => {
              toast.success(`Rating template has been updated`)
              setValues(getInitialValue(ratingTemplate), false)
              // navigate('/audit/audit-form-template/rating-view')
            })
            .catch((err: any) => {
              console.log('Failed to update a rating template: ', err)
              toast.error('Failed to update a rating template')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          createRating(req)
            .unwrap()
            .then(() => {
              toast.success(`Rating template has been added`)
              setValues(getInitialValue(ratingTemplate), false)
              navigate('/audit/audit-form-template/rating-view')
            })
            .catch((err: any) => {
              console.log('Failed to create a new rating template: ', err)
              toast.error('Failed to create a new rating template')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error(err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleChangeStyle = (item: ISelectItem) => {
    formik.setFieldValue('ratingStyle', item)
  }

  const handleRatingNumberChange = (num: string) => {
    const newValues = deepCopy(formik.values)
    newValues.ratingNumber = num

    const ratingNumber = Number(num)
    if (
      Number.isFinite(ratingNumber) &&
      formik.values.ratingStyle.value === AUDIT_RATING_STYLES[1].value
    ) {
      const ratingTextMapping = formik.values.ratingTextMapping
      if (ratingNumber > ratingTextMapping.length) {
        const numToAdd = ratingNumber - ratingTextMapping.length
        const tempArr = [...ratingTextMapping]
        for (let i = 0; i < numToAdd; i++) {
          tempArr.push({
            label: 'Text',
            rating: tempArr.length ? tempArr[tempArr.length - 1].rating + 1 : 0,
          })
        }
        newValues.ratingTextMapping = [...tempArr]
      } else if (ratingNumber < ratingTextMapping.length) {
        const numToRemove = ratingTextMapping.length - ratingNumber
        const tempArr = ratingTextMapping.slice(0, -numToRemove)
        newValues.ratingTextMapping = deepCopy(tempArr)
      }
    }

    formik.setValues(deepCopy(newValues))
  }

  const handleChangeElements = (v: IRatingTemplateElementItem[]) => {
    formik.setFieldValue('elements', v)
  }

  const handleClose = () => {
    navigate(-1)
  }

  const handleDiscard = () => {
    formik.setValues(deepCopy(getInitialValue(ratingTemplate)))
    navigate(-1)
  }

  console.log(formik.values)

  return (
    <Box>
      <Box mb={2}>
        <ButtonBack to={-1 as To} />
      </Box>
      <Card>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          overflow='wrap'
          gap={2}
          sx={{ px: 5.5, py: 5, position: 'relative' }}
        >
          <Stack direction='row' alignItems='center' gap={2} overflow='wrap'>
            <Typography variant='h3'>
              {isEdit ? 'Edit Rating Template' : 'Add New Rating Template'}
            </Typography>
          </Stack>
          {!isEdit && (
            <IconButton
              onClick={handleClose}
              size='small'
              sx={{
                color: (theme) => theme.palette.grey[500],
                borderRadius: 2,
                p: 0,
                position: 'absolute',
                top: 18,
                right: 18,
              }}
            >
              <CloseDuotone sx={{ fontSize: 36 }} />
            </IconButton>
          )}
        </Stack>
        <Divider light />
        <Stack
          direction='column'
          overflow='wrap'
          sx={{ px: 5.5, pt: 2, pb: 5.5, position: 'relative' }}
        >
          <Stack>
            <Typography
              variant='subtitle1'
              sx={{
                fontSize: 15,
                color: (theme) => theme.palette.grey[900],
                display: 'inline-flex',
              }}
            >
              Rating Inspection Unit
              <RequiredItem />
            </Typography>
            <TextFieldWithLabel
              showLabel={true}
              name='inspectionUnit'
              onChange={(e) => {
                formik.setFieldValue('inspectionUnit', e.target.value)
              }}
              value={formik.values.inspectionUnit}
              placeholder='Inspection Unit'
              height='40px'
              error={!!formik.errors.inspectionUnit && !!formik.touched.inspectionUnit}
              helperText={formik.errors.inspectionUnit as string}
            />
          </Stack>
          <Stack sx={{ mt: 3, gap: 1 }}>
            <CheckboxItem
              label='Allow NA option'
              onClick={(val) => formik.setFieldValue('allowNAOption', val)}
              selected={formik.values.allowNAOption}
            />
          </Stack>
          <Divider light sx={{ mt: 2.5, mb: 2.25 }} />
          <AuditRatingScores
            template={ratingTemplate}
            selectedRatingStyle={formik.values.ratingStyle}
            handleChangeStyle={handleChangeStyle}
            ratingStart={formik.values.ratingStart}
            setRatingStart={(v) => formik.setFieldValue('ratingStart', v)}
            ratingEnd={formik.values.ratingEnd}
            setRatingEnd={(v) => formik.setFieldValue('ratingEnd', v)}
            ratingNumber={formik.values.ratingNumber}
            setRatingNumber={handleRatingNumberChange}
            ratingTextMapping={formik.values.ratingTextMapping}
            setRatingTextMapping={(v) => formik.setFieldValue('ratingTextMapping', v)}
          />
          <Stack sx={{ mt: 3, gap: 1 }}>
            <Box mb={1}>
              <Typography variant='h4' sx={{ fontWeight: 500, mb: 1.25 }}>
                Fail Rating Score
              </Typography>
              <Box maxWidth={'200px'}>
                <TextFieldWithLabel
                  showLabel={false}
                  placeholder='Fail Rating Score'
                  value={formik.values.failRating}
                  onChange={(e) => formik.setFieldValue('failRating', e.target.value)}
                  height='42px'
                  type='number'
                  name='failRating'
                />
              </Box>
            </Box>
            <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
              <CheckboxItem
                label='Allow to upload image'
                onClick={(val) => formik.setFieldValue('allowUploadImage', val)}
                selected={formik.values.allowUploadImage}
              />
              {formik.values.allowUploadImage && (
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <AntSwitch
                    checked={formik.values.allowUploadImageMandatory}
                    onChange={(e: any) =>
                      formik.setFieldValue('allowUploadImageMandatory', e.target.checked)
                    }
                  />
                  <Typography color={'text.secondary'}>Mandatory</Typography>
                </Stack>
              )}
            </Stack>
            <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
              <CheckboxItem
                label='Allow to write remarks'
                onClick={(val) => formik.setFieldValue('allowWriteRemark', val)}
                selected={formik.values.allowWriteRemark}
              />
              {formik.values.allowWriteRemark && (
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                  <AntSwitch
                    checked={formik.values.allowWriteRemarkMandatory}
                    onChange={(e: any) =>
                      formik.setFieldValue('allowWriteRemarkMandatory', e.target.checked)
                    }
                  />
                  <Typography color={'text.secondary'}>Mandatory</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Box mt={2} >
            <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex', mb: .75 }}>
              Remarks
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <TextareaWithLabel
                showLabel={false}
                name='remark'
                onChange={(e) => formik.setFieldValue('remark', e.target.value)}
                value={formik.values.remark}
                placeholder='Remarks'
                rows={3}
              />
            </Box>
          </Box>
          <Stack sx={{ mt: 2 }}>
            <AuditRatingElements
              elements={formik.values.elements}
              onChange={handleChangeElements}
            />
          </Stack>
        </Stack>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2.5, pb: 3.5 }}>
          <Button
            variant='text'
            sx={{ color: (theme) => theme.palette.grey[400] }}
            onClick={handleDiscard}
          >
            Cancel
          </Button>
          <LoadingButton
            variant='contained'
            color='primary'
            sx={{ ml: 3 }}
            onClick={() => formik.handleSubmit()}
            loading={isLoading}
          >
            {isEdit ? 'Save' : 'Add'}
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  )
}

export default AuditRatingTemplateCreateEdit
