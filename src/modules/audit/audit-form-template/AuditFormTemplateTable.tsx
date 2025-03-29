import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Paper, Grid } from '@mui/material'
import dayjs from 'dayjs'

import EnhancedTable from '../../common/EnhancedTable'
import FilterLabel from '../../common/FilterLabel'
import SearchField from '../../common/SearchField'
import ProjectSelect from '../project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import FormTypeSelect from './FormTypeSelect'
import { ISelectItem, ITableHeadCell, TableData } from '../../../types/common'
import {
  AUDIT_TABLE_PROCESSED,
  FORM_FIELD_TYPE,
  INITIAL_PAGE_NUMBER,
  ROLE_PERMISSION_KEYS
} from '../../../helpers/constants'
import RecycleBinNotificationBar from '../recycle-bin/RecycleBinNotificationBar'
import Api from '../../../api'
import ListOptionButton from '../../common/ListOptionButton'
import { IAuditFormTemplate } from '../../../types/audit'
import useDebounce from '../../../hooks/useDebounce'
import { DATE_FORMAT_WITHOUT_MIN } from '../../../constants/common'
import DeleteDialog from '../../common/DeleteDialog'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { IReqAuditFormTemplateCreate } from '../../../api/models'
import Preview from './preview/Preview'
import { useDispatch } from 'react-redux'
import {
  _getAuditFormTemplateRecycleState,
  _getAuditFormTemplateState,
} from '../../../store/_selectors'
import {
  _auditFormTemplateActions,
  _auditFormTemplateRecycleActions,
} from '../../../store/slices/audit'
import { auditFormTemplateFieldValidate, treeToFlatJSON } from '../../../helpers/customFunctions'
import FileSaver from 'file-saver'
import useAuth from '../../../hooks/useAuth'

const formPreviewId = 'audit_form_template_preview'
interface IProps {
  processed?: null | AUDIT_TABLE_PROCESSED
  onChangeSelected?: (selected: number[]) => void
  onRemoveNotification?: () => void
  isRecycleBin?: boolean
}

const AuditFormTemplateTable: FC<IProps> = ({
  processed,
  isRecycleBin,
  onChangeSelected,
  onRemoveNotification,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = isRecycleBin ? _getAuditFormTemplateRecycleState() : _getAuditFormTemplateState()
  const actions = isRecycleBin ? _auditFormTemplateRecycleActions : _auditFormTemplateActions

  const [deleteFormTemplateId, setDeleteFormTemplateId] = useState<number | null>(null)
  const [selected, setSelected] = useState<number[]>([])

  const [downloadData, setDownloadData] = useState<IAuditFormTemplate | null>(null)

  const debouncedSearch = useDebounce(state.search, 500)
  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const formTypeIds = useMemo(() => {
    return state.selectedFormTypes.map((p) => Number(p.value))
  }, [state.selectedFormTypes])

  const {
    data: auditFormTemplateListInReycleBin,
    isLoading: isLoadingAuditFormTemplateListInReycleBin,
    refetch: refretchAuditFormTemplateListInReycleBin,
    isUninitialized: isUninitializedListInReycleBin,
  } = Api.useGetAuditFormTemplateListInRecycleBinQuery(
    {
      page: state.page,
      limit: state.limit,
      orderBy: state.orderBy,
      orderDir: state.orderDir,
      text: debouncedSearch,
      projectIds: projectIds,
      locationIds: locationIds,
      formTypeIds,
    },
    { skip: !isRecycleBin }
  )

  const {
    data: auditFormTemplateList,
    isLoading: isLoadingAuditFormTemplateList,
    refetch: refretchAuditFormTemplateList,
    isUninitialized: isUninitializedList,
  } = Api.useGetAuditFormTemplateListQuery(
    {
      page: state.page,
      limit: state.limit,
      orderBy: state.orderBy,
      orderDir: state.orderDir,
      text: debouncedSearch,
      projectIds: projectIds,
      locationIds: locationIds,
      formTypeIds,
    },
    { skip: isRecycleBin }
  )

  const [deleteFormTemplate, { isLoading: isDeleteOne }] =
    Api.useDeleteAuditFormTemplateByIdMutation()
  const [deleteFormTemplatePermanenetly, { isLoading: isLoadingDeletePermanenetly }] =
    Api.useDeleteAuditFormTemplateListPermanentlyInRecycleBinMutation()

  const [createForm, { isLoading: isCreating }] = Api.useCreateAuditFormTemplateMutation()

  const [downloadForm, { isLoading: previewLoading }] = Api.useDownloadAuditWithoutValueMutation()
  const [fetchRatingTemplates] = Api.useFetchAuditRatingTemplateListByIdsMutation()

  const refetch = isRecycleBin
    ? refretchAuditFormTemplateListInReycleBin
    : refretchAuditFormTemplateList

  const isLoadingDelete = isRecycleBin ? isLoadingDeletePermanenetly : isDeleteOne
  const auditFormTemplates = isRecycleBin
    ? auditFormTemplateListInReycleBin?.rows || []
    : auditFormTemplateList?.rows || []
  const loading = isRecycleBin
    ? isLoadingAuditFormTemplateListInReycleBin
    : isLoadingAuditFormTemplateList
  const totalCount = isRecycleBin
    ? auditFormTemplateListInReycleBin?.count || 0
    : auditFormTemplateList?.count || 0
  const isUninitialized = isRecycleBin ? isUninitializedListInReycleBin : isUninitializedList

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(actions.setSelectedLocations(items))
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(actions.setSelectedProjects(items))
    if (state.selectedLocations.length > 0) {
      dispatch(actions.setSelectedLocations([]))
    }
  }

  const handleChangeSelectedFormTypes = (items: ISelectItem[]) => {
    dispatch(actions.setSelectedFormTypes(items))
  }

  const handlePageChange = (page: number) => {
    dispatch(actions.setPage(page))
  }

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(actions.setLimit(limit))
  }

  const handleSelect = (selected: number[]) => {
    setSelected(selected)
    if (onChangeSelected) {
      onChangeSelected(selected)
    }
  }

  const handleDeleteOneFormTemplate = () => {
    if (isRecycleBin) {
      deleteFormTemplatePermanenetly([deleteFormTemplateId as number])
        .then(() => {
          toast.success('FormTemplate deleted successfully')
          setDeleteFormTemplateId(null)
          dispatch(actions.setPage(INITIAL_PAGE_NUMBER))
          refetch()
        })
        .catch((err) => {
          console.log('Failed to delete audit form template: ', err)
          toast.error('Failed to delete audit form template')
        })
    } else {
      deleteFormTemplate(deleteFormTemplateId as number)
        .then(() => {
          toast.success('FormTemplate deleted successfully')
          setDeleteFormTemplateId(null)
          dispatch(actions.setPage(INITIAL_PAGE_NUMBER))
          refetch()
        })
        .catch((err) => {
          console.log('Failed to delete audit form template: ', err)
          toast.error('Failed to delete audit form template')
        })
    }
  }

  const handleEdit = (data: IAuditFormTemplate) => {
    if(isViewEdit){
      navigate(`${data.id}`)
    }else{
      toast.error('You do not have access to edit!')
    }
    
  }

  const handleDuplicate = (data: IAuditFormTemplate) => {
    const content = Array.isArray(data?.content) ? data?.content || [] : []
    const req = {
      name: `${data.name} (copy)`,
      remark: data.remarks,
      formTypeId: data.formType?.id,
      projectIds: data.projects?.map((p) => p.id),
      title: data.title,
      subTitle: data.subTitle,
      logoUrl: data.logoUrl,
      content: content,
      ratingTemplateIds: data.ratingTemplates?.map((t) => t.id),
    } as IReqAuditFormTemplateCreate
    createForm(req)
      .unwrap()
      .then((res) => {
        toast.success(`Duplicated Audit form template`)
      })
      .catch((err) => {
        console.log('Failed to duplicate Audit form template: ', err)
        toast.error('Failed to duplicate Audit form template')
      })
      .finally(() => {})
  }

  const handleDelete = (data: IAuditFormTemplate) => {
    setDeleteFormTemplateId(data.id)
  }

  // const handleDownload = (data: IAuditFormTemplate) => {
  //   setDownloadData(data)
  //   const delay = 1000
  //   setTimeout(() => {
  //     const input = document.getElementById(formPreviewId) as HTMLElement
  //     input.style.display = 'block'
  //     const downloadFileName = 'audit_form_template'
  //     const opt = {
  //       margin: 0,
  //       padding: .4,
  //       filename: `${downloadFileName}.pdf`,
  //       image: { type: 'png', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       pagebreak: { mode: 'avoid-all' },
  //       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //     };
  //     html2pdf().set(opt).from(input).save().then(() => {
  //       input.style.display = 'none'
  //       toast.success('Download completed')
  //     })
  //   }, delay)
  // }

  const handleDownload = async (data: IAuditFormTemplate) => {
    const tmpContent: any[] = []

    const flatItems = treeToFlatJSON(data.content as any)

    for (const element of flatItems) {
      if (
        auditFormTemplateFieldValidate(element)
      ) {
        const el = {
          fieldName: element.fieldName,
          type: element.type,
        }
        tmpContent.push(el)
      }

      if (element.type === FORM_FIELD_TYPE.RATING) {
        if (element.value.templateIds?.length) {
          try {
            const res: any = await fetchRatingTemplates({ ids: element.value.templateIds })

            if (res && res.data.length > 0) {
              const tempSubmittedValues: any[] = []

              for (const template of res.data) {
                const temp = {
                  templateId: template.id,
                  elements: template.elements,
                }
                tempSubmittedValues.push(temp)
              }

              const el = {
                fieldName: element.fieldName,
                type: element.type,
                templateIds: element.value.templateIds,
                templateStyle: res.data[0].style,
                submittedValue: tempSubmittedValues,
              }

              tmpContent.push(el)
            }
          } catch (error) {
            console.error('Error fetching rating templates:', error)
          }
        }
      }
    }

    downloadForm({
      formTypeName: data.formType?.name as string,
      formTemplateName: data.name,
      locationName: '',
      content: tmpContent,
      logoUrl: data.logoUrl
    })
      .unwrap()
      .then((res) => {
        const fileType = 'application/pdf'
        const blob = new Blob([res], {
          type: fileType,
        })
        FileSaver.saveAs(blob, `audit-form-template-${data.id}.pdf`)
        toast.success('Successfully Downloaded')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const { user } = useAuth();
  const [isViewEdit, setIsViewEdit] = useState(true);
  useEffect(() => {
    if (
      processed === AUDIT_TABLE_PROCESSED.restored ||
      processed === AUDIT_TABLE_PROCESSED.deleted
    ) {
      refetch()
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewEditAuditFormTemplate)) {
      setIsViewEdit(true);
    }else{
      setIsViewEdit(false);
    }
  }, [processed])

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Name',
      render: (item: TableData) => {
        const { name } = item as IAuditFormTemplate
        return name
      },
    },
    {
      id: '',
      name: 'Form Type',
      render: (item: TableData) => {
        const { formType } = item as IAuditFormTemplate
        return `${formType?.name?.toString().padStart(2, '0') || '-'}`
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { projects } = item as IAuditFormTemplate
        return projects.map((proj) => proj.name || '-').join(', ')
      },
    },
    {
      id: '',
      name: 'Remarks',
      render: (item: TableData) => {
        const { remarks } = item as IAuditFormTemplate
        return remarks || '_'
      },
    },
    {
      id: '',
      name: 'Updated On',
      render: (item: TableData) => {
        const { updatedAt } = item as IAuditFormTemplate
        return dayjs(updatedAt).format(DATE_FORMAT_WITHOUT_MIN)
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IAuditFormTemplate
        return (
          <ListOptionButton
            list={[
              ...(isRecycleBin ? [] : [{ title: 'View & Edit', onClick: () => handleEdit(data) }]),
              ...(isRecycleBin
                ? []
                : [{ title: 'Duplicate Form', onClick: () => handleDuplicate(data) }]),
              { title: 'Download', onClick: () => handleDownload(data) },
              // { title: 'Delete', onClick: () => handleDelete(data) },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 2, mt: 4 }}>
        <Grid container spacing={{ lg: 5, xs: 2 }}>
          <Grid item md={4} sm={12}>
            <Box>
              <FilterLabel text='Search' />
              <SearchField
                placeholder='Search by Keyword'
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  minWidth: 0,
                  height: '40px',
                  justifyContent: 'center',
                }}
                value={state.search}
                onChange={(e) => dispatch(actions.setSearch(e.target.value))}
              />
            </Box>
          </Grid>
          <Grid item md={4} sm={12}>
            <ProjectSelect
              selected={state.selectedProjects}
              onChange={handleChangeSelectedProjects}
            />
          </Grid>
          {/* <Grid item md={3} sm={12}>
            <LocationSelect
              selected={state.selectedLocations}
              onChange={handleChangeSelectedLocations}
              projectIds={projectIds}
            />
          </Grid> */}
          <Grid item md={4} sm={12}>
            <FormTypeSelect
              selected={state.selectedFormTypes}
              onChange={handleChangeSelectedFormTypes}
            />
          </Grid>
        </Grid>
      </Paper>
      <RecycleBinNotificationBar processed={processed} onRemove={onRemoveNotification} />

      <Box mt={3}>
        <EnhancedTable
          loading={loading}
          totalCount={totalCount}
          data={auditFormTemplates}
          page={state.page}
          rowsPerPage={state.limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          order={'asc'}
          orderBy={'id'}
          onRequestSort={() => null}
          headCells={headCells}
          hasCheckbox={false}
          selected={selected}
          onSelect={handleSelect}
          onSelectIdFieldName={'id'}
          hiddenPagination={false}
        />
      </Box>
      <DeleteDialog
        open={false}
        onClose={() => setDeleteFormTemplateId(null)}
        heading={'Are you sure you want to delete this audit form?'}
        onDelete={() => handleDeleteOneFormTemplate()}
        onGoBack={() => setDeleteFormTemplateId(null)}
        loading={isLoadingDelete}
      />
      <Box sx={{ position: 'absolute', bottom: '-3000px' }}>
        <Box id={formPreviewId} sx={{ display: 'none' }}>
          {downloadData && (
            <Preview
              logo={downloadData.logoUrl}
              title={downloadData.title}
              subTitle={downloadData.subTitle}
              formType={`${downloadData.formType?.name}`}
              fields={Array.isArray(downloadData?.content) ? downloadData?.content || [] : []}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default AuditFormTemplateTable
