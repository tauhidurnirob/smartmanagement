import { Backdrop, Box, Card, Stack, Typography } from '@mui/material'
import { To, useParams, useSearchParams } from 'react-router-dom'

import ButtonBack from '../../modules/common/ButtonBack'
import { useState } from 'react'
import AuditDetailsByLocation from '../../modules/audit/overview/AuditDetailsByLocation'
import DeviceControlDetailByLocation from '../../modules/device/DeviceControlDetailByLocation'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import WashroomOverviewByLocation from '../../modules/washroom/WashroomOverviewByLocation'
import IncidentListByLocation from '../../modules/incident/IncidentListByLocation'
import MaintenanceListByLocation from '../../modules/maintanance/overview/MaintenanceListByLocation'
import FeedbackListByLocation from '../../modules/feedback/overview/FeedbackListByLocation'

const MENUES = [
  { label: 'Audit', value: 'Audit' },
  { label: 'Device', value: 'Device' },
  { label: 'Washroom', value: 'Washroom' },
  { label: 'Incident', value: 'Incident' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Feedback', value: 'Feedback' },
]

const DashboardOverviewDetail = () => {
  const { locationId } = useParams()

  const [searchParams] = useSearchParams()
  const year = searchParams.get('year')
  const month = searchParams.get('month')
  const formTypeId = searchParams.get('formTypeId')

  const { data: location, isFetching: isLoadingLocation } = Api.useGetLocationByIdQuery(
    Number(locationId),
    {
      skip: typeof locationId !== 'string',
    }
  )

  const [selectedMenu, setSelectedMenu] = useState<string>(MENUES[0].value)

  const handleChangeMenu = (menu: string) => {
    setSelectedMenu(menu)
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant='h3'>Location Details</Typography>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            rowGap: 1,
            columnGap: 0.5,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            p: 2,
          }}
        >
          {MENUES.map((menu, idx) => {
            const { label, value } = menu
            const isSelected = value === selectedMenu
            return (
              <Box
                key={`dashboard-overview-detail-menu-item-${idx}`}
                sx={{
                  py: 1.25,
                  px: 2,
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'primary.light' : '#ffffff',
                }}
                onClick={() => handleChangeMenu(value)}
              >
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 600,
                    color: isSelected ? 'primary.main' : 'grey.600',
                    lineHeight: 1,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </Box>
      {isLoadingLocation ? (
        <Box sx={{ position: 'relative', height: '60px', mt: 1.75, p: 5 }}>
          <BackDrop />
        </Box>
      ) : (
        <Box sx={{ mt: 1.75 }}>
          {[
            MENUES[1].value,
            MENUES[2].value,
            MENUES[3].value,
            MENUES[4].value,
            MENUES[5].value,
          ].includes(selectedMenu) && (
            <Card sx={{ pt: 4.25, px: 3.75, pb: 2.75, mt: 2.25, mb: 2.25 }}>
              <Typography variant='h3' mb={2}>
                {location?.name || '-'}
              </Typography>
            </Card>
          )}
          {selectedMenu === MENUES[0].value && (
            <AuditDetailsByLocation locationId={Number(locationId)} year={year} month={month} formTypeId={Number(formTypeId)} />
          )}
          {selectedMenu === MENUES[1].value && typeof locationId === 'string' && (
            <DeviceControlDetailByLocation locationId={Number(locationId)} hiddenTab={true} />
          )}
          {selectedMenu === MENUES[2].value && typeof locationId === 'string' && (
            <WashroomOverviewByLocation />
          )}
          {selectedMenu === MENUES[3].value && typeof locationId === 'string' && (
            <IncidentListByLocation />
          )}
          {selectedMenu === MENUES[4].value && typeof locationId === 'string' && (
            <MaintenanceListByLocation />
          )}
          {selectedMenu === MENUES[5].value && typeof locationId === 'string' && (
            <FeedbackListByLocation />
          )}
        </Box>
      )}
    </Box>
  )
}

export default DashboardOverviewDetail
