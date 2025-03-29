import { FC, useState, useMemo } from 'react'
import { Box, Card, Divider, Grid, Typography, Button } from '@mui/material'

import { ISelectItem } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import TextFieldWithLabel from '../common/TextFieldWithLabel'

interface IProps {
  formik: any
  isEdit?: boolean
  onNext: () => void
}

const IncidentTypeCreateLocationSetting: FC<IProps> = ({ formik, isEdit, onNext }) => {
  const [showLocationDetail, setShowLocationDetail] = useState<boolean>(false)

  const projectIds = useMemo(() => {
    return (formik.values.project as ISelectItem[]).map((p) => Number(p.value))
  }, [formik.values.project])

  const locationIds = useMemo(() => {
    return (formik.values.location as ISelectItem[]).map((p) => Number(p.value))
  }, [formik.values.location])

  const buildingIds = useMemo(() => {
    return (formik.values.building as ISelectItem[]).map((p) => Number(p.value))
  }, [formik.values.building])

  const levelIds = useMemo(() => {
    return (formik.values.level as ISelectItem[]).map((p) => Number(p.value))
  }, [formik.values.level])

  const areaIds = useMemo(() => {
    return (formik.values.area as ISelectItem[]).map((p) => Number(p.value))
  }, [formik.values.area])

  const handleChangeProject = async (projects: ISelectItem[]) => {
    await formik.setFieldValue('project', projects)
    await formik.setFieldValue('location', [])
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeLocation = async (locations: ISelectItem[]) => {
    await formik.setFieldValue('location', locations)
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeBuilding = async (buildings: ISelectItem[]) => {
    await formik.setFieldValue('building', buildings)
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeLevel = async (levels: ISelectItem[]) => {
    await formik.setFieldValue('level', levels)
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeArea = async (areas: ISelectItem[]) => {
    await formik.setFieldValue('area', areas)
    await formik.setFieldValue('unit', [])
  }

  const handleChangeUnit = async (units: ISelectItem[]) => {
    await formik.setFieldValue('unit', units)
  }

  const toggleAddLocationDetail = () => {
    setShowLocationDetail(!showLocationDetail)

    if (showLocationDetail) {
      formik.setFieldValue('building', [])
      formik.setFieldValue('level', [])
      formik.setFieldValue('area', [])
      formik.setFieldValue('unit', [])
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 3.75, pt: 5, pb: 2.5 }}>
        <Typography variant='h3'>
          {isEdit ? 'Incident Type Details' : 'Add New Incident Type'}
        </Typography>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item container spacing={2} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                Incident Type Name
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextFieldWithLabel
                showLabel={false}
                placeholder='Incident Type Name'
                {...formik.getFieldProps('name')}
                height='40px'
                error={!!formik.errors.name && !!formik.touched.name}
                helperText={formik.errors.name as string}
                sx={{ input: { fontWeight: 900, color: 'grey.800' } }}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                Project
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <ProjectSelect
                hiddenLabel={true}
                selected={formik.values.project as ISelectItem[]}
                onChange={handleChangeProject}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!formik.errors.project}
                helperText={formik.errors.project as string}
                textColor={'grey.800'}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                Location
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Box sx={{ textAlign: 'right' }}>
                <LocationSelect
                  hiddenLabel={true}
                  selected={formik.values.location as ISelectItem[]}
                  onChange={handleChangeLocation}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.location}
                  helperText={formik.errors.location as string}
                  projectIds={projectIds}
                  textColor={'grey.800'}
                />
                <Button
                  variant='text'
                  color={showLocationDetail ? 'error' : 'primary'}
                  size='small'
                  sx={{ px: 0, py: 1, mt: 0, minWidth: 0, textDecoration: 'underline' }}
                  onClick={() => toggleAddLocationDetail()}
                >
                  {showLocationDetail ? 'Cancel' : 'Add Location Detail'}
                </Button>
              </Box>
            </Grid>
          </Grid>
          {showLocationDetail && (
            <Grid item container direction={'column'} spacing={2} sx={{ mt: -3 }}>
              <Grid item container spacing={2} alignItems={'center'}>
                <Grid item lg={4} xs={12}>
                  <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                    Building
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <BuildingSelect
                    hiddenLabel={true}
                    selected={formik.values.building as ISelectItem[]}
                    onChange={handleChangeBuilding}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.building && !!formik.touched.building}
                    helperText={formik.errors.building as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={2} alignItems={'center'}>
                <Grid item lg={4} xs={12}>
                  <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                    Level
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <LevelSelect
                    hiddenLabel={true}
                    selected={formik.values.level as ISelectItem[]}
                    onChange={handleChangeLevel}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.level && !!formik.touched.level}
                    helperText={formik.errors.level as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={2} alignItems={'center'}>
                <Grid item lg={4} xs={12}>
                  <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                    Area
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <AreaSelect
                    hiddenLabel={true}
                    selected={formik.values.area as ISelectItem[]}
                    onChange={handleChangeArea}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.area && !!formik.touched.area}
                    helperText={formik.errors.area as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                    levelIds={levelIds}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={2} alignItems={'center'}>
                <Grid item lg={4} xs={12}>
                  <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                    Unit
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <UnitSelect
                    hiddenLabel={true}
                    selected={formik.values.unit as ISelectItem[]}
                    onChange={handleChangeUnit}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.unit && !!formik.touched.unit}
                    helperText={formik.errors.unit as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                    levelIds={levelIds}
                    areaIds={areaIds}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
      <Divider light />
      <Box
        sx={{ px: 3.75, pt: 2.5, pb: 3.75, display: 'flex', justifyContent: 'flex-end', gap: 3 }}
      >
        <Button variant='contained' size='large' color='primary' onClick={() => onNext()}>
          Next
        </Button>
      </Box>
    </Card>
  )
}

export default IncidentTypeCreateLocationSetting
