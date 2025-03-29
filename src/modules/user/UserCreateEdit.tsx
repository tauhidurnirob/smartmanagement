import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Card, Divider, Grid, Typography, useTheme, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { ISelectItem } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import ButtonBack from '../common/ButtonBack'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import { DATE_FORMAT_WITHOUT_ATSIGN } from '../../constants/common'
import deepCopy from '../../helpers/deepCopy'
import { IReqUserSettingCreate, IUser, IUserWorkHour, IUserWorkHourList } from '../../api/models'
import { ImageDropzoneWithView } from '../common/ImageDropzoneWithView'
import RoleSelect from './RoleSelect'
import Api from '../../api'
import isDataImage from '../../helpers/isDataImage'
import WorkTimeSelector from './WorkTimeSelector'
import GenderSelect from './GenderSelect'
import {
  ITrainingElementsTouched,
  IUserCreate,
  IUserTraining,
  TWorkPass,
  UserGender,
} from '../../types/user'
import CitizenshipSelect from './CitizenshipSelect'
import { getCountryLabel } from '../../helpers/getCountryLabel'
import WorkpassSelect from './WorkpassSelect'
import TrainingRecord from './TrainingRecord'
import UserOtj from './UserOtj'

const initWorkhours: IUserWorkHourList = {
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
  publicHoliday: null,
}

const initFormikValue: IUserCreate = {
  avatarUrl: '',
  name: '',
  phoneNumber: '',
  email: '',
  password: '',
  role: [],
  projects: [],
  locations: [],
  staffTraining: [],
  workingHours: initWorkhours,
  gender: null,
  age: null,
  citizenship: [],
  vehicleNumber: ''
}

interface IProps {
  user?: IUser
  onCloseEdit?: () => void
}

const DATENAMES: { label: string; key: keyof IUserWorkHourList }[] = [
  { label: 'Monday', key: 'monday' },
  { label: 'Tuesday', key: 'tuesday' },
  { label: 'Wednesday', key: 'wednesday' },
  { label: 'Thursday', key: 'thursday' },
  { label: 'Friday', key: 'friday' },
  { label: 'Saturday', key: 'saturday' },
  { label: 'Sunday', key: 'sunday' },
]

const WorkingHours = ({
  hours,
  onChange,
}: {
  hours: IUserWorkHourList
  onChange: (hours: IUserWorkHourList) => void
}) => {
  const handleChangeHour = (hour: IUserWorkHour, key: keyof IUserWorkHourList) => {
    const newHours: IUserWorkHourList = { ...hours }
    newHours[key] = hour
    onChange({ ...newHours })
  }
  return (
    <Box sx={{}}>
      <Typography
        variant='subtitle1'
        sx={{ fontSize: 18, mb: 3, display: 'inline-flex', color: 'grey.800' }}
      >
        Working Hours
      </Typography>
      <Grid container rowSpacing={2} columnSpacing={2.5}>
        {DATENAMES.map((item, idx) => {
          const { label, key } = item
          return (
            <Grid key={`working-hour-item-${idx}`} item lg={4} xs={12}>
              <Typography
                variant='subtitle1'
                sx={{ fontSize: 15, mb: 0.5, display: 'inline-flex', color: 'grey.800' }}
              >
                {label}
              </Typography>
              <WorkTimeSelector hour={hours[key]} onChange={(val) => handleChangeHour(val, key)} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

const UserCreateEdit: FC<IProps> = ({ user, onCloseEdit }) => {
  const isEdit = !!user && user.id

  const theme = useTheme()
  const navigate = useNavigate()

  const [initValue, setInitValue] = useState<IUserCreate>(initFormikValue)
  const [imgAvatar, setImgAvatar] = useState<File | null>(null)

  const [createUser, { isLoading: isCreating }] = Api.useCreateUserMutation()
  const [updateUserById, { isLoading: isUpdating }] = Api.useUpdateUserByIdMutation()
  const [uploadAvatar, { isLoading: isUpdatingAvatar }] = Api.useUploadFileMutation()

  const formik = useFormik<IUserCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required.'),
      age: Yup.string().required('Age is required.'),
      role: Yup.array().required('Role is required').length(1, 'Role is required'),
      gender: Yup.string().required('Gender is required'),
      citizenship: Yup.array()
        .required('Citizenship is required')
        .length(1, 'Citizenship is required'),
      phoneNumber: Yup.string().required('Contact Number is required'),
      email: Yup.string().required('Email is required'),
      password: isEdit ? Yup.string() : Yup.string().required('Password is required'),
      projects: Yup.array().min(1, 'Project is required').required('Project is required'),
      locations: Yup.array(),
      staffTraining: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          code: Yup.string().required('Code is required'),
          refNo: Yup.string().required('Ref No is required'),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
      try {
        setSubmitting(true)

        // Save a user avatar
        let urlAvatar = ''
        if (isDataImage(values.avatarUrl) && imgAvatar !== null) {
          urlAvatar = await uploadAvatar(imgAvatar)
            .unwrap()
            .then((res) => res.fileUrl)
            .catch((err) => {
              console.error('Failed to upload a user profile: ', err)
              toast.error('Failed to upload a user profile')
              return ''
            })
        } else {
          urlAvatar = values.avatarUrl
        }

        if (urlAvatar) {
          setFieldValue('avatarUrl', urlAvatar)
        }

        // Create a new user
        const locationIds = values.locations.map((loc) => {
          return loc.value as number
        })
        const projectIds = values.projects.map((proj) => {
          return proj.value as number
        })
        const newUser: IReqUserSettingCreate = {
          phoneNumber: values.phoneNumber,
          email: values.email,
          gender: values.gender,
          fullName: values.name,
          roleId: values.role[0].value as number,
          locationIds: locationIds,
          projectIds: projectIds,
          workingHours: values.workingHours,
          age: values.age!,
          citizenship: values.citizenship[0].value as string,
          ...(values.workPassType && { workPassType: values.workPassType }),
          ...(values.vehicleNumber && { vehicleNumber: values.vehicleNumber }),
          ...(urlAvatar.length && { avatarUri: urlAvatar }),
          ...(values.password.length && { password: values.password }),
          ...(values.staffTraining.length && { staffTraining: values.staffTraining }),
        }

        if (isEdit) {
          updateUserById({ id: user?.id, data: newUser })
            .unwrap()
            .then(() => {
              toast.success('Update the user')
            })
            .catch((err) => {
              console.error('Failed to update the user: ', err)
              toast.error(err.data.message || 'Failed to update the user')
            })
            .finally(() => {
              setSubmitting(false)
              if (onCloseEdit) onCloseEdit()
            })
        } else {
          createUser(newUser)
            .unwrap()
            .then(() => {
              toast.success('Added a new user')
              navigate('/settings/users')
            })
            .catch((err) => {
              console.error('Failed to create a new user: ', err)
              toast.error(err.data.message || 'Failed to create a new user')
            })
            .finally(() => {
              setSubmitting(false)
              if (onCloseEdit) onCloseEdit()
            })
        }
      } catch (err: any) {
        toast.error('Failed to save user')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const { strCreatedAt, strUpdatedAt } = useMemo(() => {
    const createdAt = user?.createdAt
    const updateAt = user?.updatedAt
    const strCreatedAt = createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_ATSIGN) : '-'
    const strUpdatedAt = updateAt ? dayjs(updateAt).format(DATE_FORMAT_WITHOUT_ATSIGN) : '-'

    return {
      strCreatedAt,
      strUpdatedAt,
    }
  }, [user])

  const projectIds = useMemo(() => {
    return formik.values.projects.map((p) => p.value as number)
  }, [formik.values.projects])

  const isChanged = useMemo(() => {
    const values = formik.values

    if (values.avatarUrl !== initValue.avatarUrl) return true
    if (values.name !== initValue.name) return true
    if (values.email !== initValue.email) return true
    if (values.phoneNumber !== initValue.phoneNumber) return true
    if (values.gender !== initValue.gender) return true
    if (values.age !== initValue.age) return true
    if (values.citizenship !== initValue.citizenship) return true
    if (values.workPassType !== initValue.workPassType) return true
    if (values.vehicleNumber !== initValue.vehicleNumber) return true
    if (values.password) return true

    if (values.role[0]?.value !== initValue.role[0]?.value) return true

    if (
      Object.keys(values.workingHours).findIndex((key) => {
        const curVal = values.workingHours[key as keyof IUserWorkHourList]
        const initVal = initValue.workingHours[key as keyof IUserWorkHourList]
        return curVal?.start !== initVal?.start || curVal?.end !== initVal?.end
      }) !== -1
    )
      return true

    const projectNames = values.projects.map((p) => p.label).join('')
    const initProjectNames = initValue.projects.map((p) => p.label).join('')
    if (projectNames !== initProjectNames) return true

    const locationNames = values.locations.map((p) => p.label).join('')
    const initLocationNames = initValue.locations.map((p) => p.label).join('')
    if (locationNames !== initLocationNames) return true
  }, [initValue, formik.values])

  const handleChangeRole = (item: ISelectItem[]) => {
    formik.setFieldValue('role', item)
  }

  const handleChangeCitizenship = (item: ISelectItem[]) => {
    formik.setFieldValue('citizenship', item)
  }

  const handleChangeGender = (item: UserGender) => {
    formik.setFieldValue('gender', item)
  }

  const handleChangeWorkPass = (item: TWorkPass) => {
    formik.setFieldValue('workPassType', item)
  }

  const handleChangeName = (name: string) => {
    formik.setFieldValue('name', name)
  }

  const handleChangeVehicleNumber = (vnum: string) => {
    formik.setFieldValue('vehicleNumber', vnum)
  }

  const handleChangeAge = (age: number) => {
    formik.setFieldValue('age', age)
  }

  const handleChangePhoneNumber = (phoneNumber: string) => {
    formik.setFieldValue('phoneNumber', phoneNumber)
  }

  const handleChangeEmail = (email: string) => {
    formik.setFieldValue('email', email)
  }

  const handleChangeProject = (projects: ISelectItem[]) => {
    formik.setFieldValue('projects', projects)
  }

  const handleChangeLocation = (locations: ISelectItem[]) => {
    formik.setFieldValue('locations', locations)
  }

  const handleChangeWorkingHours = (hours: IUserWorkHourList) => {
    formik.setFieldValue('workingHours', hours)
  }

  const handleChangePassword = (password: string) => {
    formik.setFieldValue('password', password)
  }

  const handleDiscard = () => {
    formik.setValues({ ...initFormikValue })
  }

  const handleAddUser = () => {
    formik.handleSubmit()
  }

  const handleChangeAvatar = (files: File[]) => {
    const file = files[0]

    if (file) {
      setImgAvatar(file)
      const reader = new FileReader()
      reader.onload = () => {
        formik.setFieldValue('avatarUrl', (reader.result as string) || '')
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (user && user.id) {
      const initValue: IUserCreate = { ...initFormikValue }

      const role = user.role
      const locations = (user.locations || []).map((loc) => ({ label: loc.name, value: loc.id }))
      const projects = (user.projects || []).map((proj) => ({ label: proj.name, value: proj.id }))

      initValue.name = user.fullName || ''
      initValue.email = user.email || ''
      initValue.age = user.age
      initValue.gender = user.gender
      initValue.staffTraining = user.staffTraining || []
      initValue.citizenship = user.citizenship
        ? [
            {
              label: getCountryLabel(user.citizenship) || '',
              value: user.citizenship,
            },
          ]
        : []
      initValue.workPassType = user.workPassType
      initValue.vehicleNumber = user.vehicleNumber
      initValue.phoneNumber = user.phoneNumber || ''
      initValue.workingHours = user.workingHours || initWorkhours
      initValue.role = role ? [{ label: role.name || '', value: role.id }] : []
      initValue.projects = projects
      initValue.locations = locations
      formik.setValues({ ...initValue })
      setInitValue(deepCopy(initValue))
    }
  }, [user])

  return (
    <Box>
      {!isEdit && <ButtonBack to={-1 as To} />}
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: isEdit ? 3 : 5 }}>
        <Box sx={isEdit ? { px: 3.75, pt: 3.75, py: 2 } : { pt: 4.5, pb: 2.5, px: 3.75 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h3' sx={{ color: 'grey.800' }}>
              {isEdit ? 'Basic Info' : 'Add New Staff'}
            </Typography>
          </Box>
        </Box>
        <Divider light />
        <Box sx={{ px: 3.75, pt: 3.5, pb: 5 }}>
          <Grid container direction={'column'} spacing={2.5}>
            {!isEdit && (
              <Grid item container spacing={2} sx={{ mb: 5.5 }}>
                <Grid item lg={4} xs={12}>
                  <Typography
                    typography={'h4'}
                    sx={{
                      fontWeight: 500,
                      fontSize: 15,
                      mt: 1.25,
                      display: 'inline-flex',
                      color: 'grey.800',
                    }}
                  >
                    Profile Picture
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <ImageDropzoneWithView
                    maxFiles={1}
                    onDrop={handleChangeAvatar}
                    image={formik.values.avatarUrl}
                    sx={{
                      width: '117px',
                      height: '121px',
                      boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)',
                    }}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'name'}
                  placeholder={'Name'}
                  showLabel={false}
                  value={formik.values.name}
                  onChange={(e) => handleChangeName(e.target.value)}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name as string}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Age
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'age'}
                  placeholder={'Age'}
                  showLabel={false}
                  value={formik.values.age}
                  onChange={(e) => handleChangeAge(Number(e.target.value))}
                  error={!!formik.errors.age}
                  helperText={formik.errors.age as string}
                  type='number'
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Gender
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <GenderSelect
                  hiddenLabel={true}
                  selected={formik.values.gender}
                  onChange={handleChangeGender}
                  error={!!formik.errors.gender}
                  helperText={formik.errors.gender as string}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Citizenship
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <CitizenshipSelect
                  hiddenLabel={true}
                  selected={formik.values.citizenship}
                  onChange={handleChangeCitizenship}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.citizenship}
                  helperText={formik.errors.citizenship as string}
                  textColor={theme.palette.grey[800]}
                  placeholder={'Select Citizenship'}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Work Pass Type
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <WorkpassSelect
                  hiddenLabel={true}
                  selected={formik.values.workPassType}
                  onChange={handleChangeWorkPass}
                  error={!!formik.errors.workPassType}
                  helperText={formik.errors.workPassType as string}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Vehicle Number
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={'Vehicle Number'}
                  name={'vehichleNumber'}
                  placeholder={'Vehicle Number'}
                  showLabel={false}
                  value={formik.values.vehicleNumber}
                  onChange={(e) => handleChangeVehicleNumber(e.target.value)}
                  error={!!formik.errors.vehicleNumber}
                  helperText={formik.errors.vehicleNumber as string}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Role
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <RoleSelect
                  hiddenLabel={true}
                  selected={formik.values.role as ISelectItem[]}
                  onChange={handleChangeRole}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.role}
                  helperText={formik.errors.role as string}
                  textColor={theme.palette.grey[800]}
                  placeholder={'Select Role'}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Contact Number
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'phoneNumber'}
                  placeholder={'Contact Number'}
                  showLabel={false}
                  value={formik.values.phoneNumber}
                  onChange={(e) => handleChangePhoneNumber(e.target.value)}
                  error={!!formik.errors.phoneNumber}
                  helperText={formik.errors.phoneNumber as string}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Email
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'email'}
                  placeholder={'Email'}
                  showLabel={false}
                  value={formik.values.email}
                  onChange={(e) => handleChangeEmail(e.target.value)}
                  error={!!formik.errors.email}
                  helperText={formik.errors.email as string}
                  type='email'
                />
              </Grid>
            </Grid>
          </Grid>
          {isEdit && (
            <Box sx={{ pt: 8 }}>
              <WorkingHours
                hours={formik.values.workingHours}
                onChange={handleChangeWorkingHours}
              />
            </Box>
          )}
        </Box>
        <Divider light />
        <TrainingRecord formik={formik} />
        <Divider light />
        {user?.staffOtj && <UserOtj otjs={user.staffOtj} />}
        {user?.staffOtj && <Divider light />}
        <Box sx={{ px: 3.75, pt: 2.75, pb: 3 }}>
          <Grid container direction={'column'} spacing={2.5}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex', color: 'grey.800' }}
                >
                  Project
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <ProjectSelect
                  hiddenLabel={true}
                  selected={formik.values.projects as ISelectItem[]}
                  onChange={handleChangeProject}
                  disableAllSelect={true}
                  error={!!formik.errors.projects}
                  helperText={formik.errors.projects as string}
                  textColor={theme.palette.grey[800]}
                  allowRemoval={true}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex', color: 'grey.800' }}
                >
                  Location
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <LocationSelect
                  hiddenLabel={true}
                  selected={formik.values.locations as ISelectItem[]}
                  onChange={handleChangeLocation}
                  disableAllSelect={true}
                  error={!!formik.errors.locations}
                  helperText={formik.errors.locations as string}
                  projectIds={projectIds}
                  textColor={theme.palette.grey[800]}
                  allowRemoval={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {!isEdit && (
          <>
            <Divider light />
            <Box sx={{ px: 3.75, pt: 3.25, pb: 3.75 }}>
              <WorkingHours
                hours={formik.values.workingHours}
                onChange={handleChangeWorkingHours}
              />
            </Box>
          </>
        )}
        <Divider light />
        <Box sx={{ px: 3.75, pt: 2.75, pb: isEdit ? 4.75 : 2.75 }}>
          <Grid container direction={'column'} spacing={4.75}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{
                    fontSize: 15,
                    fontWeight: 500,
                    mt: 1.25,
                    display: 'inline-flex',
                    color: 'grey.800',
                  }}
                >
                  Password
                  {!isEdit && <RequiredItem />}
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'password'}
                  placeholder={'Password'}
                  showLabel={false}
                  value={formik.values.password}
                  onChange={(e) => handleChangePassword(e.target.value)}
                  error={!!formik.errors.password}
                  helperText={formik.errors.password as string}
                  type='password'
                />
              </Grid>
            </Grid>
            {isEdit && (
              <Grid item container spacing={2}>
                <Grid item lg={4} xs={12}>
                  <Typography
                    typography={'h4'}
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      display: 'inline-flex',
                      color: 'grey.800',
                    }}
                  >
                    Created On
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <Typography typography={'h5'} sx={{ fontWeight: 400, color: 'grey.800' }}>
                    {strCreatedAt}
                  </Typography>
                </Grid>
              </Grid>
            )}
            {isEdit && (
              <Grid item container spacing={2}>
                <Grid item lg={4} xs={12}>
                  <Typography
                    typography={'h4'}
                    sx={{
                      fontSize: 15,
                      fontWeight: 500,
                      display: 'inline-flex',
                      color: 'grey.800',
                    }}
                  >
                    Updated On
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <Typography typography={'h5'} sx={{ fontWeight: 400, color: 'grey.800' }}>
                    {strUpdatedAt}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider light />
        <Box
          sx={{
            px: 3.75,
            pt: 4,
            pb: 3.25,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 3,
          }}
        >
          <Button
            variant='text'
            color='inherit'
            onClick={handleDiscard}
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant='contained'
            color='primary'
            loading={formik.isSubmitting || isCreating || isUpdating || isUpdatingAvatar}
            disabled={!formik.isValid || !isChanged}
            onClick={() => handleAddUser()}
          >
            {isEdit ? 'Save Changes' : 'Add Staff'}
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  )
}

export default UserCreateEdit
