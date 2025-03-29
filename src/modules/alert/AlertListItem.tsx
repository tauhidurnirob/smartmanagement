import { FC, useMemo, useState } from 'react'
import { Box, Card, Avatar, Typography, Button, Collapse, Divider, Stack } from '@mui/material'

import { IAlert, IAlertListItemByProject } from '../../types/alert'
import { ArrowDown } from '../../assets/icons/arrow-down'
import dayjs from 'dayjs'
import { DATE_FORMAT_ONLY_TIME, DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import AlertDetailDialog from './AlertDetailDialog'
import { IAlertData, IResAlert } from '../../api/models/alert'
import Api from '../../api'

interface IProps {
  alertInfo: IResAlert
}

const AlertListItem: FC<IProps> = ({ alertInfo }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [alert, setAlert] = useState<IAlertData | null>(null)
  const [markOneAsRead, { isLoading: isReading }] = Api.useMarkOneAlertAsReadMutation()

  const { alertCount, alerts, locationName } = useMemo(() => {
    const { alerts, id, locationName } = alertInfo
    const alertCount = alerts.length

    return { alertCount, alerts, locationName }
  }, [alertInfo])

  const handleToggleOpen = () => {
    setOpen(!open)
  }

  const handleOpenAlert = (alert: IAlertData) => {
    setAlert(alert)
    markOneAsRead(alert.id)
  }

  const handleCloseAlert = () => {
    setAlert(null)
  }

  return (
    <Card sx={{ pt: 3, pb: 3, border: '1px dashed #E4E6EF' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: 3,
          pl: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: '#FD3D00',
              width: '1.5rem',
              height: '1.5rem',
              fontSize: '14px',
              color: '#fff',
              fontWeight: 500,
            }}
          >
            {alertCount}
          </Avatar>
          <Typography fontSize='1.125rem' fontWeight={700} color={'grey.800'}>
            {locationName}
          </Typography>
        </Box>
        <Button sx={{ p: 0.5, minWidth: 0 }} onClick={handleToggleOpen}>
          <ArrowDown sx={{ fontSize: '1rem', color: 'grey.800', rotate: open ? '180deg' : 0 }} />
        </Button>
      </Box>
      <Collapse in={open}>
        <Divider light sx={{ mt: 2 }} />
        <Stack direction={'column'} sx={{ pt: 1.5, pl: 6.5 }}>
          {alerts.length ? (
            alerts.map((alert, idx) => {
              const { area, building, comments, createdAt, id, level, title, unit, isRead } = alert
              const dayCreateAt = dayjs(createdAt)
              const isDay = dayCreateAt.isValid()
              const strCreatedAtDate = isDay ? dayCreateAt.format(DATE_FORMAT_WITHOUT_TIME) : '-'
              const strCreatedAtTime = isDay ? dayCreateAt.format(DATE_FORMAT_ONLY_TIME) : '-'
              const unitName = unit?.name || '-'
              const areaName = area?.name || '-'
              const levelName = level?.name || '-'
              const buildingName = building?.name || '-'

              return (
                <Stack
                  key={`project-alert-list-item-${idx}`}
                  gap={1.75}
                  sx={{ pt: 2.25 }}
                  direction='row'
                >
                  <div
                    onClick={() => !isReading && !isRead && markOneAsRead(id)}
                    style={{
                      cursor: 'pointer',
                      // background: 'blue',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      marginTop: '5px',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: isRead ? '#fff' : 'error.main',
                        width: '10px',
                        height: '10px',
                      }}
                    >
                      {' '}
                    </Avatar>
                  </div>
                  <Box
                    sx={{
                      pb: 2,
                      borderBottom: '1px dashed #DADADA',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Box sx={{ pr: 2 }}>
                      <Typography
                        variant='h6'
                        fontWeight={'400'}
                        color={'grey.500'}
                        textAlign={'right'}
                      >
                        {strCreatedAtTime}
                      </Typography>
                      <Typography
                        variant='h6'
                        fontSize={'0.625rem'}
                        fontWeight={'400'}
                        color={'grey.500'}
                      >
                        {strCreatedAtDate}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        pl: 2,
                        pr: 3,
                        borderLeft: '1px dashed #DADADA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 2,
                        flex: 1,
                      }}
                    >
                      <Box>
                        <Typography variant='h4' fontWeight={'500'} color={'grey.800'}>
                          {title || '-'}
                        </Typography>
                        <Typography variant='h5' fontWeight={'400'} color={'grey.700'} mt={0.5}>
                          {locationName}
                        </Typography>
                        <Typography variant='h5' fontWeight={'400'} color={'grey.700'} mt={0.2}>
                          {buildingName} - {levelName} - {areaName} - {unitName}
                        </Typography>
                      </Box>
                      <Button variant='contained' onClick={() => handleOpenAlert(alert)}>
                        View
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              )
            })
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Typography color='textSecondary' variant='h6'>
                No Available Records
              </Typography>
            </Box>
          )}
        </Stack>
      </Collapse>
      {alert && (
        <AlertDetailDialog locationName={locationName} alert={alert} onClose={handleCloseAlert} />
      )}
    </Card>
  )
}

export default AlertListItem
