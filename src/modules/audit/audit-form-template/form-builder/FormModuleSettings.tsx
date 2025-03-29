import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { IField } from './FormBuilder'
import { FORM_FIELD_TYPE } from '../../../../helpers/constants'
import TextSetting from './settings/TextSetting'
import DescriptionSetting from './settings/DescriptionSetting'
import DropdownSetting from './settings/DropdownSetting'
import ChoiceSetting from './settings/ChoiceSetting'
import ButtonSetting from './settings/ButtonSetting'
import UploadSetting from './settings/UploadSetting'
import DateSetting from './settings/DateSetting'
import RatingSetting from './settings/RatingSetting'
import SignatureSetting from './settings/SignatureSetting'

interface IProps {
  field: IField | undefined
  onChange: (value: IField) => void
}

const FormModuleSettings: FC<IProps> = ({ field, onChange }) => {
  if (!field) {
    return (
      <Box px={2} pb={2}>
        <Typography align='center'>No field has been selected</Typography>
      </Box>
    )
  }
  return (
    <Box px={2} pb={2}>
      {field.type === FORM_FIELD_TYPE.TEXT && (
        <TextSetting settingName={'Text Field'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.PARAGRAPH && (
        <TextSetting settingName={'Paragraph Field'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.SHORT_DESCRIPTION && (
        <DescriptionSetting
          settingName={'Short Description Field'}
          field={field}
          onChange={onChange}
        />
      )}
      {field.type === FORM_FIELD_TYPE.LONG_DESCRIPTION && (
        <DescriptionSetting
          settingName={'Long Description Field'}
          field={field}
          onChange={onChange}
        />
      )}
      {field.type === FORM_FIELD_TYPE.DROPDOWN && (
        <DropdownSetting field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.SINGLE_CHOISE && (
        <ChoiceSetting field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.MULTIPLE_CHOISE && (
        <ChoiceSetting field={field} onChange={onChange} multiple />
      )}
      {field.type === FORM_FIELD_TYPE.BUTTON && <ButtonSetting field={field} onChange={onChange} />}
      {field.type === FORM_FIELD_TYPE.DIVIDER && (
        <Typography mt={2}>No available options</Typography>
      )}
      {field.type === FORM_FIELD_TYPE.FULL_NAME && (
        <TextSetting settingName={'Full Name Field'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.EMAIL && (
        <TextSetting settingName={'Email Field'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.CONTACT_NUMBER && (
        <TextSetting settingName={'Contact Number Field'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.ADDRESS && (
        <TextSetting settingName={'Address Field'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_FILE && (
        <UploadSetting settingName={'File'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_IMAGE && (
        <UploadSetting settingName={'Image'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_VIDEO && (
        <UploadSetting settingName={'Video'} field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.SIGNATURE && (
        <SignatureSetting field={field} onChange={onChange} />
      )}
      {(field.type === FORM_FIELD_TYPE.DATE_PICKER || field.type === FORM_FIELD_TYPE.SCALE) && (
        <DateSetting field={field} onChange={onChange} />
      )}
      {field.type === FORM_FIELD_TYPE.RATING && <RatingSetting field={field} onChange={onChange} />}
    </Box>
  )
}

export default FormModuleSettings
