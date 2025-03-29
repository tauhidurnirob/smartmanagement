import { FC } from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { To } from 'react-router-dom'
import { Box, Button, Divider, Paper, Typography, useTheme } from '@mui/material'

import ButtonBack from '../../common/ButtonBack'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import MultipleProjectSelect from '../../audit/audit-form-template/MultipleProjectSelect'
import { IAssignFormInfo } from '../../../pages/feedback/FeedbackFormTemplateCreate'
import FeedbackTypeSelect from './FeedbackTypeSelect'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import { ISelectItem } from '../../../types/common'
import LocationSelect from '../../location/LocationSelect'

interface IProps {
  values: IAssignFormInfo
  errors: FormikErrors<IAssignFormInfo>
  touched: FormikTouched<IAssignFormInfo>
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<IAssignFormInfo>> | Promise<void>
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<IAssignFormInfo>> | Promise<void>
  handleNext: () => void
  handleDiscard: () => void
  isEdit: boolean
}

const AssignInfoForm: FC<IProps> = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldTouched,
  setFieldValue,
  handleNext,
  handleDiscard,
  isEdit
}) => {
  const theme = useTheme()

  const handleChangeProject = (projects: ISelectItem[]) => {
    setFieldValue('project', projects)
    setFieldValue('location', [])
  }

  const handleChangeLocation = (locations: ISelectItem[]) => {
    setFieldValue('location', locations)
  }
  return (
    <Box maxWidth='1400px' m='0 auto'>
      <ButtonBack to={-1 as To} />
      <Paper elevation={0} sx={{ mt: 3 }}>
        <Box p='40px 30px 20px'>
          <Typography variant='h3'>{!isEdit && 'Add New'} Feedback Form Template</Typography>
        </Box>
        <Divider />
        <Box p='30px 30px 20px'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems={{ lg: 'center', xs: 'flex-start' }}
            sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
          >
            <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
              Feedback Form Template Name
              <RequiredItem />
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <TextFieldWithLabel
                showLabel={false}
                name='name'
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
                height='40px'
                error={!!errors.name && !!touched.name}
                helperText={errors.name}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems={{ lg: 'center', xs: 'flex-start' }}
            sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
            mt={2}
          >
            <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
              Feedback Type
              <RequiredItem />
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <FeedbackTypeSelect
                hiddenLabel={true}
                selected={values.feedbackType}
                onChange={(fType) => {
                  setFieldValue('feedbackType', fType)
                }}
                showErrorMessage
                error={!!errors.feedbackType && !!touched.feedbackType}
                errorMessage={errors.feedbackType as string}
                textColor={theme.palette.grey[800]}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems={{ lg: 'center', xs: 'flex-start' }}
            sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
            mt={2}
          >
            <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
              Project
              <RequiredItem />
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <ProjectSelect
                hiddenLabel={true}
                selected={values.project as ISelectItem[]}
                onChange={handleChangeProject}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!errors.project && !!touched.project}
                helperText={errors.project as string}
                textColor={theme.palette.grey[800]}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
            mt={2}
            alignItems={{ lg: 'center', xs: 'flex-start' }}
            sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
          >
            <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
              Location
              <RequiredItem />
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <LocationSelect
                hiddenLabel={true}
                selected={values.location as ISelectItem[]}
                onChange={handleChangeLocation}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!errors.location && !!touched.location}
                helperText={errors.location as string}
                projectIds={
                  values.project?.[0]?.value
                    ? [values.project?.[0]?.value as number]
                    : []
                }
                textColor={theme.palette.grey[800]}
              />
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2.5, pb: 3.5 }}>
          <Button
            variant='text'
            sx={{ color: (theme) => theme.palette.grey[400] }}
            onClick={handleDiscard}
          >
            Cancel
          </Button>
          <Button variant='contained' color='primary' sx={{ ml: 3 }} onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default AssignInfoForm
