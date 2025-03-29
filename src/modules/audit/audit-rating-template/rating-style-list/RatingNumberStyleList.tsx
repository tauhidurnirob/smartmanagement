import { FC, Fragment, useEffect, useMemo, useState } from 'react'
import { Box, Typography, Grid, Button, Stack, Checkbox } from '@mui/material'
import TextFieldWithLabel from '../../../common/TextFieldWithLabel'
import { IRatingTemplate, IRatingTemplateElementItem } from '../../../../types/audit'
import FilterLabel from '../../../common/FilterLabel'
import { ImagePathIcon } from '../../../../assets/icons/imagePathIcon'

interface IProps {
  data: IRatingTemplate
}

const RatingNumberStyleList: FC<IProps> = ({ data }) => {
  const [elements, setElements] = useState<IRatingTemplateElementItem[]>([])

  const ratingNumber = useMemo(() => {
    const newArray = []
    if (data) {
      for (let i = data?.ratingStart || 0; i <= (data?.ratingEnd || 10); i++) {
        newArray.push(i)
      }
    }
    return newArray
  }, [data])

  const handleNAOptions = (event: any, index: number) => {
    const _elements = [...elements]
    _elements[index].naOption = event.target.checked
    setElements(_elements)
  }

  const handelRemark = (event: any, index: number) => {
    const _elements = [...elements]
    _elements[index].remark = event.target.value
    setElements(_elements)
  }

  const handleFileUpload = (event: any, index: number) => {
    const _elements = [...elements]
    _elements[index].file = event.target.files[0]
    setElements(_elements)
  }

  useEffect(() => {
    if (data && data?.elements && data?.elements?.length > 0) {
      setElements(data.elements)
    } else {
      setElements([])
    }
  }, [data])

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {data?.elements?.map((item, idx) => (
          <Fragment key={`num-${idx}`}>
            <Grid item lg={2}>
              <FilterLabel text={item.name} sx={{wordBreak: 'break-all'}} />
            </Grid>
            <Grid item lg={7}>
              <Stack direction={'column'}>
                <Stack
                  direction={'row'}
                  sx={{
                    border: '1px solid #C7C7C7',
                    borderRadius: '5px',
                    height: '43px',
                    width: 'auto',
                  }}
                >
                  {ratingNumber?.map((num, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 50,
                        height: '100%',
                        borderRight:
                          index !== (ratingNumber?.length || 1) - 1 ? '1px solid #C7C7C7' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                      }}
                    >
                      <Typography variant='h3' sx={{ fontWeight: 400, fontSize: '22px' }}>
                        {num}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                {
                  data?.allowNAOption &&
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      mt: 0.5,
                    }}
                  >
                    <Checkbox
                      checked={item.naOption}
                      onChange={(e) => {
                        handleNAOptions(e, idx)
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={{ py: 0, pl: 0, pr: 1, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                      disabled={!data.allowNAOption}
                    />
                    <Typography
                      variant='subtitle1'
                      sx={{
                        lineHeight: '14px',
                        marginTop: '1px',
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      N.A
                    </Typography>
                  </Box>
                }
              </Stack>
            </Grid>
            <Grid item lg={3}>
              <Stack direction={'row'} spacing={1}>
                {
                  data?.allowWriteRemark &&
                  <TextFieldWithLabel
                    value={item.remark}
                    placeholder='Write a Remark'
                    showLabel={false}
                    name='value'
                    height='100%'
                    sx={{
                      '& .MuiInputBase-input': {
                        bgcolor: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 400,
                        border: '1px solid #C7C7C7',
                        borderRadius: '6px',
                        padding: '8px 17px',
                      },
                    }}
                    disabled={!data?.allowWriteRemark}
                    onChange={(e) => handelRemark(e, idx)}
                  />
                }
                <input
                  id='upload_file'
                  name='upload_file'
                  hidden
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleFileUpload(e, idx)}
                />
                {
                  data?.allowUploadImage &&
                  <Button
                    sx={{ border: '1px solid #C7C7C7', width: '40px', minWidth: 'unset' }}
                    disabled={!data.allowUploadImage}
                  >
                    <label htmlFor={'upload_file'}>
                      <ImagePathIcon />
                    </label>
                  </Button>
                }
              </Stack>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Box>
  )
}

export default RatingNumberStyleList
