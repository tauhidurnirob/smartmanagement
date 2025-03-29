import { FC, useMemo } from 'react'
import { Box, Typography, Grid, Stack } from '@mui/material'
import { ThinArrowDown } from '../../../../assets/icons/thinArrowDown'
import TextFieldWithLabel from '../../../common/TextFieldWithLabel'

interface IProps {
  ratingStart: number
  ratingEnd: number
}

const RatingNumberStyle: FC<IProps> = ({ ratingStart, ratingEnd }) => {
  const ratingNumber = useMemo(() => {
    const newArray = []
    for (let i = ratingStart; i <= ratingEnd; i++) {
      newArray.push(i)
    }
    return newArray
  }, [ratingStart, ratingEnd])
  return (
    <Box sx={{}}>
      <Grid container spacing={0.5}>
        <Grid item lg={12}>
          <Stack direction={'column'}>
            <Stack direction={'row'}>
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
                {ratingNumber.map((num, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 54,
                      height: '100%',
                      borderRight: index !== ratingNumber.length - 1 ? '1px solid #C7C7C7' : 'none',
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
              {ratingNumber.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 54,
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
                {ratingNumber.map((num, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 54,
                      height: '100%',
                      borderRight: index !== ratingNumber.length - 1 ? '1px solid #C7C7C7' : 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <TextFieldWithLabel
                      value={num}
                      showLabel={false}
                      name='value'
                      height='100%'
                      sx={{
                        '& .MuiInputBase-input': {
                          bgcolor: '#ffffff',
                          padding: 0,
                          fontSize: '22px',
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

export default RatingNumberStyle
