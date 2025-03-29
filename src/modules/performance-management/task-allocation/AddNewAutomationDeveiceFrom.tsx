import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  FormControlLabel,
  RadioGroup,
  FormControl,
  Radio,
  Alert,
  Snackbar,
} from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import DeleteIcon from '@mui/icons-material/Delete'
import SimpleSelect from '../../common/SimpleSelect'
import { FormikErrors, useFormik, useFormikContext } from 'formik'
import deepCopy from '../../../helpers/deepCopy'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import Api from '../../../api'
import { useLocation } from 'react-router-dom'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import DeviceTypeSelectGet from '../../device/DeviceTypeSelectGet'

export const RequiredItem = ({ ...rest }) => {
  return (
    <Typography
      variant='subtitle1'
      variantMapping={{ subtitle1: 'span' }}
      sx={{ color: (theme) => theme.palette.error.main }}
      {...rest}
    >
      *
    </Typography>
  )
}
const btnStyle = {
  display: 'flex',
  width: 200,
  height: 52,
  borderRadius: 42,
  alignItems: 'center',
  justifyContent: 'space-between',
  bgcolor: '#EDF6FF',
  pt: 1,
  pl: 2,
  pr: 2,
  pb: 1,
}

const statusNumOpt = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
]
const statusHighOpt = [
  { label: 'High', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Normal', value: 3 },
]
const statusOnOpt = [
  { label: 'On', value: 1 },
  { label: 'Off', value: 2 },
]

const errorStyle = {
  bgcolor: '#F1416C',
  BorderColor: '#F1416C',
  color: '#F1416C',
}
// And Or btn
const AddNodeBtn = ({
  onAddNode,
  type,
  onChange,
}: {
  formik: any
  onAddNode: (type: string) => void
  type: string
  onChange: () => void
}) => {
  // const [types, setTypes] = useState('And');
  const handleClick = (type: string) => {
    onChange()
    onAddNode('SetpNode') // Add a new "SetpNode" node
    onAddNode(type)
    if (type === 'And') {
      onAddNode(type) // Add a new "And" button
    } else {
      onAddNode(type) // Add a new "Or" button
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingBottom: 15,
      }}
    >
      <Box sx={btnStyle}>
        <Button
          variant='contained'
          sx={{ borderRadius: '74px', bgcolor: '#00A3FF', fontWeight: 400 }}
          startIcon={<AddOutlinedIcon />}
          onClick={() => handleClick('And')}
        >
          AND
        </Button>
        <Button
          variant='contained'
          sx={{ borderRadius: '74px', bgcolor: '#00A3FF', fontWeight: 400 }}
          startIcon={<AddOutlinedIcon />}
          onClick={() => handleClick('Or')}
        >
          OR
        </Button>
      </Box>

      <div
        style={{
          textAlign: 'center',
          padding: '10px 0 60px',
          fontSize: 14,
          fontWeight: 500,
          color: '#E74C3C',
          fontStyle: 'italic',
        }}
      >
        * adding “and” means all selected devices need to reached to the status. adding “or” means
        either devices status reached
      </div>
    </div>
  )
}

const DeviceStatus = ({
  item,
  idx,
  onChange,
  statusData,
}: {
  item: any
  idx: number
  onChange: any
  statusData: any
}) => {
  const optionsObj = useRef([{ label: 'No Data', value: 0 }])
  if (statusData) {
    optionsObj.current = statusData.map((item: any, index: number) => {
      return { label: item, value: index + 1 }
    })
  }
  return (
    <>
      <SimpleSelect
        value={item.status}
        //   value={selectedStatus[0].value === 0 ? item.status : selectedStatus[0]}
        onChange={(e: any) => {
          onChange(e)
        }}
        sx={{ width: '100%' }}
        variant='outlined'
        options={optionsObj.current}
        //   options={
        //     selectedDeviceType === 'air refresher'
        //       ? statusNumOpt
        //       : selectedDeviceType === 'cleaning'
        //       ? statusOnOpt
        //       : statusHighOpt
        //   }
        width={'100%'}
        placeholder={{ label: 'Status', value: 0 }}
      ></SimpleSelect>
    </>
  )
}

// Device Status form
export const SetpNode = ({
  formik,
  type,
  onChange,
  deviceType,
  onAddNode,
}: {
  formik: any
  type: string
  onChange: any
  deviceType?: string
  onAddNode?: any
}) => {
  const location = useLocation()
  const [SnackbarOpen, setSnackbar] = useState(false)
  const lastItem = formik?.values[type].list[formik?.values[type].list.length - 1]
  const LastOperaType = lastItem?.operaType
  //   const DeviceStatus = useRef([{ label: 'No Data', value: 0 }])
  //   const [selectedStatus, setSelectedStatus] = useState([{ label: 'No Data', value: 0 }])
  const deviceItemId = useRef(0)
  const DeviceIdData = useRef({
    status: ['No Data'],
    showButton: 'Action',
  })

  const handleChange = (idx: number, value: any, key: string) => {
    if (Array.isArray(value) && !value.length) return
    console.log(value, idx, key)
    if (key === 'deviceType') {
      delete value[0].categoryItem
      const list = deepCopy(formik.values[type].list)
      list[idx][key] = value[0]
      formik.setFieldValue(`${type}.list`, list)
      list[idx]['deviceList'] = undefined
      formik.setFieldValue(`${type}.list`, list)
      onChange()
    } else if (key === 'deviceList') {
      // formik.setFieldValue(`${type}.list`, list)
      console.log('value[0].value ==> ', value[0].value)
      //   getDeviceStatus(value[0].value)
      deviceItemId.current = value[0].value
      //   const sensorValue = 90
      //   const sensorValue = value[0].item.sensorValue
      //   let status = ''
      //   let tempVal = 0
      //   if (sensorValue <= 40) {
      //     status = 'Normal'
      //   } else if (sensorValue <= 70) {
      //     status = 'Medium'
      //   } else {
      //     status = 'High'
      //   }
      //   tempVal = status === 'Normal' ? 1 : status === 'Medium' ? 2 : 3
      //   setSelectedStatus([{ label: status, value: tempVal }])
      const list = deepCopy(formik.values[type].list)
      list[idx]['deviceList'] = { label: value[0].label, value: value[0].value }
      formik.setFieldValue(`${type}.list`, list)
      setTimeout(() => {
        formik.setFieldValue(`${type}.list[${idx}].status`, undefined)
      }, 40)
      onChange()
    } else {
      const list = deepCopy(formik.values[type].list)
      list[idx][key] = value
      formik.setFieldValue(`${type}.list`, list)
      onChange()
    }
  }
  const handleClose = () => {
    setSnackbar(false)
  }

  const handleDeleteStatusItem = (idx: number) => {
    let list = deepCopy(formik.values[type].list)
    list = list.filter((item: any, index: number) => {
      if (idx != index) {
        return true
      }
    })
    formik.setFieldValue(`${type}.list`, list)
    onChange()
  }
  const { state } = location
  console.log(' DeviceIdData.current.status ==> ', DeviceIdData.current.status)
  return (
    <>
      {formik?.values[type].list?.map((item: any, idx: number) => {
        const selectedDeviceType = item.deviceType?.label?.toLowerCase()
        const selectedDeviceTypeId = item.deviceType?.value
        return (
          <>
            <TextFieldWithLabel
              name='operaType'
              style={{ display: 'none' }}
              sx={{
                backgroundColor: 'red',
                color: '#000',
                fontWeight: 400,
                border: '1px solid #C7C7C7',
              }}
              value={item.operaType}
            />
            {idx !== 0 &&
              (item.operaType == 'And' ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant='contained'
                    sx={{ bgcolor: '#00A3FF', fontWeight: 400, borderRadius: '74px' }}
                    style={{
                      display: formik?.values[type].list.length > 1 ? 'block' : 'none',
                      width: '48px',
                      height: '34px',
                    }}
                  >
                    And
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant='contained'
                    sx={{ bgcolor: '#00A3FF', fontWeight: 400, borderRadius: '74px' }}
                    style={{
                      display: formik?.values[type].list.length > 1 ? 'block' : 'none',
                      width: '48px',
                      height: '34px',
                    }}
                  >
                    Or
                  </Button>
                </div>
              ))}
            <Box sx={{ pb: 1.5 }} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Device Type
                  <RequiredItem />
                </Typography>

                <DeleteIcon
                  sx={{ color: '#B5B5C3', mr: '-4px', cursor: 'pointer' }}
                  onClick={() => {
                    handleDeleteStatusItem(idx)
                  }}
                  style={{ display: formik?.values[type].list.length > 1 ? 'block' : 'none' }}
                />
              </Box>
              <DeviceTypeSelectGet
                selectedItems={item?.deviceType ? [item?.deviceType] : []}
                onChange={(e: any, data: any) => {
                  data.rows.find((item: any) => {
                    if (item.id === e[0].value) {
                      DeviceIdData.current.showButton = item.deviceCategory.deviceCategory
                      return true
                    }
                  })
                  handleChange(idx, e, 'deviceType')
                }}
                limit={10}
                labelForAll={'Device Type'}
                textColor='#a1a5b7'
                queryApiKey='useGetDeviceTypeQuery'
                dependencyIds={[state.projectId]}
                queryFilters={[state.projectId]}
                onParseItem={(item: any) => {
                  return {
                    value: item.id,
                    label: item.deviceType,
                  }
                }}
              />
              <div style={{ color: '#F1416C' }}>
                {formik.errors[type] &&
                  formik.errors[type].list &&
                  formik.errors[type].list[idx] &&
                  formik.errors[type].list[idx].deviceType}
              </div>
            </Box>
            <div style={{ display: 'flex', rowGap: 6, columnGap: 25 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Device List
                  <RequiredItem />
                </Typography>
                <DeviceTypeSelectGet
                  selectedItems={item?.deviceList ? [item?.deviceList] : []}
                  onChange={(e: any, data: any) => {
                    console.log('data ==> ', data)
                    data.rows.find((item: any) => {
                      if (item.id === e[0].value) {
                        DeviceIdData.current.status = item.deviceType.deviceStatus.statusList
                        return true
                      }
                    })
                    handleChange(idx, e, 'deviceList')
                  }}
                  limit={10}
                  labelForAll={'Device List'}
                  textColor='grey.800'
                  queryApiKey='useGetDeviceListQuery'
                  queryFilters={{
                    deviceTypeIds: selectedDeviceTypeId || [],
                    projectIds: state.projectId || [],
                    locationIds: state.locationId || [],
                    buildingIds: state.buildingIds || [],
                    levelIds: state.levelIds || [],
                    areaIds: state.areaIds || [],
                    unitIds: state.unitIds || [],
                    text: '',
                  }}
                  onParseItem={(item: any) => {
                    return {
                      value: item.id,
                      label: item.identificationNo,
                      item: item,
                    }
                  }}
                />
                {/* <DeviceSelect
                  hiddenLabel={true}
                  selected={item.deviceList ? [item.deviceList] : []}
                  onChange={(e, data) => {
                    data.rows.find((item: any) => {
                      if (item.id === e[0].value) {
                        DeviceIdData.current.status = item.deviceType.deviceStatus.statusList
                        return true
                      }
                    })
                    handleChange(idx, e, 'deviceList')
                  }}
                  disableAllSelect={true}
                  allowRemoval={false}
                  textColor='grey.800'
                  deviceTypeIds={selectedDeviceTypeId}
                  projectIds={state.projectId}
                  locationIds={state.locationId}
                  buildingIds={state.buildingIds}
                  levelIds={state.levelIds}
                  areaIds={state.areaIds}
                  unitIds={state.unitIds}
                /> */}
                <div style={{ color: '#F1416C' }}>
                  {formik.errors[type] &&
                    formik.errors[type].list &&
                    formik.errors[type].list[idx] &&
                    formik.errors[type].list[idx].deviceList}
                </div>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Status
                  <RequiredItem />
                </Typography>
                {/* statusData={[{ label: 'No Data', value: 0 }]} */}
                <DeviceStatus
                  statusData={DeviceIdData.current.status}
                  item={item}
                  idx={idx}
                  onChange={(e: any) => {
                    console.log('stautw ===e>', e)
                    if (e.value === 0 || e.label === 'No Data') {
                      setSnackbar(true)
                      return
                    }
                    handleChange(idx, e, 'status')
                  }}
                ></DeviceStatus>
                {/* <SimpleSelect
                  value={item.status}
                  //   value={selectedStatus[0].value === 0 ? item.status : selectedStatus[0]}
                  onChange={(e: any) => {
                    if (e.value === 0) return
                    handleChange(idx, e, 'status')
                  }}
                  sx={{ width: '100%' }}
                  variant='outlined'
                  options={DeviceIdData.current.status}
                  //   options={
                  //     selectedDeviceType === 'air refresher'
                  //       ? statusNumOpt
                  //       : selectedDeviceType === 'cleaning'
                  //       ? statusOnOpt
                  //       : statusHighOpt
                  //   }
                  width={'100%'}
                  placeholder={{ label: 'Status', value: 0 }}
                ></SimpleSelect> */}
                <div style={{ color: '#F1416C' }}>
                  {formik.errors[type] &&
                    formik.errors[type].list &&
                    formik.errors[type].list[idx] &&
                    formik.errors[type].list[idx].status}
                </div>
              </Box>
            </div>
            <Divider sx={{ pt: 1.5 }}></Divider>
            <Box sx={{ dispaly: 'flex' }}></Box>
          </>
        )
      })}
      {type === 'DeviceStatus' && DeviceIdData.current.showButton !== 'Action' && (
        <AddNodeBtn
          onChange={() => onChange()}
          formik={formik}
          onAddNode={onAddNode}
          type={'add'}
        />
      )}
      <Snackbar
        open={SnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='warning'>
          Please reselect Device List and try again.
        </Alert>
      </Snackbar>
    </>
  )
}
export const RobotStepNode = ({
  formik,
  type,
  onChange,
  onChange2,
  onAddNode,
}: {
  formik: any
  type: string
  onChange: () => void
  onChange2: () => void
  onAddNode: any
}) => {
  const showAndOr = useRef('Get')
  const refRobotType = useRef('')
  const handleDeleteStatusItem = (idx: number) => {
    let list = deepCopy(formik.values[type].list)
    list = list.filter((item: any, index: number) => {
      return idx != index
    })
    formik.setFieldValue(`${type}.list`, list)
    onChange()
  }
  const { data: dataRobot } = Api.useGetDeviceTypeQuery({
    /* params */
    page: 1,
    limit: 100,
    text: 'robot',
  })
  const handleChange = (idx: number, value: any, key: string) => {
    const tempRoboId: any = dataRobot?.rows.find((item: any) => {
      return item.id === value.value
    })
    if (tempRoboId && tempRoboId?.deviceCategory?.deviceCategory) {
      showAndOr.current = tempRoboId?.deviceCategory?.deviceCategory
    }
    const list = deepCopy(formik.values.Robot.list)
    list[idx][key] = value
    formik.setFieldValue('Robot.list', list)
    onChange()
    if (key === 'list') {
      list[idx].taskList = { value: 0, label: '' }
    }
  }
  return (
    <>
      {formik?.values?.Robot.list?.map((item: any, idx: number) => {
        return (
          <>
            <TextFieldWithLabel
              name='operaType'
              style={{ display: 'none' }}
              sx={{
                backgroundColor: 'red',
                color: '#000',
                fontWeight: 400,
                border: '1px solid #C7C7C7',
              }}
              value={item.operaType}
            />
            {idx !== 0 &&
              (item.operaType == 'And' ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant='contained'
                    sx={{ bgcolor: '#00A3FF', fontWeight: 400, borderRadius: '74px' }}
                    style={{
                      display: formik?.values[type].list.length > 1 ? 'block' : 'none',
                      width: '48px',
                      height: '34px',
                    }}
                  >
                    And
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant='contained'
                    sx={{ bgcolor: '#00A3FF', fontWeight: 400, borderRadius: '74px' }}
                    style={{
                      display: formik?.values[type].list.length > 1 ? 'block' : 'none',
                      width: '48px',
                      height: '34px',
                    }}
                  >
                    Or
                  </Button>
                </div>
              ))}
            <Box sx={{ pb: 1.5 }} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Robot Type
                  <RequiredItem />
                </Typography>
                <DeleteIcon
                  sx={{ color: '#B5B5C3', mr: '-4px' }}
                  onClick={() => {
                    handleDeleteStatusItem(idx)
                  }}
                  style={{ display: formik?.values[type].list.length > 1 ? 'block' : 'none' }}
                />
              </Box>
              <SimpleSelect
                value={item.type}
                onChange={(e: any) => {
                  handleChange(idx, e, 'type')
                }}
                sx={{ width: '100%' }}
                variant='outlined'
                options={
                  dataRobot && dataRobot?.rows.length > 0
                    ? dataRobot?.rows.map((item: any, key: any) => ({
                        label: item.deviceType,
                        value: item.id,
                      }))
                    : []
                }
                width={'100%'}
                placeholder={{ label: 'Robot Type', value: 1 }}
              ></SimpleSelect>
              <div style={{ color: '#F1416C' }}>
                {formik.errors[type] &&
                  formik.errors[type].list &&
                  formik.errors[type].list[idx] &&
                  formik.errors[type].list[idx].type}
              </div>
            </Box>
            <div style={{ display: 'flex', rowGap: 6, columnGap: 25 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Robot List
                  <RequiredItem />
                </Typography>
                {/* <SimpleSelect
                  value={item.list}
                  onChange={(e: any) => {
                    console.log('e ==> ', e)
                    handleChange(idx, e, 'list')
                  }}
                  sx={{ width: '100%' }}
                  variant='outlined'
                  options={
                    dataRobotList && dataRobotList?.rows.length > 0
                      ? dataRobotList?.rows.map((item: any, key: any) => ({
                          label: item.identificationNo,
                          value: item.id,
                        }))
                      : []
                  }
                  width={'100%'}
                  placeholder={{ label: 'Robot List', value: 1 }}
                ></SimpleSelect> */}
                <DeviceTypeSelectGet
                  selectedItems={item?.list ? [item?.list] : []}
                  onChange={(e: any, data: any) => {
                    data.rows.find((item: any) => {
                      if (item.id === e[0].value) {
                        refRobotType.current = item.robotType
                        return true
                      }
                    })
                    const tempObj = e[0]
                    delete tempObj.categoryItem
                    handleChange(idx, tempObj, 'list')
                  }}
                  limit={10}
                  labelForAll={'Robot List'}
                  textColor='#a1a5b7'
                  queryApiKey='useGetDeviceListQuery'
                  queryFilters={{
                    text: 'robot',
                  }}
                  onParseItem={(item: any) => {
                    return {
                      value: item.id,
                      label: item.identificationNo,
                    }
                  }}
                />
                <div style={{ color: '#F1416C' }}>
                  {formik.errors[type] &&
                    formik.errors[type].list &&
                    formik.errors[type].list[idx] &&
                    formik.errors[type].list[idx].list}
                </div>
              </Box>
            </div>
            <div style={{ display: 'flex', rowGap: 6, columnGap: 25, marginTop: '10px' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Task List
                  <RequiredItem />
                </Typography>
                <InfiniteMultipleSelect
                  selectedItems={item?.taskList ? [item?.taskList] : []}
                  queryFilters={{ robotType: refRobotType.current }}
                  limit={1000}
                  onChange={(e: any) => {
                    handleChange(idx, { value: e[0].value, label: e[0].label }, 'taskList')
                  }}
                  labelForAll={'Task List'}
                  isSingleSelect={true}
                  withCategory={true}
                  textColor='#a1a5b7'
                  queryApiKey='useGetRobotGetAvailableTasksQuery'
                  onParseItem={(item: any) => {
                    return {
                      label: item.name,
                      value: item.id,
                    }
                  }}
                />
                <div style={{ color: '#F1416C' }}>
                  {formik.errors[type] &&
                    formik.errors[type].list &&
                    formik.errors[type].list[idx] &&
                    formik.errors[type].list[idx].taskList}
                </div>
              </Box>
            </div>
            <Divider sx={{ pt: 1.5 }}></Divider>
            <Box sx={{ dispaly: 'flex' }}></Box>
          </>
        )
      })}
      {showAndOr.current === 'Get' && (
        <AddNodeBtn onChange={onChange2} formik={formik} onAddNode={onAddNode} type={'add'} />
      )}
    </>
  )
}
let AddNewTaskFromStatus = true
export const AddNewTaskFrom = ({ formik, type }: { formik?: any; type: string }) => {
  //   const [status, setStatus] = useState(true)
  const handleChangeValue = (key: string, value: string) => {
    if (AddNewTaskFromStatus) {
      AddNewTaskFromStatus = false
    }
    formik.setFieldValue(key, value)
  }
  const onChange2 = () => {
    if (AddNewTaskFromStatus) {
      AddNewTaskFromStatus = false
    }
  }
  const handleAddNode = (type: string) => {
    const list = deepCopy(formik.values?.add?.list)
    if (list.length == 1) {
      list[0].operaType = type
    }
    list.push({
      deviceType: undefined,
      deviceList: undefined,
      status: undefined,
      operaType: type,
    })
    formik.setFieldValue('add', {
      list,
      title: formik.values?.add?.title,
    })
  }
  return (
    <div>
      <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 1,
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant='h3'>Add New Automation Device</Typography>
          <Button
            variant='contained'
            sx={{ bgcolor: '#3699FF', fontWeight: 400 }}
            disabled={AddNewTaskFromStatus}
            onClick={() => {
              if (formik.isValid) {
                formik.handleSubmit()
                AddNewTaskFromStatus = true
              } else {
                // Display an error message to the user
                alert('Please select required fields')
              }
              // formik.handleSubmit()
            }}
          >
            Save
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ pl: 3, pr: 1.5, pt: 1.5, pb: 2 }}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
            Step Name
            <RequiredItem />
          </Typography>
          <TextFieldWithLabel
            showLabel
            size='small'
            fullWidth
            placeholder='Step Name'
            name='projectName'
            bgcolor='red'
            style={{ backgroundColor: 'red', color: '#fff' }}
            sx={{
              backgroundColor: 'rgba(0,0,0,0)',
              color: '#000',
              fontWeight: 400,
              border: '1px solid #C7C7C7',
            }}
            value={formik.values.add.title}
            onChange={(e) => handleChangeValue('add.title', e.target.value)}
          />
          <div style={{ color: '#F1416C' }}>{formik.errors.add && formik.errors.add.title}</div>
          <Typography variant='h4' sx={{ pt: 2, pb: 2 }}>
            Device Status
          </Typography>

          <SetpNode formik={formik} onChange={onChange2} type='add' />

          <AddNodeBtn formik={formik} onChange={onChange2} onAddNode={handleAddNode} type={type} />
        </Box>
      </Card>
    </div>
  )
}

let AddNewAutomationDeveiceFromStatus = true
export const AddNewAutomationDeveiceFrom = ({ formik }: { formik?: any }) => {
  const handleChangeValue = (key: string, value: string) => {
    formik.setFieldValue(key, value)

    if (AddNewAutomationDeveiceFromStatus) {
      AddNewAutomationDeveiceFromStatus = false
    }
  }
  const onChange2 = () => {
    if (AddNewAutomationDeveiceFromStatus) {
      AddNewAutomationDeveiceFromStatus = false
    }
  }
  const handleAddNode = (type: string) => {
    const list = deepCopy(formik.values?.DeviceStatus?.list)
    if (list.length == 1) {
      list[0].operaType = type
    }
    list.push({
      deviceType: undefined,
      deviceList: undefined,
      status: undefined,
      operaType: type,
    })
    formik.setFieldValue('DeviceStatus.list', list)
  }

  return (
    <div>
      <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 1,
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant='h3'>Add New Automation Device</Typography>
          <Button
            variant='contained'
            sx={{ bgcolor: '#3699FF', fontWeight: 400 }}
            disabled={AddNewAutomationDeveiceFromStatus}
            onClick={() => {
              formik.handleSubmit()
              AddNewTaskFromStatus = true
            }}
          >
            Save
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ pl: 3, pr: 1.5, pt: 1.5, pb: 2 }}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
            Step Name
            <RequiredItem />
          </Typography>
          <TextFieldWithLabel
            showLabel
            size='small'
            fullWidth
            bgcolor='red'
            placeholder='Device Status'
            name='projectName'
            style={{ backgroundColor: 'rgba(0,0,0,0)', color: '#fff' }}
            sx={{
              backgroundColor: 'rgba(0,0,0,0)',
              color: '#000',
              fontWeight: 400,
              border: '1px solid #C7C7C7',
            }}
            value={formik.values.DeviceStatus.title}
            onChange={(e) => handleChangeValue('DeviceStatus.title', e.target.value)}
          />
          <div style={{ color: '#F1416C' }}>
            {' '}
            {formik.errors.DeviceStatus && formik.errors.DeviceStatus.title}
          </div>
          <Typography variant='h4' sx={{ pt: 2, pb: 2 }}>
            Device Status
          </Typography>
          <SetpNode
            onChange={onChange2}
            formik={formik}
            type='DeviceStatus'
            onAddNode={handleAddNode}
          />
          {/* <AddNodeBtn onChange={onChange2} formik={formik} onAddNode={handleAddNode} type={'add'} /> */}
        </Box>
      </Card>
    </div>
  )
}

let AddCondictionFromStatus = true
export const AddCondictionFrom = ({ formik }: { formik?: any }) => {
  const handleChangeValue = (key: string, value: string) => {
    formik.setFieldTouched(key, true)
    formik.setFieldValue(key, value)
    if (AddCondictionFromStatus) {
      AddCondictionFromStatus = false
    }
  }
  const onChange2 = () => {
    if (AddCondictionFromStatus) {
      AddCondictionFromStatus = false
    }
  }
  let tempData: any = []
  if (Array.isArray(formik.values?.Condition?.list)) {
    tempData = formik.values?.Condition?.list
  } else {
    tempData = formik.values?.Condition?.list.list
  }
  return (
    <div>
      <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 1,
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant='h3'>Add New Automation Device</Typography>
          <Button
            variant='contained'
            sx={{ bgcolor: '#3699FF', fontWeight: 400 }}
            disabled={AddCondictionFromStatus}
            onClick={() => {
              if (formik.values?.Condition.mold || formik.values?.Condition.canAdd) {
                if (!formik.values?.Condition.mold) {
                  formik.setFieldValue('Condition.mold', formik.values.Condition.canAdd)
                }
                formik.handleSubmit()
                AddCondictionFromStatus = true
              }
            }}
          >
            Save
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ pl: 3, pr: 1.5, pt: 1.5, pb: 2 }}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
            Step Name
            <RequiredItem />
          </Typography>
          <TextFieldWithLabel
            showLabel
            size='small'
            fullWidth
            bgcolor='red'
            placeholder='Step Name'
            name='projectName'
            style={{ backgroundColor: 'red', color: '#fff' }}
            sx={{
              backgroundColor: 'red',
              color: '#000',
              fontWeight: 400,
              border: '1px solid #C7C7C7',
            }}
            value={formik.values?.Condition?.title || ''}
            onChange={(e) => {
              handleChangeValue('Condition.title', e.target.value)
            }}
          />
          <div style={{ color: '#F1416C' }}>
            {!formik.values.Condition.title &&
              formik.errors.Condition &&
              formik.errors.Condition.title}
          </div>

          <div
            style={{
              color: 'rgba(63, 66, 84, 1)',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: '500',
              marginTop: 25,
            }}
          >
            Condition
          </div>
          <FormControl>
            <RadioGroup
              aria-labelledby='sla-time-label'
              name='sla-time'
              value={formik.values?.Condition.mold || formik.values?.Condition?.canAdd || ''}
              onChange={(e) => {
                handleChangeValue('Condition.mold', e.target.value)
                handleChangeValue('Condition.canAdd', e.target.value)
                const item = tempData.find((item: any) => item.key == e.target.value)
                formik.setFieldTouched('Condition.mold', true)
                formik.setFieldValue('Condition.data', item)
              }}
            >
              {tempData.map((item: any) => {
                return (
                  <FormControlLabel
                    className='TaskDFLabel'
                    onChange={onChange2}
                    value={item.key}
                    sx={{ fontWeight: 500 }}
                    control={<Radio />}
                    label={item.title}
                  />
                )
              })}
            </RadioGroup>
            <div style={{ color: '#F1416C' }}>
              {!formik.values.Condition.mold &&
                formik.errors.Condition &&
                formik.errors.Condition.mold}
            </div>
          </FormControl>
        </Box>
      </Card>
    </div>
  )
}

let AddNewRobotFromStatus = true
export const AddNewRobotFrom = ({ formik }: { formik?: any }) => {
  const handleChangeValue = (key: string, value: string) => {
    formik.setFieldValue(key, value)
    if (AddNewRobotFromStatus) {
      AddNewRobotFromStatus = false
    }
  }

  const onChange2 = () => {
    if (AddNewRobotFromStatus) {
      AddNewRobotFromStatus = false
    }
  }
  const handleAddNode = (type: string) => {
    const list = deepCopy(formik.values.Robot.list)
    if (list.length == 1) {
      list[0].operaType = type
    }
    list.push({
      operaType: type,
    })

    formik.setFieldValue('Robot.list', list)
  }

  return (
    <div>
      <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 1,
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant='h3'>Add New Automation Device</Typography>
          <Button
            variant='contained'
            disabled={AddNewRobotFromStatus}
            sx={{ bgcolor: '#3699FF', fontWeight: 400 }}
            onClick={() => {
              formik.handleSubmit()
              AddNewRobotFromStatus = true
            }}
          >
            Save
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ pl: 3, pr: 1.5, pt: 1.5, pb: 2 }}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
            Step Name
            <RequiredItem />
          </Typography>
          <TextFieldWithLabel
            showLabel
            size='small'
            fullWidth
            bgcolor='red'
            placeholder='Step Name'
            name='projectName'
            style={{ backgroundColor: 'red', color: '#fff' }}
            sx={{
              backgroundColor: 'red',
              color: '#000',
              fontWeight: 400,
              border: '1px solid #C7C7C7',
            }}
            value={formik.values.Robot.title}
            onChange={(e) => handleChangeValue('Robot.title', e.target.value)}
          />
          <div style={{ color: '#F1416C' }}>{formik.errors.Robot && formik.errors.Robot.title}</div>
          <Typography variant='h4' sx={{ pt: 2, pb: 2 }}>
            Robot
          </Typography>
          <RobotStepNode
            onChange={onChange2}
            onChange2={onChange2}
            formik={formik}
            type='Robot'
            onAddNode={handleAddNode}
          />
          {/* <AddNodeBtn onChange={onChange2} formik={formik} onAddNode={handleAddNode} type={'add'} /> */}
        </Box>
      </Card>
    </div>
  )
}

let AddTimeFromStatus = true
export const AddTimeFrom = ({ formik }: { formik?: any }) => {
  const handleChangeValue = (key: string, value: string) => {
    formik.setFieldValue(key, value)
    if (AddTimeFromStatus) {
      AddTimeFromStatus = false
    }
  }
  return (
    <div>
      <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 1,
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant='h3'>Add New Automation Device</Typography>
          <Button
            variant='contained'
            disabled={AddTimeFromStatus}
            sx={{ bgcolor: '#3699FF', fontWeight: 400 }}
            onClick={() => {
              formik.handleSubmit()
              AddTimeFromStatus = true
            }}
          >
            Save
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ pl: 3, pr: 1.5, pt: 1.5, pb: 2 }}>
          <Typography variant='h4' sx={{ pt: 2, pb: 2 }}>
            Stop Automation Process at
          </Typography>
          <div className='automationIcon' style={{ display: 'flex', rowGap: 6, columnGap: 25 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                Length of Time
                <RequiredItem />
              </Typography>
              <TextFieldWithLabel
                showLabel={false}
                placeholder='Type Length  of Time'
                value={formik.values?.Time?.time}
                sx={{ height: '44px' }}
                onChange={(e) => {
                  if (!formik.values.Time.timeType) {
                    handleChangeValue('Time.timeType', { label: 'Minutes', value: 2 } as any)
                  }
                  handleChangeValue('Time.time', e.target.value)
                }}
                type='number'
                name='ratingEnd'
                InputProps={{ inputProps: { min: 0 } }}
              />
              <div style={{ color: '#F1416C' }}>
                {formik.errors.Time && formik.errors.Time.time}
              </div>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                &nbsp;
              </Typography>
              <SimpleSelect
                value={formik?.values?.Time?.timeType || { label: 'Minutes', value: 2 }}
                onChange={(e: any) => {
                  handleChangeValue('Time.timeType', e)
                }}
                color='#000'
                sx={{ width: '100%', height: '44px' }}
                options={[{ label: 'Minutes', value: 2 }]}
                placeholder={{ label: 'Minutes', value: 2 }}
                width={'100%'}
              ></SimpleSelect>
              <div style={{ color: '#F1416C' }}>
                {formik.errors.Time && formik.errors.Time.timeType}
              </div>
            </Box>
          </div>
        </Box>
      </Card>
    </div>
  )
}

export const CleanerStepNode = ({
  formik,
  type,
  onChange,
}: {
  formik: any
  type: string
  onChange: () => void
}) => {
  const handleChange = (idx: number, value: any, key: string) => {
    const list = deepCopy(formik.values.Cleaner.list)
    list[idx][key] = value
    formik.setFieldValue('Cleaner.list', list)
    onChange()
  }

  const handleDeleteStatusItem = (idx: number) => {
    let list = deepCopy(formik.values[type].list)
    list = list.filter((item: any, index: number) => {
      return idx != index
    })
    formik.setFieldValue(`${type}.list`, list)
    onChange()
  }
  const { data: roleList } = Api.useGetRoleListQuery({ page: 1, limit: 10, text: 'Cleaner' })
  //   const { data: CleanerList } = Api.useGetUserListQuery({ page: 1, limit: 10, roleIds: 14 })
  //   console.log('CleanerList ==> ', CleanerList)
  //   if (roleList && roleList.rows[0].id) {
  //     console.log('roleList ==> ', roleList.rows[0].id)
  //   }
  return (
    <>
      {formik?.values?.Cleaner.list?.map((item: any, idx: number) => {
        return (
          <>
            <Box sx={{ pb: 1.5 }} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Cleaner
                  <RequiredItem />
                </Typography>
                <DeleteIcon
                  sx={{ color: '#B5B5C3', mr: '-4px' }}
                  onClick={() => {
                    handleDeleteStatusItem(idx)
                  }}
                  style={{ display: formik?.values[type].list.length > 1 ? 'block' : 'none' }}
                />
              </Box>
              <InfiniteMultipleSelect
                selectedItems={item?.cleaner ? [item?.cleaner] : []}
                onChange={(e: any) => {
                  console.log('adfas', e)
                  handleChange(idx, { value: e[0].value, label: e[0].label }, 'cleaner')
                }}
                limit={10}
                labelForAll={'Cleaner'}
                isSingleSelect={true}
                withCategory={true}
                textColor='#a1a5b7'
                queryApiKey='useGetUserListQuery'
                queryFilters={{ roleIds: roleList?.rows ? roleList.rows[0].id : 14 }}
                onParseItem={(item: any) => {
                  return {
                    value: item.id,
                    label: item.fullName,
                  }
                }}
              />
              {/* <SimpleSelect
                value={item.cleaner}
                onChange={(e: any) => {
                  console.log('adfas', e)
                  handleChange(idx, e, 'cleaner')
                }}
                sx={{ width: '100%' }}
                variant='outlined'
                options={
                  CleanerList && CleanerList?.rows.length > 0
                    ? CleanerList.rows.map((item: any) => ({
                        label: item.fullName,
                        value: item.id,
                      }))
                    : []
                }
                color='#000'
                width={'100%'}
                placeholder={{ label: 'Select Cleaner', value: 1 }}
              ></SimpleSelect> */}
              <div style={{ color: '#F1416C' }}>
                {formik.errors[type] &&
                  formik.errors[type].list &&
                  formik.errors[type].list[idx] &&
                  formik.errors[type].list[idx].cleaner}
              </div>
            </Box>
            <div style={{ display: 'flex', rowGap: 6, columnGap: 25 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  TAT (turnaround time)
                  <RequiredItem />
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TextFieldWithLabel
                      showLabel={false}
                      placeholder='TAT'
                      value={item?.turnaroundTime || ''}
                      onChange={(e) => {
                        if (!item.turnaroundTimeType) {
                          handleChange(idx, { label: 'Minutes', value: 1 }, 'turnaroundTimeType')
                        }
                        handleChange(idx, e.target.value, 'turnaroundTime')
                      }}
                      height='42px'
                      type='number'
                      sx={{ width: '281px', marginRight: '22px' }}
                      name='ratingEnd'
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                    <div style={{ color: '#F1416C' }}>
                      {formik.errors[type] &&
                        formik.errors[type].list &&
                        formik.errors[type].list[idx] &&
                        formik.errors[type].list[idx].turnaroundTime}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SimpleSelect
                      value={item.turnaroundTimeType || { label: 'Minutes', value: 1 }}
                      onChange={(e: any) => {
                        handleChange(idx, e, 'turnaroundTimeType')
                      }}
                      color='#000'
                      variant='outlined'
                      options={[{ label: 'Minutes', value: 1 }]}
                      width={'128px'}
                      placeholder={{ label: 'Minutes', value: 1 }}
                    ></SimpleSelect>
                    <div style={{ color: '#F1416C' }}>
                      {formik.errors[type] &&
                        formik.errors[type].list &&
                        formik.errors[type].list[idx] &&
                        formik.errors[type].list[idx].turnaroundTimeType}
                    </div>
                  </div>
                </Box>
              </Box>
            </div>
            <div style={{ display: 'flex', rowGap: 6, columnGap: 25, marginTop: 12 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Reminder
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <TextFieldWithLabel
                      showLabel={false}
                      placeholder='Reminder'
                      value={item?.reminder}
                      onChange={(e) => {
                        handleChange(idx, e.target.value, 'reminder')
                        if (!item.reminderType) {
                          handleChange(idx, { label: 'Minutes', value: 1 }, 'reminderType')
                        }
                      }}
                      height='42px'
                      type='number'
                      name='ratingEnd'
                      sx={{ width: '281px', marginRight: '22px' }}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                    <div style={{ color: '#F1416C' }}>
                      {formik.errors[type] &&
                        formik.errors[type].list &&
                        formik.errors[type].list[idx] &&
                        formik.errors[type].list[idx].reminder}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <SimpleSelect
                      value={item.reminderType || { label: 'Minutes', value: 1 }}
                      onChange={(e: any) => {
                        handleChange(idx, e, 'reminderType')
                      }}
                      color='#000'
                      variant='outlined'
                      options={[{ label: 'Minutes', value: 1 }]}
                      width={'128px'}
                      placeholder={{ label: 'Minutes', value: 1 }}
                    ></SimpleSelect>
                    <div style={{ color: '#F1416C' }}>
                      {formik.errors[type] &&
                        formik.errors[type].list &&
                        formik.errors[type].list[idx] &&
                        formik.errors[type].list[idx].reminderType}
                    </div>
                  </div>
                </Box>
              </Box>
            </div>
            <Divider sx={{ pt: 1.5 }}></Divider>
            <Box sx={{ dispaly: 'flex' }}></Box>
          </>
        )
      })}
    </>
  )
}

let AddNewCleanerFromStatus = true
export const AddNewCleanerFrom = ({ formik }: { formik?: any }) => {
  const handleChangeValue = (key: string, value: string) => {
    formik.setFieldValue(key, value)
    if (AddNewCleanerFromStatus) {
      AddNewCleanerFromStatus = false
    }
  }
  const onchange2 = () => {
    if (AddNewCleanerFromStatus) {
      AddNewCleanerFromStatus = false
    }
  }
  const handleAddNode = (type: string) => {
    const list = deepCopy(formik.values.Cleaner.list)
    if (list.length == 1) {
      list[0].operaType = type
    }
    list.push({
      operaType: type,
    })
    formik.setFieldValue('Cleaner.list', list)
  }

  return (
    <div>
      <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 3,
            pr: 1,
            pt: 1,
            pb: 1,
          }}
        >
          <Typography variant='h3'>Add New Automation Device</Typography>
          <Button
            variant='contained'
            disabled={AddNewCleanerFromStatus}
            sx={{ bgcolor: '#3699FF', fontWeight: 400 }}
            onClick={() => {
              formik.handleSubmit()
              AddNewCleanerFromStatus = true
            }}
          >
            Save
          </Button>
        </Box>
        <Divider></Divider>
        <Box sx={{ pl: 3, pr: 1.5, pt: 1.5, pb: 2 }}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
            Step Name
            <RequiredItem />
          </Typography>
          <TextFieldWithLabel
            showLabel
            bgcolor='red'
            size='small'
            fullWidth
            placeholder='Step Name'
            name='projectName'
            style={{ backgroundColor: 'red', color: '#fff' }}
            sx={{
              backgroundColor: 'red',
              color: '#000',
              fontWeight: 400,
              border: '1px solid #C7C7C7',
            }}
            value={formik.values.Cleaner.title}
            onChange={(e) => handleChangeValue('Cleaner.title', e.target.value)}
          />
          <div style={{ color: '#F1416C' }}>
            {formik.errors.Cleaner && formik.errors.Cleaner.title}
          </div>
          <Typography variant='h4' sx={{ pt: 2, pb: 2 }}>
            Cleaner
          </Typography>
          <CleanerStepNode onChange={onchange2} formik={formik} type='Cleaner' />
          <AddNodeBtn onChange={onchange2} formik={formik} onAddNode={handleAddNode} type={'add'} />
        </Box>
      </Card>
    </div>
  )
}

export const StopAutomation = () => {
  return (
    <Card sx={{ maxWidth: 489, minHeight: 300, borderRadius: '6px 6px 0px 0px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pl: 3,
          pr: 1,
          pt: 1,
          pb: 1,
        }}
      >
        <Typography variant='h3'>Add New Automation Device</Typography>
      </Box>
      <Divider></Divider>
    </Card>
  )
}
