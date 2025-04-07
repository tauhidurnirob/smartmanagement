import { Button, Popper, styled, Box, Typography } from '@mui/material'
import { AddFlowIcon } from '../../../assets/icons/add-flow'
import { RemoveFlowIcon } from '../../../assets/icons/remove-flow'
import { Node } from '@antv/x6'
import {
  trigged,
  emptyInput,
  emptyInput2,
  boxStyled,
  deleteSty2,
  boxTitle,
  loopNodeItem,
  nodeDesc,
  nodeChoose,
  nodeStatus,
  addBtn,
  triggelineButton,
  deleteSty,
} from './AutomationTaskFlowChartComponentStyled'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import SvgIcon from '@mui/material/SvgIcon'
import { useState, useRef, useMemo } from 'react'

const ActivityBtns = styled(Button)({
  border: '1px solid #C7C7C7',
  textTransform: 'none',
  borderRadius: '2px',
  fontWeight: '700',
  fontSize: 15,
  color: '#000',
  p: 2,
  width: '93.12px',
  height: '54.15px',
  '&:hover': {
    backgroundColor: '#3699FF',
    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, .3)',
    color: '#fff',
  },
})

let tempDom: any = {}
const activeShap = (divBom: any, cleaner?: boolean) => {
  if (cleaner) {
    if (!tempDom.style) return
    tempDom.style.border = '1px solid rgba(0,0,0,0)'
  } else {
    if (!divBom.id) return
    if (tempDom.style) {
      tempDom.style.border = '1px solid rgba(0,0,0,0)'
    }
    divBom.style.border = '1px solid #3699ff'
    tempDom = divBom
  }
}

export default function TrashIcon({ onClick, sx }: any) {
  const handleIconClick = (e: any) => {
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <SvgIcon sx={sx} onClick={handleIconClick}>
      <svg
        viewBox='0 0 1024 1024'
        version='1.1'
        style={{ width: '15px', height: '20.36px' }}
        width='15px'
        height='20.36px'
      >
        <path
          d='M147.2 944C147.2 988.8 182.4 1024 224 1024h576c44.8 0 76.8-35.2 76.8-80V278.4H147.2v665.6z'
          fill='#b5b5c3'
        ></path>
        <path
          d='M876.8 105.6h-185.6V51.2C691.2 22.4 665.6 0 640 0h-256c-28.8 0-51.2 22.4-51.2 51.2v54.4H147.2C118.4 105.6 96 128 96 156.8c0 28.8 22.4 51.2 51.2 51.2h729.6c28.8 0 51.2-22.4 51.2-51.2 0-25.6-22.4-51.2-51.2-51.2z'
          fill='#e9e9ed'
        ></path>
      </svg>
    </SvgIcon>
  )
}

export const CustomTriggedTag = ({}) => {
  const StyleButton = styled(Button)(({ theme }) => ({
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: '14px',
    alignItems: 'center',
    border: '1px dashed #c0c0c0',
    width: ' 100%',
    height: ' 100%',
    borderRadius: '126px',
    color: '#a1a5b7',
    textAlign: 'center',
    lineHeight: 'normal',
    textTransform: 'none',
  }))
  return (
    <Box sx={trigged}>
      <StyleButton variant='outlined'>Triggered</StyleButton>
    </Box>
  )
}
const msgObj: any = {
  add: 'Device Status',
  DeviceStatus: 'Device Status',
  Condition: 'Condition',
  Time: 'Stop Automation Process at:  -',
  Robot: 'Robot',
  Cleaner: 'Cleaner',
}
export const emptyStepContainer = ({ node }: { node: Node }) => {
  const handleBoxClick = (e: any) => {
    activeShap(e.currentTarget)
    node.data.editNode?.(node)
  }
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }
  return (
    <>
      {node?.data?.type == 'Time' ? (
        <>
          <Box sx={emptyInput2} id='time1' onClick={handleBoxClick}>
            {msgObj[node?.data?.type]}
          </Box>
          <TrashIcon
            sx={deleteSty2}
            onClick={(e: any) => {
              handleDelete()
              e.stopPropagation()
            }}
          />
        </>
      ) : (
        <Box sx={emptyInput} onClick={handleBoxClick}>
          {msgObj[node?.data?.type] ? msgObj[node?.data?.type] : 'Device Status'}
          {node?.id !== 'node1' && (
            <TrashIcon
              sx={deleteSty}
              onClick={(e: any) => {
                handleDelete()
                e.stopPropagation()
              }}
            ></TrashIcon>
          )}
        </Box>
      )}
    </>
  )
}
// niubi
export const CustomNormalNodeContainer = ({ node }: { node: Node }) => {
  const { formik, list, title, type } = node.getData()
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }

  const setState = useRef(0)
  useMemo(() => {
    if (formik) {
      formik.setFieldValue(type, {
        list,
        title,
      })
    }
  }, [setState.current])
  const setAddDetail = (type: string) => {
    node?.data?.addNewType?.(node, type)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const popoverRef = useRef<any>(null)
  const [arrowRef, setArrowRef] = useState(null)
  const handleBoxClick = (e: any) => {
    activeShap(e.currentTarget)
    node.data.editNode?.(node)
    setState.current += 1
  }
  return (
    <Box sx={boxStyled} id='shapBox' onClick={handleBoxClick}>
      <Box sx={boxTitle}>{node?.data?.title}</Box>
      {node.data.key !== '1' && (
        <TrashIcon
          sx={deleteSty}
          onClick={(e: any) => {
            e.stopPropagation()
            handleDelete()
          }}
        />
      )}

      <Box>
        {node?.data?.list &&
          node?.data?.list?.map((item: any, idx: number) => {
            return (
              <Box
                key={idx}
                sx={{
                  ...loopNodeItem,
                  marginBottom: idx == node?.data?.list.length - 1 ? '14px' : '0',
                }}
              >
                {node?.data?.list.length > 1 && <Box sx={nodeChoose}>{item?.operaType}</Box>}
                {/* <Box sx={nodeChoose}>{item?.operaType}</Box> */}
                <Box sx={{ ...nodeDesc, padding: node?.data?.list.length > 1 ? '0 9px' : 0 }}>
                  {item?.deviceType?.label}-{item?.deviceList?.label}
                </Box>
                <Box sx={nodeStatus}>{item?.status?.label}</Box>
              </Box>
            )
          })}
      </Box>

      {node?.data?.canAdd ? (
        <>
          <Box ref={popoverRef} sx={addBtn}>
            {node?.data?.canAdd == 'add' ? (
              <AddFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  activeShap(activeShap, true)
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            ) : (
              <RemoveFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            )}
          </Box>
          <Popper
            anchorEl={popoverRef.current}
            id={`addflow${node.id}`}
            open={node?.data?.canAdd == 'remove'}
            placement='bottom'
            container={popoverRef.current}
            sx={{ borderRadius: 2, width: '330px' }}
            popperOptions={{
              placement: 'bottom',
            }}
          >
            <Box sx={{ p: 2, background: '#fff' }}>
              <Typography
                variant='h5'
                sx={{
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Add activity
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('DeviceStatus')
                  }}
                >
                  Device
                  <br /> Status
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Condition')
                  }}
                >
                  Condition
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('Time')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Time
                </ActivityBtns>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('StopAutomation')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Stop
                  <br /> Automation
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Robot')
                  }}
                >
                  Robot
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Cleaner')
                  }}
                >
                  Cleaner
                </ActivityBtns>
              </Box>
            </Box>
          </Popper>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
// showAllCompoent
export const CustomNormalCondictionContainer = ({ node }: { node: Node }) => {
  const timeTypeMapper: { [key: string]: string } = {
    1: 'Sec',
    2: 'Mins',
    3: 'Hour',
  }
  const { formik, list, title } = node.getData()

  // review
  let tempData: any = {}
  if (node.data.canAdd && !node.data.mold) {
    const tempMold = node?.data?.mold || node.data.canAdd
    tempData = node.data.list.find((item: any) => {
      return item.key === tempMold
    })
  }
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }
  const setState = useRef(0)
  useMemo(() => {
    if (formik) {
      //   formik.setFieldValue('Robot', {
      //     list,
      //     title,
      //   })
    }
  }, [setState.current])
  const handleClick = (e: any) => {
    activeShap(e.currentTarget)
    node.data.editNode?.(node)
    setState.current = setState.current + 1
  }
  return (
    <>
      {node?.data?.type !== 'StopAutomation' ? (
        <Box sx={boxStyled} id='shapBox2' onClick={handleClick}>
          <Box sx={boxTitle}>{node?.data?.title}</Box>
          {node?.data?.data?.type == 'DeviceStatus' ||
          node?.data?.data?.type == 'add' ||
          node?.data?.type == 'Condition' ? (
            <Box>
              {node?.data?.data?.list.map((item: any, idx: number) => {
                if (typeof item === 'number') return <></>
                return (
                  <Box
                    key={idx}
                    sx={{
                      ...loopNodeItem,
                      marginBottom: idx == node?.data?.data?.list.length - 1 ? '14px' : '0',
                    }}
                  >
                    {node?.data?.data?.list.length > 1 && (
                      <Box sx={nodeChoose}>{item?.operaType}</Box>
                    )}
                    <Box
                      sx={{ ...nodeDesc, padding: node?.data?.data?.list.length > 1 ? '0 9px' : 0 }}
                    >
                      {item?.deviceType?.label}-{item?.deviceList?.label}
                    </Box>
                    <Box sx={nodeStatus}>{item?.status?.label}</Box>
                  </Box>
                )
              })}
            </Box>
          ) : (
            ''
          )}
          {tempData?.type == 'DeviceStatus' || tempData?.type == 'add' ? (
            <Box sx={{ border: '1px solid rgba(0,0,0,0)' }} id='shapBox7'>
              {tempData.list.map((item: any, idx: number) => {
                if (typeof item === 'number') return <></>
                return (
                  <Box
                    key={idx}
                    sx={{
                      ...loopNodeItem,
                      marginBottom: idx == tempData.list.length - 1 ? '14px' : '0',
                    }}
                  >
                    {tempData.list.length > 1 && <Box sx={nodeChoose}>{item?.operaType}</Box>}
                    <Box sx={{ ...nodeDesc, padding: tempData.list.length ? '0 9px' : 0 }}>
                      {item?.deviceType?.label}-{item?.deviceList?.label}
                    </Box>
                    <Box sx={nodeStatus}>{item?.status?.label}</Box>
                  </Box>
                )
              })}
            </Box>
          ) : (
            ''
          )}
          {node?.data?.data?.type == 'Robot' && (
            <Box>
              {node?.data?.data?.list.map((item: any, idx: number) => {
                return (
                  <Box
                    key={idx}
                    sx={{
                      ...loopNodeItem,
                      marginBottom: idx == node?.data?.data?.list.length - 1 ? '14px' : '0',
                    }}
                  >
                    {node?.data?.data?.list.length > 1 && (
                      <Box sx={nodeChoose}>{item?.operaType}</Box>
                    )}

                    <Box
                      sx={{ ...nodeDesc, padding: node?.data?.data?.list.length > 1 ? '0 9px' : 0 }}
                    >
                      {item?.type?.label}-{item?.list?.label}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          )}
          {node?.data?.data?.type == 'Time' && (
            <TextFieldWithLabel
              showLabel
              size='small'
              fullWidth
              sx={{
                '& .MuiInputBase-input': {
                  bgcolor: '#ffffff',
                  height: '100%',
                  fontSize: '16px !important',
                  fontWeight: '700',
                },
              }}
              placeholder='Project Name'
              name='projectName'
              style={{
                borderRadius: '126px',
                width: '340px',
                height: '72px',
              }}
              value={`Stop Automation Process at:  ${node.data.time} ${
                timeTypeMapper[node.data.timeType?.value]
              }`}
            />
          )}
          {node?.data?.data?.type === 'Cleaner' && (
            <Box>
              {node?.data?.data?.list.map((item: any, idx: number) => {
                return (
                  <Box
                    key={idx}
                    sx={{
                      ...loopNodeItem,
                      marginBottom: idx == node?.data?.data?.list.length - 1 ? '14px' : '0',
                    }}
                  >
                    {/* <Box sx={nodeChoose}>{item?.cleaner.label}</Box> */}
                    <Box sx={nodeDesc}>
                      {item?.cleaner?.label}-{item.turnaroundTimeType.value}
                      {item.turnaroundTimeType.label}
                      {/* {item.turnaroundTimeType?.label} */}
                    </Box>
                    <Box sx={nodeDesc}>
                      {item?.cleaner?.label}-{item.reminderType?.value}
                      {item.reminderType?.label}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          )}
          <TrashIcon
            sx={deleteSty}
            onClick={(e: any) => {
              e.stopPropagation()
              handleDelete()
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid rgba(0,0,0,0)',
          }}
        >
          <Button
            disabled
            sx={{
              width: '241px',
              height: '72px',
              borderRadius: '126px',
              color: '#fff !important',
              background: '#A1A5B7',
              textTransform: 'none',
            }}
          >
            Stop Automation
          </Button>
        </Box>
      )}
    </>
  )
}

export const CustomHighCondiction = ({ node }: { node: Node }) => {
  const StyleButton = styled(Button)(({ theme }) => ({
    padding: '4px 8px',
    fontWeight: 'bold',
    fontSize: '14px',
    alignItems: 'center',
    border: '1px dashed #c0c0c0',
    width: ' 100%',
    height: ' 100%',
    borderRadius: '126px',
    color: '#a1a5b7',
    textAlign: 'center',
    lineHeight: 'normal',
  }))
  return (
    <Box
      style={{
        width: '104px',
        height: ' 36px',
        position: 'absolute',
        left: '50%',
        transform: ' translateX(-50%)',
      }}
    >
      <StyleButton variant='outlined'>{node.data?.msg}</StyleButton>
    </Box>
  )
}

type deviceStatus = {
  high: string[]
  normal: string[]
  medium: string[]
  other1: string[]
  other2: string[]
  other3?: string[]
  [key: string]: any
}
const deviceStatusObj: deviceStatus = {
  high: ['high', 'full'],
  normal: ['low', 'normal', 'pause'],
  medium: ['medium'],
  other1: ['on', 'open', 'wet', 'available'],
  other2: ['off', 'close', 'dry', 'non-available'],
}
const statusCor: deviceStatus = {
  high: ['#FFF5F8', '#F1416C'],
  normal: ['#E4E6EF', '#5E6278'],
  medium: ['#fef6d5', '#e86e30'],
  other1: ['#D0E6F6', '#3C8DC5'],
  other2: ['#F7F4D5', '#BFAE4B'],
  other3: ['#CCE5FF  ', '#0066CC '],
}

export const CustomCondictionChildren = ({ node }: { node: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [arrowRef, setArrowRef] = useState(null)
  const popoverRef = useRef<any>(null)
  const setAddDetail = (type: string) => {
    node?.data?.addNewType?.(node, type)
  }
  let tempKey = ''
  for (const key in deviceStatusObj) {
    deviceStatusObj[key].find((item: string) => {
      if (node?.data?.type.toLowerCase() == item) {
        tempKey = key
        return key
      }
    })
    if (tempKey) break
  }
  if (!tempKey) {
    tempKey = 'other3'
  }
  return (
    <Box sx={{ triggelineButton }} id='shapBox3'>
      <Button sx={triggelineButton}>
        <div
          style={{
            background: statusCor[tempKey][0],
            width: '83px',
            height: '33px',
            margin: 'auto',
            color: statusCor[tempKey][1],
            borderRadius: '6px',
            textTransform: 'none',
          }}
        >
          {node?.data?.type}
        </div>
      </Button>
      {node?.data?.canAdd ? (
        <>
          <Box ref={popoverRef} sx={addBtn}>
            {node?.data?.canAdd == 'add' ? (
              <AddFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  activeShap(activeShap, true)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            ) : (
              <RemoveFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            )}
          </Box>
          <Popper
            anchorEl={popoverRef.current}
            id={`addflow${node.id}`}
            open={node?.data?.canAdd == 'remove'}
            placement='bottom'
            container={popoverRef.current}
            sx={{ borderRadius: 2, width: '330px' }}
            popperOptions={{
              placement: 'bottom',
            }}
            modifiers={[
              {
                name: 'arrow',
                enabled: true,
                options: {
                  element: arrowRef,
                },
              },
            ]}
          >
            <Box sx={{ p: 2, background: '#fff' }}>
              <Typography
                variant='h5'
                sx={{
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Add activity
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('DeviceStatus')
                  }}
                >
                  Device
                  <br /> Status
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Condition')
                  }}
                >
                  Condition
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('Time')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Time
                </ActivityBtns>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('StopAutomation')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Stop
                  <br /> Automation
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Robot')
                  }}
                >
                  Robot
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Cleaner')
                  }}
                >
                  Cleaner
                </ActivityBtns>
              </Box>
            </Box>
          </Popper>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
export const CustomStopAutomation = ({ node }: { node: any }) => {
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(0,0,0,0)',
      }}
      onClick={() => {
        activeShap(0, true)
      }}
    >
      <Button
        disabled
        sx={{
          width: '241px',
          height: '72px',
          borderRadius: '126px',
          fontSize: '18px',
          color: '#fff !important',
          background: '#A1A5B7',
          textTransform: 'none',
        }}
      >
        Stop Automation
      </Button>
      <TrashIcon
        sx={{ color: '#B5B5C3', mr: '-4px', cursor: 'pointer' }}
        onClick={(e: any) => {
          handleDelete()
          e.stopPropagation()
        }}
      />
    </Box>
  )
}

export const CustomTime = ({ node }: { node: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [arrowRef, setArrowRef] = useState(null)
  const popoverRef = useRef<any>(null)
  const setAddDetail = (type: string) => {
    node?.data?.addNewType?.(node, type)
  }
  const { formik, title, list, time, timeType } = node.getData()
  const setState = useRef(0)
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }
  useMemo(() => {
    if (formik) {
      formik.setFieldValue('Time', {
        time: parseInt(title || time),
        timeType: list || timeType,
      })
    }
  }, [setState.current])

  const handleEdit = (e: any) => {
    setState.current = setState.current + 1
    node?.data?.editNode?.(node)
  }
  const handleEdit2 = (e: any) => {
    activeShap(e.currentTarget)
  }

  const timeTypeMapper: { [key: string]: string } = {
    1: 'Sec',
    2: 'Mins',
    3: 'Hour',
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      id='shapBox4'
      onClick={handleEdit}
    >
      <Box
        onClick={handleEdit2}
        sx={{
          ...emptyInput2,
          color: '#000',
          padding: '26px 2px',
          textAlign: 'center',
          lineHeight: 'auto',
          width: '340px',
          height: '72px',
          border: '1px solid rgba(0,0,0,0)',
        }}
        id='time2'
      >
        {`Stop Automation Process at:  ${node.data.time || node.data.title} ${
          timeTypeMapper[
            node.data.timeType?.value ? node.data.timeType?.value : node.data?.list?.value
          ]
        }`}
      </Box>
      <TrashIcon
        sx={{ color: '#B5B5C3', position: 'absolute', right: '-9%', top: '38%', cursor: 'pointer' }}
        onClick={(e: any) => {
          handleDelete()
          e.stopPropagation()
        }}
      />
      {/* <TextFieldWithLabel
        showLabel
        size='small'
        fullWidth
        sx={{
          '& .MuiInputBase-input': {
            bgcolor: '#ffffff',
            height: '100%',
            fontSize: '18px',
            fontWeight: '700',
          },
        }}
        placeholder='Project Name'
        name='projectName'
        style={{ borderRadius: '126px', width: '340px', height: '72px', position: 'relative' }}
        value={`Stop Automation Process at:  ${node.data.time || node.data.title} ${
          timeTypeMapper[
            node.data.timeType?.value ? node.data.timeType?.value : node.data?.list?.value
          ]
        }`}
      />
      &nbsp;
      <TrashIcon
        sx={{ color: '#B5B5C3', position: 'absolute', right: '-9%', top: '38%', cursor: 'pointer' }}
        onClick={(e: any) => {
          handleDelete()
          e.stopPropagation()
        }}
      /> */}
      {node?.data?.canAdd ? (
        <>
          <Box ref={popoverRef} sx={addBtn}>
            {node?.data?.canAdd == 'add' ? (
              <AddFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  activeShap(activeShap, true)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            ) : (
              <RemoveFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            )}
          </Box>
          <Popper
            anchorEl={popoverRef.current}
            id={`addflow${node.id}`}
            open={node?.data?.canAdd == 'remove'}
            placement='bottom'
            container={popoverRef.current}
            sx={{ borderRadius: 2, width: '330px' }}
            popperOptions={{
              placement: 'bottom',
            }}
            modifiers={[
              {
                name: 'arrow',
                enabled: true,
                options: {
                  element: arrowRef,
                },
              },
            ]}
          >
            <Box sx={{ p: 2, background: '#fff' }}>
              <Typography
                variant='h5'
                sx={{
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Add activity
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('DeviceStatus')
                  }}
                >
                  Device
                  <br /> Status
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Condition')
                  }}
                >
                  Condition
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('Time')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Time
                </ActivityBtns>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('StopAutomation')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Stop
                  <br /> Automation
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Robot')
                  }}
                >
                  Robot
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Cleaner')
                  }}
                >
                  Cleaner
                </ActivityBtns>
              </Box>
            </Box>
          </Popper>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
export const CustomRobotContainer = ({ node }: { node: Node }) => {
  const setAddDetail = (type: string) => {
    node?.data?.addNewType?.(node, type)
  }
  const { formik, list, title } = node.getData()
  const setState = useRef(0)
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }
  useMemo(() => {
    if (formik) {
      formik.setFieldValue('Robot', {
        list,
        title,
      })
    }
  }, [setState.current])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const popoverRef = useRef<any>(null)
  const handleBoxClick = (e: any) => {
    activeShap(e.currentTarget)
    node.data.editNode?.(node)
    setState.current += 1
  }
  return (
    <Box sx={boxStyled} id='shapBox5' onClick={handleBoxClick}>
      <Box sx={boxTitle}>{node?.data?.title}</Box>{' '}
      <TrashIcon
        sx={deleteSty}
        onClick={(e: any) => {
          e.stopPropagation()
          handleDelete()
        }}
      />
      <Box>
        {node?.data?.list.map((item: any, idx: number) => {
          return (
            <Box
              key={idx}
              sx={{
                ...loopNodeItem,
                marginBottom: idx == node?.data?.list.length - 1 ? '14px' : '0',
              }}
            >
              {node?.data?.list.length > 1 && <Box sx={nodeChoose}>{item?.operaType}</Box>}

              <Box sx={{ ...nodeDesc, padding: node?.data?.list.length > 1 ? '0 9px' : 0 }}>
                {item?.type?.label}-{item?.list?.label}
              </Box>
            </Box>
          )
        })}
      </Box>
      {node?.data?.canAdd ? (
        <>
          <Box ref={popoverRef} sx={addBtn}>
            {node?.data?.canAdd == 'add' ? (
              <AddFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  activeShap(activeShap, true)
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            ) : (
              <RemoveFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            )}
          </Box>
          <Popper
            anchorEl={popoverRef.current}
            id={`addflow${node.id}`}
            open={node?.data?.canAdd == 'remove'}
            placement='bottom'
            container={popoverRef.current}
            sx={{ borderRadius: 2, width: '330px' }}
            popperOptions={{
              placement: 'bottom',
            }}
          >
            <Box sx={{ p: 2, background: '#fff' }}>
              <Typography
                variant='h5'
                sx={{
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Add activity
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('DeviceStatus')
                  }}
                >
                  Device
                  <br /> Status
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Condition')
                  }}
                >
                  Condition
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('Time')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Time
                </ActivityBtns>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('StopAutomation')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Stop
                  <br /> Automation
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Robot')
                  }}
                >
                  Robot
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Cleaner')
                  }}
                >
                  Cleaner
                </ActivityBtns>
              </Box>
            </Box>
          </Popper>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
export const CustomClanerContainer = ({ node }: { node: Node }) => {
  const setAddDetail = (type: string) => {
    node?.data?.addNewType?.(node, type)
  }
  const handleDelete = () => {
    const { deleteNode } = node.getData()
    deleteNode(node.id)
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const popoverRef = useRef<any>(null)
  const { formik, list, title } = node.getData()
  const setState = useRef(0)

  useMemo(() => {
    if (formik) {
      formik.setFieldValue('Cleaner', {
        list,
        title,
      })
    }
  }, [setState.current])
  const handleBoxClick = (e: any) => {
    activeShap(e.currentTarget)
    node.data.editNode?.(node)
    setState.current = setState.current + 1
  }
  return (
    <Box sx={boxStyled} onClick={handleBoxClick} id='shapBox6'>
      <Box sx={boxTitle}>{node?.data?.title}</Box>{' '}
      <TrashIcon
        sx={deleteSty}
        onClick={(e: any) => {
          e.stopPropagation()
          handleDelete()
        }}
      />
      <Box>
        {node?.data?.list.map((item: any, idx: number) => {
          return (
            <Box
              key={idx}
              sx={{
                ...loopNodeItem,
                marginBottom: idx == node?.data?.list.length - 1 ? '14px' : '0',
              }}
            >
              <Box sx={{ ...nodeDesc, padding: 0 }}>
                {item?.cleaner?.label} - {item.turnaroundTime}&nbsp;
                {item.turnaroundTimeType?.label}
              </Box>
            </Box>
          )
        })}
      </Box>
      {node?.data?.canAdd ? (
        <>
          <Box ref={popoverRef} sx={addBtn}>
            {node?.data?.canAdd == 'add' ? (
              <AddFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  activeShap(activeShap, true)
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            ) : (
              <RemoveFlowIcon
                aria-describedby={`addflow${node.id}`}
                onClick={(event: any) => {
                  setAnchorEl(event.currentTarget)
                  event.stopPropagation()
                  event.preventDefault()
                  node.setData({
                    canAdd: node?.data?.canAdd == 'add' ? 'remove' : 'add',
                  })
                }}
              />
            )}
          </Box>
          <Popper
            anchorEl={popoverRef.current}
            id={`addflow${node.id}`}
            open={node?.data?.canAdd == 'remove'}
            placement='bottom'
            container={popoverRef.current}
            sx={{ borderRadius: 2, width: '330px' }}
            popperOptions={{
              placement: 'bottom',
            }}
          >
            <Box sx={{ p: 2, background: '#fff' }}>
              <Typography
                variant='h5'
                sx={{
                  fontSize: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Add activity
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('DeviceStatus')
                  }}
                >
                  Device
                  <br /> Status
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Condition')
                  }}
                >
                  Condition
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('Time')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Time
                </ActivityBtns>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 1, mt: 1 }}>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    setAddDetail('StopAutomation')
                    e.stopPropagation()
                    e.preventDefault()
                  }}
                >
                  Stop
                  <br /> Automation
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Robot')
                  }}
                >
                  Robot
                </ActivityBtns>
                <ActivityBtns
                  sx={{ borderRadius: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setAddDetail('Cleaner')
                  }}
                >
                  Cleaner
                </ActivityBtns>
              </Box>
            </Box>
          </Popper>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
