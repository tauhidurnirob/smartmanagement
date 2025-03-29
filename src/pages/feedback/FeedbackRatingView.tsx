import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import AuditRatingTemplateList from '../../modules/audit/audit-rating-template/AuditRatingTemplateList'

const TAB_LIST = [
  { id: 'rating-template', label: 'Rating Template' },
]

const FeedbackRatingView = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  return (
    <Box>
      <ButtonBack to={'/audit/audit-form-template'} />
      <Box
        mt={3}
        sx={{
          background: '#ffffff',
          pl: 3.75,
          pr: 1.75,
          mb: 3,
          borderRadius: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'} alignItems={'flex-end'}>
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
        </Box>
      </Box>
      <Box mt={3.75}>
        {selectedTab === 0 && <AuditRatingTemplateList />}
      </Box>
    </Box>
  )
}

export default FeedbackRatingView
