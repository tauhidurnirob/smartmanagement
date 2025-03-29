import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Typography, Grid, Button, Stack, Checkbox, Radio, RadioGroup } from '@mui/material'
import { IRatingTemplate, IRatingTemplateElementItem } from '../../../../types/audit'
import FilterLabel from '../../../common/FilterLabel'
import TextFieldWithLabel from '../../../common/TextFieldWithLabel'
import { ImagePathIcon } from '../../../../assets/icons/imagePathIcon'


const RatingEmoji = [
  {
    label: 'Very Poor',
    img: '/assets/images/custom/veryPoor.gif',
    value: 0,
  },
  {
    label: 'Poor',
    img: '/assets/images/custom/poor.gif',
    value: 1,
  },
  {
    label: 'Average',
    img: '/assets/images/custom/average.gif',
    value: 2,
  },
  {
    label: 'Good',
    img: '/assets/images/custom/good.gif',
    value: 3,
  },
  {
    label: 'Very Good',
    img: '/assets/images/custom/veryGood.gif',
    value: 4,
  },
]

const dummyData = {
  name: '',
  required: false,
}

interface IProps {
  ratingOfNumber: number
  data?: IRatingTemplate
}

const RatingEmojiStyleList: FC<IProps> = ({ ratingOfNumber = 5, data }) => {
  const [elements, setElements] = useState<IRatingTemplateElementItem[]>([])

  const ratingElements = useMemo(() => {
    const els = data?.elements || []
    return [dummyData, ...els]
  }, [data])

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
      setElements(ratingElements)
    } else {
      setElements([])
    }
  }, [data])

  return (
    <Box sx={{ width: '100%', borderLeft: '1px dotted #C7C7C7', borderTop: '1px dotted #C7C7C7' }}>
      <Grid container spacing={2} sx={{ width: '100%', ml: 0, mt: 0 }}>
        {elements.length > 0 &&
          elements.map((item, idx) => {
            return (
              <Grid key={`rating-text-style-item-${idx}`} item xs={12} container spacing={2}>
                <Grid item md={4} className='right-bottom-border'>
                  {item.name !== '' && (
                    <>
                      <FilterLabel text={item.name} sx={{ marginBottom: 1 }} />
                      {
                        data?.allowWriteRemark &&
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            mb: 2,
                          }}
                        >
                          <Checkbox
                            sx={{ py: 0, pl: 0, pr: 1, '& .MuiSvgIcon-root': { fontSize: 20 } }}
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
                      {
                        data?.allowWriteRemark &&
                        <Box pr={2}>
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
                        </Box>
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
                        <Box py={2}>
                          <Button
                            sx={{ border: '1px solid #C7C7C7', width: '40px', minWidth: 'unset' }}
                            disabled={!data.allowUploadImage}
                          >
                            <label htmlFor={'upload_file'}>
                              <ImagePathIcon />
                            </label>
                          </Button>
                        </Box>
                      }
                    </>
                  )}
                </Grid>
                <Grid item md={8} className='right-bottom-border' sx={{ p: '0px !important' }}>
                  <Stack direction={'row'} sx={{ height: '100%' }}>
                  <RadioGroup></RadioGroup>
                    {ratingOfNumber &&
                      [...Array(ratingOfNumber)].map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            height: '100%',
                            flex: '1',
                            flexBasis: `${100 / ratingOfNumber}%`,
                            borderRight:
                              index !== (ratingOfNumber || 1) - 1 ? '1px dotted #C7C7C7' : 'none',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          {item.name === '' ? (
                            <Box>
                              <img src={RatingEmoji.find((rating) => rating.value === index)?.img} style={{ width: '46px', height: '46px' }} />
                              <Typography
                                variant='h3'
                                sx={{ fontWeight: 400, fontSize: '16px', pt: 2, pb: 2 }}
                              >
                                {RatingEmoji.find((rating) => rating.value === index)?.label}
                              </Typography>
                            </Box>
                          ) : (
                            <Radio disabled />
                          )}
                        </Box>
                      ))}
                  </Stack>
                </Grid>
              </Grid>
            )
          })}
      </Grid>
    </Box>
  )
}

export default RatingEmojiStyleList
