import { FC, useMemo } from 'react'
import { Box, Typography, Divider, Button, Grid, Collapse } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Plus } from '../../assets/icons/plus'
import TextFieldWithLabel from '../../modules/common/TextFieldWithLabel'
import StyledAlert from '../../modules/common/StyledAlert'
import { ISelectItem } from '../../types/common'
import BuildingSelect from '../../modules/location/BuildingSelect'
import Api from '../../api'
import { LoadingButton } from '@mui/lab'

interface ILevelCreate {
  names: string[]
  building: ISelectItem[]
}

const initFormikValue: ILevelCreate = {
  names: [],
  building: [],
}

interface IProps {
  locationId?: number
  onClose: () => void
}

const LocationDetailAddMoreInfoLevel: FC<IProps> = ({ locationId, onClose }) => {
  const [batchCreateLevels, { isLoading: isCreatingLevels }] = Api.useBatchCreateLevelsMutation()

  const formik = useFormik<ILevelCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      names: Yup.array(
        Yup.string()
          .required('Level Name is required')
          .test('level-list', 'Level Name is duplicated', function (name, data) {
            const { parent: names, options } = data
            const index = (options as any).index
            return names.findIndex((n: string, idx: number) => idx !== index && n === name) === -1
          })
      ).min(1, 'Level List is required'),
      building: Yup.array().min(1, 'Building is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const buildingId = values.building[0]?.value as number
        if (typeof buildingId !== 'number') return

        const newLevels = values.names.map((name) => ({ buildingId, name }))

        setSubmitting(true)
        batchCreateLevels(newLevels)
          .unwrap()
          .then(() => {
            onClose()
          })
          .catch((err) => {
            console.error('Failed to create levels: ', err)
            toast.error('Failed to create levels')
          })
          .finally(() => {
            setSubmitting(false)
          })
      } catch (err: any) {
        console.error('Unkown error in creating levels: ', err)
        toast.error('Failed to create levels')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const locationIds = useMemo(() => {
    if (typeof locationId === 'number') {
      return [locationId]
    }

    return []
  }, [locationId])

  const handleAddNewLevel = () => {
    const newNames = [...formik.values.names]

    newNames.push('')
    formik.setFieldValue('names', newNames)
  }

  const handleChangeName = (name: string, idx: number) => {
    const newNames = [...formik.values.names]

    newNames[idx] = name
    formik.setFieldValue('names', newNames)
  }

  const handleChangeBuilding = (building: ISelectItem[]) => {
    formik.setFieldValue('building', building)
  }

  const handleDiscard = () => {
    formik.setValues({ ...initFormikValue })
  }

  return (
    <Box>
      <Box sx={{ pt: 4.5, pb: 5, px: 3.75 }}>
        <Box sx={{ mb: 3.75 }}>
          <Typography typography='h4' sx={{ fontSize: '1.125rem', color: 'grey.800', mb: 0.5 }}>
            Choose Building
          </Typography>
          <BuildingSelect
            hiddenLabel={true}
            selected={formik.values.building}
            onChange={handleChangeBuilding}
            isSingleSelect
            disableAllSelect
            placeholder='Choose Building'
            error={!!formik.errors.building}
            helperText={formik.errors.building as string}
            locationIds={locationIds}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography
            typography={'h4'}
            sx={{
              fontSize: '1.125rem',
              fontWeight: 500,
              display: 'inline-flex',
              color: 'grey.800',
              lineHeight: 1,
            }}
          >
            Level Name
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
            onClick={() => handleAddNewLevel()}
          >
            <Plus sx={{ fontSize: '16px' }} />
          </Button>
        </Box>
        <Grid container direction={'column'} rowSpacing={2} sx={{ mt: 0 }}>
          {formik.values.names.map((name, idx) => {
            const error = formik.errors.names?.[idx] as any
            return (
              <Grid
                key={`builiding-item-${idx}`}
                item
                container
                xs={12}
                columnSpacing={5}
                rowSpacing={2}
              >
                <Grid item xs={12}>
                  <Typography
                    typography='h5'
                    sx={{ mb: 0.5, fontWeight: 700, display: 'inline-flex', color: 'grey.800' }}
                  >
                    Level {idx + 1}
                  </Typography>
                  <TextFieldWithLabel
                    showLabel={false}
                    name='name'
                    placeholder='Level Name'
                    value={name}
                    onChange={(e) => handleChangeName(e.target.value, idx)}
                    height='40px'
                    error={!!error}
                    helperText={error}
                  />
                </Grid>
              </Grid>
            )
          })}
        </Grid>
        <Collapse in={!!formik.errors.names && formik.values.names.length === 0}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            Level List is required
          </StyledAlert>
        </Collapse>
      </Box>
      <Divider light />
      <Box sx={{ pt: 1.75, px: 4.5, pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            variant='text'
            color='inherit'
            size='large'
            onClick={handleDiscard}
            loading={isCreatingLevels}
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
          >
            Discard
          </LoadingButton>
          <LoadingButton
            variant='contained'
            color='primary'
            size='large'
            loading={isCreatingLevels}
            disabled={!formik.isValid || typeof locationId === 'undefined'}
            onClick={() => formik.handleSubmit()}
            sx={{ ml: 3 }}
          >
            Add
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default LocationDetailAddMoreInfoLevel
