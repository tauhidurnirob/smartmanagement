import { FC, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'

import { ISelectItem } from '../../types/common'
import ButtonBack from '../common/ButtonBack'
import IncidentTypeCreateLocationSetting from './IncidentTypeCreateLocationSetting'
import IncidentTypeCreateRecipientSetting from './IncidentTypeCreateRecipientSetting'
import { IIncidentCreateCCRecipientItem, IIncidentCreateRecipientItem } from '../../types/incident'
import { INCIDENT_TIME_INIT_VALUE, INCIDENT_TIME_UNIT_LIST } from '../../helpers/constants'
import {
  EIncidentTypeTimeUnit,
  IIncidentType,
  IReqIncidentTypeCreate,
  IReqIncidentTypeUpdate,
} from '../../api/models'
import Api from '../../api'

const STEPS = {
  location: 0,
  recipient: 1,
}

interface IFormikValues {
  name: string
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  recipients: IIncidentCreateRecipientItem[]
  ccRecipients: IIncidentCreateCCRecipientItem[]
}

interface IProps {
  incidentType?: IIncidentType
}

const IncidentTypeCreateEdit: FC<IProps> = ({ incidentType }) => {
  const isEdit = !!incidentType && incidentType.id

  const [createIncidentType, { isLoading: isCreating }] = Api.useCreateIncidentTypeMutation()
  const [updateIncidentType, { isLoading: isUpdating }] = Api.useUpdateIncidentTypeMutation()
  const navigate = useNavigate()

  const [step, setStep] = useState<number>(STEPS.location)

  const formik = useFormik<IFormikValues>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      project: [],
      location: [],
      building: [],
      level: [],
      area: [],
      unit: [],
      recipients: [],
      ccRecipients: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Incident Type Name is required'),
      project: Yup.array().min(1, 'Project is required').required('Project is required'),
      location: Yup.array().min(1, 'Location is required').required('Location is required'),
      builiding: Yup.array().nullable(),
      level: Yup.array().nullable(),
      area: Yup.array().nullable(),
      unit: Yup.array().nullable(),
      recipients: Yup.array(
        Yup.object().shape({
          user: Yup.array().required('Recipient is required').min(1, 'Recipient are required'),
          tat: Yup.object()
            .shape({
              value: Yup.string().required('Required'),
              unit: Yup.object().nullable().required('Required'),
            })
            .required('TAT is required'),
          reminder: Yup.object()
            .shape({
              value: Yup.string().required('Required'),
              unit: Yup.object().nullable().required('Required'),
            })
            .required('Reminder is required'),
        })
      ).min(1, 'Recipients are required'),
      ccRecipients: Yup.array(
        Yup.object().shape({
          user: Yup.array()
            .required('CC Recipient is required')
            .min(1, 'CC Recipient are required'),
        })
      ).min(1, 'CC Recipients are required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const project = values.project[0]
        const location = values.location[0]
        const building = values.building[0]
        const level = values.level[0]
        const area = values.area[0]
        const unit = values.unit[0]

        if (!project || !location) return

        const name = values.name
        const projectId = project.value as number
        const locationId = location.value as number
        const buildingId = building ? (building.value as number) : null
        const levelId = level ? (level.value as number) : null
        const areaId = area ? (area.value as number) : null
        const unitId = unit ? (unit.value as number) : null
        const recipients = values.recipients.map((rec) => {
          return {
            recipientId: rec.user[0].value as number,
            tatTime: parseFloat(rec.tat.value),
            tatUnit: rec.tat.unit.value as EIncidentTypeTimeUnit,
            reminderTime: parseFloat(rec.reminder.value),
            reminderUnit: rec.reminder.unit.value as EIncidentTypeTimeUnit,
          }
        })
        const ccRecipients = values.ccRecipients.map((rec) => {
          return {
            ccRecipientId: rec.user[0].value as number,
          }
        })

        setSubmitting(true)
        if (isEdit) {
          const updatedIncidentType: IReqIncidentTypeUpdate = {
            id: incidentType.id,
            name,
            projectId,
            locationId,
            ...(buildingId ? { buildingId } : {}),
            ...(levelId ? { levelId } : {}),
            ...(areaId ? { areaId } : {}),
            ...(unitId ? { unitId } : {}),
            recipients,
            ccRecipients,
          }
          updateIncidentType(updatedIncidentType)
            .unwrap()
            .then(() => {
              toast.success('Update incident type')
            })
            .catch((err) => {
              console.log('Failed to update incident type: ', err)
              toast.error('Failed to update incident type')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          const newIncidentType: IReqIncidentTypeCreate = {
            name,
            projectId,
            locationId,
            ...(buildingId ? { buildingId } : {}),
            ...(levelId ? { levelId } : {}),
            ...(areaId ? { areaId } : {}),
            ...(unitId ? { unitId } : {}),
            recipients,
            ccRecipients,
          }
          createIncidentType(newIncidentType)
            .unwrap()
            .then(() => {
              toast.success('Created a new incident type')
              navigate('/incident/incident-type')
            })
            .catch((err) => {
              console.log('Failed to create a new incident type: ', err)
              toast.error('Failed to create a new incident type')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in saving incident type: ', err)
        toast.error('Failed to save incident type')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleAddIncidentType = () => {
    formik.handleSubmit()
  }

  const handleRecipientStep = () => {
    setStep(STEPS.recipient)
  }

  const handleLocationStep = () => {
    setStep(STEPS.location)
  }

  useEffect(() => {
    // Initialize values from incident
    if (incidentType && incidentType.id) {
      const initValue: IFormikValues = {
        name: '',
        project: [],
        location: [],
        building: [],
        level: [],
        area: [],
        unit: [],
        recipients: [],
        ccRecipients: [],
      }
      const project = incidentType.project
      const location = incidentType.location
      const building = incidentType.building
      const level = incidentType.level
      const area = incidentType.area
      const unit = incidentType.unit
      initValue.name = incidentType.name || ''
      initValue.project = project ? [{ label: project.name, value: project.id }] : []
      initValue.location = location ? [{ label: location.name, value: location.id }] : []
      initValue.building = building ? [{ label: building.name, value: building.id }] : []
      initValue.level = level ? [{ label: level.name, value: level.id }] : []
      initValue.area = area ? [{ label: area.name, value: area.id }] : []
      initValue.unit = unit ? [{ label: unit.name, value: unit.id }] : []
      const newRecipients: IIncidentCreateRecipientItem[] = []
      for (const recipient of incidentType.recipients || []) {
        const newRecipient: IIncidentCreateRecipientItem = {
          user: [],
          tat: INCIDENT_TIME_INIT_VALUE,
          reminder: INCIDENT_TIME_INIT_VALUE,
        }
        const user = recipient.recipient
        const tatTime = recipient.tatTime
        const tatUnit = recipient.tatUnit
        const reminderTime = recipient.reminderTime
        const reminderUnit = recipient.reminderUnit
        const tatUnitInfo = INCIDENT_TIME_UNIT_LIST.find((e) => e.value === tatUnit)
        const reminderUnitInfo = INCIDENT_TIME_UNIT_LIST.find((e) => e.value === reminderUnit)
        newRecipient.user = user ? [{ label: user.fullName, value: user.id }] : []
        newRecipient.tat =
          tatTime && tatUnit && tatUnitInfo
            ? { value: tatTime.toString(), unit: tatUnitInfo }
            : INCIDENT_TIME_INIT_VALUE
        newRecipient.reminder =
          reminderTime && reminderUnit && reminderUnitInfo
            ? { value: reminderTime.toString(), unit: reminderUnitInfo }
            : INCIDENT_TIME_INIT_VALUE
        newRecipients.push(newRecipient)
      }
      const newCCRecipients: IIncidentCreateCCRecipientItem[] = []
      for (const ccRecipient of incidentType.ccRecipients || []) {
        const newCCRecipient: IIncidentCreateCCRecipientItem = {
          user: [],
        }
        const user = ccRecipient.ccRecipient
        newCCRecipient.user = user ? [{ label: user.fullName, value: user.id }] : []
        newCCRecipients.push(newCCRecipient)
      }
      initValue.recipients = newRecipients
      initValue.ccRecipients = newCCRecipients
      formik.setValues(initValue)
    }
  }, [incidentType])

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Box sx={{ mt: 3 }}>
        {step === STEPS.location && (
          <IncidentTypeCreateLocationSetting
            formik={formik}
            onNext={handleRecipientStep}
            isEdit={!!incidentType}
          />
        )}
        {step === STEPS.recipient && (
          <IncidentTypeCreateRecipientSetting
            formik={formik}
            onBack={handleLocationStep}
            onCreate={handleAddIncidentType}
            isEdit={!!incidentType}
            isLoading={isCreating || isUpdating}
          />
        )}
      </Box>
    </Box>
  )
}

export default IncidentTypeCreateEdit
