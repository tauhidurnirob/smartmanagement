import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Group, Line, Transformer } from 'react-konva'
import Konva from 'konva'
import { Vector2d } from 'konva/lib/types'

import deepCopy from '../../helpers/deepCopy'

const NODE_SIZE = 10 // [px]

const convertNodesToLinePoints = (nodes: Vector2d[]) => {
  const points = []
  for (const n of nodes) {
    points.push(n.x)
    points.push(n.y)
  }

  return points
}

interface IProps {
  points: Vector2d[]
  scale: number
  editable?: boolean
  selectedNodeIdx?: number | null
  selectedUnit?: boolean
  onChangePoints?: (nodes: Vector2d[]) => void
  onSelectNode?: (idx: number | null) => void
  onSelectUnit?: (selected: boolean) => void
  onEndAdding?: () => void
}

const UnitPolygon: FC<IProps> = ({
  points,
  editable,
  scale,
  selectedNodeIdx,
  selectedUnit,
  onChangePoints,
  onSelectNode,
  onSelectUnit,
  onEndAdding,
}) => {
  const [nodes, setNodes] = useState<Vector2d[]>([])
  const [lineDragStartPos, setLineDragStartPos] = useState<Vector2d>({ x: 0, y: 0 })

  const linePoints = useMemo(() => {
    return convertNodesToLinePoints(nodes)
  }, [nodes])

  const handleMouseDownLine = () => {
    if (editable && onSelectUnit) {
      onSelectUnit(true)
      if (onSelectNode) {
        onSelectNode(null)
      }
    }
  }

  const handleMouseUpNode = (idx: number) => {}

  const handleMouseDownNode = (idx: number) => {
    if (editable && onSelectNode) onSelectNode(idx)
    if (editable && onSelectUnit) onSelectUnit(false)
  }

  const handleDragStartNode = (idx: number) => {
    if (editable && onSelectNode) onSelectNode(idx)
    if (editable && onSelectUnit) onSelectUnit(false)
  }

  const handleDragNode = (idx: number, e: Konva.KonvaEventObject<DragEvent>) => {
    const newNode = e.target.getPosition()
    const newNodes = deepCopy(nodes)
    newNodes[idx] = { ...newNode }
    setNodes(deepCopy([...newNodes]))
  }

  const handleDragEndNode = (idx: number, e: Konva.KonvaEventObject<DragEvent>) => {
    const newNode = e.target.getPosition()
    const newNodes = deepCopy(nodes)
    newNodes[idx] = { ...newNode }
    setNodes(deepCopy(newNodes))

    if (onChangePoints) {
      onChangePoints(deepCopy(newNodes))
    }
  }

  const handleDlbClickNode = () => {
    if (onEndAdding) onEndAdding()
  }

  const handleDragLine = (e: Konva.KonvaEventObject<DragEvent>) => {
    const newNode = e.target.getAbsolutePosition()
    const newNodes = points.map((node) => {
      return {
        x: node.x + newNode.x,
        y: node.y + newNode.y,
      }
    })
    setNodes(deepCopy(newNodes))
  }

  const handleDragStartLine = (e: Konva.KonvaEventObject<DragEvent>) => {
    const newPos = e.target.getAbsolutePosition()
    setLineDragStartPos(newPos)
  }

  const handleDragEndLine = (e: Konva.KonvaEventObject<DragEvent>) => {
    setLineDragStartPos({ x: 0, y: 0 })
  }

  useEffect(() => {
    setNodes([...points])
  }, [points])

  return (
    <Group>
      <Line
        points={linePoints}
        fill='#67B2FF'
        closed
        opacity={0.6}
        stroke={'#F8BC19'}
        strokeWidth={2}
        // draggable={!!editable}
        strokeEnabled={!!editable && !!selectedUnit}
        onMouseUp={() => editable && handleMouseDownLine()}
        onDragStart={handleDragStartLine}
        onDragMove={handleDragLine}
        onDragEnd={handleDragEndLine}
        listening={!!editable}
      />
      {nodes.map((node, idx) => {
        const { x, y } = node
        const nodePoints = [0, 0, 0 + NODE_SIZE, 0, 0 + NODE_SIZE, 0 + NODE_SIZE, 0, 0 + NODE_SIZE]
        return (
          <Line
            key={`unit-node-item-${idx}`}
            points={nodePoints}
            closed
            fill='#ffffff'
            stroke={selectedNodeIdx === idx ? '#F8BC19' : '#D9D9D9'}
            strokeWidth={2}
            offset={{ x: NODE_SIZE / 2, y: NODE_SIZE / 2 }}
            x={x}
            y={y}
            onMouseUp={() => editable && handleMouseUpNode(idx)}
            onMouseDown={() => editable && handleMouseDownNode(idx)}
            onDragstart={() => editable && handleDragStartNode(idx)}
            onDragMove={(e) => editable && handleDragNode(idx, e)}
            onDragEnd={(e) => editable && handleDragEndNode(idx, e)}
            onDblClick={handleDlbClickNode}
            draggable={!!editable}
            visible={!!editable}
            preventDefault={true}
          />
        )
      })}
    </Group>
  )
}

export default UnitPolygon
