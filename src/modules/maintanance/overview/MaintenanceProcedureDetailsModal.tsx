import { FC, useState } from 'react'
import { IMaintenanceProcedure } from '../../../types/maintenance'
import DialogWrapper from '../../common/DialogWrapper'
import { Box, Stack, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

interface IProps {
  open: boolean
  onClose: () => void
  procedure: IMaintenanceProcedure
}

const MaintenanceProcedureDetailsModal: FC<IProps> = ({ open, onClose, procedure }) => {
  const [step, setStep] = useState({ index: 0, step: procedure?.steps[0] })

  const hasNext = !!procedure?.steps[step.index + 1]
  const hasPrev = step.index > 0

  const handleMoveNext = () => {
    setStep({ index: step.index + 1, step: procedure?.steps[step.index + 1] })
  }
  const handleMoveBack = () => {
    setStep({ index: step.index - 1, step: procedure?.steps[step.index - 1] })
  }

  return (
    <DialogWrapper open={open} onClose={onClose} label='Precedure Details' maxWidth={'md'}>
      <Box pl={3} py={2}>
        <Box>
          <Typography mb={1} color={'grey.600'}>{`Step ${step.index + 1}`}</Typography>
          <Typography color={'grey.900'}>{step.step.text}</Typography>
        </Box>
        <Stack
          mt={2.5}
          p={2}
          direction={'row'}
          flexWrap={'nowrap'}
          sx={{
            gap: 3,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#DEDEDE',
              borderRadius: '120px',
            },
          }}
        >
          {step.step.images?.map((img, idx) => {
            return (
              <Box
                key={`i-${idx}`}
                sx={{
                  '& img': {
                    width: 'inherit',
                    height: 'inherit',
                    objectFit: 'cover',
                    borderRadius: 'inherit',
                  },
                  // boxShadow: '0px 2px 24px -6px rgba(0,0,0,0.5)',
                  width: '250px',
                  height: '300px',
                  borderRadius: '10px',
                  flex: 1,
                }}
              >
                <img src={img.url} />
              </Box>
            )
          })}
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={
            hasPrev && hasNext ? 'space-between' : hasNext ? 'flex-end' : 'flex-start'
          }
          p={5}
        >
          {hasPrev && (
            <ArrowBackIosIcon
              fontSize='large'
              sx={{ fontWeight: 700 }}
              onClick={() => handleMoveBack()}
            />
          )}
          {hasNext && (
            <ArrowForwardIosIcon
              fontSize='large'
              sx={{ fontWeight: 700 }}
              onClick={() => handleMoveNext()}
            />
          )}
        </Stack>
      </Box>
    </DialogWrapper>
  )
}

export default MaintenanceProcedureDetailsModal
