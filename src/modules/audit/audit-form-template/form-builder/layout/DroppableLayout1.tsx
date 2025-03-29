import { useDroppable } from "@dnd-kit/core"
import { Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { CSS } from '@dnd-kit/utilities'

export interface IProps {
  id: string
  parent: any
}

const DroppableLayout1 = () => {
  const { attributes, listeners, setNodeRef, transform, transition }: any = useDroppable({
    id: 'droppable-layout1',
    data: {
      parent: null,
      isContainer: true,
    },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        ...style,
        border: theme => `1px dashed ${theme.palette.grey[600]}`,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 2,
        p: 2
      }}
    >
      <AddIcon color="primary" fontSize="large" />
    </Box>
  )
}

export default DroppableLayout1