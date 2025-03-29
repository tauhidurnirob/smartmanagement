import { FC, useMemo, useState } from 'react'
import { To } from 'react-router-dom'
import { Box, Button, Card, Divider, Grid, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { IMaintenance } from '../../../types/maintenance'
import ButtonBack from '../../common/ButtonBack'
import CustomChip from '../../common/CustomChip'
import { MAINTENANCE_STATUS_LIST } from '../../../helpers/constants'
import { DATE_FORMAT_WITHOUT_MIN } from '../../../constants/common'
// import IncidentEventTrailer from '../../incident/IncidentEventTrailer'
import MaintenanceProcedure from './MaintenanceProcedure'
import MaintenanceCloseModal from './MaintenanceCloseModal'

export const getMaintenanceStatusInfo = (status: string) => {
  return MAINTENANCE_STATUS_LIST.find((s) => s.label === status)
}

interface IProps {
  maintenance: IMaintenance
}

const MaintenanceDetail: FC<IProps> = ({ maintenance }) => {
  const [openCompleted, setOpenCompleted] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [closeModalOn, setCloseModalOn] = useState<boolean>(false)

  const { maintenanceName, statusInfo, createdAt, leftItems, rightItems } = useMemo(() => {
    const maintenanceName = maintenance?.name || '-'
    const statusInfo = getMaintenanceStatusInfo(maintenance?.status || '')
    const createdAt = maintenance?.createdAt
      ? dayjs(maintenance.createdAt).format(DATE_FORMAT_WITHOUT_MIN)
      : '-'

    const leftItems = [
      { label: 'Maintenance Name', value: maintenanceName },
      { label: 'Remark', value: maintenance?.remark || '-' },
      { label: 'Acknowledge by', value: '-' },
      { label: 'Closed by', value: '-' },
      { label: 'Maintenance Start', value: maintenance?.startAt || '_' },
      { label: 'Maintenance End', value: maintenance?.endAt || '_' },
      { label: 'Expected Down Time', value: maintenance?.downTime || '_' },
      { label: 'User Assigned', value: ['Samantha Lee', 'Jonathan', 'Jack Daniel'] },
    ]

    const rightItems = [
      { label: 'Project', value: maintenance?.project?.name || '_' },
      { label: 'Location', value: maintenance?.location?.name || '_' },
      { label: 'Building', value: maintenance?.building?.name || '_' },
      { label: 'Level', value: maintenance?.level?.name || '_' },
      { label: 'Area', value: maintenance?.area?.name || '_' },
      { label: 'Unit', value: maintenance?.unit?.name || '_' },
      { label: 'Device Type', value: maintenance?.deviceType || 'Sensor' },
      { label: 'Device List', value: ['9A-90', '9A-90', '9A-90'] },
    ]

    return {
      maintenanceName,
      statusInfo,
      createdAt,
      leftItems,
      rightItems,
    }
  }, [maintenance])

  const handleInProcess = () => {
    setOpenCompleted(true)
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={5}>
        Maintenance Detail
      </Typography>
      <Card sx={{ mt: 2.5, py: 4.25, pr: { lg: 8, xs: 3.75 }, pl: 3.75 }}>
        <Stack
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack display={'flex'} flexDirection={'column'} rowGap={2}>
            <Stack
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              alignItems={'center'}
              columnGap={3}
              rowGap={2}
            >
              <Typography variant='h3'>{maintenanceName}</Typography>
              <CustomChip
                type={statusInfo ? statusInfo.chipType : 'error'}
                text={statusInfo ? statusInfo.label : '-'}
              />
            </Stack>
            <Stack
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              alignItems={'center'}
              columnGap={1.5}
              rowGap={2}
            >
              <Typography variant='h5' sx={{ color: (theme) => theme.palette.grey[400] }}>
                Date Time Created:
              </Typography>
              <Typography
                variant='h5'
                sx={{ color: (theme) => theme.palette.grey[700], fontWeight: 700 }}
              >
                {createdAt}
              </Typography>
            </Stack>
          </Stack>
          {statusInfo?.value === MAINTENANCE_STATUS_LIST[1].value ? (
            <Button variant='contained' color='primary' onClick={() => setCloseModalOn(true)}>
              Close
            </Button>
          ) : (
            <Button variant='contained' color='primary' onClick={handleInProcess}>
              Acknowledge
            </Button>
          )}
        </Stack>
      </Card>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: 2.5 }}>
        <Box
          sx={{
            px: 2.75,
            pt: 5.25,
            pb: 2.5,
            display: 'flex',
            flex: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3'>Maintenance Info</Typography>
        </Box>
        <Divider light />
        <Grid container>
          <Grid item lg={6} xs={12}>
            <Grid container direction={'column'} rowSpacing={2.5} sx={{ p: 3.5 }}>
              {leftItems.map((item, idx) => {
                const label = item.label
                const value = item.value
                const isArray = Array.isArray(value)
                return (
                  <Grid key={idx} item container spacing={1}>
                    <Grid item lg={5} xs={12}>
                      <Typography variant='h4'>{label}</Typography>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                      {isArray ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            rowGap: 2.5,
                            columnGap: 3,
                            '> div': {
                              borderRadius: 2.5,
                              py: 1,
                            },
                          }}
                        >
                          {value.map((t, valueIdx) => {
                            return (
                              <CustomChip key={`recipient-${valueIdx}`} type={'default'} text={t} />
                            )
                          })}
                        </Box>
                      ) : (
                        <Typography variant='h5' sx={{ color: (theme) => theme.palette.grey[600] }}>
                          {value}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            sx={{
              borderLeft: { lg: '1px dashed rgba(161, 165, 183, 0.3)', xs: 'none' },
              borderTop: { xs: '1px dashed rgba(161, 165, 183, 0.3)', lg: 'none' },
            }}
          >
            <Grid container direction={'column'} rowSpacing={2.5} sx={{ p: 3.5 }}>
              {rightItems.map((item, idx) => {
                const label = item.label
                const value: any = item.value
                const isArray = Array.isArray(value)
                return (
                  <Grid key={idx} item container spacing={1}>
                    <Grid item lg={5} xs={12}>
                      <Typography variant='h4'>{label}</Typography>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                      {isArray ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            rowGap: 2.5,
                            columnGap: 3,
                            '> div': {
                              borderRadius: 2.5,
                              py: 1,
                            },
                          }}
                        >
                          {value.map((t, valueIdx) => {
                            return (
                              <CustomChip key={`recipient-${valueIdx}`} type={'default'} text={t} />
                            )
                          })}
                        </Box>
                      ) : (
                        <Typography variant='h5' sx={{ color: (theme) => theme.palette.grey[600] }}>
                          {value}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* <IncidentEventTrailer sx={{ mt: 2.5 }} /> */}
      <Box mt={2.5}>
        <MaintenanceProcedure procedures={maintenance?.procedures} />
      </Box>
      <MaintenanceCloseModal open={closeModalOn} onClose={() => setCloseModalOn(false)} />
    </Box>
  )
}

export default MaintenanceDetail
