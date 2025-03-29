import { TabContext, TabPanel } from "@mui/lab"
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material"
import { ITab } from "../../../../types/common"
import { FC, useMemo } from "react"
import DraggableFields from "./DraggableFields"
import { IField, IFieldState } from "./FormBuilder"
import FormModuleSettings from "./FormModuleSettings"

interface IProps {
  tabs: ITab[]
  currentTab: string,
  setCurrentTab: (tab: string) => void
  sidebarKey: any
  data: IFieldState
  setData: (v: any) => void
  selectedField: string
}

const FormModules:FC<IProps> = ({
  tabs,
  currentTab,
  setCurrentTab,
  sidebarKey,
  data,
  setData,
  selectedField
}) => {

  const field = useMemo(() => {
    return data.items.find((item) => item.id === selectedField)
  }, [selectedField, data])

  const changeHandler = (field: IField) => {
    setData((prev: any) => ({
      items: prev.items.map((a: IField) => (a.id === field.id ? field : a))
    }));
  }

  return (
    <Box sx={{border: theme => `1px solid ${theme.palette.divider}` }} key={sidebarKey}>
      <Box p={2}>
        <Typography variant="h4">Drag and Drop Form Modules</Typography>
      </Box>
      <Divider />
      <TabContext value={currentTab}>
        <Tabs
          textColor='primary'
          indicatorColor='primary'
          value={currentTab}
          onChange={(event: React.SyntheticEvent, newValue: string) => setCurrentTab(newValue)}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              value={tab.value}
              onClick={() => setCurrentTab(tab.value)}
            />
          ))}
        </Tabs>
        <Divider />
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={String(tab.value)} sx={{ p: '0', mt: '30px' }}>
            <Box>
              {
                tab.value === tabs?.[0].value &&
                <DraggableFields draggedFields={data?.items} />
              }
              {
                tab.value === tabs?.[1].value &&
                <FormModuleSettings
                  field={field}
                  onChange={changeHandler}
                />
              }
            </Box>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

export default FormModules