import { FC } from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { To } from 'react-router-dom'
import { Box, Button, Divider, Paper, Typography, useTheme } from '@mui/material'

import ButtonBack from '../../common/ButtonBack'
import { RequiredItem } from '../audit-schedule/AuditScheduleDetail'
import MultipleProjectSelect from './MultipleProjectSelect'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { IAssignFormInfo } from '../../../pages/audit/AuditFormTemplateCreate'
import FormTypeSelect from './FormTypeSelect'

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
  return (
    <Box maxWidth='1400px' m='0 auto'>
      <ButtonBack to={-1 as To} />
      <Paper elevation={0} sx={{ mt: 3 }}>
        <Box p='40px 30px 20px'>
          <Typography variant='h3'>{!isEdit && 'Add New'} Audit Form Template</Typography>
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
              Name
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
              Form Type
              <RequiredItem />
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <FormTypeSelect
                hiddenLabel={true}
                selected={values.formType ? [values.formType] : []}
                onChange={(fType) => {
                  setFieldValue('formType', fType[0])
                }}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!errors.formType && !!touched.formType}
                helperText={errors.formType as string}
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
              Assign to Project
              <RequiredItem />
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <MultipleProjectSelect
                hiddenLabel={true}
                selected={values.projects}
                onChange={(projects) => {
                  setFieldValue('projects', projects)
                }}
                allowAllSelect={false}
                showErrorMessage={true}
                error={!!errors.projects && !!touched.projects}
                errorMessage={errors.projects as string}
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
              Remarks
            </Typography>
            <Box width='100%' maxWidth={{ lg: '660px', xs: '100%' }}>
              <TextareaWithLabel
                showLabel={false}
                name='remark'
                onChange={handleChange}
                value={values.remark}
                placeholder='Remarks'
                rows={3}
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
