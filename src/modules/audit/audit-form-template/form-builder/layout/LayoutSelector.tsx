import { Box, Stack, Typography } from "@mui/material"

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FC, useState } from "react";
import { CloseDuotone } from "../../../../../assets/icons/close-duotone";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export enum Layout {
  layout1 = 1,
  layout2
}

interface IProps {
  onChange: (val: number) => void
}

const LayoutSelector:FC<IProps> = ({onChange}) => {
  const [layoutSelectorOn, setLayoutSelectorOn] = useState(false)

  const onSelectLayout = (num: number) => {
    setLayoutSelectorOn(false)
    onChange(num)
  }

  const { attributes, listeners, setNodeRef, transform, transition }: any = useDroppable({
    id: 'droppable-layout-main',
    data: {
      parent: null,
      isContainer: true,
    },
  })

  return(
    <Box
      p={2}
      sx={{border: theme => `1px dashed ${theme.palette.grey[600]}`, borderRadius: '6px'}}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {
        !layoutSelectorOn ?
        <Stack alignItems={'center'} >
          <Typography>
            <AddCircleIcon fontSize='large' color="primary" onClick={() => setLayoutSelectorOn(true)} />
          </Typography>
          <Typography fontSize={'16px'} color={'text.secondary'} fontWeight={'500'} py={1} >Drag & drop a field from the sidebar to add it to your form</Typography>
        </Stack>
        :
        <Box position={'relative'}>
          <Box position={'absolute'} top={0} right={0} >
            <CloseDuotone onClick={() => setLayoutSelectorOn(false)} fontSize="large" />
          </Box>
          <Typography fontSize={'16px'} color={'text.secondary'} fontWeight={'500'} align="center" >Select your structure</Typography>
          <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'} gap={2} pt={3} pb={1} >
            <Box
              flexBasis={'48%'} height={'91px'} bgcolor={'grey.400'}
              sx={{"&:hover": {bgcolor: 'grey.500'}}}
              onClick={() => onSelectLayout(Layout.layout1)}
            ></Box>
            <Stack
              flexBasis={'48%'} direction={'row'} height={'91px'} gap={1} justifyContent={'space-between'}
              sx={{"&:hover": {"div": {bgcolor: 'grey.500'}}}}
              onClick={() => onSelectLayout(Layout.layout2)}
            >
              <Box flexBasis={'50%'} height={'100%'} bgcolor={'grey.400'} ></Box>
              <Box flexBasis={'50%'} height={'100%'} bgcolor={'grey.400'} ></Box>
            </Stack>
          </Stack>
        </Box>
      }
    </Box>
  )
}

export default LayoutSelector