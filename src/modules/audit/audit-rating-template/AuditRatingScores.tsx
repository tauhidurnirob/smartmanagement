import { FC } from 'react'
import { Box, Typography, Grid, Stack } from '@mui/material'

import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import { IRatingTemplate, RatingMappingItem } from '../../../types/audit'
import RatingStyleSelect from './RatingStyleSelect'
import { AUDIT_RATING_STYLES } from '../../../helpers/constants'
import { ISelectItem } from '../../../types/common'
import RatingNumberStyle from './rating-style/RatingNumberStyle'
import RatingTextStyle from './rating-style/RatingTextStyle'
import RatingEmojiStyle from './rating-style/RatingEmojiStyle'

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
  template?: IRatingTemplate
  selectedRatingStyle: ISelectItem
  handleChangeStyle: (v: ISelectItem) => void
  ratingStart: string
  setRatingStart: (v: string) => void
  ratingEnd: string
  setRatingEnd: (v: string) => void
  ratingNumber: string
  setRatingNumber: (v: string) => void
  ratingTextMapping: RatingMappingItem[]
  setRatingTextMapping: (v: RatingMappingItem[]) => void
}

const AuditRatingScores: FC<IProps> = ({
  selectedRatingStyle,
  handleChangeStyle,
  ratingStart,
  setRatingStart,
  ratingEnd,
  setRatingEnd,
  ratingNumber,
  setRatingNumber,
  ratingTextMapping,
  setRatingTextMapping,
}) => {
  return (
    <Box sx={{}}>
      <Stack>
        <Grid container spacing={{ lg: 4, xs: 2 }}>
          <Grid item lg={6} xs={12} container spacing={1.5}>
            <Grid item xs={12}>
              <Typography variant='h4' sx={{ fontWeight: 500 }}>
                Rating Style
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RatingStyleSelect
                hiddenLabel={true}
                selected={selectedRatingStyle}
                onChange={handleChangeStyle}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} xs={12} container spacing={1.5}>
            {selectedRatingStyle.value === AUDIT_RATING_STYLES[0].value && (
              <>
                <Grid item lg={6} xs={6} container spacing={1.5}>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ fontWeight: 500 }}>
                      Rating Start
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWithLabel
                      showLabel={false}
                      placeholder='Rating Start'
                      value={ratingStart}
                      onChange={(e) => setRatingStart(e.target.value)}
                      height='42px'
                      type='number'
                      name='ratingStart'
                      InputProps={{ inputProps: { min: 0, max: (Number(ratingEnd) -1) } }}
                      // error={!!formik.errors.name && !!formik.touched.name}
                      // helperText={formik.errors.name as string}
                    />
                  </Grid>
                </Grid>
                <Grid item lg={6} xs={6} container spacing={1.5}>
                  <Grid item xs={12}>
                    <Typography variant='h4' sx={{ fontWeight: 500 }}>
                      Rating End
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWithLabel
                      showLabel={false}
                      placeholder='Rating End'
                      value={ratingEnd}
                      onChange={(e) => setRatingEnd(e.target.value)}
                      height='42px'
                      type='number'
                      name='ratingEnd'
                      InputProps={{ inputProps: { min: (Number(ratingStart) + 1), max: 15 } }}
                      // error={!!formik.errors.name && !!formik.touched.name}
                      // helperText={formik.errors.name as string}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            {selectedRatingStyle.value === AUDIT_RATING_STYLES[1].value && (
              <Grid item xs={12} container spacing={1.5}>
                <Grid item xs={12}>
                  <Typography variant='h4' sx={{ fontWeight: 500 }}>
                    Number of Rating
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextFieldWithLabel
                    showLabel={false}
                    placeholder='Number of Rating'
                    value={ratingNumber}
                    onChange={(e) => setRatingNumber(e.target.value)}
                    height='42px'
                    type='number'
                    name='ratingStart'
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                    // error={!!formik.errors.name && !!formik.touched.name}
                    // helperText={formik.errors.name as string}
                  />
                </Grid>
              </Grid>
            )}
            {selectedRatingStyle.value === AUDIT_RATING_STYLES[2].value && (
              <Grid item xs={12} container justifyContent='space-between' sx={{ mt: 4 }}>
                {RatingEmoji.map((emoji, index) => (
                  <Box
                    key={index}
                    sx={{
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
                  </Box>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          {selectedRatingStyle.value === AUDIT_RATING_STYLES[0].value && (
            <RatingNumberStyle ratingStart={Number(ratingStart)} ratingEnd={Number(ratingEnd)} />
          )}
          {selectedRatingStyle.value === AUDIT_RATING_STYLES[1].value && (
            <RatingTextStyle
              ratingTextMapping={ratingTextMapping}
              setRatingTextMapping={setRatingTextMapping}
            />
          )}
          {selectedRatingStyle.value === AUDIT_RATING_STYLES[2].value && (
            <RatingEmojiStyle ratingOfNumber={5} />
          )}
        </Box>
      </Stack>
    </Box>
  )
}

export default AuditRatingScores
