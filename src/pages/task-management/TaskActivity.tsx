import { useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  Stack,
  Divider,
  Button,
  Grid,
  IconButton,
  Collapse,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import SearchField from '../../modules/common/SearchField'
import { Plus } from '../../assets/icons/plus'
import deepCopy from '../../helpers/deepCopy'
import TextFieldWithLabel from '../../modules/common/TextFieldWithLabel'
import StyledAlert from '../../modules/common/StyledAlert'
import { TrashDuotoneIcon } from '../../assets/icons/trash-duotone'

interface ITaskActivity {
  name: string
  id: number | null
}

interface ITaskActivityList {
  activities: ITaskActivity[]
}

const initFormikValue: ITaskActivityList = {
  activities: [],
}

const TaskActivity = () => {
  const [search, setSearch] = useState<string>('')

  const formik = useFormik<ITaskActivityList>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      activities: Yup.array(
        Yup.object().shape({
          name: Yup.string().required('Task Activity Name is required'),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        // setSubmitting(true)
      } catch (err: any) {
        console.error('Unkown error in saving task activity list: ', err)
        // toast.error('Failed to save device')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleChangeSearch = (search: string) => {
    setSearch(search)
  }

  const handleAddNewActivity = () => {
    const newActivities = deepCopy(formik.values.activities)
    newActivities.push({ name: '', id: null })
    formik.setFieldValue('activities', newActivities)
  }

  const handleChangeName = (idx: number, name: string) => {
    const newActivities = deepCopy(formik.values.activities)
    newActivities[idx].name = name
    formik.setFieldValue('activities', newActivities)
  }

  const handleRemoveTaskActivity = (idx: number) => {
    const newActivities = deepCopy(formik.values.activities)
    newActivities.splice(idx, 1)
    formik.setFieldValue('activities', newActivities)
  }

  return (
    <Box>
      <Typography variant='h3'>Task Activity</Typography>
      <Card sx={{ mt: 2 }}>
        <Stack
          direction={'row'}
          gap={2}
          justifyContent={'space-between'}
          sx={{ pr: 4.5, pl: 3.75, pt: 2.5, pb: 2 }}
        >
          <SearchField
            placeholder='Search by Keyword'
            value={search}
            onChange={(e) => handleChangeSearch(e.target.value)}
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              height: '42px',
              justifyContent: 'center',
              maxWidth: '290px',
            }}
          />
          <Button variant='contained' color='primary' disabled={!formik.isValid}>
            Save
          </Button>
        </Stack>
        <Divider light />
        <Box sx={{ pt: 2.5, pl: 3.75, pr: 4.5, pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', lineHeight: 1 }}
            >
              Task Activity Name
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
              onClick={() => handleAddNewActivity()}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          <Grid
            container
            direction={'column'}
            rowSpacing={4.5}
            sx={{ mt: formik.values.activities.length > 0 ? -2.5 : 0 }}
          >
            {formik.values.activities.map((item, idx) => {
              const { name } = item
              const errors = formik.errors?.activities?.[idx] as any
              return (
                <Grid key={`group-item-${idx}`} item xs={12}>
                  <Typography
                    typography='h5'
                    sx={{ mb: 0.5, display: 'inline-flex', color: 'grey.800', fontSize: 15 }}
                  >
                    Task Activity {idx + 1}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 1,
                      mt: 0.5,
                      bgcolor: 'grey.50',
                      borderRadius: 1.5,
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <TextFieldWithLabel
                        showLabel={false}
                        name='name'
                        placeholder='Task Activity Name'
                        value={name}
                        onChange={(e) => handleChangeName(idx, e.target.value)}
                        height='44px'
                        showErrorMessage={false}
                        sx={{
                          '.MuiInputBase-input': {
                            bgcolor: 'grey.50',
                            '&::placeholder': {
                              fontSize: '14px',
                              fontWeight: 500,
                              opacity: 1,
                              color: 'grey.400',
                            },
                          },
                        }}
                      />
                    </Box>
                    <IconButton sx={{}} onClick={() => handleRemoveTaskActivity(idx)}>
                      <TrashDuotoneIcon sx={{ color: 'grey.400' }} />
                    </IconButton>
                  </Box>
                  <Collapse in={!!errors?.name}>
                    <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                      {errors?.name}
                    </StyledAlert>
                  </Collapse>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Card>
    </Box>
  )
}

export default TaskActivity
