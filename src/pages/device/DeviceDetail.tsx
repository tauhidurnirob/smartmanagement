import { useMemo, useState, useEffect } from 'react'
import { To, useParams } from 'react-router'
import { Box, Button, Card, Divider, Stack, Typography, Tabs, Tab } from '@mui/material'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import ButtonBack from '../../modules/common/ButtonBack'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import getDeviceBatteryStatusInfo from '../../helpers/getDeviceBatteryStatusInfo'
import getDeviceStatusInfo from '../../helpers/getDeviceStatusInfo'
import CustomChip from '../../modules/common/CustomChip'
import DeviceDetailActivityList from '../../modules/device/DeviceDetailActivityList'
import DeviceCreateEdit from '../../modules/device/DeviceCreateEdit'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
import { camelCaseToSentence } from '../../helpers/camelCaseToString'
const TAB_LIST = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity-log', label: 'Activity Log' },
]

const DeviceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isDeletable, setDeletable] = useState(false);

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.overview.deleteDevice)) {
      setDeletable(true)
    }
  }, [])
  const { data: device, isFetching: isLoading } = Api.useGetDeviceByIdQuery(Number(id))
  const [deleteDevicesByIds, { isLoading: isDeleting }] = Api.useBatchDeleteDevicesMutation()

  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { identificationNo, strCreateAt, strLastPingAt, summaryItems } = useMemo(() => {
    const identificationNo = device?.identificationNo || '-'
    const createdAt = device?.createdAt
    const lastPingAt = device?.lastPingAt
    const battery = device?.batteryPercent
    const status = device?.status

    const strCreateAt = createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
    const strLastPingAt = lastPingAt ? dayjs(lastPingAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
    const batteryStatusInfo =
      typeof battery !== 'undefined' && battery !== null
        ? getDeviceBatteryStatusInfo(battery)
        : null
    const deviceStatusInfo = status ? getDeviceStatusInfo(status) : null

    const summaryItems = [
      {
        label: 'Battery',
        value: batteryStatusInfo ? `${battery}%` : '-',
        chipType: batteryStatusInfo !== null ? batteryStatusInfo?.chipType || 'error' : null,
        statusLabel: batteryStatusInfo !== null ? batteryStatusInfo.label : '-',
      },
      {
        label: 'Status',
        value: deviceStatusInfo ? deviceStatusInfo.label : '-',
        chipType: deviceStatusInfo !== null ? deviceStatusInfo?.chipType || 'error' : null,
        statusLabel: deviceStatusInfo !== null ? deviceStatusInfo.label : '-',
      },
    ]
    if(device?.vOriginalValue) {
      const originalVal: any = device.vOriginalValue
      Object.keys(originalVal)?.map((key) => {
        summaryItems.push({
          label: camelCaseToSentence(key),
          value: originalVal[`${key}`] ?? '-',
          chipType: null,
          statusLabel: '-',
        })
      })
    }

    return { identificationNo, strCreateAt, strLastPingAt, summaryItems }
  }, [device])

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }
  const checkDelete = () => {
    if(isDeletable){
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    } 
  }
  const handleDelete = () => {
    deleteDevicesByIds([Number(id)])
      .unwrap()
      .then(() => {
        toast.success('Devices have been deleted')
        setOpenDeleteModal(false)
        navigate('/device/overview')
      })
      .catch((err) => {
        console.log('Failed to delete device: ', err)
        toast.error('Failed to delete device')
      })
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={4}>
        Device Details
      </Typography>

      {isLoading ? (
        <Card sx={{ mt: 2.25, py: 3.75, px: 3.75 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Box sx={{ position: 'relative', height: '30px' }}>
              <BackDrop size={30} />
            </Box>
          </Box>
        </Card>
      ) : (
        <>
          <Card sx={{ mt: 2.25, pt: 4.25, pb: 0, px: 3.75 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant='h4'>{identificationNo}</Typography>
                <Stack sx={{ display: 'flex', gap: 1, mt: 1.5, flexDirection: 'row' }}>
                  <Typography variant='h5' color='grey.400'>
                    Date Time Created:
                  </Typography>
                  <Typography variant='h5'>{strCreateAt}</Typography>
                </Stack>
              </Box>
              <Box display={'flex'} gap={2} sx={{ py: 0 }}>
                <Button
                  variant='contained'
                  color='error'
                  sx={{ px: 2.5, py: 1.5, lineHeight: 1 }}
                  onClick={() => {checkDelete}}
                >
                  Delete Device
                </Button>
                <Button
                  variant='contained'
                  color='inherit'
                  sx={{
                    backgroundColor: 'grey.50',
                    color: 'grey.700',
                    px: 2.5,
                    py: 1.5,
                    lineHeight: 1,
                  }}
                  onClick={() => {}}
                >
                  Switch Off
                </Button>
              </Box>
            </Stack>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mt: 4.25,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  columnGap: 2.75,
                  rowGap: 1,
                }}
              >
                {summaryItems.map((item, idx) => {
                  const { label, value, chipType, statusLabel } = item
                  return (
                    <Box
                      key={`device-summary-item-${idx}`}
                      sx={{
                        borderRadius: 1.5,
                        border: '1px dashed #E4E6EF',
                        pt: 1.5,
                        pl: 2,
                        pb: 0.5,
                        pr: 0.5,
                      }}
                    >
                      <Typography variant='h2' color='grey.800'>
                        {value}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          gap: 3,
                          minHeight: '26px',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant='h5' color='grey.400' fontWeight={500}>
                          {label}
                        </Typography>
                        {chipType !== null && <CustomChip type={chipType} text={statusLabel} />}
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Stack sx={{ display: 'flex', gap: 4, mb: 2, flexDirection: 'row' }}>
                <Typography variant='h5' color='grey.400'>
                  Last ping at
                </Typography>
                <Typography variant='h5'>{strLastPingAt}</Typography>
              </Stack>
            </Stack>
            <Divider light sx={{ mt: 3.75 }} />
            <Tabs
              value={selectedTab}
              onChange={handleChangeTab}
              aria-label='audit recycle bin'
              sx={{ overflowX: 'auto', '.MuiTabs-flexContainer': { gap: 3 } }}
              variant='scrollable'
              scrollButtons='auto'
            >
              {TAB_LIST.map((tab) => {
                return (
                  <Tab
                    key={tab.id}
                    label={tab.label}
                    id={tab.id}
                    aria-controls={`audit-form-template-panel-${tab.id}`}
                    sx={{ px: 1, py: 2, minWidth: 0 }}
                  />
                )
              })}
            </Tabs>
          </Card>
          <Box sx={{ mt: 2.5 }}>
            {selectedTab === 0 && <DeviceCreateEdit device={device} />}
            {selectedTab === 1 && <DeviceDetailActivityList device={device} />}
          </Box>
        </>
      )}
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the device?
          </span>
        }
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDelete()}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={isDeleting}
      />
    </Box>
  )
}

export default DeviceDetail
