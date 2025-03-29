import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { AddressIcon } from '../../../../assets/icons/audit-form/address'
import { ButtonIcon } from '../../../../assets/icons/audit-form/button'
import { DropdownIcon } from '../../../../assets/icons/audit-form/dropdown'
import { EmailIcon } from '../../../../assets/icons/audit-form/email'
import { LongDescriptionIcon } from '../../../../assets/icons/audit-form/long-description'
import { MultipleChoiseIcon } from '../../../../assets/icons/audit-form/multiple-choise'
import { ParagraphIcon } from '../../../../assets/icons/audit-form/paragraph'
import { PhoneIcon } from '../../../../assets/icons/audit-form/phone'
import { ShortDescriptionIcon } from '../../../../assets/icons/audit-form/short-description'
import { SingleChoiseIcon } from '../../../../assets/icons/audit-form/single-choise'
import { TextIcon } from '../../../../assets/icons/audit-form/text'
import { UserIcon } from '../../../../assets/icons/audit-form/user'
import { FORM_FIELD_TYPE } from '../../../../helpers/constants'
import { UploadFileIcon } from '../../../../assets/icons/audit-form/upload-file'
import { UploadImageIcon } from '../../../../assets/icons/audit-form/upload-image'
import { UploadVideoIcon } from '../../../../assets/icons/audit-form/upload-video'
import { DateIcon } from '../../../../assets/icons/audit-form/date'
import { ScaleIcon } from '../../../../assets/icons/audit-form/scale'
import { RatingIcon } from '../../../../assets/icons/audit-form/rating'
import { FC, useMemo, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDraggable } from '@dnd-kit/core'
import { DividerIcon } from '../../../../assets/icons/audit-form/divider'
import { IField } from './FormBuilder'
import DrawIcon from '@mui/icons-material/Draw'

interface IFields {
  type: string
  title: string
  icon: any
  isAdvanced: boolean
  value: any
}

export const fields: IFields[] = [
  {
    type: FORM_FIELD_TYPE.TEXT,
    title: 'Text',
    icon: TextIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Text Sample',
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.PARAGRAPH,
    title: 'Paragraph',
    icon: ParagraphIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Text Paragraph',
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.SHORT_DESCRIPTION,
    title: 'Short Description',
    icon: ShortDescriptionIcon,
    isAdvanced: false,
    value: {
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.LONG_DESCRIPTION,
    title: 'Long Description',
    icon: LongDescriptionIcon,
    isAdvanced: false,
    value: {
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.DROPDOWN,
    title: 'Dropdown',
    icon: DropdownIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Dropdown list',
      options: [
        { label: 'Text', value: 0 },
        { label: 'Text', value: 2 },
      ],
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.SINGLE_CHOISE,
    title: 'Single Choice',
    icon: SingleChoiseIcon,
    isAdvanced: false,
    value: {
      options: [
        { label: 'Text', value: 0 },
        { label: 'Text', value: 2 },
      ],
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.MULTIPLE_CHOISE,
    title: 'Multiple Choice',
    icon: MultipleChoiseIcon,
    isAdvanced: false,
    value: {
      options: [
        { label: 'Text', value: 0 },
        { label: 'Text', value: 2 },
      ],
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.BUTTON,
    title: 'Button',
    icon: ButtonIcon,
    isAdvanced: false,
    value: 'Submit',
  },
  {
    type: FORM_FIELD_TYPE.DIVIDER,
    title: 'Section Divider',
    icon: DividerIcon,
    isAdvanced: false,
    value: undefined,
  },
  {
    type: FORM_FIELD_TYPE.FULL_NAME,
    title: 'Full Name',
    icon: UserIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Full Name',
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.EMAIL,
    title: 'Email',
    icon: EmailIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Email',
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.CONTACT_NUMBER,
    title: 'Contact Number',
    icon: PhoneIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Contact Number',
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.ADDRESS,
    title: 'Address',
    icon: AddressIcon,
    isAdvanced: false,
    value: {
      placeholder: 'Address',
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.UPLOAD_FILE,
    title: 'Upload File',
    icon: UploadFileIcon,
    isAdvanced: true,
    value: {
      placeholder: 'Text',
      buttonLabel: 'Upload File',
      required: false,
      multiple: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.UPLOAD_IMAGE,
    title: 'Upload Image',
    icon: UploadImageIcon,
    isAdvanced: true,
    value: {
      placeholder: 'Text',
      required: false,
      multiple: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.UPLOAD_VIDEO,
    title: 'Upload Video',
    icon: UploadVideoIcon,
    isAdvanced: true,
    value: {
      placeholder: 'Text',
      required: false,
      multiple: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.SIGNATURE,
    title: 'Signature',
    icon: DrawIcon,
    isAdvanced: true,
    value: {
      placeholder: 'Text',
      options: [
        { label: 'Text', value: 0 },
        { label: 'Text', value: 2 },
      ],
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.DATE_PICKER,
    title: 'Date Picker',
    icon: DateIcon,
    isAdvanced: true,
    value: {
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.SCALE,
    title: 'Scale',
    icon: ScaleIcon,
    isAdvanced: true,
    value: {
      required: false,
    },
  },
  {
    type: FORM_FIELD_TYPE.RATING,
    title: 'Rating',
    icon: RatingIcon,
    isAdvanced: true,
    value: {
      placeholder: 'Text',
      required: false,
      templateIds: [],
    },
  },
]

export const SidebarField = (props: any) => {
  const { field, onDrag } = props
  const { title, icon } = field
  const Icon = icon
  const theme = useTheme()
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={onDrag ? 'center' : ''}
      gap={2}
      sx={{
        borderRadius: '50px',
        padding: 3,
        cursor: 'pointer',
        background: (theme) => (onDrag ? theme.palette.primary.main : ''),
        '&:hover': { background: (theme) => (!onDrag ? theme.palette.primary.light : '') },
      }}
    >
      <Icon color={theme.palette.primary.main} />
      <Typography>{title}</Typography>
    </Box>
  )
}

const DraggableSidebarField = (props: any) => {
  const { field, disabled, ...rest } = props

  const id = useRef(uuidv4())

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  })

  return (
    <Box
      ref={disabled ? null : setNodeRef}
      {...listeners}
      {...attributes}
      gap={2}
      flex={'1'}
      flexBasis={'40%'}
    >
      <SidebarField field={field} {...rest} />
    </Box>
  )
}

interface IProps {
  draggedFields: IField[]
}

const DraggableFields: FC<IProps> = ({ draggedFields }) => {
  const items = useMemo(() => {
    return fields.filter((field) => !field.isAdvanced)
  }, [fields])

  const advancedItems = useMemo(() => {
    return fields.filter((field) => field.isAdvanced)
  }, [fields])

  const isRatingPresent = useMemo(() => {
    const rating = draggedFields?.find((f) => f.type === FORM_FIELD_TYPE.RATING)
    return Boolean(rating)
  }, [draggedFields])

  return (
    <Box>
      <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
        {items.map((field, i) => (
          <DraggableSidebarField
            key={i}
            title={field.title}
            icon={field.icon}
            field={field}
            disabled={isRatingPresent && field.type === FORM_FIELD_TYPE.RATING}
          />
        ))}
      </Stack>
      <Box position={'relative'} my={3}>
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            left: 50,
            width: '100%',
            height: '100%',
            zIndex: 1,
            background: '#ffffff',
            px: 3,
          }}
        >
          <Typography
            fontWeight={'bold'}
            color={'grey.500'}
            sx={{
              display: 'inline-block',
              background: '#ffffff',
              px: 3,
            }}
          >
            Advanced Field
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Stack direction={'row'} flexWrap={'wrap'} gap={1}>
        {advancedItems.map((field, i) => (
          <DraggableSidebarField
            key={i}
            title={field.title}
            icon={field.icon}
            field={field}
            disabled={isRatingPresent && field.type === FORM_FIELD_TYPE.RATING}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default DraggableFields
