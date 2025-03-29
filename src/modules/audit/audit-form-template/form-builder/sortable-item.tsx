import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Button, Divider, Stack } from '@mui/material'
import { DraggableIcon } from '../../../../assets/icons/audit-form/draggable'
import { IField } from './FormBuilder'
import { FORM_FIELD_TYPE } from '../../../../helpers/constants'
import TextField from './fields/TextField'
import ParagraphField from './fields/ParagraphField'
import { TrashIcon } from '../../../../assets/icons/trash'
import Description from './fields/Description'
import DropdownField from './fields/DropdownField'
import SingleChoice from './fields/SingleChoice'
import MultipleChoice from './fields/MultipleChoice'
import UploadFile from './fields/UploadFile'
import UploadImage from './fields/UploadImage'
import UploadVideo from './fields/UploadVideo'
import DateField from './fields/DateField'
import ScaleField from './fields/ScaleField'
import RatingContainer from './fields/RatingContainer'
import SignatureField from './fields/SignatureField'

export const Item = ({ field }: { field: IField }) => {
  return (
    <>
      {field.type === FORM_FIELD_TYPE.TEXT && (
        <TextField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
        />
      )}
      {field.type === FORM_FIELD_TYPE.PARAGRAPH && (
        <ParagraphField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
        />
      )}
      {field.type === FORM_FIELD_TYPE.SHORT_DESCRIPTION && (
        <Description fieldName={field.fieldName} />
      )}
      {field.type === FORM_FIELD_TYPE.LONG_DESCRIPTION && (
        <Description fieldName={field.fieldName} long />
      )}
      {field.type === FORM_FIELD_TYPE.DROPDOWN && (
        <DropdownField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
          options={field.value.options}
        />
      )}
      {field.type === FORM_FIELD_TYPE.SINGLE_CHOISE && (
        <SingleChoice name={field.name} fieldName={field.fieldName} options={field.value.options} />
      )}
      {field.type === FORM_FIELD_TYPE.MULTIPLE_CHOISE && (
        <MultipleChoice fieldName={field.fieldName} options={field.value.options} />
      )}
      {field.type === FORM_FIELD_TYPE.BUTTON && <Button variant='contained'>{field.value}</Button>}
      {field.type === FORM_FIELD_TYPE.DIVIDER && <Divider />}
      {field.type === FORM_FIELD_TYPE.FULL_NAME && (
        <TextField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
        />
      )}
      {field.type === FORM_FIELD_TYPE.EMAIL && (
        <TextField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
        />
      )}
      {field.type === FORM_FIELD_TYPE.CONTACT_NUMBER && (
        <TextField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
          inputType='number'
        />
      )}
      {field.type === FORM_FIELD_TYPE.ADDRESS && (
        <ParagraphField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
        />
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_FILE && (
        <UploadFile
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
          buttonLabel={field.value.buttonLabel}
        />
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_IMAGE && (
        <UploadImage fieldName={field.fieldName} placeholder={field.value.placeholder} />
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_VIDEO && (
        <UploadVideo fieldName={field.fieldName} placeholder={field.value.placeholder} />
      )}
      {field.type === FORM_FIELD_TYPE.SIGNATURE && (
        <SignatureField
          name={field.name}
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
        />
      )}
      {field.type === FORM_FIELD_TYPE.DATE_PICKER && <DateField fieldName={field.fieldName} />}
      {field.type === FORM_FIELD_TYPE.SCALE && <ScaleField fieldName={field.fieldName} />}
      {field.type === FORM_FIELD_TYPE.RATING && (
        <RatingContainer
          fieldName={field.fieldName}
          placeholder={field.value.placeholder}
          templateIds={field.value.templateIds}
        />
      )}
    </>
  )
}

interface IProps {
  children: ReactNode
  id: string
  column?: boolean
  row?: boolean
  selectedField: string
  setSelectedField: (v: string) => void
  deleteClicked: (id: string) => void
}

const SortableItem = (props: IProps) => {
  const { children, id, column, row, selectedField, setSelectedField, deleteClicked } = props

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const isSelected = id === selectedField

  const style: any = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: 1,
    position: 'relative',
    width: '100%',
    background: row || column ? 'transparent' : '#ffffff',
    p: row || column ? 0 : 2,
    borderRadius: '6px',
    mb: row || column ? 0 : 2,
  }

  return (
    <Box
      ref={setNodeRef}
      sx={{
        ...style,
        border: (theme) => (isSelected ? `1px solid ${theme.palette.primary.main}` : ''),
      }}
      {...(row || column ? {} : { onClick: () => setSelectedField(id) })}
    >
      {!column && (
        <>
          {(isSelected || row) && (
            <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
              <TrashIcon
                fontSize='small'
                sx={{ color: (theme) => theme.palette.grey[500] }}
                onClick={() => deleteClicked(id)}
              />
              <DraggableIcon
                sx={{ cursor: 'pointer', outline: 'none' }}
                {...attributes}
                {...listeners}
              />
            </Stack>
          )}
        </>
      )}
      {children}
    </Box>
  )
}

export default SortableItem
