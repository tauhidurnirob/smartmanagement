import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import DialogWrapper from '../common/DialogWrapper'
import { IAlert, IAlertRecipientItem } from '../../types/alert'
import AlertDetailDialogComment from './AlertDetailDialogComment'
import AlertDetailDialogSendReminder from './AlertDetailDialogSendReminder'
import { IAlertData, IReqRemind } from '../../api/models/alert'
import Api from '../../api'
import { useNavigate } from 'react-router-dom'

const REMINDER_STEPS = [{ value: 'remind' }, { value: 'send' }]

interface IFormikValues {
  comment: string
  recipients: IAlertRecipientItem[]
  ccRecipients: IAlertRecipientItem[]
}

const initValue: IFormikValues = {
  comment: '',
  recipients: [],
  ccRecipients: [],
}

interface IProps {
  alert: IAlertData | null
  locationName: string
  onClose: () => void
}

const AlertDetailDialog: FC<IProps> = (props) => {
  const { onClose, alert, locationName } = props
  const navigate = useNavigate()

  const open = !!alert

  const [step, setStep] = useState<string>(REMINDER_STEPS[0].value)

  const [remind, { isLoading }] = Api.useSendRemindMutation()

  const formik = useFormik<IFormikValues>({
    enableReinitialize: true,
    initialValues: {
      comment: '',
      recipients: [],
      ccRecipients: [],
    },
    validationSchema: Yup.object().shape({
      recipients: Yup.array(
        Yup.object().shape({
          user: Yup.array()
            .required('Recipient is required')
            .test('assign-to-recipient-user', 'Recipient are required', function (value) {
              return value && value.length !== 0
            }),
          response: Yup.object()
            .shape({
              value: Yup.string().required('Required'),
              unit: Yup.object().nullable().required('Required'),
            })
            .required('Reminder is required'),
        })
      )
        .required('Recipients are required')
        .test('assign-to-recipient', 'Recipients are required', function (value) {
          return value && value.length !== 0
        }),
      ccRecipients: Yup.array(
        Yup.object().shape({
          user: Yup.array()
            .required('CC Recipient is required')
            .test('assign-to-cc-recipient-user', 'CC Recipient are required', function (value) {
              return value && value.length !== 0
            }),
        })
      )
        .required('CC Recipients are required')
        .test('assign-to-cc-recipient', 'CC Recipients are required', function (value) {
          return value && value.length !== 0
        }),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)

        if (open && alert) {
          const data: IReqRemind = {
            alertId: alert.id,
            comment: values.comment,
            recipients: values.recipients.map(({ user, response }) => ({
              userId: user[0].value as number,
              responseTime: `${response.value} ${response.unit?.value}`,
            })),
            recipientCCIds: values.ccRecipients.map(({ user }) => user[0].value as number),
          }

          console.log({ data, alert })

          remind(data)
            .unwrap()
            .then(() => {
              toast.success('Sent a reminder')
              navigate('/alert')
            })
            .catch((err) => {
              console.log('Failed to send a reminder: ', err)
              toast.error('Failed to send a reminder')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in saving alert: ', err)
        toast.error('Failed to save alert')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleChangeComment = (comment: string) => {
    formik.setFieldValue('comment', comment)
  }

  const handleRemind = () => {
    setStep(REMINDER_STEPS[1].value)
  }

  const handleRemindBack = () => {
    setStep(REMINDER_STEPS[0].value)
  }

  const handleSendRemind = () => {
    setStep(REMINDER_STEPS[0].value)
    formik.setValues({ ...initValue })
    formik.handleSubmit()
    onClose()
  }

  useEffect(() => {
    if (alert) {
      formik.setFieldValue('comment', alert?.comments || '')
    } else {
      formik.setValues({ ...initValue })
    }
    setStep(REMINDER_STEPS[0].value)
  }, [alert])

  return (
    <DialogWrapper
      label={'Floor Plan'}
      onClose={onClose}
      open={open}
      maxWidth={'777px'}
      hiddenHeader={step === REMINDER_STEPS[1].value}
    >
      {step === REMINDER_STEPS[0].value && (
        <AlertDetailDialogComment
          locationName={locationName}
          alert={alert}
          comment={formik.values.comment}
          onChangeComment={handleChangeComment}
          onRemind={handleRemind}
        />
      )}
      {step === REMINDER_STEPS[1].value && (
        <AlertDetailDialogSendReminder
          formik={formik}
          onSendRemind={handleSendRemind}
          onBack={handleRemindBack}
        />
      )}
    </DialogWrapper>
  )
}

export default AlertDetailDialog
