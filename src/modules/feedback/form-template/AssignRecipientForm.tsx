import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography, useTheme } from "@mui/material"
import ButtonBack from "../../common/ButtonBack"
import { FC } from "react"
import { Plus } from "../../../assets/icons/plus"
import { IAssignRecipientInfo, ICcRecipientItem, IRecipientItem } from "../../../pages/feedback/FeedbackFormTemplateCreate"
import { FormikErrors, FormikProps } from "formik"
import UserSelect from "../../user/UserSelect"
import { ISelectItem } from "../../../types/common"
import TextFieldWithLabel from "../../common/TextFieldWithLabel"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { RequiredItem } from "../../audit/audit-schedule/AuditScheduleDetail"
import TimeUnitSelect from "./TimeUnitSelect"
import { TIME_UNIT } from "../../../helpers/constants"


interface IProps {
  formik: FormikProps<IAssignRecipientInfo>
  isEdit: boolean
  onBack: () => void
  onNext: () => void
}

const initRecipientValue: IRecipientItem = { user: [], tatTime: 10, tatUnit: TIME_UNIT[1], reminderTime: 10, reminderUnit: TIME_UNIT[1] }
const initRecipientTouch = { user: false, tatTime: false, tatUnit: false,  reminderTime: false, reminderUnit: false }
const initCcRecipientValue: ICcRecipientItem = { user: [] }
const initCcRecipientTouch = { user: false }

const AssignRecipientForm:FC<IProps> = ({
  formik,
  isEdit,
  onBack,
  onNext
}) => {
  const theme = useTheme()

  const handleChangeTatTime = async (idx: number, name: string) => {
    const newRecipients = [...formik.values.recipient]
    newRecipients[idx].tatTime = Number(name)
    await formik.setFieldValue('recipient', newRecipients)
    formik.setFieldTouched(`recipient[${idx}].tatTime`, true)
  }
  const handleChangeTatUnit = async (idx: number, val: ISelectItem) => {
    const newRecipients = [...formik.values.recipient]
    newRecipients[idx].tatUnit = val
    await formik.setFieldValue('recipient', newRecipients)
    formik.setFieldTouched(`recipient[${idx}].tatUnit`, true)
  }
  const handleChangeReminderTime = async (idx: number, name: string) => {
    const newRecipients = [...formik.values.recipient]
    newRecipients[idx].reminderTime = Number(name)
    await formik.setFieldValue('recipient', newRecipients)
    formik.setFieldTouched(`recipient[${idx}].reminderTime`, true)
  }
  const handleChangeReminderUnit = async (idx: number, val: ISelectItem) => {
    const newRecipients = [...formik.values.recipient]
    newRecipients[idx].reminderUnit = val
    await formik.setFieldValue('recipient', newRecipients)
    formik.setFieldTouched(`recipient[${idx}].reminderUnit`, true)
  }

  const handleChangeRecipient = (val: ISelectItem[], idx: number) => {
    const newRecipients = [...formik.values.recipient]
    newRecipients[idx].user = val
    formik.setFieldValue('recipient', newRecipients)
    formik.setFieldTouched(`recipient[${idx}].user`, true)
  }

  const handleAddNewRecipient = () => {
    const newRecipients = [...formik.values.recipient, { ...initRecipientValue }]
    formik.setFieldValue('recipient', newRecipients)

    const newTouched = [...(formik.touched?.recipient || [])]
    newTouched.push({ ...initRecipientTouch as any })
    formik.setTouched({
      ...(formik.touched || {}),
      recipient: newTouched,
    })
  }

  const handleRemoveRecipient = (idx: number) => {
    const newRecipients = [...formik.values.recipient]
    newRecipients.splice(idx, 1)
    if (newRecipients.length > 0) {
      const newTouched = [...(formik.touched?.recipient || [])]
      newTouched.splice(idx, 1)
      formik.setTouched({
        ...(formik.touched || {}),
        recipient: newTouched,
      })
    }
    formik.setFieldValue('recipient', newRecipients)
  }

  // CC Recipient

  const handleChangeCcRecipient = (val: ISelectItem[], idx: number) => {
    const newRecipients = [...formik.values.ccRecipient]
    newRecipients[idx].user = val
    formik.setFieldValue('ccRecipient', newRecipients)
    formik.setFieldTouched(`ccRecipient[${idx}].user`, true)
  }

  const handleAddNewCcRecipient = () => {
    const newRecipients = [...formik.values.ccRecipient, { ...initCcRecipientValue }]
    formik.setFieldValue('ccRecipient', newRecipients)

    const newTouched = [...(formik.touched?.ccRecipient || [])]
    newTouched.push({ ...initCcRecipientTouch as any })
    formik.setTouched({
      ...(formik.touched || {}),
      recipient: newTouched,
    })
  }

  const handleRemoveCcRecipient = (idx: number) => {
    const newRecipients = [...formik.values.ccRecipient]
    newRecipients.splice(idx, 1)
    if (newRecipients.length > 0) {
      const newTouched = [...(formik.touched?.recipient || [])]
      newTouched.splice(idx, 1)
      formik.setTouched({
        ...(formik.touched || {}),
        recipient: newTouched,
      })
    }
    formik.setFieldValue('ccRecipient', newRecipients)
  }
  return (
    <Box maxWidth='1400px' m='0 auto'>
      <ButtonBack onClick={onBack} />
      <Paper elevation={0} sx={{ mt: 3 }}>
        <Box p='40px 30px 20px'>
          <Typography variant='h3'>{!isEdit && 'Add New'} Feedback Form Template</Typography>
        </Box>
        <Divider />
        <Box sx={{ pt: 2.5, pb: 4, px: 3.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontSize={18} fontWeight={500}>
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
              onClick={handleAddNewRecipient}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>

          <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={3.5}>
            {formik.values.recipient?.map((item, idx) => {
              return (
                <Stack key={idx} flexDirection={'row'} alignItems={'flex-start'} gap={1}>
                  <Stack flexGrow={1}>
                    <Grid container spacing={{ lg: 6, xs: 1.5 }} alignItems={'flex-start'}>
                      <Grid item lg={6} xs={12}>
                        <Typography fontSize={15} fontWeight={500} mb={0.75} >
                          Recipient {idx + 1}
                        </Typography>
                        <UserSelect
                          hiddenLabel={true}
                          selected={item.user}
                          onChange={(val) => handleChangeRecipient(val, idx)}
                          isSingleSelect={true}
                          allowAllSelect={false}
                          allowRemoval={false}
                          showErrorMessage
                          error={
                            !!formik.touched.recipient &&
                            !!formik.touched.recipient[idx] &&
                            !!formik.touched.recipient[idx].user &&
                            !!formik.errors.recipient &&
                            !!formik.errors.recipient[idx] &&
                            !!(formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).user
                          }
                          errorMessage={
                            (!!formik.touched.recipient &&
                            !!formik.touched.recipient[idx] &&
                            !!formik.touched.recipient[idx].user &&
                            !!formik.errors.recipient &&
                            !!formik.errors.recipient[idx] &&
                            typeof formik.errors.recipient[idx] !== 'string' &&
                            (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).user
                              ? (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).user
                              : '') as string
                          }
                          labelForAll="Select User"
                        />
                      </Grid>
                      <Grid item lg={3} xs={12} alignContent={'center'}>
                        <Typography fontSize={15} fontWeight={500} mb={0.75} >
                          TAT (turnaround time)
                        </Typography>
                        <Stack direction={'row'} gap={2}>
                          <TextFieldWithLabel
                            showLabel={false}
                            type="number"
                            size='small'
                            placeholder='Time'
                            name='tatTime'
                            value={item.tatTime}
                            onChange={(e) => handleChangeTatTime(idx, e.target.value)}
                            textColor= {theme.palette.grey[600]}
                            error={
                              !!formik.touched.recipient &&
                              !!formik.touched.recipient[idx] &&
                              !!formik.touched.recipient[idx].tatTime &&
                              !!formik.errors.recipient &&
                              !!formik.errors.recipient[idx] &&
                              !!(formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).tatTime
                            }
                            helperText={
                              (!!formik.touched.recipient &&
                              !!formik.touched.recipient[idx] &&
                              !!formik.touched.recipient[idx].tatTime &&
                              !!formik.errors.recipient &&
                              !!formik.errors.recipient[idx] &&
                              typeof formik.errors.recipient[idx] !== 'string' &&
                              (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).tatTime
                                ? (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).tatTime
                                : '') as string
                            }
                          />
                          <TimeUnitSelect
                            hiddenLabel={true}
                            selected={item.tatUnit}
                            onChange={(val) => handleChangeTatUnit(idx, val)}
                            showErrorMessage
                            error={false}
                            errorMessage={''}
                          />
                        </Stack>
                      </Grid>
                      <Grid item lg={3} xs={12}>
                        <Typography fontSize={15} fontWeight={500} mb={0.75} >
                          Reminder
                        </Typography>
                        <Stack direction={'row'} gap={2}>
                          <TextFieldWithLabel
                            showLabel={false}
                            type="number"
                            size='small'
                            placeholder='Time'
                            name='reminderTime'
                            value={item.reminderTime}
                            onChange={(e) => handleChangeReminderTime(idx, e.target.value)}
                            textColor= {theme.palette.grey[600]}
                            error={
                              !!formik.touched.recipient &&
                              !!formik.touched.recipient[idx] &&
                              !!formik.touched.recipient[idx].reminderTime &&
                              !!formik.errors.recipient &&
                              !!formik.errors.recipient[idx] &&
                              !!(formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).reminderTime
                            }
                            helperText={
                              (!!formik.touched.recipient &&
                              !!formik.touched.recipient[idx] &&
                              !!formik.touched.recipient[idx].reminderTime &&
                              !!formik.errors.recipient &&
                              !!formik.errors.recipient[idx] &&
                              typeof formik.errors.recipient[idx] !== 'string' &&
                              (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).reminderTime
                                ? (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).reminderTime
                                : '') as string
                            }
                          />
                          <TimeUnitSelect
                            hiddenLabel={true}
                            selected={item.tatUnit}
                            onChange={(val) => handleChangeReminderUnit(idx, val)}
                            showErrorMessage
                            error={false}
                            errorMessage={''}
                          />
                        </Stack>
                        <Typography fontWeight={500} color={'text.secondary'} mt={.75} >
                          *Time to send out the reminder if not yet Closed
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack>
                    {
                      idx !== 0 &&
                      <IconButton sx={{ mt: 3.5 }} onClick={() => handleRemoveRecipient(idx)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  </Stack>
                </Stack>
              )
            })}
          </Box>
        </Box>
        <Box sx={{ pt: 2.5, pb: 4, px: 3.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontSize={18} fontWeight={500}>
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
              onClick={handleAddNewCcRecipient}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={3.5}>
            {formik.values.ccRecipient?.map((item, idx) => {
              return (
                <Stack key={idx} flexDirection={'row'} alignItems={'flex-start'} gap={1}>
                  <Stack flexGrow={1}>
                    <Box>
                      <Typography fontSize={15} fontWeight={500} mb={0.75} >
                        CC Recipient {idx + 1}
                      </Typography>
                      <UserSelect
                        hiddenLabel={true}
                        selected={item.user}
                        onChange={(val) => handleChangeCcRecipient(val, idx)}
                        isSingleSelect={true}
                        allowAllSelect={false}
                        allowRemoval={false}
                        showErrorMessage
                        error={
                          !!formik.touched.recipient &&
                          !!formik.touched.recipient[idx] &&
                          !!formik.touched.recipient[idx].user &&
                          !!formik.errors.recipient &&
                          !!formik.errors.recipient[idx] &&
                          !!(formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).user
                        }
                        errorMessage={
                          (!!formik.touched.recipient &&
                          !!formik.touched.recipient[idx] &&
                          !!formik.touched.recipient[idx].user &&
                          !!formik.errors.recipient &&
                          !!formik.errors.recipient[idx] &&
                          typeof formik.errors.recipient[idx] !== 'string' &&
                          (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).user
                            ? (formik.errors.recipient[idx] as FormikErrors<IRecipientItem>).user
                            : '') as string
                        }
                        labelForAll="Select User"
                      />
                    </Box>
                  </Stack>
                  <Stack>
                    {
                      idx !== 0 &&
                      <IconButton sx={{ mt: 3.5 }} onClick={() => handleRemoveCcRecipient(idx)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    }
                  </Stack>
                </Stack>
              )
            })}
          </Box>
        </Box>
        <Divider />
        <Stack direction={'row'} justifyContent={'space-between'} px={3.5} py={2.5} >
          <Button
            variant="contained"
            color="primary"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
          >
            Next
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default AssignRecipientForm