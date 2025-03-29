import { FC, useState } from "react"
import DialogWrapper from "../../common/DialogWrapper"
import { Box, Button, DialogActions, DialogContent, Divider, IconButton, Stack, Typography, useTheme } from "@mui/material"
import TextFieldWithLabel from "../../common/TextFieldWithLabel"
import SimpleSelect from "../../common/SimpleSelect"
import { ISelectItem } from "../../../types/common"
import { Plus } from "../../../assets/icons/plus"
import { RequiredItem } from "../../audit/audit-schedule/AuditScheduleDetail"
import { useFormik } from "formik"
import * as Yup from 'yup'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import UserSelect from "../../user/UserSelect"
import { TIME_UNIT } from "../../../helpers/constants"

interface IRecipient {
  recipient: ISelectItem[]
}

const initValue = { recipients: [{recipient: []}], ccRecipients: [{recipient: []}] }

interface IProps {
  open: boolean
  onClose: () => void
}

const FeedbackReAssignModal:FC<IProps> = ({
  open,
  onClose
}) => {
  const theme = useTheme()
  const [tat, setTat] = useState<number>(10)
  const [tatUnit, setTatUnit] = useState<ISelectItem>(TIME_UNIT[1])
  const [reminder, setReminder] = useState<number>(10)
  const [remainderUnit, setRemainderUnit] = useState<ISelectItem>(TIME_UNIT[1])

  const handleAddNewRecipient = () => {
    const newRecipient = {recipient: []}
    const newVal = [...formik.values.recipients, newRecipient]
    formik.setFieldValue('recipients', newVal)
  }
  const handleRemoveRecipient = (idx: number) => {
    const recipients = formik.values.recipients
    recipients.splice(idx, 1)
    formik.setFieldValue('recipients', recipients)
  }
  const handleChangeRecipient = (val: ISelectItem[], idx: number) => {
    const recipients = formik.values.recipients
    recipients[idx].recipient = val
    formik.setFieldValue('recipients', recipients)
  }
  const handleAddNewCCRecipient = () => {
    const newRecipient = {recipient: []}
    const newVal = [...formik.values.ccRecipients, newRecipient]
    formik.setFieldValue('ccRecipients', newVal)
  }
  const handleRemoveCCRecipient = (idx: number) => {
    const recipients = formik.values.ccRecipients
    recipients.splice(idx, 1)
    formik.setFieldValue('ccRecipients', recipients)
  }
  const handleChangeCCRecipient = (val: ISelectItem[], idx: number) => {
    const recipients = formik.values.ccRecipients
    recipients[idx].recipient = val
    formik.setFieldValue('ccRecipients', recipients)
  }

  const formik = useFormik<{
    recipients: IRecipient[]
    ccRecipients: IRecipient[]
  }>({
    initialValues: { ...initValue },
    validationSchema: Yup.object().shape({
      recipients: Yup.array(
        Yup.object().shape({
          recipient: Yup.array(
          ),
        })
      ),
      ccRecipients: Yup.array(
        Yup.object().shape({
          recipient: Yup.array(
          ),
        })
      ),
    }),
    onSubmit: async () => {
    },
  })

  return (
    <DialogWrapper
      open={open}
      maxWidth={'md'}
      label="Re-assign Feedback"
      onClose={onClose}
    >
      <DialogContent>
        <Box mb={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography typography={'h5'} fontSize= {'1.125rem'} >
              Recipient
              <RequiredItem fontSize= '20px' />
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
          <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={2}>
            {formik.values.recipients?.map((recipient, idx) => {
              return (
                <Stack key={idx} flexDirection={'column'}>
                    <Stack
                      flexGrow={1}
                      flexDirection={'row'}
                      alignItems={'flex-start'}
                      gap={1}
                      width={{ lg: 'auto', xs: '100%' }}
                    >
                      <Stack flexGrow={1}>
                        <UserSelect
                          hiddenLabel={true}
                          selected={recipient.recipient}
                          onChange={(val) => handleChangeRecipient(val, idx)}
                          isSingleSelect={true}
                          allowAllSelect={false}
                          allowRemoval={false}
                          error={false}
                          errorMessage={''}
                          labelForAll="Select User"
                        />
                      </Stack>
                      <Stack>
                        <IconButton
                          disabled={idx === 0}
                          onClick={() => handleRemoveRecipient(idx)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                </Stack>
              )
            })}
          </Box>
        </Box>
        <Box mb={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography typography={'h5'} fontSize= {'1.125rem'} >
              CC Recipient
              <RequiredItem fontSize= '20px' />
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
          <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={2}>
            {formik.values.ccRecipients?.map((recipient, idx) => {
              return (
                <Stack key={idx} flexDirection={'column'}>
                    <Stack
                      flexGrow={1}
                      flexDirection={'row'}
                      alignItems={'flex-start'}
                      gap={1}
                      width={{ lg: 'auto', xs: '100%' }}
                    >
                      <Stack flexGrow={1}>
                        <UserSelect
                          hiddenLabel={true}
                          selected={recipient.recipient}
                          onChange={(val) => handleChangeCCRecipient(val, idx)}
                          isSingleSelect={true}
                          allowAllSelect={false}
                          allowRemoval={false}
                          error={false}
                          errorMessage={''}
                          labelForAll="Select User"
                        />
                      </Stack>
                      <Stack>
                        <IconButton
                          disabled={idx === 0}
                          onClick={() => handleRemoveCCRecipient(idx)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                </Stack>
              )
            })}
          </Box>
        </Box>
        <Stack direction={'row'} justifyContent={'space-between'} gap={{xs: 2, md: 4}} flexWrap={'wrap'}  >
          <Box>
            <Typography typography="h5" fontSize= {'1.125rem'} mb={1} >TAT (turnaround time)</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <Box width={'100px'}>
                <TextFieldWithLabel
                  name={'tat'}
                  showLabel={false}
                  type="number"
                  value={tat}
                  onChange={(e) => setTat(Number(e.target.value))}
                  textColor={theme.palette.grey[500]}
                />
              </Box>
              <SimpleSelect
                value={tatUnit}
                options={TIME_UNIT.filter((f) => f.value)}
                onChange={(val) => setTatUnit(val)}
                width='100%'
                sx={{ '.MuiSelect-select': { py: '13px' } }}
              />
            </Stack>
          </Box>
          <Box>
            <Typography typography="h5" fontSize= {'1.125rem'} mb={1} >Reminder</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <Box width={'100px'}>
                <TextFieldWithLabel
                  name={'reminder'}
                  showLabel={false}
                  type="number"
                  value={reminder}
                  onChange={(e) => setReminder(Number(e.target.value))}
                  textColor={theme.palette.grey[500]}
                />
              </Box>
              <SimpleSelect
                value={remainderUnit}
                options={TIME_UNIT.filter((f) => f.value)}
                onChange={(val) => setRemainderUnit(val)}
                width='100%'
                sx={{ '.MuiSelect-select': { py: '13px' } }}
              />
            </Stack>
            <Typography color={'text.secondary'} fontSize={'14px'} mt={.5} >*Time to send out the reminder<br />if not yet Closed</Typography>
          </Box>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack direction='row' justifyContent='flex-end' px={4} py={2} gap={2}>
          <Button
            variant='text'
            color='inherit'
            sx={{ color: (theme) => theme.palette.grey[300], fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button sx={{px: 3, textTransform: 'none'}} variant='contained' size='large' color='primary'>
            Re-assign
          </Button>
          </Stack>
      </DialogActions>
    </DialogWrapper>
  )
}

export default FeedbackReAssignModal