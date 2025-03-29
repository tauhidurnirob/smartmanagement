import { FC } from 'react'
import { Box, Typography, Grid, Stack } from '@mui/material'

import { ThinArrowDown } from '../../../../assets/icons/thinArrowDown'
import TextFieldWithLabel from '../../../common/TextFieldWithLabel'

// TODO: dummy data for Rating text
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

interface IProps {
  ratingOfNumber: number
}

const RatingEmojiStyle: FC<IProps> = ({ ratingOfNumber = 5 }) => {
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
                {RatingEmoji.map((emoji, index) => (
                  <Box
                    key={index}
                    sx={{
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
                      value={emoji.label}
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
                  width: 'max-content',
                }}
              >
                {RatingEmoji.map((emoji, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 115,
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack spacing={1} direction={'row'}>
                      <Box
                        sx={{
                          border: '2px solid #A1A5B7',
                          borderRadius: '50%',
                          width: 17,
                          height: 17,
                          margin: 'auto',
                        }}
                      />
                      <img src={emoji.img} style={{ width: '46px', height: '46px' }} />
                    </Stack>
                    <Typography variant='h3' sx={{ fontWeight: 400, fontSize: '16px', mt: 1 }}>
                      {emoji.label}
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
              {[...Array(ratingOfNumber)].map((_, index) => (
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
                {[...Array(ratingOfNumber)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 115,
                      height: '100%',
                      borderRight: index !== ratingOfNumber - 1 ? '1px solid #C7C7C7' : 'none',
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

export default RatingEmojiStyle
