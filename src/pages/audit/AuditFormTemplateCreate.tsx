import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

import { AUDIT_FORM_CREATE_STEP, IAuditFormTemplate } from '../../types/audit'
import FormBuilder, {
  IFieldState,
} from '../../modules/audit/audit-form-template/form-builder/FormBuilder'
import { ISelectItem } from '../../types/common'
import AssignInfoForm from '../../modules/audit/audit-form-template/AssignInfoForm'
import DialogWrapper from '../../modules/common/DialogWrapper'
import { IReqAuditFormTemplateCreate } from '../../api/models'
import Api from '../../api'
import { FORM_FIELD_TYPE } from '../../helpers/constants'
import BackDrop from '../../modules/common/BackDrop'
import { auditFormTemplateFieldValidate, flatToTreeJSON, treeToFlatJSON } from '../../helpers/customFunctions'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const getInitialValue = (data: IAuditFormTemplate | undefined) => {
  return {
    name: data?.name || '',
    remark: data?.remarks || '',
    formType: (data?.formType
      ? { label: `${data?.formType?.name}`, value: data?.formType?.id }
      : null) as ISelectItem | null,
    projects: data?.projects
      ? data?.projects?.map((p) => ({ label: p.name, value: p.id }))
      : ([] as ISelectItem[]),
  }
}

export interface IAssignFormInfo {
  name: string
  remark: string
  formType: ISelectItem | null
  projects: ISelectItem[]
}

const CreateAuditFormTemplate = () => {
  const { id } = useParams()
  const isEdit = !!id
  const { data: template, isLoading } = Api.useGetAuditFormTemplateByIdQuery(Number(id), {
    skip: !isEdit,
  })

  const [step, setStep] = useState(AUDIT_FORM_CREATE_STEP.assignInfo)

  const navigate = useNavigate()

  const content = treeToFlatJSON(Array.isArray(template?.content) ? template?.content || [] : [])

  const [data, setData] = useState<IFieldState>({
    items: [],
  })
  const [formTitle, setFormTitle] = useState('Form Title')
  const [formSubTitle, setFormSubTitle] = useState('')
  const [logo, setLogo] = useState<any>('')
  const [previewOn, setPreviewOn] = useState(false)
  const [pdfData, setPdfData] = useState<any>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  function onDocumentLoadSuccess({ numPages }: {numPages: number | null}) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (template && isEdit) {
      setData({ items: content })
      setFormTitle(template.title)
      setFormSubTitle(template.subTitle)
      setLogo(template.logoUrl)
    }
  }, [template])

  const [createForm, { isLoading: isCreating }] = Api.useCreateAuditFormTemplateMutation()
  const [uploadFile] = Api.useUploadFileMutation()
  const [updateForm, { isLoading: isUpdating }] = Api.useUpdateAuditFormTemplateByIdMutation()
  const [previewForm] = Api.useDownloadAuditWithoutValueMutation()
  const [fetchRatingTemplates] = Api.useFetchAuditRatingTemplateListByIdsMutation()

  const formik = useFormik<IAssignFormInfo>({
    initialValues: getInitialValue(template),
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Name is required'),
      remark: Yup.string(),
      formType: Yup.object().required('Form Type is required'),
      projects: Yup.array().min(1).required('Projects are required'),
    }),
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)
      if (step === AUDIT_FORM_CREATE_STEP.assignInfo) {
        setStep(AUDIT_FORM_CREATE_STEP.buidForm)
        setSubmitting(true)
        return
      }

      const createFormTemplate = (logoUrl: string) => {
        const ratingField = data.items.find((item) => item.type === FORM_FIELD_TYPE.RATING)
        const req = {
          name: values.name,
          remark: values.remark,
          formTypeId: values.formType?.value,
          projectIds: values.projects.map((p) => p.value),
          title: formTitle || '',
          subTitle: formSubTitle || '',
          logoUrl: logoUrl || '',
          content: flatToTreeJSON(data.items),
          ratingTemplateIds: ratingField?.value.templateIds,
        } as IReqAuditFormTemplateCreate
        if (isEdit) {
          updateForm({
            id: Number(id),
            body: req,
          })
            .unwrap()
            .then((res) => {
              toast.success(`Updated Audit form template`)
              setValues({ ...getInitialValue(template) }, false)
            })
            .catch((err) => {
              console.log('Failed to update Audit form template: ', err)
              toast.error('Failed to update Audit form template')
            })
            .finally(() => {
              setSubmitting(false)
              navigate('/audit/audit-form-template')
            })
        } else {
          createForm(req)
            .unwrap()
            .then((res) => {
              toast.success(`Created a new Audit form template ${res.id}`)
              setValues({ ...getInitialValue(template) }, false)
            })
            .catch((err) => {
              console.log('Failed to create a new Audit form template: ', err)
              toast.error('Failed to create a new Audit form template')
            })
            .finally(() => {
              setSubmitting(false)
              navigate('/audit/audit-form-template')
            })
        }
      }

      try {
        if (logo && typeof logo !== 'string') {
          try {
            uploadFile(logo).then((response: any) => {
              console.log(response)
              createFormTemplate(response?.data?.fileUrl)
            })
          } catch (e) {
            console.log('Failed to create a new Audit form template: ', e)
            toast.error('Failed to create a new Audit form template')
          }
        } else {
          createFormTemplate(logo ?? '')
        }
      } catch (err: any) {
        console.error(err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handlePreview = async () => {
    if (previewOn) {
      setPreviewLoading(true)
      const tmpContent: any[] = [];

      let logoUrl = ''
      if (logo && typeof logo !== 'string') {
        const {data}: any = await uploadFile(logo)
        if (data) {
          logoUrl = data.fileUrl
        }
      }
      else {
        logoUrl = logo
      }
    
      const flatItems = treeToFlatJSON(data.items);
    
      for (const element of flatItems) {
        if (
          auditFormTemplateFieldValidate(element)
        ) {
          const el = {
            fieldName: element.fieldName,
            type: element.type,
          };
          tmpContent.push(el);
        }
    
        if (element.type === FORM_FIELD_TYPE.RATING) {
          if (element.value.templateIds?.length) {
            try {
              const res: any = await fetchRatingTemplates({ ids: element.value.templateIds });
    
              if (res && res.data.length > 0) {
                const tempSubmittedValues: any[] = [];
    
                for (const template of res.data) {
                  const temp = {
                    templateId: template.id,
                    elements: template.elements,
                  };
                  tempSubmittedValues.push(temp);
                }
    
                const el = {
                  fieldName: element.fieldName,
                  type: element.type,
                  templateIds: element.value.templateIds,
                  templateStyle: res.data[0].style,
                  submittedValue: tempSubmittedValues,
                };
    
                tmpContent.push(el);
              }
            } catch (error) {
              console.error('Error fetching rating templates:', error);
            }
          }
        }
      }
    
      previewForm({
        formTypeName: formik.values.formType?.label as string,
        formTemplateName: formik.values.name,
        locationName: '',
        content: tmpContent,
        logoUrl: logoUrl
      })
      .unwrap()
      .then((res) => {
        const fileType =
          'application/pdf'
        const blob = new Blob([res], {
          type: fileType,
        })
        setPreviewLoading(false)
        setPdfData(blob)
      })
      .catch(err => {
        console.log(err)
        setPreviewLoading(false)
      })
    }
  }

  useEffect(() => {
    handlePreview()
  }, [previewOn])

  return (
    <Box position={'relative'}>
      {isLoading && (
        <Box height={300}>
          <BackDrop />
        </Box>
      )}
      {!isLoading && (
        <Box>
          {step === AUDIT_FORM_CREATE_STEP.assignInfo && (
            <AssignInfoForm
              {...formik}
              handleDiscard={() => {
                formik.resetForm()
                navigate('/audit/audit-form-template')
              }}
              handleNext={() => formik.handleSubmit()}
              isEdit={isEdit}
            />
          )}
          {step === AUDIT_FORM_CREATE_STEP.buidForm && (
            <FormBuilder
              data={data}
              setData={setData}
              formTitle={formTitle as string}
              setFormTitle={setFormTitle}
              formSubTitle={formSubTitle as string}
              setFormSubTitle={setFormSubTitle}
              logo={logo}
              setLogo={setLogo}
              handlePreview={() => setPreviewOn(true)}
              handleCreate={() => formik.handleSubmit()}
              isCreating={isCreating || isUpdating}
              isEdit={isEdit}
              handleBack={() => setStep(AUDIT_FORM_CREATE_STEP.assignInfo)}
            />
          )}

          <DialogWrapper
            open={previewOn}
            label='Preview Form'
            maxWidth={'lg'}
            onClose={() => setPreviewOn(false)}
          >
            {/* {previewOn && (
              <Preview
                fields={data.items}
                logo={logo}
                title={formTitle as string}
                subTitle={formSubTitle as string}
                formType={formik.values.formType?.label as string}
              />
            )} */}
            {
              pdfData &&
              <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess} >
                {Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={1.8}
                    />
                  ),
                )}
              </Document>
            }
            {(previewLoading) && (
              <Box sx={{ position: 'relative', minHeight: '80px', mt: 1 }}>
                <BackDrop size='40px' />
              </Box>
            )}
          </DialogWrapper>
        </Box>
      )}
    </Box>
  )
}

export default CreateAuditFormTemplate
