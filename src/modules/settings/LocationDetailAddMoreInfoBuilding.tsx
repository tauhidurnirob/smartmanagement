import { FC } from 'react'
import { Box, Typography, Divider, Button, Grid, Collapse } from '@mui/material'
import { useFormik } from 'formik'
import { LoadingButton } from '@mui/lab'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { Plus } from '../../assets/icons/plus'
import TextFieldWithLabel from '../../modules/common/TextFieldWithLabel'
import StyledAlert from '../../modules/common/StyledAlert'
import Api from '../../api'

interface IBuildingCreate {
  names: string[]
}

const initFormikValue: IBuildingCreate = {
  names: [],
}

interface IProps {
  locationId?: number
  onClose: () => void
}

const LocationDetailAddMoreInfoBuilding: FC<IProps> = ({ locationId, onClose }) => {
  const [batchCreateBuilding, { isLoading: isCreatingBuilding }] =
    Api.useBatchCreateBuildingsMutation()

  const formik = useFormik<IBuildingCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      names: Yup.array(
        Yup.string()
          .required('Building Name is required')
          .test('building-list-list', 'Building Name is duplicated', function (name, data) {
            const { parent: names, options } = data
            const index = (options as any).index
            return names.findIndex((n: string, idx: number) => idx !== index && n === name) === -1
          })
      ).min(1, 'Building List is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        if (typeof locationId === 'undefined') {
          return
        }

        setSubmitting(true)

        const newBuildings = values.names.map((name) => ({ locationId, name }))
        batchCreateBuilding(newBuildings)
          .unwrap()
          .then(() => {
            onClose()
          })
          .catch((err) => {
            console.error('Failed to create buildings: ', err)
            toast.error('Failed to create buildings')
          })
          .finally(() => {
            setSubmitting(false)
          })
      } catch (err: any) {
        console.error('Unkown error in creating buildings: ', err)
        toast.error('Failed to create buildings')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleAddNewBuilding = () => {
    const newNames = [...formik.values.names]

    newNames.push('')
    formik.setFieldValue('names', newNames)
  }

  const handleChangeName = (name: string, idx: number) => {
    const newNames = [...formik.values.names]

    newNames[idx] = name
    formik.setFieldValue('names', newNames)
  }

  const handleDiscard = () => {
    formik.setValues({ ...initFormikValue })
  }

  return (
    <Box>
      <Box sx={{ pt: 4.5, pb: 5, px: 3.75 }}>
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
            Building Name
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
            onClick={() => handleAddNewBuilding()}
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
                    Building {idx + 1}
                  </Typography>
                  <TextFieldWithLabel
                    showLabel={false}
                    name='name'
                    placeholder='Building Name'
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
            Building List is required
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
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
            loading={isCreatingBuilding}
          >
            Discard
          </LoadingButton>
          <LoadingButton
            variant='contained'
            color='primary'
            size='large'
            loading={isCreatingBuilding}
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

export default LocationDetailAddMoreInfoBuilding
