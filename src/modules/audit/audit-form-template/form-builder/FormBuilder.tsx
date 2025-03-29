import { FC, useState } from 'react'
import { To } from 'react-router-dom'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import ButtonBack from '../../../common/ButtonBack'
import FormModules from './FormModules'
import { SidebarField } from './DraggableFields'
import Canvas from './Canvas'
import { Layout } from './layout/LayoutSelector'
import { v4 as uuidv4 } from 'uuid'
import { Container } from './container'
import { Item } from './sortable-item'

const TABS = [
  { label: 'Add Fields', value: '1' },
  { label: 'Field Options', value: '2' },
]

const getData = (prop: any) => {
  return prop?.data?.current ?? {}
}

export interface IField {
  id: string
  name: string
  fieldName: string
  type: string
  value: any
  parent?: string
  container?: boolean
  row?: boolean
  children?: IField[]
}
export interface IFieldState {
  items: IField[]
}

interface IProps {
  data: IFieldState
  setData: (v: any) => void
  handlePreview: () => void
  handleCreate: () => void
  formTitle: string
  setFormTitle: (v: string) => void
  formSubTitle: string
  setFormSubTitle: (v: string) => void
  logo: string
  setLogo: (v: string) => void
  isCreating: boolean
  isEdit: boolean
  handleBack: () => void
}

const FormBuilder: FC<IProps> = ({
  data,
  setData,
  handlePreview,
  handleCreate,
  formTitle,
  formSubTitle,
  setFormTitle,
  setFormSubTitle,
  logo,
  setLogo,
  isCreating,
  isEdit,
  handleBack
}) => {
  const [modulesTab, setModulesTab] = useState(TABS[0].value)
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(Date.now())
  const [activeSidebarField, setActiveSidebarField] = useState<any>()
  const [activeField, setActiveField] = useState<any>()
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null)
  const [selectedField, setSelectedField] = useState<string>('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getFieldFromId = (id: string) => {
    return data.items.find((f) => f.id === id)
  }

  const isContainer = (id: any) => {
    const item = data.items.find((item: any) => item.id === id)

    return !item ? false : item.container
  }

  const isRow = (id: any) => {
    const item = data.items.find((item: any) => item.id === id)

    return !item ? false : item.row
  }

  const getItems = (parent: any) => {
    return data.items.filter((item: any) => {
      if (!parent) {
        return !item.parent
      }

      return item.parent === parent
    })
  }

  const getItemIds = (parent: any) => {
    return getItems(parent).map((item: any) => item.id)
  }

  const findParent = (id: any) => {
    const item = data.items.find((item: any) => item.id === id)
    return !item ? false : item.parent
  }

  const getDragOverlay = () => {
    const currentFieldId = activeField?.id

    if (!currentFieldId) {
      return null
    }

    if (isContainer(currentFieldId)) {
      return (
        <Container row={activeField.row}>
          {getItems(currentFieldId).map((ite) => {
            const child = data.items.find((f) => f.parent === ite.id)
            return <Container row={ite.row}>{child && <Item field={child} />}</Container>
          })}
        </Container>
      )
    }

    return <Item field={activeField} />
  }

  const handleSelectLayout = (layout: number | null) => {
    if (layout === Layout.layout1) {
      const tmpId = uuidv4()
      const tmpData = [
        {
          id: tmpId,
          type: 'row',
          fieldName: 'row',
          name: `row${data.items.length + 1}`,
          value: undefined,
          container: true,
          row: true,
        },
        {
          id: `${uuidv4()}`,
          type: 'column',
          fieldName: 'column',
          name: `column${data.items.length + 1}`,
          value: undefined,
          container: true,
          row: undefined,
          parent: tmpId,
        }
      ]
      setData((prev: any) => ({
        items: [...prev.items, ...tmpData],
      }))
      setSelectedLayout(null)
      return
    }
    else if (layout === Layout.layout2) {
      const tmpId = uuidv4()
      const tmpData = [
        {
          id: tmpId,
          type: 'row',
          fieldName: 'row',
          name: `row${data.items.length + 1}`,
          value: undefined,
          container: true,
          row: true,
        },
        {
          id: `${uuidv4()}`,
          type: 'column',
          fieldName: 'column',
          name: `column${data.items.length + 1}`,
          value: undefined,
          container: true,
          row: undefined,
          parent: tmpId,
        },
        {
          id: `${uuidv4()}`,
          type: 'column',
          fieldName: 'column',
          name: `column${data.items.length + 2}`,
          value: undefined,
          container: true,
          row: undefined,
          parent: tmpId,
        },
      ]
      setData((prev: any) => ({
        items: [...prev.items, ...tmpData],
      }))
      setSelectedLayout(null)
      return
    }
    setSelectedLayout(layout)
  }

  const cleanUp = () => {
    setActiveSidebarField(null as any)
    setActiveField(null as any)
  }

  function handleDragStart(event: any) {
    const { active } = event
    const activeData = getData(active)

    if (activeData.fromSidebar) {
      const { field } = activeData
      const { type, value, title } = field
      setActiveSidebarField(field)
      setActiveField({
        id: active.id,
        type,
        fieldName: title,
        name: `${type}${data.items.length + 1}`,
        value: value,
        container: false,
        row: false,
      })
      return
    }
    const tmpField = getFieldFromId(active.id)
    setActiveField(tmpField)
  }

  function handleDragOver(event: any) {
    const { active, over, draggingRect } = event
    const { id } = active

    const activData = getData(active)
    if (activData.fromSidebar) {
      return
    }

    let overId: any
    if (over) {
      overId = over.id
    }

    const overParent = findParent(overId)
    const overIsContainer = isContainer(overId)
    const activeIsContainer = isContainer(activeField.id)
    const activeIsRow = isRow(activeField.id)
    const overField = getFieldFromId(overId)
    if (!activeIsRow && activeIsContainer) {
      return
    }
    if (overField?.parent && !overField?.container && activeField?.container) {
      return
    }
    if (overIsContainer) {
      const overIsRow = isRow(overId)
      const hasChild = data.items.find((f) => f.parent === overId)
      if (!overIsRow) {
        if (hasChild) {
          return
        }
      }
      // only columns to be added to rows
      if (overIsRow) {
        if (activeIsRow) {
          return
        }

        if (!activeIsContainer) {
          return
        }
      } else if (activeIsContainer) {
        return
      }
    }

    setData((prev: any) => {
      const activeIndex = data.items.findIndex((item) => item.id === id)
      const overIndex = data.items.findIndex((item) => item.id === overId)

      let newIndex = overIndex
      const isBelowLastItem =
        over &&
        overIndex === prev.items.length - 1 &&
        draggingRect?.offsetTop > over?.rect?.offsetTop + over?.rect?.height

      const modifier = isBelowLastItem ? 1 : 0

      newIndex = overIndex >= 0 ? overIndex + modifier : prev.items.length + 1

      let nextParent
      if (overId) {
        nextParent = overIsContainer ? overId : overParent
      }

      prev.items[activeIndex].parent = nextParent
      const nextItems = arrayMove(prev.items, activeIndex, newIndex)

      return {
        items: nextItems,
      }
    })
  }

  function handleDragEnd(event: any) {
    const { active, over } = event
    const { id } = active

    const activData = getData(active)
    console.log(over)
    console.log(activeField)

    if (activData.fromSidebar && over) {
      const overIsContainer = isContainer(over.id)
      if (overIsContainer) {
        const overIsRow = isRow(over.id)
        if (!overIsRow) {
          setData((prev: any) => ({
            items: [
              ...prev.items,
              {
                ...activeField,
                parent: over.id,
              },
            ],
          }))
        }
      } else {
        const parent = findParent(over.id)
        if(parent) {
          const overField = getFieldFromId(parent)
          console.log(overField)
          if(overField?.type === 'column') {
            setData((prev: any) => ({
              items: [
                ...prev.items,
                {
                  ...activeField,
                  parent: overField.id
                },
              ],
            }))
          }
          else {
            setData((prev: any) => ({
              items: [
                ...prev.items,
                {
                  ...activeField,
                },
              ],
            }))
          }
        }
        else {
          setData((prev: any) => ({
            items: [
              ...prev.items,
              {
                ...activeField,
              },
            ],
          }))
        }
      }
      setSelectedLayout(null)
    } else {
      let overId: any
      if (over) {
        overId = over.id
      }

      const activeIndex = data.items.findIndex((item: any) => item.id === id)
      const overIndex = data.items.findIndex((item: any) => item.id === overId)

      const newIndex = overIndex >= 0 ? overIndex : 0

      if (activeIndex !== overIndex) {
        setData((prev: any) => ({
          items: arrayMove(prev.items, activeIndex, newIndex),
        }))
      }
    }

    setSidebarFieldsRegenKey(Date.now())
    cleanUp()
  }

  return (
    <Box maxWidth='1800px' m='0 auto'>
      <ButtonBack onClick={handleBack} />
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={3}
        mt={2}
      >
        <Stack direction={'row'} alignItems={'center'} gap={3} flexWrap={'wrap'}>
          <Button variant='contained' color='yellow' onClick={handlePreview}>
            Preview
          </Button>
          <LoadingButton
            variant='contained'
            color='primary'
            onClick={handleCreate}
            loading={isCreating}
          >
            {isEdit ? 'Save' : 'Create'}
          </LoadingButton>
        </Stack>
      </Stack>
      <Typography variant='h3'>Create New Audit Form Template</Typography>
      <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <FormModules
                sidebarKey={sidebarFieldsRegenKey}
                tabs={TABS}
                currentTab={modulesTab}
                setCurrentTab={setModulesTab}
                data={data}
                setData={setData}
                selectedField={selectedField}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Canvas
                itemIds={getItemIds(undefined)}
                getItems={getItems}
                selectedLayout={selectedLayout}
                setSelectedLayout={handleSelectLayout}
                selectedField={selectedField}
                setSelectedField={(val) => {
                  setSelectedField(val)
                  setModulesTab(TABS[1].value)
                }}
                deleteClicked={(id) => {
                  setData((prev: any) => ({
                    items: prev.items.filter((a: IField) => a.id !== id),
                  }))
                  setSelectedField('')
                }}
                formTitle={formTitle}
                setFormTitle={setFormTitle}
                formSubTitle={formSubTitle}
                setFormSubTitle={setFormSubTitle}
                logo={logo}
                setLogo={setLogo}
              />
            </Grid>
          </Grid>
          {!activeSidebarField && <DragOverlay>{getDragOverlay()}</DragOverlay>}
          {activeSidebarField && (
            <DragOverlay>
              <SidebarField overlay field={activeSidebarField} onDrag />
            </DragOverlay>
          )}
        </DndContext>
      </Paper>
    </Box>
  )
}

export default FormBuilder
