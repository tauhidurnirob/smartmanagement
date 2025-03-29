import { FC, useMemo, useState } from 'react'
import {
  Box,
  Card,
  Avatar,
  Typography,
  Button,
  Collapse,
  Divider,
  Stack,
  Tabs,
  Tab,
} from '@mui/material'
import dayjs from 'dayjs'

import {
  IProjectNotification,
  IResNotification,
} from '../../types/notification'
import { ArrowDown } from '../../assets/icons/arrow-down'
import { DATE_FORMAT_ONLY_TIME, DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import Api from '../../api'

const TAB_LIST: { id: string; label: string; key: keyof IProjectNotification }[] = [
  { id: 'device', label: 'Device', key: 'device' },
  // { id: 'maintenance', label: 'Maintenance', key: 'maintenance' },
  // { id: 'incident', label: 'Incident', key: 'incident' },
  // { id: 'feedback', label: 'Feedback', key: 'feedback' },
  { id: 'audit', label: 'Audit', key: 'audit' },
]

interface IProps {
  notificationInfo: IResNotification
}

const NotificationListItem: FC<IProps> = ({ notificationInfo }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [readAllAuditNotifications, { isLoading }] = Api.useMarkAllAuditNotificationAsReadMutation()
  const [readOneAuditNotification, { isLoading: isReading }] = Api.useMarkOneAuditNotificationAsReadMutation()

  const [readAllDeviceNotifications, { isLoading: isLoadingDevice }] = Api.useMarkAllDeviceNotificationAsReadMutation()
  const [readOneDeviceNotification, { isLoading: isReadingDevice }] = Api.useMarkOneDeviceNotificationAsReadMutation()

  const { notificationCounts, locationName, selectedNotifications, totalCount, locationId } =
    useMemo(() => {
      const { address, audit, device, id, name } = notificationInfo
      const notificationCounts = {
        device: device.count,
        // maintenance: notifications.maintenance.length,
        // incident: notifications.incident.length,
        // feedback: notifications.feedback.length,
        audit: audit.count,
      }
      const totalCount = Object.values(notificationCounts).reduce((s, a) => s + a, 0)
      const locationName = name || '-'

      const selectedNotifications = notificationInfo[TAB_LIST[selectedTab].key]
      return { notificationCounts, locationName, selectedNotifications, totalCount, locationId: id }
    }, [notificationInfo, selectedTab])

  const handleToggleOpen = () => {
    setOpen(!open)
  }

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleAllRead = (tab: keyof IProjectNotification) => {
    if (tab === 'audit') {
      readAllAuditNotifications(locationId)
    }
    if (tab === 'device') {
      readAllDeviceNotifications(locationId)
    }
  }

  const handleOneRead = (tab: keyof IProjectNotification, notificationId: number) => {
    if (tab === 'audit') {
      readOneAuditNotification(notificationId)
    }
    if (tab === 'device') {
      readOneDeviceNotification(notificationId)
    }
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
            {totalCount}
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
        <Box
          sx={{
            mt: 1.75,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            pl: 6.25,
            pr: 5,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label='notification list'
            sx={{ overflowX: 'auto', '.MuiTabs-flexContainer': { gap: 3 } }}
            variant='scrollable'
            scrollButtons='auto'
          >
            {TAB_LIST.map((tab, idx) => {
              const count = notificationCounts[tab.key]
              const isSelected = selectedTab === idx
              return (
                <Tab
                  key={tab.id}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        gap: 0.5,
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant='h4' sx={{ fontWeight: 700, color: 'inherit' }}>
                        {tab.label}
                      </Typography>
                      {count > 0 && (
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1.5,
                            bgcolor: isSelected ? 'primary.light' : 'grey.50',
                          }}
                        >
                          <Typography
                            variant='h5'
                            sx={{ fontWeight: 700, color: 'inherit', lineHeight: 1 }}
                          >
                            {count}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                  id={tab.id}
                  aria-controls={`notification-list-item-${tab.id}`}
                  sx={{ px: 1, py: 1.5, minWidth: 0 }}
                />
              )
            })}
          </Tabs>
          {selectedNotifications && selectedNotifications.data && selectedNotifications.data.length ? (
            <Button
              onClick={() => handleAllRead(TAB_LIST[selectedTab].key)}
              disabled={isLoading || isLoadingDevice}
              variant='text'
              color='primary'
              sx={{ textDecoration: 'underline' }}
            >
              Mark all as read
            </Button>
          ) : null}
        </Box>
        <Divider light sx={{ mt: 0 }} />
        <Stack direction={'column'} sx={{ pt: 1.5, pl: 6.5 }}>
          {selectedNotifications && selectedNotifications.data && selectedNotifications.data.length ? (
            selectedNotifications.data.map((notification, idx) => {
              const { createdAt, unit, isRead, area, building, id, level, text, user, userAudit } = notification
              const dayCreateAt = dayjs(createdAt)
              const isDay = dayCreateAt.isValid()
              const strCreatedAtDate = isDay ? dayCreateAt.format(DATE_FORMAT_WITHOUT_TIME) : '-'
              const strCreatedAtTime = isDay ? dayCreateAt.format(DATE_FORMAT_ONLY_TIME) : '-'
              const unitName = unit?.name || '-'
              const areaName = area?.name || '-'
              const levelName = level?.name || '-'
              const buildingName = building?.name || '-'

              const notificationBy = user?.fullName || userAudit?.fullName || '-'
              return (
                <Stack
                  key={`project-notification-list-item-${idx}`}
                  gap={1.75}
                  sx={{ pt: 2.25 }}
                  direction='row'
                >
                  <div
                    onClick={() =>
                      !isReading && !isReadingDevice && !isRead && handleOneRead(TAB_LIST[selectedTab].key, id)
                    }
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
                          {text || '-'}
                        </Typography>
                        <Typography variant='h5' fontWeight={'400'} color={'grey.700'} mt={0.5}>
                          By - {notificationBy}
                        </Typography>
                      </Box>
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
    </Card>
  )
}

export default NotificationListItem
