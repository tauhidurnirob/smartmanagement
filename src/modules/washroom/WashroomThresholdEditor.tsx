import { FC, useMemo } from 'react'
import { Grid, Box, Typography, Divider, TextField } from '@mui/material'
import { LessThanEqual } from '../../assets/icons/less-then-equal'
import { IWashroomThresholdValuesEdit } from '../../types/washroom'

const THRESHOLD_TYPES = {
  normal: { label: 'Normal', color: 'success.main' },
  medium: { label: 'Medium', color: 'yellow.main' },
  high: { label: 'High', color: 'error.main' },
}

const TOTAL_VIEW_ITEM_COUNT = 3

interface IProps {
  thresholds?: IWashroomThresholdValuesEdit
  isEdit?: boolean
  onChange?: (key: string, value: string) => void
  hiddenNormal?: boolean
  hiddenMedium?: boolean
}

const WashroomThresholdEditor: FC<IProps> = ({
  thresholds,
  isEdit,
  onChange,
  hiddenNormal,
  hiddenMedium,
}) => {
  const { gapItem } = useMemo(() => {
    let viewCount = TOTAL_VIEW_ITEM_COUNT
    if (hiddenMedium) viewCount -= 1
    if (hiddenNormal) viewCount -= 1

    const gapItem = 12 / viewCount

    return {
      viewCount,
      gapItem,
    }
  }, [hiddenNormal, hiddenMedium])

  const handleChangeValue = (key: string, value: string) => {
    if (onChange) onChange(key, value)
  }

  return (
    <Grid container spacing={{ lg: 1.5, xs: 2 }}>
      {[
        ...(hiddenNormal ? [] : [{ type: THRESHOLD_TYPES.normal, key: 'normal' }]),
        ...(hiddenMedium ? [] : [{ type: THRESHOLD_TYPES.medium, key: 'medium' }]),
        { type: THRESHOLD_TYPES.high, key: 'high' },
      ].map((item, idx) => {
        const { type, key } = item
        const value = ((thresholds || {}) as { [key: string]: string })[key] ?? ''
        return (
          <Grid key={`threshold-item-${idx}`} item lg={gapItem} xs={12}>
            <Box
              sx={{
                borderRadius: '50px',
                backgroundColor: type.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0.5,
              }}
            >
              <Typography
                typography={'subtitle1'}
                sx={{
                  color: 'white',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {type.label}
              </Typography>
            </Box>
            <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'row' }}>
              <LessThanEqual sx={{ color: (theme) => theme.palette.grey[400] }} />
              {isEdit ? (
                <TextField
                  type='number'
                  value={value}
                  onChange={(e) => handleChangeValue(key, e.target.value)}
                  sx={{
                    flex: 1,
                    '.MuiInputBase-root': { border: 'none', borderRadius: 0 },
                    input: {
                      height: '29px',
                      fontSize: '1.5rem',
                      p: '2px',
                      pr: { lg: 1.12, xs: 3 },
                      textAlign: 'center',
                      border: 'none',
                      borderRadius: 0,
                    },
                    '.MuiOutlinedInput-notchedOutline': { border: 'none', borderRadius: 0 },
                  }}
                />
              ) : (
                <Typography
                  typography={'subtitle1'}
                  sx={{
                    flex: 1,
                    fontSize: '1.5rem',
                    p: '2px',
                    pr: { xs: 3 },
                    textAlign: 'center',
                    lineHeight: '29px',
                  }}
                >
                  {value}
                </Typography>
              )}
            </Box>
            <Divider light sx={{ mt: 1.25, borderColor: (theme) => theme.palette.grey[700] }} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default WashroomThresholdEditor
