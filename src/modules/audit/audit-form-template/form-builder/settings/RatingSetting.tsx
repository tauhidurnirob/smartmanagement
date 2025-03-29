import { Box, Button, Checkbox, IconButton, Stack, Typography } from '@mui/material'
import { IField } from '../FormBuilder'
import { FC, useEffect, useMemo, useState } from 'react'
import TextFieldWithLabel from '../../../../common/TextFieldWithLabel'
import { Link } from 'react-router-dom'
import RatingStyleSelect from '../../../audit-rating-template/RatingStyleSelect'
import { ISelectItem } from '../../../../../types/common'
import { AUDIT_RATING_STYLES } from '../../../../../helpers/constants'
import { Plus } from '../../../../../assets/icons/plus'
import Api from '../../../../../api'
import SimpleSelect from '../../../../common/SimpleSelect'
import { Field } from 'formik'
import { IRatingTemplate } from '../../../../../types/audit'
import deepCopy from '../../../../../helpers/deepCopy'
import { TrashIcon } from '../../../../../assets/icons/trash'

interface IProps {
  field: IField
  onChange: (value: IField) => void
}

const RatingSetting: FC<IProps> = ({ field, onChange }) => {
  const [selectedRatingStyle, setSelectedRatingStyle] = useState<ISelectItem>(
    AUDIT_RATING_STYLES[0]
  )
  const [templatesCount, setTemplatesCount] = useState<number>(field.value.templateIds.length)
  const [firstRating, setFirstRating] = useState<undefined | IRatingTemplate>(undefined)
  
  useEffect(() => {
    setTemplatesCount(field.value.templateIds.length)
  }, [field.value.templateIds.length])

  const { data, isLoading } = Api.useGetAuditRatingTemplateListQuery({
    page: 1,
    limit: 100,
  })
  const templates = useMemo(() => {
    let tmpData = data?.rows?.filter((item) => item.style === selectedRatingStyle.value)
    if (firstRating) {
      tmpData = tmpData?.filter(
        (item) =>
          item.ratingStart === firstRating.ratingStart && item.ratingEnd === firstRating.ratingEnd
      )
    }
    return tmpData?.map((v) => ({ label: v.inspectionUnit, value: v.id as number })) || []
  }, [data, selectedRatingStyle, firstRating])

  const handleAddRatingTemplate = () => {
    setTemplatesCount((prev) => prev + 1)
  }
  const handleTemplateChange = (idx: number, value: number) => {
    if (idx === 0 && selectedRatingStyle.value === AUDIT_RATING_STYLES[0].value) {
      const ratingTemplate = data?.rows?.find((f) => f.id === value)
      setFirstRating(ratingTemplate)
    }
    const templateIds = deepCopy(field).value.templateIds
    templateIds[idx] = value
    onChange({ ...field, value: { ...field.value, templateIds: templateIds } })
  }

  const handleRemove = (idx: number) => {
    const templateIds = deepCopy(field).value.templateIds
    templateIds.splice(idx, 1)
    console.log(templateIds)
    onChange({ ...field, value: { ...field.value, templateIds: templateIds } })
  }

  return (
    <Box>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <Typography variant='h4'>Rating Field</Typography>
        <Stack direction={'row'} alignItems={'center'}>
          <Checkbox
            checked={field.value.required}
            onChange={(e) =>
              onChange({ ...field, value: { ...field.value, required: e.target.checked } })
            }
          />
          <Typography color={'text.secondary'}>Required</Typography>
        </Stack>
      </Stack>
      <Box my={1}>
        <TextFieldWithLabel
          label='Field Label'
          sx={{
            '& .MuiInputBase-input': { bgcolor: '#ffffff', py: 0 },
            '& .MuiOutlinedInput-notchedOutline': {
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: '6px',
            },
          }}
          height='32px'
          name='fieldLabel'
          value={field.fieldName}
          onChange={(e) => onChange({ ...field, fieldName: e.target.value })}
        />
      </Box>
      <Box my={3}>
        <TextFieldWithLabel
          label='Description'
          sx={{
            '& .MuiInputBase-input': { bgcolor: '#ffffff', py: 0 },
            '& .MuiOutlinedInput-notchedOutline': {
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: '6px',
            },
          }}
          height='32px'
          name='placeholder'
          value={field.value.placeholder}
          onChange={(e) =>
            onChange({ ...field, value: { ...field.value, placeholder: e.target.value } })
          }
        />
      </Box>
      <Box my={3}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant='h4'>Rating Style</Typography>
          <Link to='/audit/audit-form-template/rating-view' style={{ textDecoration: 'none' }}>
            <Typography
              variant='h4'
              color={'primary.main'}
              sx={{
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Add on Rating Template
            </Typography>
          </Link>
        </Stack>
        <Box mt={2}>
          <RatingStyleSelect
            hiddenLabel={true}
            selected={selectedRatingStyle}
            onChange={(style) => setSelectedRatingStyle(style)}
            height='small'
            disabled={field.value.templateIds.length > 0}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
          Select Rating Template
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
          onClick={handleAddRatingTemplate}
        >
          <Plus sx={{ fontSize: '16px' }} />
        </Button>
      </Box>
      <Box mt={2}>
        {[...Array(templatesCount)].map((_, index) => {
          return (
            <Box mb={2} key={`rating${index}`} display={'flex'} alignItems={'center'} gap={1} justifyContent={'space-between'} >
              <Box flex={1}>
                <SimpleSelect
                  key={index}
                  value={templates?.find((f) => f.value === field.value.templateIds[index]) || null}
                  options={templates}
                  onChange={(val) => handleTemplateChange(index, Number(val.value))}
                  width='100%'
                  placeholder={{ label: 'Select rating template', value: null }}
                  height={'small'}
                />
              </Box>
              <IconButton onClick={() => handleRemove(index)}>
                <TrashIcon
                  sx={{color: theme=> theme.palette.grey[500]}}
                  fontSize="small"
                />
              </IconButton>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default RatingSetting
