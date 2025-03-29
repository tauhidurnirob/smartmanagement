import { Box, Collapse, Grid, Typography } from '@mui/material'
import StyledAlert from '../../common/StyledAlert'
import { DAYS } from '../../../helpers/constants'

interface IProps {
  selected: string[]
  onChange: (days: string[]) => void
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
}

const DaySelect = ({
  selected,
  onChange,
  showErrorMessage = true,
  error,
  errorMessage,
}: IProps) => {
  const handleChangeDays = (day: string) => {
    const tmpDay = day.toLowerCase()
    console.log(selected, tmpDay)
    if (selected.indexOf(tmpDay) > -1) {
      onChange(selected.filter((d) => d !== tmpDay))
    } else {
      onChange([...selected, tmpDay])
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {DAYS.map((d, index) => {
          const isSelected = selected.indexOf(d.toLowerCase()) > -1
          return (
            <Grid key={index} item xs={'auto'}>
              <Box
                sx={{
                  display: 'flex',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: (theme) => (isSelected ? theme.palette.primary.main : '#ffffff'),
                  boxShadow: isSelected
                    ? 'inset 0px 0px 5px 1px rgba(0, 0, 0, 0.25)'
                    : '0px 0px 5px 1px rgba(0, 0, 0, 0.25)',
                }}
                onClick={() => handleChangeDays(d)}
              >
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: 18,
                    color: (theme) => (isSelected ? '#ffffff' : theme.palette.text.primary),
                  }}
                >
                  {d}
                </Typography>
              </Box>
            </Grid>
          )
        })}
      </Grid>
      {showErrorMessage && error && (
        <Collapse in={error} sx={{ mt: 2 }}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {errorMessage}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default DaySelect
