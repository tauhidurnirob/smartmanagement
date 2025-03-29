import { useState } from 'react'
import { Box, Typography, Card, Tab, Tabs } from '@mui/material'
import WashroomThresholdSettingsType from '../../modules/washroom/WashroomThresholdSettingsType'
import Api from '../../api'

const TAB_LIST = [
  { id: 'Ammonia Sensor', label: 'Ammonia Sensor' },
  { id: 'People Counter', label: 'People Counter' },
  { id: 'Feedback', label: 'Feedback' },
  { id: 'Smart Bin', label: 'Smart Bin' },
]

const WashroomThresholdSettings = () => {
  const [selectedTab, setSelectedTab] = useState<any>(0)

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: any) => {
    setSelectedTab(newValue)
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetDeviceTypeByFilterWithLocationQuery({});

  return (
    <Box>
      <Typography typography={'h3'} mb={2}>
        Threshold Settings
      </Typography>
      <Card sx={{ px: 3.5 }}>
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          aria-label='audit recycle bin'
          sx={{ overflowX: 'auto', '.MuiTabs-flexContainer': { gap: 3 } }}
          variant='scrollable'
          scrollButtons='auto'
        >
          {data && data.rows && data.rows.map((tab) => {
            return (
              <Tab
                key={tab.id}
                label={tab.deviceType}
                id={tab.id}
                aria-controls={`audit-form-template-panel-${tab.id}`}
                sx={{ px: 1, py: 2, minWidth: 0 }}
              />
            )
          })}
        </Tabs>
      </Card>
      {
        !isLoading &&
        <Box sx={{ mt: 2.75 }}>
          <WashroomThresholdSettingsType selectedType={data && data.rows && data.rows[selectedTab]} refetchTypeWithLocation={refetch}/>
        </Box>
      }
    </Box>
  )
}

export default WashroomThresholdSettings
