import { FC, useMemo, useState,useEffect } from 'react'
import { To } from 'react-router-dom'
import { Box, Button, Card, Divider, Grid, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

import ButtonBack from '../common/ButtonBack'
import getIncidentStatusInfo from '../../helpers/getIncidentStatusInfo'
import CustomChip from '../common/CustomChip'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import ImageHotspots from '../common/image-hotspot/ImageHotspot'
import IncidentCompletedModal from './IncidentCompletedModal'
import IncidentEventTrailer from './IncidentEventTrailer'
import IncidentCreateEdit from './IncidentCreateEdit'
import { IIncident } from '../../api/models'
import { MapMarker } from '../../assets/icons/map-marker'
import getIncidentCommandInfoForStatus from '../../helpers/getIncidentCommandInfoForStatus'
import Api from '../../api'
import { INCIDENT_COMMAND_LIST,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import useAuth from '../../hooks/useAuth'

interface IProps {
  incident?: IIncident
  isWashroom?: boolean
}

const IncidentDetail: FC<IProps> = ({ incident }) => {
  const [acknowledgeIncident, { isLoading: isAcknowledging }] = Api.useAcknowledgeIncidentMutation()
  const [completeIncident, { isLoading: isCompleting }] = Api.useCompleteIncidentMutation()

  const [openCompleted, setOpenCompleted] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { user } = useAuth();
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.incident.editWashroomIncident)) {
      setEditable(true)
    }
  }, [])
  const {
    typeName,
    statusInfo,
    createdAt,
    leftItems,
    rightItems,
    bottomItems,
    floorImgUrl,
    hotspots,
    commandInfo,
  } = useMemo(() => {
    const typeName = incident?.incidentType?.name || '-'
    const statusInfo = getIncidentStatusInfo(incident?.status || '')
    const createdAt = incident?.createdAt
      ? dayjs(incident.createdAt).format(DATE_FORMAT_WITHOUT_MIN)
      : '-'
    const triggeredAt = incident?.triggeredAt
      ? dayjs(incident.triggeredAt).format(DATE_FORMAT_WITHOUT_MIN)
      : '-'
    const endAt = incident?.endedAt ? dayjs(incident.endedAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
    const projectName = incident?.project?.name || '-'
    const locationName = incident?.location?.name || '-'
    const buildingName = incident?.building?.name || '-'
    const levelName = incident?.level?.name || '-'
    const areaName = incident?.area?.name || '-'
    const unitName = incident?.unit?.name || '-'
    const level = incident?.level
    const floorImgUrl = level?.floorPlanImgUrl || ''
    const imageUrls = (incident?.medias || []).filter((e) => e.type === 'image').map((e) => e.url)
    const recipientNames = (incident?.recipients || []).map((r) => r.fullName)
    const closer = incident?.closer?.fullName || '-'
    const acknowledger = incident?.acknowledger?.fullName || '-'
    const position = incident?.position
    const hotspots = position
      ? [
          {
            x: position.x,
            y: position.y,
            content: (
              <MapMarker
                sx={{
                  display: 'block',
                  color: (theme) => theme.palette.error.main,
                  width: '40px',
                  height: 'auto',
                }}
              />
            ),
            sx: {
              background: 'transparent',
              mt: '-34px',
              ml: '-20px',
            },
          },
        ]
      : []

    const commandInfo = getIncidentCommandInfoForStatus(incident?.status || null)

    const leftItems = [
      { label: 'Incident Type', value: typeName },
      { label: 'Remark', value: incident?.remarks || '-' },
      { label: 'Acknowledge by', value: acknowledger },
      { label: 'Closed by', value: closer },
      { label: 'Triggered date & time', value: triggeredAt },
      { label: 'Closed date & time', value: endAt },
      { label: 'Recipient', value: recipientNames },
    ]

    const rightItems = [
      { label: 'Project', value: projectName },
      { label: 'Location', value: locationName },
      {
        label: 'Pictures',
        value: imageUrls,
      },
    ]

    const bottomItems = [
      { label: 'Building', value: buildingName },
      { label: 'Level', value: levelName },
      { label: 'Area', value: areaName },
      { label: 'Unit', value: unitName },
    ]

    return {
      typeName,
      statusInfo,
      createdAt,
      leftItems,
      rightItems,
      bottomItems,
      floorImgUrl,
      hotspots,
      commandInfo,
    }
  }, [incident])

  const handleInProcess = () => {
    if (commandInfo?.value === INCIDENT_COMMAND_LIST[0].value) {
      if (incident)
        acknowledgeIncident(incident.id)
          .unwrap()
          .then(() => {
            toast.success('Updated incident')
          })
          .catch((err) => {
            console.log('Failed to update incident: ', err)
            toast.error('Failed to update incident')
          })
    } else if (commandInfo?.value === INCIDENT_COMMAND_LIST[1].value) {
      setOpenCompleted(true)
    }
  }

  const handleCloseCompleted = () => {
    setOpenCompleted(false)
  }

  const hanldeComplate = (file: File, comment: string) => {
    if (incident) {
      completeIncident({ incidentId: incident.id, file, comment })
        .unwrap()
        .then(() => {
          toast.success('Updated incident')
          setOpenCompleted(false)
        })
        .catch((err) => {
          console.log('Failed to update incident: ', err)
          toast.error('Failed to update incident')
        })
    }
  }

  const handleEdit = () => {
    if(isEditable){
      setIsEdit(true)
    }else{
      toast.error('You do not have access to edit!')
    }
  }

  const handleCloseEdit = () => {
    setIsEdit(false)
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={5}>
        Event Detail
      </Typography>
      <Card sx={{ mt: 2.5, py: 4.25, pr: { lg: 3, xs: 3 }, pl: 3.75 }}>
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
              <Typography variant='h3'>{typeName}</Typography>
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
              <Typography variant='h5' sx={{ color: (theme) => theme.palette.grey[200] }}>
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
          {commandInfo && (
            <LoadingButton
              variant='contained'
              color='primary'
              onClick={handleInProcess}
              loading={isAcknowledging}
            >
              {commandInfo.label}
            </LoadingButton>
          )}
        </Stack>
      </Card>
      {isEdit ? (
        <IncidentCreateEdit incident={incident} onCloseEdit={handleCloseEdit} />
      ) : (
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
            <Typography variant='h3'>Incident Info</Typography>
            <Button variant='contained' color='primary' onClick={handleEdit}>
              Edit
            </Button>
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
                                <CustomChip
                                  key={`recipient-${valueIdx}`}
                                  type={'default'}
                                  text={t}
                                />
                              )
                            })}
                          </Box>
                        ) : (
                          <Typography
                            variant='h5'
                            sx={{ color: (theme) => theme.palette.grey[600] }}
                          >
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
                              columnGap: 3.5,
                            }}
                          >
                            {value.map((t, valueIdx) => {
                              return (
                                <Box
                                  key={`picture-${valueIdx}`}
                                  sx={{
                                    width: '117px',
                                    height: '121px',
                                    borderRadius: 1.25,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    img: {
                                      borderRadius: 1.25,
                                      boxShadow: '0px 4px 20px 2px rgba(0, 0, 0, 0.15)',
                                    },
                                  }}
                                >
                                  <img
                                    src={t}
                                    style={{
                                      height: 'auto',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      objectFit: 'contain',
                                    }}
                                  />
                                </Box>
                              )
                            })}
                          </Box>
                        ) : (
                          <Typography
                            variant='h5'
                            sx={{ color: (theme) => theme.palette.grey[600] }}
                          >
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
          <Divider light />
          <Box sx={{ py: 4, px: 3.5 }}>
            <Grid container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Grid container direction={'column'} rowSpacing={2.5}>
                  {bottomItems.map((item, idx) => {
                    const label = item.label
                    const value = item.value
                    return (
                      <Grid key={idx} item container spacing={1}>
                        <Grid item lg={5} xs={12}>
                          <Typography variant='h4'>{label}</Typography>
                        </Grid>
                        <Grid item lg={7} xs={12}>
                          <Typography
                            variant='h5'
                            sx={{ color: (theme) => theme.palette.grey[600] }}
                          >
                            {value}
                          </Typography>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
              <Grid item lg={8} xs={12}>
                <Box sx={{ width: '100%', height: '100%', minHeight: '627px' }}>
                  <ImageHotspots
                    src={floorImgUrl}
                    alt={'floor-image'}
                    hotspots={hotspots}
                    hideZoomControls={false}
                    hideFullscreenControl={true}
                    disableSelectHotspot={true}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
      {incident && <IncidentEventTrailer sx={{ mt: 2.5 }} incidentId={incident.id} />}
      <IncidentCompletedModal
        onClose={handleCloseCompleted}
        open={openCompleted}
        onSubmit={hanldeComplate}
        isUpdating={isCompleting}
      />
    </Box>
  )
}

export default IncidentDetail
