import { Box, Typography, Stack } from '@mui/material'

import Api from '../../api'
import { ROW_PER_PAGE_OPTIONS } from '../../helpers/constants'
import { useEffect } from 'react'
import BackDrop from '../common/BackDrop'

interface IProps {
  selected: number | null
  onChange: (formId: number) => void
}

const FormSelect = ({ selected, onChange }: IProps) => {
  const { data: formList, isLoading } = Api.useGetAuditFormTypeListQuery({
    page: 1,
    limit: ROW_PER_PAGE_OPTIONS[0],
  })
  const forms = formList?.rows || []
  const selectedForm = forms?.find((f) => f.id === selected)

  const handleChange = (formId: number) => {
    onChange(formId)
  }

  useEffect(() => {
    if (forms.length > 0) {
      onChange(selectedForm?.id || forms[0].id)
    }
  }, [forms])

  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      gap={1}
      alignItems={'center'}
      sx={{ px: 1.5, py: 2, background: '#FFFFFF', borderRadius: '8px' }}
    >
      {isLoading && (
        <Box sx={{ position: 'relative', height: '30px', width: '30px', px: 2 }}>
          <BackDrop size={30} />
        </Box>
      )}
      {!isLoading &&
        forms.length > 0 &&
        forms.map((form, idx) => {
          const isSelected = form.id === selected
          return (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1.25,
                borderRadius: 1.5,
                backgroundColor: (theme) => (isSelected ? theme.palette.primary.light : '#ffffff'),
                cursor: 'pointer',
                color: (theme) =>
                  isSelected ? theme.palette.primary.main : theme.palette.grey[600],
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: (theme) => theme.palette.primary.main,
                },
              }}
              onClick={() => handleChange(form.id)}
            >
              <Typography
                variant='subtitle1'
                sx={{
                  color: 'inherit',
                }}
              >
                {form.name}
              </Typography>
            </Box>
          )
        })}
      {!isLoading && forms.length === 0 && (
        <Box>
          <Typography
            variant='subtitle1'
            sx={{
              color: (theme) => theme.palette.grey[300],
            }}
          >
            No Available Form
          </Typography>
        </Box>
      )}
    </Stack>
  )
}

export default FormSelect
