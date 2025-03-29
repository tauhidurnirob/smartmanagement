import { Box, Card, Stack, Typography } from "@mui/material"
import Api from "../../api"
import BackDrop from "../../modules/common/BackDrop"
import { camelCaseToSentence } from "../../helpers/camelCaseToString"
import { DATE_FORMAT_WITHOUT_MIN } from "../../constants/common"
import { IDevice } from "../../api/models"
import getDeviceBatteryStatusInfo from "../../helpers/getDeviceBatteryStatusInfo"
import getDeviceStatusInfo from "../../helpers/getDeviceStatusInfo"
import dayjs from "dayjs"
import CustomChip from "../../modules/common/CustomChip"
import { DEVICE_TYPE_WITH_IMG } from "../../helpers/constants"

const getSummaryItems = (device: IDevice) => {
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

  const deviceImg = DEVICE_TYPE_WITH_IMG.find(f=> f.label === device?.deviceType?.deviceType)?.url

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

  return { identificationNo, strCreateAt, strLastPingAt, summaryItems, deviceImg }
}


const DeviceValueList = () => {

  const { data, isLoading } = Api.useGetDeviceListQuery({
    page: 1,
    limit: 1000
  })



  return (
    <Box position={'relative'}>
      <Typography variant="h3" mb={4}>Device List</Typography>
      <Box>
        {isLoading && <BackDrop />}
        {
          data?.rows?.map((device) => {
            const { identificationNo, deviceImg, strLastPingAt, summaryItems } = getSummaryItems(device)
            return (
              <Card elevation={0} sx={{mb: 2, p: 3}}>
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
                  <Box my={2}>
                    {deviceImg && <img style={{objectFit: 'contain'}} width={250} height={250} src={deviceImg} alt="Img" />}
                  </Box>
                  {/* <Stack sx={{ display: 'flex', gap: 1, mt: 1.5, flexDirection: 'row' }}>
                    <Typography variant='h5' color='grey.400'>
                      Date Time Created:
                    </Typography>
                    <Typography variant='h5'>{strCreateAt}</Typography>
                  </Stack> */}
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
              </Card>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default DeviceValueList