import { useMemo, useState, useEffect } from 'react'
import { To, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { Box, Card, Divider, Stack, Typography, Tabs, Tab } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'

import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import LocationSelect from '../../modules/location/LocationSelect'
import { ISelectItem } from '../../types/common'
import LocationDetail from '../../modules/settings/LocationDetail'
import LocationDetailActivityList from '../../modules/settings/LocationDetailActivityList'
import FloorPlanList from '../../modules/settings/FloorPlanList'

const TAB_LIST = [
  { id: 'overview', label: 'Overview' },
  { id: 'floor-plan', label: 'Floor Plan' },
  { id: 'activity-log', label: 'Activity Log' },
]

const SettingProjectDetail = () => {
  const { id: projectId } = useParams()
  const [searchParams] = useSearchParams()
  const locationId = searchParams.get('location')

  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [selectedLocation, setSelectedLocation] = useState<ISelectItem[]>([])

  const { data: project, isFetching: isLoadingProject } = Api.useGetProjectByIdQuery(
    Number(projectId),
    { skip: !projectId }
  )

  const { data: initLocation } = Api.useGetLocationByIdQuery(Number(locationId), {
    skip: !locationId,
  })

  const selectedLocationId = useMemo(() => {
    if (selectedLocation.length > 0) {
      return selectedLocation[0].value as number
    }

    return Number(locationId)
  }, [locationId, selectedLocation])

  const { projectName, locationCount } = useMemo(() => {
    const projectName = project?.name || '-'
    const locationCount = project?.locationCount ?? '-'

    return { projectName, locationCount }
  }, [project])

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleChangeSelectedLocations = (locations: ISelectItem[]) => {
    setSelectedLocation(locations)
  }

  useEffect(() => {
    if (initLocation) {
      setSelectedLocation([
        {
          label: initLocation.name,
          value: initLocation.id,
        },
      ])
    }
  }, [initLocation])

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={5}>
        Project Data Details
      </Typography>
      {isLoadingProject ? (
        <Card sx={{ position: 'relative', height: '30px', width: '100%', p: 5, mt: 2 }}>
          <BackDrop size={30} />
        </Card>
      ) : (
        <>
          <Card sx={{ mt: 2, pt: 4.25, pb: 0, pl: 3.75, pr: 3 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Box
                sx={{
                  flexDirection: 'column',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  width: 'fit-content',
                }}
              >
                <Typography variant='h4' color='grey.800' sx={{ fontWeight: 700, fontSize: 19 }}>
                  {projectName}
                </Typography>
                <Box
                  sx={{
                    borderRadius: 1.5,
                    border: '1px dashed #E4E6EF',
                    pt: 1.5,
                    pl: 2,
                    pb: 1.5,
                    pr: 2,
                  }}
                >
                  <Typography variant='h2' color='grey.800' fontWeight={900}>
                    {locationCount}
                  </Typography>
                  <Typography variant='h5' color='grey.400'>
                    Total Locations
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ maxWidth: '574px', flex: 1 }}>
                <LocationSelect
                  hiddenLabel={true}
                  selected={selectedLocation}
                  onChange={handleChangeSelectedLocations}
                  isRecycleBin={false}
                  projectIds={[Number(projectId)]}
                  isSingleSelect={true}
                  disableAllSelect
                  sx={{ width: '100%' }}
                />
              </Box>
            </Stack>
            <Divider light sx={{ mt: 4 }} />
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
            {selectedTab === 0 && <LocationDetail locationId={selectedLocationId} />}
            {selectedTab === 1 && (
              <FloorPlanList locationId={selectedLocationId} projectId={Number(projectId)} />
            )}
            {selectedTab === 2 && <LocationDetailActivityList locationId={selectedLocationId} />}
          </Box>
        </>
      )}
    </Box>
  )
}

export default SettingProjectDetail
