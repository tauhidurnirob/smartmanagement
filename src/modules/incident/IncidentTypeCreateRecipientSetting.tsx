import { FC } from 'react'
import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  useTheme,
  Button,
  Stack,
  IconButton,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { ISelectItem } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import { Plus } from '../../assets/icons/plus'
import { INCIDENT_TIME_UNIT_LIST } from '../../helpers/constants'
import SimpleSelect from '../common/SimpleSelect'
import UserSelect from '../user/UserSelect'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import { IIncidentCreateRecipientItem, IIncidentCreateTime } from '../../types/incident'
import { LoadingButton } from '@mui/lab'

const RecipientItem = ({
  idx,
  recipient,
  errors,
  onChangeUser,
  onChangeTAT,
  onChangeReminder,
  onRemove,
  isCC,
}: {
  idx: number
  errors: any
  recipient: IIncidentCreateRecipientItem
  onChangeUser: (user: ISelectItem[]) => void
  onChangeTAT: (resTat: IIncidentCreateTime) => void
  onChangeReminder: (resTat: IIncidentCreateTime) => void
  onRemove: () => void
  isCC: boolean
}) => {
  const theme = useTheme()
  const tat = recipient.tat
  const reminder = recipient.reminder

  const handleChangeTATValue = (val: string) => {
    const newTat = { ...tat }
    newTat.value = val
    onChangeTAT(newTat)
  }
  const handleChangeTATUnit = (val: ISelectItem) => {
    const newTat = { ...tat }
    newTat.unit = val
    onChangeTAT(newTat)
  }
  const handleChangeReminderValue = (val: string) => {
    const newReminder = { ...reminder }
    newReminder.value = val
    onChangeReminder(newReminder)
  }
  const handleChangeReminderUnit = (val: ISelectItem) => {
    const newReminder = { ...reminder }
    newReminder.unit = val
    onChangeReminder(newReminder)
  }

  return (
    <Stack flexDirection={'row'} alignItems={'flex-start'} gap={1}>
      <Stack flexGrow={1}>
        <Grid container rowSpacing={2} columnSpacing={{ lg: 5, xs: 1 }} alignItems={'flex-start'}>
          <Grid item lg={isCC ? 12 : 6} xs={12}>
            <Typography typography={'h5'} sx={{ mb: 0.75 }}>
              {isCC ? 'CC' : ''} Recipient {idx + 1}
            </Typography>
            <UserSelect
              hiddenLabel={true}
              allowAllSelect={false}
              selected={recipient.user as ISelectItem[]}
              onChange={(t) => onChangeUser(t)}
              textColor={theme.palette.grey[800]}
              showErrorMessage={true}
              error={!!errors?.user}
              errorMessage={errors?.user ? (errors?.user as string) : ''}
              isSingleSelect={true}
              allowRemoval={false}
              labelForAll='Select Recipient'
            />
          </Grid>
          {!isCC && (
            <Grid item lg={3} xs={12}>
              <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                TAT (turnaround time)
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item lg={5} xs={12}>
                  <TextFieldWithLabel
                    showLabel={false}
                    type='number'
                    name='value'
                    placeholder=''
                    value={tat.value}
                    onChange={(e) => handleChangeTATValue(e.target.value)}
                    height='43px'
                    error={!!errors?.tat?.value}
                    helperText={errors?.tat?.value || ''}
                  />
                </Grid>
                <Grid item lg={7} xs={12}>
                  <SimpleSelect
                    width={'100%'}
                    options={INCIDENT_TIME_UNIT_LIST}
                    value={tat.unit}
                    onChange={(t) => handleChangeTATUnit(t)}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isCC && (
            <Grid item lg={3} xs={12}>
              <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                Reminder
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item lg={5} xs={12}>
                  <TextFieldWithLabel
                    showLabel={false}
                    type='number'
                    name='value'
                    placeholder=''
                    value={reminder.value}
                    onChange={(e) => handleChangeReminderValue(e.target.value)}
                    height='43px'
                    error={!!errors?.reminder?.value}
                    helperText={errors?.reminder?.value || ''}
                  />
                </Grid>
                <Grid item lg={7} xs={12}>
                  <SimpleSelect
                    width={'100%'}
                    options={INCIDENT_TIME_UNIT_LIST}
                    value={reminder.unit}
                    onChange={(t) => handleChangeReminderUnit(t)}
                  />
                </Grid>
              </Grid>
              <Typography
                typography={'h5'}
                sx={{ mt: 0.75, color: (theme) => theme.palette.grey[500] }}
              >
                *Time to send out the reminder <br />
                if not yet Closed
              </Typography>
            </Grid>
          )}
        </Grid>
      </Stack>
      <Stack>
        <IconButton sx={{ mt: 3.25 }} onClick={() => onRemove()}>
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

interface IProps {
  formik: any
  isEdit: boolean
  isLoading: boolean
  onBack: () => void
  onCreate: () => void
}

const IncidentTypeCreateRecipientSetting: FC<IProps> = ({
  formik,
  isEdit,
  isLoading,
  onBack,
  onCreate,
}) => {
  const handleAddNewRecipient = (isCC?: boolean) => {
    if (isCC) {
      const newRecipients = [...formik.values.ccRecipients]
      newRecipients.push({ user: [] })
      formik.setFieldValue('ccRecipients', [...newRecipients])
    } else {
      const newRecipients = [...formik.values.recipients]
      const newTime = { value: '', unit: INCIDENT_TIME_UNIT_LIST[0] }
      newRecipients.push({ user: [], tat: newTime, reminder: newTime })
      formik.setFieldValue('recipients', [...newRecipients])
    }
  }

  const handleChangeRecipientTAT = (idx: number, resTime: IIncidentCreateTime, isCC?: boolean) => {
    formik.setFieldValue(`${isCC ? 'ccRecipients' : 'recipients'}[${idx}].tat`, resTime)
  }

  const handleChangeRecipientReminder = (
    idx: number,
    resTime: IIncidentCreateTime,
    isCC?: boolean
  ) => {
    formik.setFieldValue(`${isCC ? 'ccRecipients' : 'recipients'}[${idx}].reminder`, resTime)
  }

  const handleChangeRecipientUser = (idx: number, user: ISelectItem[], isCC?: boolean) => {
    formik.setFieldValue(`${isCC ? 'ccRecipients' : 'recipients'}[${idx}].user`, user)
  }

  const handleRemoveRecipient = (idx: number, isCC?: boolean) => {
    const newRecipients = isCC ? [...formik.values.ccRecipients] : [...formik.values.recipients]
    newRecipients.splice(idx, 1)
    formik.setFieldValue(isCC ? 'ccRecipients' : 'recipients', [...newRecipients])
  }

  const handleAddNewCCRecipient = () => {
    handleAddNewRecipient(true)
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 3.75, pt: 5, pb: 2.5 }}>
        <Typography variant='h3'>
          {isEdit ? 'Incident Type Details' : 'Add New Incident Type'}
        </Typography>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              typography={'h4'}
              sx={{ fontSize: '1.125rem', fontWeight: 500, display: 'inline-flex' }}
            >
              Recipient
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
              onClick={() => handleAddNewRecipient()}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          {formik.values.recipients.length > 0 && (
            <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={{ lg: 5, xs: 2 }}>
              {formik.values.recipients.map((recipient: any, idx: number) => {
                const errors = formik.errors?.recipients?.[idx]

                return (
                  <RecipientItem
                    key={`recipient-item-${idx}`}
                    idx={idx}
                    isCC={false}
                    errors={errors}
                    recipient={recipient}
                    onChangeUser={(e) => handleChangeRecipientUser(idx, e)}
                    onChangeTAT={(e) => handleChangeRecipientTAT(idx, e)}
                    onChangeReminder={(e) => handleChangeRecipientReminder(idx, e)}
                    onRemove={() => handleRemoveRecipient(idx)}
                  />
                )
              })}
            </Box>
          )}
        </Box>
        <Divider light sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ mt: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              typography={'h4'}
              sx={{ fontSize: '1.125rem', fontWeight: 500, display: 'inline-flex' }}
            >
              CC Recipient
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
              onClick={handleAddNewCCRecipient}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          {formik.values.ccRecipients.length > 0 && (
            <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={{ lg: 5, xs: 2 }}>
              {formik.values.ccRecipients.map((recipient: any, idx: number) => {
                const errors = formik.errors?.ccRecipients?.[idx]?.user

                return (
                  <RecipientItem
                    key={`cc-recipient-item-${idx}`}
                    idx={idx}
                    isCC={true}
                    errors={errors}
                    recipient={recipient}
                    onChangeUser={(e) => handleChangeRecipientUser(idx, e, true)}
                    onChangeTAT={(e) => handleChangeRecipientTAT(idx, e, true)}
                    onChangeReminder={(e) => handleChangeRecipientReminder(idx, e, true)}
                    onRemove={() => handleRemoveRecipient(idx, true)}
                  />
                )
              })}
            </Box>
          )}
        </Box>
      </Box>
      <Divider light />
      <Box
        sx={{
          px: 3.75,
          pt: 2.5,
          pb: 3.75,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <LoadingButton
          variant='contained'
          size='large'
          color='primary'
          loading={isLoading}
          onClick={() => onBack()}
        >
          Back
        </LoadingButton>
        <LoadingButton
          variant='contained'
          size='large'
          color='primary'
          disabled={!formik.isValid}
          onClick={() => onCreate()}
          loading={isLoading}
        >
          {isEdit ? 'Save' : 'Create'}
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default IncidentTypeCreateRecipientSetting
