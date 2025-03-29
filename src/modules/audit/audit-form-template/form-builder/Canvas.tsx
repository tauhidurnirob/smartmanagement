import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { FC } from 'react'
import { Box, Paper, TextField } from '@mui/material'
import LayoutSelector, { Layout } from './layout/LayoutSelector'
import SortableContainer from './container'
import SortableItem, { Item } from './sortable-item'
import SelectLogo from './SelectLogo'

interface IProps {
  itemIds: any,
  getItems: any,
  selectedLayout: number | null,
  setSelectedLayout: (layout: number | null) => void
  selectedField: string
  setSelectedField: (item: string) => void
  deleteClicked: (id: string) => void
  formTitle: string
  setFormTitle: (title: string) => void
  formSubTitle: string
  setFormSubTitle: (title: string) => void
  logo: string
  setLogo: (v: string) => void
}

const Canvas: FC<IProps> = ({
  itemIds,
  getItems,
  selectedLayout,
  setSelectedLayout,
  selectedField,
  setSelectedField,
  deleteClicked,
  formTitle,
  setFormTitle,
  formSubTitle,
  setFormSubTitle,
  logo,
  setLogo
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '20px 50px',
        background: '#F3F6F9',
        borderRadius: '6px',
        maxHeight: '1500px',
        overflow: 'scroll'
      }}
    >
    <Box my={3}>
      <SelectLogo
        logo={logo}
        setLogo={setLogo}
      />
    </Box>
    {/* <Paper elevation={0} sx={{mb: 2, p: 2}}>
      <TextField
        fullWidth
        variant="outlined"
        value={formTitle === 'Form Title' ? '' : formTitle}
        placeholder={formTitle}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {border: 'none !important'},
          '& .MuiInputBase-input': {p: 1, fontSize: '28px', fontWeight: 'bold', '&::placeholder': {fontSize: '28px', fontWeight: 'bold', color: 'text.primary'}},
        }}
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <TextField
        fullWidth
        variant="outlined"
        value={formSubTitle}
        placeholder={'A short form description'}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {border: 'none !important'},
          '& .MuiInputBase-input': {p: 1, fontSize: '16px', fontWeight: 500, '&::placeholder': {fontSize: '16px', fontWeight: 500}},
        }}
        onChange={(e) => setFormSubTitle(e.target.value)}
      />
    </Paper> */}
    <SortableContext
      id="droppable_root"
      items={itemIds}
      strategy={verticalListSortingStrategy}
    >
      {getItems(undefined).map((item: any) => {
        if (item.container) {
          return (
            <SortableContainer
              key={item.id}
              id={item.id}
              getItems={getItems}
              row={item.row}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              deleteClicked={deleteClicked}
            />
          );
        }

        return (
          <SortableItem
            key={item.id}
            id={item.id}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            deleteClicked={deleteClicked}
          >
            <Item field={item} />
          </SortableItem>
        );
      })}
      </SortableContext>
      {/* {
        selectedLayout === Layout.layout1 &&
        <DroppableLayout1 />
      } */}
      <LayoutSelector onChange={setSelectedLayout} />
    </Box>
  )
}

export default Canvas
