import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import { IMaintenanceProcedure } from '../../../types/maintenance'
import { FC, useMemo, useState } from 'react'
import SimpleSelect from '../../common/SimpleSelect'
import { ISelectItem } from '../../../types/common'
import MaintenanceProcedureDetailsModal from './MaintenanceProcedureDetailsModal'

interface IProps {
  procedures: IMaintenanceProcedure[]
}

const Step = ({ name, text, images }: { name: string; text: string; images: string[] }) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      p={2}
      mt={2}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      borderRadius={'12px'}
    >
      <Box>
        <Typography mb={1} color={'grey.600'}>
          {name}
        </Typography>
        <Typography color={'grey.900'}>{text}</Typography>
      </Box>
      <Stack direction={'row'} gap={2} alignItems={'center'}>
        {images?.map((url, idx) => {
          return (
            <Box
              sx={{
                '& img': { width: 'inherit', height: 'inherit', objectFit: 'cover' },
                boxShadow: '0px 2px 24px -6px rgba(0,0,0,0.5)',
                width: '74px',
                height: '60px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
              key={`i-${idx}`}
            >
              <img src={url} />
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

const MaintenanceProcedure: FC<IProps> = ({ procedures }) => {
  const [procedure, setProcedure] = useState<ISelectItem>({
    label: procedures[0].name,
    value: procedures[0].name,
  })
  const [isEdit, setIsEdit] = useState(false)
  const [procedureDetailsOn, setProcedureDetailsOn] = useState(false)

  const procedureOptions = useMemo(() => {
    return procedures.map((p) => ({ label: p.name, value: p.name }))
  }, [procedure])

  return (
    <Card>
      <Box sx={{ px: 3.75, pt: 5, pb: 2.5 }}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='h3'>Procedure Name</Typography>
          <Button variant='contained' color='primary' onClick={() => setIsEdit((prev) => !prev)}>
            {isEdit ? 'Save' : 'Edit'}
          </Button>
        </Stack>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 5, pb: 2.5 }}>
        <Stack direction={'row'} alignItems={'center'} gap={5}>
          <Typography color={'grey.800'}>Maintenance Procedure</Typography>
          {!isEdit && (
            <Typography fontSize={'14px'} color={'grey.600'}>
              {procedure.label}
            </Typography>
          )}
          <Box flex={1}>
            {isEdit && (
              <SimpleSelect
                value={procedure}
                options={procedureOptions}
                onChange={(val) => setProcedure(val)}
                width='100%'
                sx={{ '.MuiSelect-select': { py: '13px' } }}
              />
            )}
          </Box>
        </Stack>
        <Box onClick={() => setProcedureDetailsOn(true)}>
          {procedures
            .find((f) => f.name === procedure.label)
            ?.steps.map((step, idx) => {
              const imgs = step.images.map((img) => img.url)
              return (
                <Step name={`Step ${idx + 1}`} text={step.text} images={imgs} key={`step-${idx}`} />
              )
            })}
        </Box>
      </Box>
      <MaintenanceProcedureDetailsModal
        open={procedureDetailsOn}
        onClose={() => setProcedureDetailsOn(false)}
        procedure={procedures?.find((f) => f.name === procedure.label) || procedures[0]}
      />
    </Card>
  )
}

export default MaintenanceProcedure
