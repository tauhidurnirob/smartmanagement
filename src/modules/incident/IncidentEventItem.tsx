import { FC, useMemo } from 'react'
import { SxProps, Box, Typography, Avatar, Stack } from '@mui/material'
import dayjs from 'dayjs'
import draftToHtml from 'draftjs-to-html'

import { IIncidentEVent } from '../../types/incident'
import { INCIDENT_EVENT_TYPE_LIST } from '../../helpers/constants'
import getIncidentStatusInfo from '../../helpers/getIncidentStatusInfo'
import getChipColor from '../../helpers/getChipColor'
import getAvatarNameByFullname from '../../helpers/getAvatarNameByFullname'

const ChipEventStatus = ({ status }: { status: string }) => {
  const { label, colorType } = useMemo(() => {
    const statusInfo = getIncidentStatusInfo(status)
    const label = statusInfo?.label || '-'
    const colorType = getChipColor(statusInfo?.chipType || 'success')

    return { label, colorType }
  }, [status])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{ width: '10px', height: '10px', backgroundColor: (colorType.color as string) || '' }}
      />
      <Typography
        variant='body1'
        sx={{ color: (theme) => theme.palette.grey[900], lineHeight: '20px' }}
      >
        {label}
      </Typography>
    </Box>
  )
}

interface IProps {
  event: IIncidentEVent
  sx?: SxProps
  isFirst?: boolean
  isLast?: boolean
}

const IncidentEventItem: FC<IProps> = ({ sx, event, isFirst, isLast }) => {
  const { createdTime, createdDate, userName, toUserNames, avatarUri, comment } = useMemo(() => {
    const createdAt = event.createdAt
    const createdTime = createdAt ? dayjs(createdAt).format('hh:mm a') : '-'
    const createdDate = createdAt ? dayjs(createdAt).format('DD/MM/YYYY') : '-'
    const userName = event.user?.fullName || '-'
    const toUserNames = (event.incident?.recipients || []).map((r) => r.fullName).join(', ')
    const avatarUri = event.user?.avatarUri
    const comment = event.comment

    return { createdTime, createdDate, userName, toUserNames, avatarUri, comment }
  }, [event])

  const paddingX = useMemo(() => {
    return {
      pt: isFirst ? 2 : 1,
      pb: isLast ? 2 : 1,
    }
  }, [isFirst, isLast])

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'row', ...(sx || {}) }}>
      <Stack
        sx={{
          ...paddingX,
          px: 1.5,
          borderRight: '1px dashed rgba(161, 165, 183, 0.3)',
          width: '111px',
          position: 'relative',
          textAlign: 'right',
        }}
      >
        <Typography variant='subtitle2' sx={{ color: (theme) => theme.palette.grey[600] }}>
          {createdTime}
        </Typography>
        <Typography variant='subtitle2' sx={{ color: (theme) => theme.palette.grey[600] }}>
          {createdDate}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: isFirst ? '30px' : '22px',
            right: '-5px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '2px solid #979797',
            background: '#ffffff',
          }}
        />
      </Stack>
      <Stack sx={{ flex: 1, ...paddingX, px: 3.5 }}>
        {event.type === INCIDENT_EVENT_TYPE_LIST[0].value && (
          <Typography
            variant='body1'
            sx={{ color: (theme) => theme.palette.grey[600], mt: '11px' }}
          >
            Event Triggered
          </Typography>
        )}
        {event.type === INCIDENT_EVENT_TYPE_LIST[1].value && (
          <Typography
            variant='body1'
            sx={{
              color: (theme) => theme.palette.grey[600],
              mt: '11px',
              span: { color: (theme) => theme.palette.primary.main },
            }}
          >
            <span>{userName}</span> assigned to: <span>{toUserNames}</span>
          </Typography>
        )}
        {event.type === INCIDENT_EVENT_TYPE_LIST[2].value && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '11px',
            }}
          >
            <Typography
              variant='body1'
              sx={{
                color: (theme) => theme.palette.grey[600],
                span: { color: (theme) => theme.palette.primary.main },
                lineHeight: '20px',
              }}
            >
              <span>{userName}</span> change status from&nbsp;&nbsp;
            </Typography>
            {event.fromStatus && <ChipEventStatus status={event.fromStatus} />}
            <Typography
              variant='body1'
              sx={{
                color: (theme) => theme.palette.grey[600],
                lineHeight: '20px',
              }}
            >
              &nbsp;&nbsp;to&nbsp;&nbsp;
            </Typography>
            {event.toStatus && <ChipEventStatus status={event.toStatus} />}
          </Box>
        )}
        {event.type === INCIDENT_EVENT_TYPE_LIST[3].value && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: 1.5,
            }}
          >
            <Avatar alt='Cindy Baker' src={avatarUri} {...getAvatarNameByFullname(userName)} />
            <Stack
              display={'flex'}
              flexDirection={'column'}
              rowGap={1.5}
              pt={2.5}
              pb={1.5}
              pr={3.25}
              pl={2}
              sx={{
                border: '1px solid #D9D9D9',
                borderRadius: 1.5,
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 1 }}>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 400,
                    color: (theme) => theme.palette.grey[600],
                    lineHeight: '20px',
                  }}
                >
                  {userName}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 400,
                    color: 'rgba(147, 147, 147, 0.4)',
                    lineHeight: '20px',
                  }}
                >
                  commented
                </Typography>
              </Box>
              {comment ? (
                <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(comment)) }} />
              ) : (
                'No comment'
              )}
            </Stack>
          </Box>
        )}
        {event.type === INCIDENT_EVENT_TYPE_LIST[4].value && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '11px',
            }}
          >
            <Typography
              variant='body1'
              sx={{
                color: (theme) => theme.palette.grey[600],
                span: { color: (theme) => theme.palette.primary.main },
                lineHeight: '20px',
              }}
            >
              <span>{userName}</span> removed
            </Typography>
          </Box>
        )}
        {event.type === INCIDENT_EVENT_TYPE_LIST[5].value && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              mt: '11px',
            }}
          >
            <Typography
              variant='body1'
              sx={{
                color: (theme) => theme.palette.grey[600],
                span: { color: (theme) => theme.palette.primary.main },
                lineHeight: '20px',
              }}
            >
              <span>{userName}</span> completed
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default IncidentEventItem
