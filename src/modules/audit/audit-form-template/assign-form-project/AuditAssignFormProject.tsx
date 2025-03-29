import { FC, useEffect, useState } from 'react'
import { Box, Typography, Grid, Card, Divider } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import SearchField from '../../../common/SearchField'
import useDebounce from '../../../../hooks/useDebounce'
import Api from '../../../../api'
import { ROW_PER_PAGE_OPTIONS } from '../../../../helpers/constants'
import getAuditFormTemplateName from '../../../../helpers/getAuditFormTemplateName'
import { IAuditFormTemplate } from '../../../../types/audit'
import deepCopy from '../../../../helpers/deepCopy'
import ProjectSelect from '../../project-sites/ProjectSelect'
import { ISelectItem } from '../../../../types/common'
import BackDrop from '../../../common/BackDrop'

type TProjectList = { [key: string]: ISelectItem[] }

const AuditAssignFormProject: FC = () => {
  const [search, setSearch] = useState('')
  const [formTemplates, setFormTemplates] = useState<IAuditFormTemplate[]>([])
  const [projectList, setProjectList] = useState<TProjectList>({})
  const debouncedSearch = useDebounce(search, 500)

  const [getAuditFormTemplates, { isFetching: isLoading }] =
    Api.useLazyGetAuditFormTemplateListQuery()

  const [updateAuditFormTemplateById, { isLoading: isUpdating }] =
    Api.useUpdateAuditFormTemplateByIdMutation()

  const loadData = (text: string) => {
    getAuditFormTemplates({
      page: 1,
      limit: ROW_PER_PAGE_OPTIONS[0],
      orderBy: 'id',
      orderDir: 'asc',
      text: text,
    })
      .unwrap()
      .then((res) => {
        const templates = res.rows || []
        setFormTemplates(deepCopy<IAuditFormTemplate[]>(templates))

        const newProjectList: TProjectList = {}
        for (const template of templates) {
          const key = template.id
          const projects = template.projects.map(
            (proj) =>
              ({
                label: proj.name,
                value: proj.id,
              } as ISelectItem)
          )
          newProjectList[key] = projects
        }
        setProjectList(deepCopy<TProjectList>(newProjectList))
      })
      .catch((err) => {
        console.log('Failed to get form template list: ', err)
        setFormTemplates([])
        setProjectList({})
      })
  }

  const handleChangeSelectedProjects = (templateId: number, items: ISelectItem[]) => {
    const newProjectList = deepCopy<TProjectList>(projectList)
    newProjectList[templateId] = deepCopy<ISelectItem[]>(items)
    setProjectList(newProjectList)
  }

  const handleSave = () => {
    const promises = []
    for (const [templateId, projects] of Object.entries(projectList)) {
      const projectIds = projects.map((proj) => proj.value as number)
      const req = { id: Number(templateId), body: { projectIds } }
      promises.push(updateAuditFormTemplateById(req))
    }

    Promise.all(promises)
      .then(() => {
        toast.success('Project assigned successfully')
        loadData(debouncedSearch)
      })
      .catch((err) => {
        console.log('Failed to update form templates: ', err)
        toast.error('Failed to update form templates')
      })
  }

  useEffect(() => {
    loadData(debouncedSearch)
  }, [debouncedSearch])

  return (
    <Card sx={{ p: 0 }}>
      <Box
        sx={{
          px: 2.75,
          pt: 3.25,
          pb: 2.5,
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          rowGap: 2,
          columnGap: 4,
          alignItems: 'center',
        }}
      >
        <Typography typography='h4' sx={{ fontWeight: 600 }}>
          Assign Form Project
        </Typography>
        <SearchField
          placeholder='Search by Keyword'
          sx={{
            background: (theme) => theme.palette.grey[100],
            minWidth: 0,
            height: '36px',
            justifyContent: 'center',
            maxWidth: '290px',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Divider light />
      <Box sx={{ py: 3.5, px: 4 }}>
        {formTemplates.length > 0 && (
          <Grid container spacing={2.75}>
            <Grid item xs={12} container spacing={2.75} sx={{ mb: 1 }}>
              <Grid item lg={5} xs={12}>
                <Typography typography='h4' sx={{ fontWeight: 500, fontSize: '1.125rem' }}>
                  Form Name
                </Typography>
              </Grid>
              <Grid item lg={7} xs={12}>
                <Typography typography='h4' sx={{ fontWeight: 500, fontSize: '1.125rem' }}>
                  Assign Project
                </Typography>
              </Grid>
            </Grid>
            {formTemplates.map((template, idx) => {
              const formName = getAuditFormTemplateName(template)
              const templateId = template.id
              const projects = projectList[templateId]
              return (
                <Grid key={idx} item xs={12} container spacing={2.75}>
                  <Grid item lg={5} xs={12}>
                    <Typography typography='h4' sx={{ fontWeight: 500 }}>
                      {formName}
                    </Typography>
                  </Grid>
                  <Grid item lg={7} xs={12}>
                    <ProjectSelect
                      disableAllSelect={true}
                      placeholder={'Choose Projects'}
                      hiddenLabel={true}
                      selected={projects}
                      onChange={(items) => handleChangeSelectedProjects(templateId, items)}
                      error={projects.length === 0}
                      helperText='Project is required'
                    />
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        )}
        {!isLoading && formTemplates.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Typography color='textSecondary' variant='h5'>
              No available form templates
            </Typography>
          </Box>
        )}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Box sx={{ position: 'relative', height: '30px' }}>
              <BackDrop size={30} />
            </Box>
          </Box>
        )}
      </Box>
      <Divider light />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 4.5, px: 5.5 }}>
        <LoadingButton
          variant='contained'
          color='primary'
          onClick={() => handleSave()}
          loading={isLoading || isUpdating}
          disabled={Boolean(formTemplates?.find((p) => !projectList[p.id].length))}
        >
          Save
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default AuditAssignFormProject
