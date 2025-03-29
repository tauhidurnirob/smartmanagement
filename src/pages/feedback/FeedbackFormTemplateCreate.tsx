import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'

import { FEEDBACK_FORM_CREATE_STEP } from '../../types/audit'
import { ISelectItem } from '../../types/common'
import BackDrop from '../../modules/common/BackDrop'
import AssignInfoForm from '../../modules/feedback/form-template/AssignInfoForm'
import { IFeedbackFormTemplate } from '../../types/feedback'
import AssignRecipientForm from '../../modules/feedback/form-template/AssignRecipientForm'
import { TIME_UNIT } from '../../helpers/constants'
import { treeToFlatJSON } from '../../helpers/customFunctions'
import FormBuilder, { IFieldState } from '../../modules/audit/audit-form-template/form-builder/FormBuilder'
import DialogWrapper from '../../modules/common/DialogWrapper'

const getInitialValue = (data: IFeedbackFormTemplate | undefined) => {
  return {
    name: data?.name || '',
    feedbackType: null,
    project: ([] as ISelectItem[]),
    location: ([] as ISelectItem[]),
  }
}

export interface IAssignFormInfo {
  name: string
  feedbackType: ISelectItem | null
  project: ISelectItem[]
  location: ISelectItem[]
}

export interface IAssignRecipientInfo {
  recipient: IRecipientItem[]
  ccRecipient: ICcRecipientItem[]
}
export interface IRecipientItem {
  user: ISelectItem[]
  tatTime: number
  tatUnit: ISelectItem
  reminderTime: number
  reminderUnit: ISelectItem
}
export interface ICcRecipientItem {
  user: ISelectItem[]
}

const initValue: IRecipientItem[] = [
  {user: [], tatTime: 10, tatUnit: TIME_UNIT[1], reminderTime: 10, reminderUnit: TIME_UNIT[1]}
]
const initCCValue: ICcRecipientItem[] = [
  {user: []}
]

const CreateAuditFormTemplate = () => {
  const { id } = useParams()
  const isEdit = !!id

  const [step, setStep] = useState(FEEDBACK_FORM_CREATE_STEP.assignInfo)

  const navigate = useNavigate()
  const content = treeToFlatJSON([])

  const [data, setData] = useState<IFieldState>({
    items: [],
  })
  const [formTitle, setFormTitle] = useState('Form Title')
  const [formSubTitle, setFormSubTitle] = useState('')
  const [logo, setLogo] = useState<any>('')
  const [previewOn, setPreviewOn] = useState(false)

  const formik = useFormik<IAssignFormInfo>({
    initialValues: getInitialValue(undefined),
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Feedback Form Template Name is required'),
      feedbackType: Yup.object().required('Feedback Type is required'),
      project: Yup.array().length(1, 'Project is required').required('Project is required'),
      location: Yup.array().length(1, 'Location is required').required('Location is required')
    }),
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)
    },
  })
  const formikRecipient = useFormik<IAssignRecipientInfo>({
    initialValues: { recipient: initValue, ccRecipient: initCCValue },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      recipient: Yup.array(
        Yup.object().shape({
          user: Yup.array().length(1, 'Recipient is required').required('Recipient is required'),
          tatTime: Yup.number().required('TAT is required'),
          tatUnit: Yup.object().required('TAT unit is required'),
          reminderTime: Yup.number().required('Reminder is required'),
          reminderUnit: Yup.object().required('Reminder unit is required'),
        })
      ),
      ccRecipient: Yup.array(
        Yup.object().shape({
          user: Yup.array().length(1, 'Recipient is required').required('Recipient is required')
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)
    }
  })
  console.log(formikRecipient)
  return (
    <Box position={'relative'}>
      {false && (
        <Box height={300}>
          <BackDrop />
        </Box>
      )}
      {true && (
        <Box>
          {step === FEEDBACK_FORM_CREATE_STEP.assignInfo && (
            <AssignInfoForm
              {...formik}
              handleDiscard={() => {
                formik.resetForm()
                navigate('/feedback/form-template')
              }}
              handleNext={() => {
                formik.handleSubmit()
                setStep(FEEDBACK_FORM_CREATE_STEP.assignRecipient)
              }}
              isEdit={isEdit}
            />
          )}
          {step === FEEDBACK_FORM_CREATE_STEP.assignRecipient && (
            <AssignRecipientForm
              formik= {formikRecipient}
              isEdit={isEdit}
              onBack={() => setStep(FEEDBACK_FORM_CREATE_STEP.assignInfo)}
              onNext={() => {
                formikRecipient.handleSubmit()
                setStep(FEEDBACK_FORM_CREATE_STEP.buidForm)
              }}
            />
          )}
          {step === FEEDBACK_FORM_CREATE_STEP.buidForm && (
            <FormBuilder
              data={data}
              setData={setData}
              formTitle={formTitle as string}
              setFormTitle={setFormTitle}
              formSubTitle={formSubTitle as string}
              setFormSubTitle={setFormSubTitle}
              logo={logo}
              setLogo={setLogo}
              handlePreview={() => setPreviewOn(true)}
              handleCreate={() => formikRecipient.handleSubmit()}
              isCreating={false}
              isEdit={isEdit}
              handleBack={() => setStep(FEEDBACK_FORM_CREATE_STEP.assignInfo)}
            />
          )}
        </Box>
      )}
      <DialogWrapper
        open={previewOn}
        label='Preview Form'
        maxWidth={'lg'}
        onClose={() => setPreviewOn(false)}
      >
        <Box p={5}>
          <Typography>Preview not available!</Typography>
        </Box>
      </DialogWrapper>
    </Box>
  )
}

export default CreateAuditFormTemplate
