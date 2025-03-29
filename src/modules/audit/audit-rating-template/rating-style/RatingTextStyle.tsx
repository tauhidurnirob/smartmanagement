import { FC } from 'react'
import { Box, Typography, Grid, Stack } from '@mui/material'

import { ThinArrowDown } from '../../../../assets/icons/thinArrowDown'
import TextFieldWithLabel from '../../../common/TextFieldWithLabel'
import { RatingMappingItem } from '../../../../types/audit'

interface IProps {
  ratingTextMapping: RatingMappingItem[]
  setRatingTextMapping: (v: RatingMappingItem[]) => void
}

const RatingTextStyle: FC<IProps> = ({ ratingTextMapping, setRatingTextMapping }) => {
  const handleRatingTextChange = (text: string, idx: number) => {
    ratingTextMapping[idx].label = text
    setRatingTextMapping([...ratingTextMapping])
  }

  return (
    <Box sx={{}}>
      <Grid container spacing={0.5}>
        <Grid item lg={12}>
          <Stack direction={'column'}>
            <Stack direction={'row'}>
              <Stack
                direction={'row'}
                sx={{
                  width: 'max-content',
                }}
                spacing={2}
              >
                {ratingTextMapping.map((text, index) => (
                  <Box
                    key={index}
                    sx={{
                      // width: 230,
                      height: '100%',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontSize: 15,
                        color: (theme) => theme.palette.grey[900],
                        display: 'inline-flex',
                      }}
                    >
                      Rating Text {index + 1}
                    </Typography>
                    <TextFieldWithLabel
                      value={text.label}
                      showLabel={false}
                      onChange={(e) => handleRatingTextChange(e.target.value, index)}
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
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack direction={'row'} sx={{ mt: 4 }}>
              <Box sx={{ width: 135 }}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 500,
                    display: 'flex',
                    height: '43px',
                    alignItems: 'center',
                  }}
                >
                  Rating Preview
                </Typography>
              </Box>
              <Stack
                direction={'row'}
                sx={{
                  border: '1px solid #C7C7C7',
                  borderRadius: '5px',
                  height: '43px',
                  width: 'max-content',
                }}
              >
                {ratingTextMapping.map((text, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 115,
                      height: '100%',
                      borderRight:
                        index !== ratingTextMapping.length - 1 ? '1px solid #C7C7C7' : 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Typography variant='h3' sx={{ fontWeight: 400, fontSize: '16px' }}>
                      {text.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>

            <Stack
              direction={'row'}
              sx={{
                borderRadius: '5px',
                height: '43px',
                width: 'max-content',
                ml: '135px',
              }}
            >
              {ratingTextMapping.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 115,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <ThinArrowDown sx={{ mt: '-20px', ml: '17px' }} />
                </Box>
              ))}
            </Stack>

            <Stack direction={'row'}>
              <Box sx={{ width: 135 }}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 500,
                    display: 'flex',
                    height: '43px',
                    alignItems: 'center',
                    mt: -1,
                  }}
                >
                  Rating Score
                </Typography>
              </Box>
              <Stack
                direction={'row'}
                sx={{
                  border: '1px solid #C7C7C7',
                  borderRadius: '5px',
                  height: '43px',
                  width: 'max-content',
                  mt: -1,
                }}
              >
                {ratingTextMapping.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 115,
                      height: '100%',
                      borderRight:
                        index !== ratingTextMapping.length - 1 ? '1px solid #C7C7C7' : 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <TextFieldWithLabel
                      value={index + 1}
                      showLabel={false}
                      name='value'
                      height='100%'
                      sx={{
                        '& .MuiInputBase-input': {
                          bgcolor: '#ffffff',
                          padding: 0,
                          fontSize: '16px',
                          fontWeight: 400,
                          textAlign: 'center',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RatingTextStyle
