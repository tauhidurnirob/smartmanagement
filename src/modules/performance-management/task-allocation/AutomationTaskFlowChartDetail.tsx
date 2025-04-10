import React, { FC, useState, useRef, useEffect } from 'react'
import { Box, Button, Divider } from '@mui/material'
import { IAuditSchedule } from '../../../types/audit'
import { Cell, Graph, Node } from '@antv/x6'
import { register } from '@antv/x6-react-shape'
import * as Yup from 'yup'
import {
  CustomTriggedTag,
  CustomNormalNodeContainer,
  emptyStepContainer,
  CustomNormalCondictionContainer,
  CustomCondictionChildren,
  CustomStopAutomation,
  CustomTime,
  CustomRobotContainer,
  CustomClanerContainer,
} from './AutomationTaskFlowChartComponent'
import { container, detailContainer } from './AutomationTaskFlowChartDetailStyled'

import {
  // Device Status
  AddNewTaskFrom,
  // Condition
  AddCondictionFrom,
  // Time
  AddTimeFrom,
  // Stop Automation
  AddNewAutomationDeveiceFrom,
  // Robot
  AddNewRobotFrom,
  // Cleaner
  AddNewCleanerFrom,
  StopAutomation,
} from './AddNewAutomationDeveiceFrom'

import { useFormik } from 'formik'
import { treeData, treeData4, treeData5, treeData7 } from './AutomationTaskFlowChartTempValue'
import { LoadingButton } from '@mui/lab'
import ButtonBack from '../../common/ButtonBack'
import { To, useNavigate } from 'react-router-dom'
import Api from '../../../api'
import { toast } from 'react-toastify'

interface IProps {
  schedule?: IAuditSchedule
  to?: To
  onClick?: () => void
  PostAutomation: (val: any) => void
  UpdateAutomation: (val: any) => void
  createStatus: boolean
  Flowdetail: any
}
const makeThree = (data: any[], parentId?: string) => {
  const result: ThreeData[] = []
  for (const item of data) {
    if (
      (!parentId && item?.key?.split('-').length === 1) ||
      parentId === item?.key?.split('-').slice(0, -1).join('-')
    ) {
      const tempObj: any = {
        id: item.key,
        type: item.OutType,
        data: {
          list: item.list,
          key: item.key,
          title: item.title || '',
          canAdd: item.canAdd,
          type: item.type,
        },
        children: makeThree(data, item.key),
        title: item.title || '',
        canAdd: item.canAdd,
      }
      if (item.type == 'custom-time') {
        tempObj.data.list = item.timeType
        tempObj.data.title = item.time || ''
      }
      result.push(tempObj)
    }
  }

  return result
}

const data: any = {
  nodes: [
    {
      id: 'node1',
      shape: 'empty-input',
      x: 40,
      y: 40,
      data: {},
    },
  ],
  edges: [],
}
const data2: any = {
  nodes: [
    {
      id: 'node1',
      shape: 'empty-input',
      x: -4000000,
      y: 40,
      data: {},
    },
  ],
  edges: [],
}
const formMapper: { [key: string]: any } = {
  add: AddNewTaskFrom,
  DeviceStatus: AddNewAutomationDeveiceFrom,
  Condition: AddCondictionFrom,
  Time: AddTimeFrom,
  Robot: AddNewRobotFrom,
  Cleaner: AddNewCleanerFrom,
  1: AddNewAutomationDeveiceFrom,
  StopAutomation: StopAutomation,
}
type ThreeData = {
  id: string
  type: string
  title: string
  canAdd: string
  data?: Record<string, any>
  children?: ThreeData[]
}

const AutomationTaskCreateDetail: FC<IProps> = ({
  PostAutomation,
  Flowdetail,
  UpdateAutomation,
  createStatus,
}) => {
  const containerRef = useRef<any>(null)
  const [detailData, setDetailData]: any = useState(null)
  const [editId, setEditId] = useState(null)
  const saveAddData = useRef({})
  const graphRef = useRef<Graph | any>('')
  const NodeRef: any = useRef(null)
  const [flowsData, setflowsData] = useState(null)
  const CNodeRef: any = useRef(null)
  const testRef: any = useRef(null)
  const [nodeData, setNodeData] = useState<any>(null)
  const saveReflashData = useRef<any>([])
  useEffect(() => {
    if (containerRef.current) {
      registerCustomNode()
    }
  }, [Flowdetail])
  useEffect(() => {
    if (containerRef.current) {
      createGraph()
    }
  }, [createStatus])
  const reflashNode = () => {
    const data = graphRef.current
      .toJSON()
      .cells.filter((item: any) => item?.shape != 'edge' && !item?.data?.key?.includes('trigger'))
    graphRef.current.clearCells()

    const tempList = data.filter((item: any) => {
      if (!item.data || Object.keys(item.data).length === 0) {
        return false
      } else {
        return true
      }
    })

    const result = makeThree(
      tempList.map((item: any) => {
        let childrenType = null
        if (item?.data?.level) {
          childrenType = item.data.level === 2 ? 'high' : 'normal'
        }
        const tempObj: any = {
          key: item.data.key,
          OutType: item.shape,
          type: item.data.type,
          childrenType,
          title: item.data.title || '',
          canAdd: item.data.canAdd || '',
          list: item.data.list,
        }
        if (item.shape == 'custom-time') {
          tempObj.list = item.data.timeType || item.data.list
          tempObj.title = item.data.time || item.data.title || ''
        }
        if (
          (item.shape == 'custom-condiction' || item.shape == 'custom-normal-node') &&
          item.data.mold
        ) {
          tempObj.canAdd = item.data.mold
        }
        return tempObj
      })
    )
    return result
  }

  //  register Custom Component To x6 this function need fixed height and width
  const registerCustomNode = () => {
    register({
      shape: 'custom-trigged-tag',
      width: 335,
      height: 36,
      component: CustomTriggedTag,
    })
    register({
      shape: 'custom-normal-node',
      effect: ['data'],
      width: 344,
      component: CustomNormalNodeContainer,
    })
    register({
      shape: 'custom-robot',
      width: 344,
      component: CustomRobotContainer,
    })
    register({
      shape: 'custom-cleaner',
      width: 344,
      component: CustomClanerContainer,
    })
    register({
      shape: 'empty-input',
      width: 335,
      height: 66,
      component: emptyStepContainer,
    })
    register({
      shape: 'custom-condiction',
      component: CustomNormalCondictionContainer,
    })
    register({
      shape: 'custom-condiction-children',
      component: CustomCondictionChildren,
      width: 103,
      height: 60,
    })
    register({
      shape: 'custom-stop-automation',
      component: CustomStopAutomation,
      width: 335,
      height: 72,
    })
    register({
      shape: 'custom-time',
      component: CustomTime,
      width: 335,
      height: 80,
    })
  }

  // create graph instance
  const createGraph = () => {
    if (graphRef.current) {
      graphRef.current.dispose()
    }
    graphRef.current = new Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      panning: true,
      mousewheel: {
        enabled: true,
        maxScale: 1.5,
        minScale: 0.3,
        modifiers: ['ctrl', 'meta'],
      },
      autoResize: true,
      connecting: {
        anchor: 'bottom',
      },
      background: {
        color: '#F2F7FA',
      },
      interacting: () => {
        return { nodeMovable: false }
      },
    })
    // graphRef.current.fromJSON(data) // renderJsonDataToX6
    // graphRef.current.fromJSON(flowsData) // renderJsonDataToX6
    // graphRef.current.fromJSON(data) // renderJsonDataToX6
    // initNodeList(treeData)
    if (Flowdetail && Flowdetail?.data?.length > 0) {
      graphRef.current.fromJSON(data2) // renderJsonDataToX6
      const flowdata = Flowdetail.data
      setflowsData(flowdata)
      initNodeList(flowdata)
      if (flowdata?.length > 0) {
        handleNodeClick({ node: graphRef.current.getNodes()[1] })
      }
    } else {
      graphRef.current.fromJSON(data) // renderJsonDataToX6

      handleNodeClick({ node: graphRef.current.getNodes()[0] })
    }

    graphRef.current.on('node:click', (e: any) => {
      const noCIick = ['medium', 'high', 'normal']
      if (e.node?.data?.type && noCIick.includes(e.node?.data?.type?.toLowerCase())) {
        return
      }
      CNodeRef.current = e
      const data = e.node?.data || {}
      if (data.filter || (data.key && data.key.indexOf('trigger') > -1)) return
      if (e.node.shape === 'empty-input') {
        NodeRef.current = e
        formik.setFieldValue(
          'DeviceStatus.list',
          data.list || [
            {
              operaType: 'And',
              deviceType: undefined,
              deviceList: undefined,
              status: undefined,
            },
          ]
        )
        formik.setFieldValue('DeviceStatus.title', data.title || '')

        formik.setFieldValue(
          'Robot.list',
          data.list || [
            {
              operaType: 'And',
            },
          ]
        )
        formik.setFieldValue('Robot.title', data.title || '')

        formik.setFieldValue('Condition.title', data.title || '')

        formik.setFieldValue(
          'Cleaner.list',
          data.list || [
            {
              operaType: 'And',
            },
          ]
        )
        formik.setFieldValue('Cleaner.title', data.title || '')
        formik.setFieldValue('Time.time', '')
        formik.setFieldValue('Time.timeType', '')
      } else if (e.node.shape === 'Time') {
        NodeRef.current = e.node
        formik.setFieldValue('Time.time', data.time)
        formik.setFieldValue('Time.timeType', data.timeType)
      } else {
        NodeRef.current = e.node
      }

      if (data.type == 'Condition') {
        getConditionNodes(e.node)
      }
      //   if (e.node?.data?.type?.length > 3) {
      if (e.node?.data?.type == 'add' || e.node?.data?.type == 'DeviceStatus') {
        saveAddData.current = data
      }
      setDetailData({
        ...data,
        type: e.node?.data?.type ?? 'add',
      })

      //   }
    })
  }
  const handleNodeClick = (e: any) => {
    const noCIick = ['medium', 'high', 'normal']
    if (e.node?.data?.type && noCIick.includes(e.node?.data?.type?.toLowerCase())) {
      return
    }
    CNodeRef.current = e
    const data = e.node?.data || {}
    if (data.filter || (data.key && data.key.indexOf('trigger') > -1)) return
    if (e.node.shape === 'empty-input') {
      NodeRef.current = e
      formik.setFieldValue(
        'DeviceStatus.list',
        data.list || [
          {
            operaType: 'And',
            deviceType: undefined,
            deviceList: undefined,
            status: undefined,
          },
        ]
      )
      formik.setFieldValue('DeviceStatus.title', data.title || '')

      formik.setFieldValue(
        'Robot.list',
        data.list || [
          {
            operaType: 'And',
          },
        ]
      )
      formik.setFieldValue('Robot.title', data.title || '')

      formik.setFieldValue('Condition.title', data.title || '')

      formik.setFieldValue(
        'Cleaner.list',
        data.list || [
          {
            operaType: 'And',
          },
        ]
      )
      formik.setFieldValue('Cleaner.title', data.title || '')
      formik.setFieldValue('Time.time', '')
      formik.setFieldValue('Time.timeType', '')
    } else if (e.node.shape === 'Time') {
      NodeRef.current = e.node
      formik.setFieldValue('Time.time', data.time)
      formik.setFieldValue('Time.timeType', data.timeType)
    } else {
      NodeRef.current = e.node
    }

    if (data.type == 'Condition') {
      getConditionNodes(e.node)
    }
    //   if (e.node?.data?.type?.length > 3) {
    if (e.node?.data?.type == 'add' || e.node?.data?.type == 'DeviceStatus') {
      saveAddData.current = data
    }
    setDetailData({
      ...data,
      type: e.node?.data?.type ?? 'add',
    })
  }

  const createNode = (shape: string, x: number, y: number, data: any = {}) => {
    return graphRef.current.createNode({
      shape,
      x,
      y,
      data,
    })
  }

  const createEdge = (source: Cell, target: Cell) => {
    return graphRef.current.createEdge({
      shape: 'edge',
      source: source.id,
      target: target.id,
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    })
  }

  const createTriggedTag = (node: Node) => {
    //  Calculate the line segment. Since the x-axis of x6 is centered, if there is a difference in the width of the upper and lower elements, it will cause the line to be disordered. Therefore, it needs to be calculated in half
    const trigged = createNode(
      'custom-trigged-tag',
      node.position().x - (335 / 2 - node.size().width / 2),
      node.position().y + node.size().height + 36,
      { key: `${node.data.key}trigger` }
    )
    graphRef.current.addCell([trigged, createEdge(node, trigged)])
    return trigged
  }

  const createKnownTypeNode = (node: Node, type: string, data: any) => {
    const trigged = createTriggedTag(node)
    const newNode = createNode(
      type,
      trigged.position().x,
      trigged.position().y + trigged.size().height + 36,
      {
        ...data,
        addNewType: (node: any, type: string) => {
          node.setData({ canAdd: null })
          createEditingNode(node, type)
        },
      }
    )
    graphRef.current.addCell([newNode, createEdge(trigged, newNode)])
    return newNode
  }
  const createCondiction = (node: Node, data: any, children: any) => {
    const nodeData = node.getData()
    const data2 = data.data ? data.data : data
    console.log('data2 ==> ', data2)
    const trigged = createTriggedTag(node)
    const shape =
      data.type && data.type.length && data.type !== 'DeviceStatus' && data.type > 5
        ? data.type
        : 'custom-condiction'
    const list: Node[] = []
    const newNode = graphRef.current.addNode({
      shape: shape,
      x: trigged.position().x,
      y: trigged.position().y + trigged.size().height + 36,
      data: {
        ...data2,
        editNode: (node: any) => {
          NodeRef.current = node
          setEditId(node.id)
          const list = node.data.list ? node.data.list : node.dta.list.list
          formik.setFieldValue(node?.data?.type ?? 'Condition', {
            ...node.data,
            list: list.map((item: any) => {
              const result = graphRef.current
                .getNodes()
                .find((fItem: any) => item.key === fItem.data.key)
              return result.data
            }),
          })

          setDetailData({
            type: node?.data?.type ?? 'Condition',
          })
        },
      },
    })
    graphRef.current.addEdge({
      shape: 'edge',
      source: trigged.id,
      target: newNode.id,
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    })
    const tempList = children
      .map((item: any, idx: any) => {
        if (item.type === 'custom-condiction-children') {
          return {
            type: item.data.type,
            level: idx + 1,
          }
        }
      })
      .filter((item: any) => item != undefined)
    // newNode.size(334, 103)
    const tempItem = data?.list.find((item: any) => {
      if (item.key == data2.canAdd) {
        return item
      }
    })

    if (tempItem && tempItem.list) {
      // newNode.size(334, 90 + 5 * 35)
      //   newNode.size(334, 90 + tempItem.list.length * 35)
      const tempNodeSize = 90 + tempItem.list.length * 35
      if (tempItem.list.length > 3) {
        newNode.size(334, tempNodeSize - tempItem.list.length * 2.5)
      } else {
        newNode.size(334, tempNodeSize)
      }
    } else {
      newNode.size(334, 90 + data.list.length * 35)
    }
    // if (data?.list?.list) {
    //   newNode.size(334, 90 + data.list.list.length * 35)
    // } else {
    //   newNode.size(334, 90 + data.list.length * 35)
    // }
    let tempY = 0
    const nodeHeight = nodeData.type.length < 7 ? 160 : 0
    switch (tempList.length) {
      case 1:
        tempY = newNode.position().y + node.size().height + 60 + nodeHeight
        break
      case 2:
        tempY = newNode.position().y + node.size().height * tempList.length + nodeHeight
        break

      default:
        tempY = newNode.position().y + node.size().height * 2 + nodeHeight
        break
    }
    // return list
    children.map((item: any, idx: number) => {
      const canAdd = item.children.length ? null : 'add'
      let tempX =
        newNode.position().x -
        (newNode.size().width * (tempList.length - 1)) / 2 +
        newNode.size().width * idx -
        103 / 2
      if (children.length !== 3) {
        if (children.length == 2) {
          switch (idx) {
            case 0:
              //   tempX = tempX + newNode.size().width / 2
              break
            case 1:
              tempX = tempX + newNode.size().width
              break
            default:
              break
          }
        } else {
          tempX = tempX + newNode.size().width / 2
        }
      } else {
        switch (idx) {
          case 0:
            break
          case 1:
            tempX = tempX + newNode.size().width / 2
            break
          case 2:
            tempX = tempX + newNode.size().width

            break
          default:
            break
        }
      }
      const childNode = graphRef.current.addNode({
        shape: 'custom-condiction-children',
        x: tempX,
        y: tempY,
        // y: newNode.position().y + 160 + (yLength ? yLength : 0) * 35,
        data: {
          ...item.data,
          canAdd,
          title: JSON.stringify(idx + 1),
          addNewType: (node: any, type: string) => {
            // setDetailData({
            //   type: type,
            // })
            node.setData({ canAdd: null })
            createEditingNode(node, type, true)
          },
        },
      })
      graphRef.current.addEdge({
        shape: 'edge',
        source: newNode.id,
        target: childNode.id,

        router: {
          name: 'er',
          args: {
            direction: 'T',
            offset: 'center',
          },
        },
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      })
      list.push(childNode)
    })
    return list
  }
  // add a new Node and create a tempContainerdd'
  const createEditingNode = (node: Node, type: string, isCondiction = false) => {
    const trigged = createTriggedTag(node)
    const nodeKeyList = node.data.key.split('-')
    const keyLength = nodeKeyList.length
    if (!isCondiction) {
      nodeKeyList[keyLength - 1] = parseInt(nodeKeyList[keyLength - 1]) + 1
    }
    const newNodeKey = nodeKeyList.join('-')
    if (type === 'StopAutomation') {
      const emptyInput = createNode(
        'custom-stop-automation',
        trigged.position().x,
        trigged.position().y + trigged.size().height + 36,
        {
          key: isCondiction ? `${node.data.key}-0` : newNodeKey,
          type,
        }
      )
      graphRef.current.addCell([emptyInput, createEdge(trigged, emptyInput)])
    } else {
      const emptyInput = createNode(
        'empty-input',
        trigged.position().x,
        trigged.position().y + trigged.size().height + 36,
        {
          key: isCondiction ? `${node.data.key}-0` : newNodeKey,
          type,
          editNode: (node: any) => {
            NodeRef.current = node
            setEditId(null)
          },
        }
      )
      graphRef.current.addCell([emptyInput, createEdge(trigged, emptyInput)])
      NodeRef.current = emptyInput
      CNodeRef.current.node = emptyInput
    }
    if (type == 'Condition') {
      getConditionNodes(CNodeRef.current.node)
    }
    setDetailData({
      type,
    })
  }
  const addNode = (value: any) => {
    if (graphRef.current.getNodes().length === 1) {
      try {
        graphRef.current.removeNode(graphRef.current.getNodes()[0].id)
        const node = graphRef.current.addNode({
          shape: 'custom-normal-node',
          x: 40,
          y: 40,
          data: {
            type: 'DeviceStatus',
            key: '1',
            ...value,
            canAdd: 'add',
            editNode: (node: any) => {
              NodeRef.current = node
              // setEditId(Node.id)

              formik.setFieldValue(node?.data?.type ?? 'add', node.data)
              setDetailData(node.data)
              setEditId(node.id)
              setDetailData({
                type: node?.data?.type ?? 'add',
              })
            },
            addNewType: (node: any, type: string) => {
              // setDetailData({
              //   type: type,
              // })
              node.setData({ canAdd: null })
              createEditingNode(node, type)
            },
          },
        })
        node.size(334, 90 + value.list.length * 35)
        // form.resetFields()
        // setDetailData(null)
      } catch (e) {
        console.log(e)
      }
    } else {
      const edgeSourceId = graphRef.current
        .getEdges()
        .find((item: any) => item.target.cell === NodeRef.current.id)?.source?.cell
      graphRef.current.removeNode(NodeRef.current.id)
      console.log('NodeRef.current.data ==> ', NodeRef.current.data)
      console.log('NodeRef.current.data ==> ', NodeRef.current.data.key)
      const node = graphRef.current.addNode({
        id: NodeRef.current.id,
        shape: 'custom-normal-node',
        x: NodeRef.current.position().x,
        y: NodeRef.current.position().y,
        data: {
          ...value,
          key: NodeRef.current.data.key,
          type: 'DeviceStatus',
          canAdd: 'add',
          editNode: (node: any) => {
            NodeRef.current = node
            setEditId(node.id)
            formik.setFieldValue(node?.data?.type ?? 'add', node.data)
            setDetailData({
              type: node?.data?.type ?? 'add',
            })
          },
          addNewType: (node: any, type: string) => {
            // setDetailData({
            //   type: type,
            // })
            node.setData({ canAdd: null })
            createEditingNode(node, type)
          },
        },
      })
      node.size(334, 90 + value.list.length * 35)
      graphRef.current.addEdge({
        shape: 'edge',
        source: edgeSourceId,
        target: node.id,
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      })
    }

    setDetailData(null)
    formik.resetForm()
  }
  const editNode = (value: any, NeditId?: string) => {
    //   update
    NodeRef.current.setData({
      ...value,
    })
    // cover
    if (NodeRef.current.data.list && value.list) {
      NodeRef.current.data.list = value.list
    }
    const tempEditId = NeditId || CNodeRef.current.node.id
    // NodeRef.current.size(334, 301)
    // const edges = graphRef.current.getEdges()
    // graphRef.current.addCells(edges)
    const tempLength = { before: 0, after: 0 }
    tempLength.before = CNodeRef.current.node.size().height
    CNodeRef.current.node.size(334, 90 + value.list.length * 35)
    tempLength.after = CNodeRef.current.node.size().height
    const nodes = graphRef.current.getNodes()

    const targetNode = nodes.find((node: any) => node.id === tempEditId)
    const followingNodes = nodes.slice(nodes.indexOf(targetNode) + 1)
    followingNodes.forEach((node: any, index: any) => {
      node.translate(undefined, tempLength.after - tempLength.before)
    })
    setDetailData(null)
    // formik.resetForm()
    setEditId(null)
  }
  const titleIs = () => {
    const nodes = graphRef.current.getNodes()
    let title: any = {}
    if (!CNodeRef.current) {
      return
    }
    title = nodes.find((node: any) => node.id === CNodeRef.current.node.id)
    return title
  }
  const changeView = (value: any) => {
    const nodes = graphRef.current.getNodes()
    let onceIds: any = []
    const findCon = graphRef.current
      .getNodes()
      .map((item: any) => {
        if (item.data.type == 'Condition') {
          return item
        }
      })
      .filter((item: any) => item)
    findCon.forEach((item: any) => {
      if (item.data.canAdd == value.key || item.data.mold == value.key) {
        let tempFlag = false
        let isDel = false
        const DelIdx: any = []
        const tempDataList = JSON.parse(JSON.stringify(item.data.list))
        // return
        tempDataList.forEach((item: any) => {
          if (item.key == value.key && item.list.length !== value.list.length) {
            item.list.forEach((item2: any, index: number) => {
              value.list.forEach((item3: any) => {
                if (JSON.stringify(item2) == JSON.stringify(item3)) {
                  // save index
                  DelIdx.push(index)
                }
              })
            })
            if (item.list.length > value.list.length) {
              isDel = true
            }
            tempFlag = true
            item.list = JSON.parse(JSON.stringify(value.list))
          }
        })
        // tempDataList = JSON.parse(JSON.stringify(value.list))
        item.setData({
          ...JSON.parse(JSON.stringify(item.data)),
          data: JSON.parse(JSON.stringify(value)),
          mold: item.data.canAdd,
        })
        // along
        item.data.list = tempDataList
        item.data.data.list = JSON.parse(JSON.stringify(value.list))
        const nowIndex = nodes.indexOf(item)
        const followIngNodes = nodes.slice(nowIndex + 1)
        followIngNodes.forEach((item2: any, index: number) => {
          if (item2.data.key.length === item.data.key.length + 2) {
            if (tempFlag) {
              if (isDel) {
                //  DelIdx delete item
                if (DelIdx.includes(index) && !onceIds.includes(index)) {
                  onceIds.push(item2.id)
                } else {
                  graphRef.current.removeNode(item2.id)
                }
              } else {
                //   onceIds.push(item2.id)
                if (!onceIds.includes(index)) {
                  onceIds.push(item2.id)
                } else {
                  graphRef.current.removeNode(item2.id)
                }
              }
              //   graphRef.current.removeNode(item2.id)
            } else {
              item2.setData({
                ...item2.data,
                type: value.list[index].status.label,
              })
            }
          }
          // }
        })
        if (tempFlag) {
          saveCondiction(item.data, 'delete', item, onceIds)
        }
      }
    })
    if (onceIds.length) {
      saveReflashData.current = onceIds
      const result = reflashNode()
      setNodeData(result)
      graphRef.current.clearCells()

      setTimeout(() => {
        graphRef.current.fromJSON(data2)
        initNodeList(result)
        onceIds.forEach((item: any) => {
          graphRef.current.removeNode(item)
        })
      }, 10)
    }
    onceIds = []
  }

  const saveNode = (value: any) => {
    const nodes = graphRef.current.getNodes()
    if (!NodeRef.current?.node && !CNodeRef.current.node) {
      NodeRef.current.node = nodes[1]
      CNodeRef.current.node = nodes[1]
    }
    let result: any = {}
    if (CNodeRef.current) {
      result = nodes.find((node: any) => node.id === CNodeRef.current.node.id)
    }
    // if(result < nodes.length)
    // return

    if (!editId) {
      if (result.title || (result.data && result.data.title)) {
        editNode(value)
        changeView(value)
      } else {
        addNode(value)
      }
    } else {
      editNode(value, editId)
      changeView(value)
    }
  }
  const saveNode2 = (value: any) => {
    const title = titleIs()
    if (title.title || (title.data && title.data.title)) {
      editNode(value)
      changeView(value)
    } else {
      addNode(value)
    }
  }
  const saveRobotNode = (value: any) => {
    const title = titleIs()
    if (title.title || (title.data && title.data.title)) {
      editNode(value)
    } else {
      saveRobot(value)
    }
  }
  const saveCleanerNode = (value: any) => {
    const title = titleIs()
    if (title.title || (title.data && title.data.title)) {
      editNode(value)
    } else {
      saveCleaner(value)
    }
  }
  const saveCondiction = (
    value: any = {
      list: [
        { type: 'normal', level: 1 },
        { type: 'high', level: 2 },
      ],
    },
    type: string,
    node2: any,
    onceIds: string[]
  ) => {
    /**
     * nowNode CNodeRef.current
     * allNode graphRef.current.getNodes()
     * removeNode graphRef.current.removeNode(nodeId)
     */
    let conditionList: any = []
    if (value.canAdd) {
      conditionList = value.list.find((item: any) => {
        if (value.canAdd === item.key || value.mold === item.key) {
          return item
        }
      })
    } else {
      conditionList = value.data
    }

    const tempList = conditionList.list.map((item: any, index: number) => {
      return {
        type: item.status.label,
        level: index + 1,
        filter: true,
      }
    })
    // const tempList = [
    //   { type: 'High', level: 1, filter: true },
    //   { type: 'Medium', level: 2, filter: true },
    //   { type: 'Normal', level: 3, filter: true },
    // ]
    if (!type && value.key) {
      NodeRef.current.setData({
        ...JSON.parse(JSON.stringify(NodeRef.current.getData())),
        title: value.title,
      })

      const result = reflashNode()
      setNodeData(result)
      graphRef.current.clearCells()

      setTimeout(() => {
        graphRef.current.fromJSON(data2)
        initNodeList(result)
        setDetailData(null)
        formik.resetForm()
      }, 10)
      return
    }

    let node: any = ''
    let NodeRef2: any = ''
    if (type) {
      node = node2
      NodeRef2 = node2
    } else {
      NodeRef2 = NodeRef.current
      if (formik.values.add.list.length > 1 || formik.values.DeviceStatus.list.length > 1) {
        if (formik.values.add.title || formik.values.DeviceStatus.title) {
          value.list.forEach((item: any) => {
            if (item.title == value.mold) {
              item.list = formik.values[item.type].list
            }
          })
        }
      }

      const nodes = graphRef.current.getNodes()
      let tempFlag = false
      nodes.forEach((item: any) => {
        if (tempFlag) {
          graphRef.current.removeNode(item.id)
        }
        if (item.id === CNodeRef.current.node.id) {
          tempFlag = true
        }
      })
      tempFlag = false
      const edgeSourceId = graphRef.current
        .getEdges()
        .find((item: any) => item.target.cell === NodeRef2.id)?.source?.cell
      graphRef.current.removeNode(NodeRef2.id)
      node = graphRef.current.addNode({
        id: NodeRef2.id,
        shape: 'custom-condiction',
        x: NodeRef2.position().x,
        y: NodeRef2.position().y,
        data: {
          type: 'Condition',
          key: NodeRef2.data.key,
          ...value,
          editNode: (node: any) => {
            NodeRef.current = node
            setEditId(node.id)
            setDetailData({
              type: node?.data?.type ?? 'Condition',
            })
            formik.setFieldValue(node?.data?.type ?? 'Condition', node.data)
          },
        },
      })
      graphRef.current.addEdge({
        shape: 'edge',
        source: edgeSourceId,
        target: node.id,
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      })
    }

    let tempNodeSize = 95
    tempNodeSize = tempNodeSize + 35 * conditionList.list.length
    if (tempList.length >= 2) {
      node.size(334, tempNodeSize - tempList.length * 3.5)
    } else {
      node.size(334, tempNodeSize)
    }

    let tempY = 0
    let tempKey = ''
    switch (tempList.length) {
      case 1:
        tempY = NodeRef2.position().y + node.size().height + 60
        break
      case 2:
        tempY = NodeRef2.position().y + node.size().height * tempList.length
        break

      default:
        tempY = NodeRef2.position().y + node.size().height * 2
        break
    }
    tempList.forEach((item: any, idx: number) => {
      //   let tempWidth = 0

      let tempX =
        node.position().x -
        (node.size().width * (tempList.length - 1)) / 2 +
        node.size().width * idx -
        103 / 2
      if (tempList.length !== 3) {
        if (tempList.length == 2) {
          switch (idx) {
            case 0:
              //   tempX = tempX + node.size().width / 2
              break
            case 1:
              tempX = tempX + node.size().width
              break
            default:
              break
          }
        } else {
          tempX = tempX + node.size().width / 2
        }
      } else {
        switch (idx) {
          case 0:
            break
          case 1:
            tempX = tempX + node.size().width / 2
            break
          case 2:
            tempX = tempX + node.size().width

            break
          default:
            break
        }
      }
      const tempID = type ? onceIds[idx] || null : null
      if (!tempID && tempKey) {
        tempKey = `${tempKey.substring(0, tempKey.length - 1)}${
          parseInt(tempKey.charAt(tempKey.length - 1)) + 1
        }`
      }
      let key = `${node.data.key}-${idx}`
      if (type && !tempID) {
        key = tempKey
      } else {
      }
      const childNode = graphRef.current.addNode({
        id: tempID,
        shape: 'custom-condiction-children',
        x: tempX,
        y: tempY,
        data: {
          ...item,
          key,
          title: JSON.stringify(idx + 1),
          //   canAdd: item.canAdd ?? 'add',
          canAdd: type ? '' : item.canAdd ?? 'add',
          addNewType: (node: any, type: string) => {
            // setDetailData({
            //   type: type,
            // })
            node.setData({ canAdd: null })
            createEditingNode(node, type, true)
          },
          editNode: (node: any) => {
            NodeRef.current = node
            setEditId(node.id)
            setDetailData({
              type: node?.data?.type ?? 'add',
            })
          },
        },
      })

      if (tempID) {
        graphRef.current.getNodes().find((item3: any) => {
          if (item3.id == tempID) {
            // item3.setData({
            //   ...item3.data,
            //   key: `${node.data.key}-${idx}`,
            // })
            tempKey = item3.data.key
            return
          }
        })
      }
      graphRef.current.addEdge({
        shape: 'edge',
        source: node.id,
        target: childNode.id,

        router: {
          name: 'er',
          args: {
            direction: 'T',
            offset: 'center',
          },
        },
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      })
    })
    setDetailData(null)
    formik.resetForm()
  }
  const saveTime = (
    value: any = {
      time: 1,
      timeType: {},
    }
  ) => {
    const edgeSourceId = graphRef.current
      .getEdges()
      .find((item: any) => item.target.cell === NodeRef.current.id)?.source?.cell
    const resultNode = graphRef.current.getNodes().find((item: any) => {
      return item.id === NodeRef.current.id
    })
    if (resultNode && value.key) {
      NodeRef.current.setData(value)
      setDetailData(null)
      formik.resetForm()
      return
    }
    graphRef.current.removeNode(NodeRef.current.id)
    const node = graphRef.current.addNode({
      id: NodeRef.current.id,
      shape: 'custom-time',
      x: NodeRef.current.position().x,
      y: NodeRef.current.position().y,
      data: {
        ...value,
        type: 'Time',
        canAdd: value.canAdd ?? 'add',
        key: NodeRef.current.data.key,
        editNode: (node: any) => {
          NodeRef.current = node
          setEditId(node.id)
          setDetailData({
            type: node?.data?.type ?? 'Time',
          })

          formik.setFieldValue(node?.data?.type ?? 'Time', node.data)
        },
        addNewType: (node: any, type: string) => {
          // setDetailData({
          //   type: type,
          // })
          node.setData({ canAdd: null })
          createEditingNode(node, type)
        },
      },
    })
    graphRef.current.addEdge({
      shape: 'edge',
      source: edgeSourceId,
      target: node.id,
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    })

    setDetailData(null)
    formik.resetForm()
  }
  const saveRobot = (value: any) => {
    const edgeSourceId = graphRef.current
      .getEdges()
      .find((item: any) => item.target.cell === NodeRef.current.id)?.source?.cell
    graphRef.current.removeNode(NodeRef.current.id)
    const node = graphRef.current.addNode({
      id: NodeRef.current.id,
      shape: 'custom-robot',
      x: NodeRef.current.position().x,
      y: NodeRef.current.position().y,
      data: {
        key: NodeRef.current.data.key,
        ...value,
        type: 'Robot',
        canAdd: value.canAdd ?? 'add',
        editNode: (node: any) => {
          NodeRef.current = node
          setEditId(node.id)

          formik.setFieldValue(node?.data?.type ?? 'Robot', node.data)
          setDetailData({
            type: node?.data?.type ?? 'Robot',
          })
        },
        addNewType: (node: any, type: string) => {
          // setDetailData({
          //   type: type,
          // })
          node.setData({ canAdd: null })
          createEditingNode(node, type)
        },
      },
    })
    node.size(334, 90 + value.list.length * 35)
    graphRef.current.addEdge({
      shape: 'edge',
      source: edgeSourceId,
      target: node.id,
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    })

    setDetailData(null)

    formik.resetForm()
  }
  const saveCleaner = (value: any) => {
    const edgeSourceId = graphRef.current
      .getEdges()
      .find((item: any) => item.target.cell === NodeRef.current.id)?.source?.cell
    graphRef.current.removeNode(NodeRef.current.id)
    const node = graphRef.current.addNode({
      id: NodeRef.current.id,
      shape: 'custom-cleaner',
      x: NodeRef.current.position().x,
      y: NodeRef.current.position().y,
      data: {
        key: NodeRef.current.data.key,
        ...value,
        type: 'Cleaner',
        canAdd: value.canAdd ?? 'add',
        editNode: (node: any) => {
          NodeRef.current = node
          setEditId(node.id)
          formik.setFieldValue(node?.data?.type ?? 'add', node.data)
          setDetailData({
            type: node?.data?.type ?? 'add',
          })
        },
        addNewType: (node: any, type: string) => {
          // setDetailData({
          //   type: type,
          // })
          node.setData({ canAdd: null })
          createEditingNode(node, type)
        },
      },
    })
    node.size(334, 90 + value.list.length * 35)
    graphRef.current.addEdge({
      shape: 'edge',
      source: edgeSourceId,
      target: node.id,
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: null,
        },
      },
    })

    setDetailData(null)
    formik.resetForm()
  }
  const initNodeList = (list: any, rootNode: Node | null = null) => {
    let node: any = rootNode
    if (Array.isArray(list)) {
      list.forEach((item: any, idx: number) => {
        if (!rootNode) {
          if (!idx) {
            node = graphRef.current.addNode({
              x: 40,
              y: 40,
              shape: 'custom-normal-node',
              data: {
                key: '1',
                ...item.data,
                editNode: (node: any) => {
                  NodeRef.current = node
                  setEditId(node.id)

                  // form.setFieldsValue({...node.data});
                  setDetailData({
                    type: node?.data?.type ?? 'add',
                  })
                },
                addNewType: (node: any, type: string) => {
                  setDetailData({
                    type: type,
                  })
                  node.setData({ canAdd: null })
                  createEditingNode(node, type)
                },
              },
            })
            node.size(334, 90 + item.data?.list?.length * 35)
          } else {
            if (item.children && item.children.length) {
              let list: any = []
              if (item.data) {
                list = createCondiction(node, item.data, item.children)
              } else {
                list = createCondiction(node, item, item.children)
              }

              item.children.forEach((item: any, idx: number) => {
                if (item.children) {
                  initNodeList(item.children, list[idx])
                }
              })
            } else {
              node = createKnownTypeNode(node, item.type, item.data)

              // if (item.type == 'custom-time') {
              //   node.size(334, 45 + idx * 35)
              // } else {
              //   node.size(334, 60 + idx * 35)
              //   }

              if (item.type == 'custom-time') {
                node.size(334, 90)
              } else if (item.type == 'custom-normal-node') {
                node.size(334, 90 + item.data.list.length * 35)
              } else {
                if (item.data.list && !!item.data.list.length) {
                  node.size(334, 90 + item.data.list.length * 35)
                } else {
                  node.size(334, 90)
                }
              }
              //   node.size(334, 90 + item.data.list.length * 35)
            }
          }
        } else {
          if (item.children && item.children.length) {
            let list: any = []
            if (item.data) {
              list = createCondiction(node, item.data, item.children)
            } else {
              list = createCondiction(node, item, item.children)
            }

            item.children.forEach((item: any, idx: number) => {
              if (item.children && item.children.length) {
                initNodeList(list[idx], item.children)
              }
            })
          } else {
            node = createKnownTypeNode(node, item.type, item.data)
            if (!['custom-stop-automation', 'custom-time'].includes(node.shape)) {
              if (item?.data?.list) {
                node.size(334, 90 + item?.data?.list?.length * 35)
              }
              node.size(334, 90 + 35)
            }
          }
        }
      })
    }
  }

  const saveNodeFuncMapper: { [key: string]: any } = {
    add: saveNode,
    DeviceStatus: saveNode2,
    Condition: saveCondiction,
    Time: saveTime,
    Robot: saveRobotNode,
    Cleaner: saveCleanerNode,
  }
  const formik = useFormik<any>({
    enableReinitialize: true,
    initialValues: {
      add: {
        list: [
          {
            operaType: 'And',
            deviceType: null,
            deviceList: null,
            status: null,
          },
        ],
        title: '',
      },
      Condition: {
        list: [],
      },
      DeviceStatus: {
        list: [
          {
            operaType: 'And',
            deviceType: undefined,
            deviceList: undefined,
            status: undefined,
          },
        ],
      },
      Time: {
        time: '',
        timeType: undefined,
      },
      Robot: {
        list: [
          {
            operaType: 'And',
            taskList: {
              label: undefined,
              value: undefined,
            },
          },
        ],
      },
      Cleaner: {
        title: '',
        list: [
          {
            cleaner: undefined,
            turnaroundTime: undefined,
            turnaroundTimeType: undefined,
            reminder: undefined,
            reminderType: undefined,
          },
        ],
      },
    },
    validationSchema: detailData
      ? {
          add: Yup.object().shape({
            add: Yup.object().shape({
              title: Yup.string().required('Required title'),
              list: Yup.array(
                Yup.object().shape({
                  operaType: Yup.string(),
                  deviceType: Yup.object().required('Required device type'),
                  deviceList: Yup.object().required('Required device list'),
                  status: Yup.object().required('Required status'),
                })
              ),
            }),
          }),
          DeviceStatus: Yup.object().shape({
            DeviceStatus: Yup.object().shape({
              title: Yup.string().required('Required name'),
              list: Yup.array(
                Yup.object().shape({
                  operaType: Yup.string(),
                  deviceType: Yup.object().required('Required device type'),
                  deviceList: Yup.object().required('Required device list'),
                  status: Yup.object().required('Required status'),
                })
              ),
            }),
          }),
          Condition: Yup.object().shape({
            Condition: Yup.object().shape({
              title: Yup.string().required('Required title'),
            }),
          }),
          Time: Yup.object().shape({
            Time: Yup.object().shape({
              time: Yup.string().required('Required Length of Time'),
            }),
          }),
          Robot: Yup.object().shape({
            Robot: Yup.object().shape({
              title: Yup.string().required('Required name'),
              list: Yup.array(
                Yup.object().shape({
                  type: Yup.object().required('Required type'),
                  list: Yup.object().required('Required list'),
                  taskList: Yup.object().required('Required taksList'),
                })
              ),
            }),
          }),
          Cleaner: Yup.object().shape({
            Cleaner: Yup.object().shape({
              title: Yup.string().required('Required name'),
              list: Yup.array(
                Yup.object().shape({
                  cleaner: Yup.object().required('Required cleaner'),
                  turnaroundTime: Yup.string().required('Required turnaround time'),
                })
              ),
            }),
          }),
        }[detailData.type as 'add' | 'DeviceStatus' | 'Condition' | 'Time' | 'Robot' | 'Cleaner']
      : Yup.object(),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const value = {
          ...values,
        }
        if (!['Condition', 'Time', 'Robot', 'Cleaner'].includes(detailData.type)) {
          if (['DeviceStatus', 'add'].includes(detailData.type)) {
            value[detailData.type] = {
              list: [
                ...values[detailData.type].list.map((item: any) => ({
                  deviceType: item.deviceType,
                  status: item.status,
                  deviceList: item.deviceList,
                  operaType: item.operaType,
                })),
              ],
              title: value[detailData.type].title,
            }
          }
        }
        if (detailData.type === 'add' || detailData.type === 'DeviceStatus') {
          saveNodeFuncMapper[detailData.type]!({
            ...saveAddData.current,
            ...value[detailData.type],
          })
        } else {
          saveNodeFuncMapper[detailData.type]!({
            ...detailData,
            ...value[detailData.type],
          })
        }

        UpdateAutomation(graphRef.current)
        // setSubmitting(true)
      } catch (err: any) {
        console.error('Unkown error in saving procedure: ', err)
        setStatus({ success: false })
        setSubmitting(false)
      }
      testRef.current = formik.values
    },
  })

  const navigate = useNavigate()

  const handleClickGoto = () => {
    navigate(-1)
  }

  const getConditionNodes = (node: Node) => {
    const targetKey = node.data.key
    const targetKeyArr = targetKey.split('-')
    const nodes = graphRef.current
      .getNodes()
      .filter((item: any) => item.data.type == 'DeviceStatus' || item.data.type == 'add')

    const myNodes: Node[] = []
    nodes.forEach((node: Node) => {
      const curNode = node.data.key.toString().split('-')
      const comKey = targetKeyArr.slice(0, curNode.length)

      if (curNode.length == 1 && curNode[0] < comKey[0]) {
        myNodes.push(node)
      } else if (curNode.length == targetKeyArr.length) {
        const curTotal = curNode.reduce((per: number, cur: number) => {
          return Number(per) + Number(cur)
        }, 0)
        const comTotal = comKey.reduce((per: number, cur: number) => {
          return Number(per) + Number(cur)
        }, 0)
        if (
          curTotal < comTotal &&
          curNode.slice(0, curNode.length - 2).join(',') ==
            comKey.slice(0, comKey.length - 2).join(',')
        ) {
          myNodes.push(node)
        }
      } else if (curNode.length > 1) {
        const curTotal = curNode.reduce((per: number, cur: number) => {
          return Number(per) + Number(cur)
        }, 0)

        const comTotal = comKey.reduce((per: number, cur: number) => {
          return Number(per) + Number(cur)
        }, 0)

        if (
          (curTotal == comTotal && node.data.key != targetKey) ||
          curNode.slice(0, curNode.length - 1).join(',') ==
            targetKeyArr.slice(0, curNode.length - 1).join(',')
        ) {
          myNodes.push(node)
        }
      }
    })

    formik.setFieldValue(
      'Condition.list',
      myNodes.map((item) => {
        return item.data
      })
    )
  }

  const deleteNode = (id: string) => {
    const nodes = graphRef.current.getNodes()
    const getNewItem = nodes.find((item: any) => item.store.data.id == id)
    let tempFlag = false
    // let tempIndex: any = ''
    let tempNode: any = ''
    const key = getNewItem.store.data.data.key
    if (key.includes('-')) {
      const nowIndex = nodes.indexOf(getNewItem)
      const followIngNodes = nodes.slice(nowIndex + 1)
      tempNode = nodes[nowIndex - 2]
      const tempKey = key.slice(0, key.length - 1)
      followIngNodes.forEach((item: any, index: number) => {
        if (item.store.data.data.key.slice(0, tempKey.length) == tempKey) {
          graphRef.current.removeNode(item.id)
        }
      })
      const findKey = nodes[nowIndex - 1].data.key.split('trigger')[0]
      const ifinally = nodes.find((item: any) => item.data.key == findKey)
      graphRef.current.removeNode(id)
      graphRef.current.removeNode(nodes[nowIndex - 1])
      ifinally.setData({ canAdd: 'add', reflash: '11' })
      //   nodes[nowIndex - 2].setData({ canAdd: 'add' })
    } else {
      nodes.forEach((item: any, index: number) => {
        if (item.id === id) {
          tempFlag = true
          graphRef.current.removeNode(nodes[index - 1])
          tempNode = nodes[index - 2]
        }
        if (tempFlag) {
          graphRef.current.removeNode(item.id)
        }
      })
      tempNode.setData({ canAdd: 'add' })
    }

    tempFlag = false
    UpdateAutomation(graphRef.current)
    setDetailData({
      type: 'any',
    })
  }
  useEffect(() => {
    if (CNodeRef.current && CNodeRef.current?.node?.setData) {
      CNodeRef.current.node.setData({ formik, deleteNode })
    }
  }, [detailData])
  return (
    <Box position='relative' sx={container}>
      <div
        style={{ display: 'flex', height: '650px', justifyContent: 'space-between', width: '100%' }}
      >
        <Box sx={detailContainer} style={{ overflowY: 'scroll' }}>
          {detailData && detailData.type && detailData.type != 'any' ? (
            <>{formMapper[detailData.type]({ formik })}</>
          ) : (
            ' '
          )}
          <style>
            {`
            ::-webkit-scrollbar {
              width: 2px;
            }
            ::-webkit-scrollbar-thumb {
              background-color: #888;
            }
          `}
          </style>
        </Box>

        <div style={{ height: '100%', width: '100%', marginLeft: 40, flex: 1 }}>
          <div ref={containerRef} style={{ height: '100%', width: '100%', flex: 1 }} />
          <div> </div>
        </div>
      </div>
      <br />
      <br />
      {createStatus && (
        <Box component='div' display='block' width='100%' borderColor='#dadada'>
          <Divider sx={{ borderColor: '#f3f7f9' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              px: 4,
              pt: 2.5,
              pb: 2.8,
              backgroundColor: '#ffffff',
            }}
          >
            <Button
              variant='text'
              sx={{ color: (theme: any) => theme.palette.grey[400] }}
              onClick={handleClickGoto}
            >
              Cancel
            </Button>
            <LoadingButton
              variant='contained'
              // color='primary'
              sx={{ ml: 3, backgroundColor: '#3699FF', color: '#FFFFFF' }}
              onClick={async () => {
                const data = graphRef.current
                  .toJSON()
                  .cells.filter(
                    (item: any) => item?.shape != 'edge' && !item?.data?.key?.includes('trigger')
                  )
                console.log('beforeTurndata---', data)
                if (data.length == 1 && data[0].id === 'node1') return
                // {
                //   Flowdetail && Flowdetail.data?.length > 0
                //     ? UpdateAutomation(data)
                //     : PostAutomation(data)
                // }

                const res: any = await PostAutomation(data)
                console.log('createStatus.current---', createStatus)
              }}
            >
              add Task
              {/* {Flowdetail && Flowdetail?.data?.length > 0 ? <>save change</> : <>add Task</>} */}
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default React.memo(AutomationTaskCreateDetail)
