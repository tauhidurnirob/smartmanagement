import { FC } from 'react'
import { Box, Typography, Button, Stack, IconButton, Checkbox } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import { Plus } from '../../../assets/icons/plus'
import { IRatingTemplateElementItem } from '../../../types/audit'
import { SixDot } from '../../../assets/icons/six-dot'
import deepCopy from '../../../helpers/deepCopy'

interface IProps {
  elements: IRatingTemplateElementItem[]
  onChange: (elements: IRatingTemplateElementItem[]) => void
}

const AuditRatingElements: FC<IProps> = ({ elements, onChange }) => {
  const handleAddNewElement = () => {
    const els = deepCopy(elements)
    els.push({ name: ``, required: false })
    onChange([...els])
  }
  const handleChangeElementName = (idx: number, name: string) => {
    const els = deepCopy(elements)
    els[idx].name = name
    onChange([...els])
  }
  const handleChangeElementCheck = (idx: number, check: boolean) => {
    const els = deepCopy(elements)
    els[idx].required = check
    onChange([...els])
  }
  const handleRemoveElement = (idx: number) => {
    const els = deepCopy(elements)
    els.splice(idx, 1)
    onChange([...els])
  }
  return (
    <Box sx={{}}>
      <Box sx={{ mt: 5.5, display: 'flex', alignItems: 'center' }}>
        <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
          Rating Element
        </Typography>
        <Button
          variant='contained'
          size='small'
          sx={{
            p: 1,
            ml: 2,
            minWidth: 0,
            background: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.main,
            '&:hover': {
              color: '#ffffff',
            },
          }}
          onClick={handleAddNewElement}
        >
          <Plus sx={{ fontSize: '16px' }} />
        </Button>
      </Box>
      <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={2.25}>
        {elements.map((element, idx) => {
          return (
            <Stack key={idx} flexDirection={'row'} alignItems={'flex-start'} gap={1}>
              <Stack sx={{ mt: 5.5 }}>
                <SixDot sx={{ fontSize: 12, color: (theme) => theme.palette.grey[300] }} />
              </Stack>
              <Stack flexGrow={1}>
                <Typography typography={'h5'} sx={{ mb: 1.5 }}>
                  Rating Element {idx + 1}
                </Typography>
                <TextFieldWithLabel
                  showLabel={false}
                  size='small'
                  fullWidth
                  placeholder='Element'
                  name='name'
                  height='40px'
                  value={element.name}
                  onChange={(e) => handleChangeElementName(idx, e.target.value)}
                />
                {/* <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    mt: 1.5,
                  }}
                >
                  <Checkbox
                    checked={element.required}
                    onChange={(e) => handleChangeElementCheck(idx, e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{ py: 0, pl: 0, pr: 1, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                  />
                  <Typography
                    variant='subtitle1'
                    sx={{
                      lineHeight: '14px',
                      marginTop: '1px',
                      color: (theme) =>
                        element.required ? theme.palette.primary.main : theme.palette.grey[500],
                    }}
                  >
                    Required
                  </Typography>
                </Box> */}
              </Stack>
              <Stack>
                <IconButton sx={{ mt: 3.75 }} onClick={() => handleRemoveElement(idx)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            </Stack>
          )
        })}
      </Box>
    </Box>
  )
}

export default AuditRatingElements
