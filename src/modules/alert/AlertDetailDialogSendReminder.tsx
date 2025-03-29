import { FC } from 'react'
import { Box, Typography, Button, Grid, Stack, Divider, useTheme, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { IAlertRecipientItem, IAlertResponse } from '../../types/alert'
import ButtonBack from '../common/ButtonBack'
import { ISelectItem } from '../../types/common'
import UserSelect from '../user/UserSelect'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import SimpleSelect from '../common/SimpleSelect'
import { INCIDENT_TIME_UNIT_LIST } from '../../helpers/constants'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import { Plus } from '../../assets/icons/plus'

const RecipientItem = ({
  idx,
  recipient,
  errors,
  onChangeUser,
  onChangeResponse,
  onRemove,
  isCC,
}: {
  idx: number
  errors: any
  recipient: IAlertRecipientItem
  onChangeUser: (user: ISelectItem[]) => void
  onChangeResponse: (resTat: IAlertResponse) => void
  onRemove: () => void
  isCC: boolean
}) => {
  const theme = useTheme()
  const response = recipient.response

  const handleChangeResponseValue = (val: string) => {
    const newResponse = { ...response }
    newResponse.value = val
    onChangeResponse(newResponse)
  }
  const handleChangeResponseUnit = (val: ISelectItem | null) => {
    const newResponse = { ...response }
    newResponse.unit = val
    onChangeResponse(newResponse)
  }

  return (
    <Stack flexDirection={'row'} alignItems={'flex-start'} gap={1}>
      <Stack flexGrow={1}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ lg: 3.25, xs: 1 }}
          alignItems={'flex-start'}
        >
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
            <Grid item lg={6} xs={12}>
              <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                Response Time
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item lg={6} xs={12}>
                  <TextFieldWithLabel
                    showLabel={false}
                    type='number'
                    name='value'
                    placeholder=''
                    value={response.value}
                    onChange={(e) => handleChangeResponseValue(e.target.value)}
                    height='40px'
                    error={!!errors?.response?.value}
                    helperText={errors?.response?.value || ''}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SimpleSelect
                    width={'100%'}
                    options={INCIDENT_TIME_UNIT_LIST}
                    value={response.unit}
                    onChange={(t) => handleChangeResponseUnit(t)}
                    sx={{ '.MuiSelect-select': { py: '13px' } }}
                  />
                </Grid>
              </Grid>
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
  onSendRemind: () => void
  onBack: () => void
}

const AlertDetailDialogSendResponse: FC<IProps> = ({ formik, onSendRemind, onBack }) => {
  const handleBack = () => {
    onBack()
  }
  const handleAddNewRecipient = (isCC?: boolean) => {
    if (isCC) {
      const newRecipients = [...formik.values.ccRecipients]
      newRecipients.push({ user: [] })
      formik.setFieldValue('ccRecipients', [...newRecipients])
    } else {
      const newRecipients = [...formik.values.recipients]
      const newTime = { value: '', unit: INCIDENT_TIME_UNIT_LIST[0] }
      newRecipients.push({ user: [], response: newTime })
      formik.setFieldValue('recipients', [...newRecipients])
    }
  }

  const handleChangeRecipientResponse = (idx: number, resTime: IAlertResponse, isCC?: boolean) => {
    formik.setFieldValue(`${isCC ? 'ccRecipients' : 'recipients'}[${idx}].response`, resTime)
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
    <Box>
      <Box sx={{ pt: 5, px: 2.25, pb: 2.5 }}>
        <ButtonBack onClick={handleBack} />
        <Typography variant='h3' sx={{ color: 'grey.800', fontWeight: 700, mt: 3.5, ml: 5.5 }}>
          Alert Assignment Details
        </Typography>
      </Box>
      <Divider light />
      <Box sx={{ pt: 2.5, pr: 6, pl: 8, pb: 2.75 }}>
        <Box sx={{ mb: 4.5 }}>
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
                    onChangeResponse={(e) => handleChangeRecipientResponse(idx, e)}
                    onRemove={() => handleRemoveRecipient(idx)}
                  />
                )
              })}
            </Box>
          )}
        </Box>
        <Divider light sx={{ borderStyle: 'dashed', ml: '-2.5rem', mr: '-1.75rem' }} />
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
                    onChangeResponse={(e) => handleChangeRecipientResponse(idx, e, true)}
                    onRemove={() => handleRemoveRecipient(idx, true)}
                  />
                )
              })}
            </Box>
          )}
        </Box>
      </Box>
      <Divider light />
      <Box sx={{ pt: 2.25, pr: 6, pl: 6, pb: 2.75 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' color='primary' sx={{ ml: 10 }} onClick={onSendRemind}>
            Send Response
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AlertDetailDialogSendResponse
