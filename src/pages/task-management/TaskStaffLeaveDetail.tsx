import { useMemo } from 'react'
import { Box, Stack, Typography, Card, Divider, Grid } from '@mui/material'
import dayjs from 'dayjs'
import { To, useParams } from 'react-router-dom'

import ButtonBack from '../../modules/common/ButtonBack'
import getTaskStaffLeaveStatusInfo from '../../helpers/getTaskStaffLeaveStatusInfo'
import CustomChip from '../../modules/common/CustomChip'
import getTaskStaffLeaveCategoryInfo from '../../helpers/getTaskStaffLeaveCategoryInfo'
import getTaskStaffLeaveTypeInfo from '../../helpers/getTaskStaffLeaveTypeInfo'
import getStaffLeaveDays from '../../helpers/getStaffLeaveDays'
import Api from '../../api'
import { _getLeaveApplicationFilter } from '../../store/_selectors'

const TaskStaffLeaveDetail = () => {
  const { id: leaveId } = useParams()

  const { data: leave } = Api.useGetSingleStaffLeaveQuery({ id: Number(leaveId) })

  const { statusInfo, items } = useMemo(() => {
    const {
      status,
      staff,
      appliedAt,
      leaveCategory,
      leaveType,
      startDate,
      endDate,
      description,
      attachment,
      reason,
    } = leave || {}
    const statusInfo = status ? getTaskStaffLeaveStatusInfo(status) : undefined
    const dateFormat = 'D MMMM YYYY'

    const userName = staff?.fullName || '-'
    const roleName = staff?.role?.name || '-'
    const strApplicationDate = appliedAt ? dayjs(appliedAt).format(dateFormat) : '-'
    const strStartDate = startDate ? dayjs(startDate).format(dateFormat) : '-'
    const strEndDate = endDate ? dayjs(endDate).format(dateFormat) : '-'
    const categoryInfo = getTaskStaffLeaveCategoryInfo(leaveCategory?.name || '')
    const typeInfo = leaveType !== undefined ? getTaskStaffLeaveTypeInfo(leaveType) : undefined
    const diffDays = leave ? getStaffLeaveDays(leave) : '-'

    const items = [
      { label: 'Name', value: userName },
      { label: 'Role', value: roleName },
      { label: 'Application Date', value: strApplicationDate },
      { label: 'Leave Category', value: categoryInfo?.label || '-' },
      { label: 'Leave Type', value: typeInfo ? `${typeInfo?.label} Leave` : '-' },
      { label: 'Start Date', value: strStartDate },
      { label: 'End Date', value: strEndDate },
      { label: 'Day(s)', value: diffDays },
      { label: 'Subject', value: reason || '-' },
      { label: 'Description', value: description || '-' },
      { label: 'Attachment', value: attachment && attachment?.length > 0 ? attachment : '-' },
    ]

    return { statusInfo, items }
  }, [leave])

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Card sx={{ mt: 4.5 }}>
        <Stack
          direction={'row'}
          gap={2}
          justifyContent={'space-between'}
          sx={{ px: 3.75, pt: 4.5, pb: 2.75 }}
        >
          <Typography variant='h3' color={'grey.800'}>
            Leave Details
          </Typography>
          <CustomChip text={statusInfo?.label || '-'} type={statusInfo?.chipType || 'error'} />
        </Stack>
        <Divider light />
        <Stack gap={2.5} sx={{ pt: 3.5, px: 3.75, pb: 2.75 }}>
          {items.map((item, idx) => {
            const { label, value } = item
            return (
              <Grid
                key={`leave-detail-item-${idx}`}
                container
                columnSpacing={2}
                rowSpacing={1}
                alignItems={'center'}
              >
                <Grid item lg={4}>
                  <Typography variant='h5' color={'grey.800'} fontSize={15}>
                    {label}
                  </Typography>
                </Grid>
                <Grid item lg={8}>
                  <Typography variant='h5' color={'grey.600'}>
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            )
          })}
        </Stack>
      </Card>
    </Box>
  )
}

export default TaskStaffLeaveDetail
