import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { IField } from '../form-builder/FormBuilder'
import { FC, Fragment } from 'react'
import PreviewLogo from './components/PreviewLogo'
import { FORM_FIELD_TYPE } from '../../../../helpers/constants'
import TextFieldWithLabel from '../../../common/TextFieldWithLabel'
import TextareaWithLabel from '../../../common/TextareaWithLabel'
import DateField from '../form-builder/fields/DateField'
import DropdownField from '../form-builder/fields/DropdownField'
import SingleChoice from '../form-builder/fields/SingleChoice'
import MultipleChoice from '../form-builder/fields/MultipleChoice'
import UploadFile from '../form-builder/fields/UploadFile'
import UploadImage from '../form-builder/fields/UploadImage'
import ScaleField from '../form-builder/fields/ScaleField'
import RatingContainer from '../form-builder/fields/RatingContainer'
import { flatToTreeJSON } from '../../../../helpers/customFunctions'
import deepCopy from '../../../../helpers/deepCopy'
import SignatureField from '../form-builder/fields/SignatureField'

interface IProps {
  fields: IField[]
  logo: string
  title: string
  subTitle: string
  formType: string
}

const RenderField = ({ field }: { field: IField }) => {
  return (
    <>
      {(field.type === FORM_FIELD_TYPE.TEXT ||
        field.type === FORM_FIELD_TYPE.FULL_NAME ||
        field.type === FORM_FIELD_TYPE.EMAIL) && (
        <Box mb={2}>
          <TextFieldWithLabel
            label={field.fieldName}
            name={field.name}
            placeholder={field.value.placeholder}
          />
        </Box>
      )}
      {(field.type === FORM_FIELD_TYPE.PARAGRAPH || field.type === FORM_FIELD_TYPE.ADDRESS) && (
        <Box mb={2}>
          <TextareaWithLabel
            label={field.fieldName}
            name={field.name}
            placeholder={field.value.placeholder}
            rows={4}
          />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.DATE_PICKER && (
        <Box mb={2}>
          <DateField fieldName={field.fieldName} />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.SHORT_DESCRIPTION && (
        <Box mb={2}>
          <Typography variant='h4'>{field.fieldName}</Typography>
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.LONG_DESCRIPTION && (
        <Box mb={2}>
          <Typography>{field.fieldName}</Typography>
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.DROPDOWN && (
        <Box mb={2}>
          <DropdownField
            name={field.name}
            fieldName={field.fieldName}
            placeholder={field.value.placeholder}
            options={field.value.options}
            preview
          />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.SINGLE_CHOISE && (
        <Box mb={2}>
          <SingleChoice
            name={field.name}
            fieldName={field.fieldName}
            options={field.value.options}
          />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.MULTIPLE_CHOISE && (
        <Box mb={2}>
          <MultipleChoice fieldName={field.fieldName} options={field.value.options} />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.BUTTON && (
        <Box mb={2}>
          <Button variant='contained'>{field.value}</Button>
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.DIVIDER && (
        <Box mb={2}>
          <Divider />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.CONTACT_NUMBER && (
        <Box mb={2}>
          <TextFieldWithLabel
            name={field.name}
            label={field.fieldName}
            placeholder={field.value.placeholder}
            type='number'
          />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_FILE && (
        <Box mb={2}>
          <UploadFile
            name={field.name}
            fieldName={field.fieldName}
            placeholder={field.value.placeholder}
            buttonLabel={field.value.buttonLabel}
          />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_IMAGE && (
        <Box mb={2}>
          <UploadImage fieldName={field.fieldName} placeholder={field.value.placeholder} />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.UPLOAD_VIDEO && (
        <Box mb={2}>
          <UploadImage fieldName={field.fieldName} placeholder={field.value.placeholder} />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.SIGNATURE && (
        <Box mb={2}>
          <SignatureField
            name={field.name}
            fieldName={field.fieldName}
            placeholder={field.value.placeholder}
          />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.SCALE && (
        <Box mb={2}>
          <ScaleField fieldName={field.fieldName} />
        </Box>
      )}
      {field.type === FORM_FIELD_TYPE.RATING && (
        <Box mb={2}>
          <RatingContainer
            fieldName={field.fieldName}
            placeholder={field.value.placeholder}
            templateIds={field.value.templateIds}
          />
        </Box>
      )}
    </>
  )
}

const Preview: FC<IProps> = ({ fields, logo, title, subTitle, formType }) => {
  const treeFields = flatToTreeJSON(deepCopy(fields))
  console.log(fields)
  return (
    <Box sx={{ m: 3, p: '30px 50px', border: (theme) => `1px solid ${theme.palette.divider}` }}>
      <Typography fontSize={'14px'} fontWeight={600} align={'right'}>
        {formType}
      </Typography>
      <PreviewLogo logo={logo} />
      <Typography variant='h3' mt={3} mb={1}>
        {title}
      </Typography>
      <Typography fontSize={'14px'}>{subTitle}</Typography>
      <Box mt={3}>
        {treeFields?.map((field) => {
          return (
            <Fragment key={field.id}>
              {field.type === 'row' ? (
                <Stack direction={'row'} justifyContent={'space-between'} gap={3} flexWrap={'wrap'}>
                  {field?.children?.map((child) => {
                    return (
                      <Stack flex={1} gap={2} key={child.id}>
                        {child.children?.map((item) => (
                          <RenderField field={item} key={item.id} />
                        ))}
                      </Stack>
                    )
                  })}
                </Stack>
              ) : (
                <RenderField field={field} />
              )}
            </Fragment>
          )
        })}
      </Box>
    </Box>
  )
}

export default Preview
