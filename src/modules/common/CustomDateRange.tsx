import { FC, useState } from "react"
import DialogWrapper from "./DialogWrapper"
import { Box, Button, Grid, Stack } from "@mui/material"
import { Dayjs } from "dayjs"
import DatePickerWithText from "./DatePickerWithText"

export interface IDateRange {
  startDate: Dayjs | null
  endDate: Dayjs | null
}

interface IProps {
  open: boolean
  handleClose: () => void
  label?: string
  value: IDateRange
  setValue: (v: IDateRange) => void
}

const CustomDateRange:FC<IProps> = ({
  open,
  handleClose,
  label,
  value,
  setValue
}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(value.startDate)
  const [endDate, setEndDate] = useState<Dayjs | null>(value.endDate)

  return (
    <DialogWrapper
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      label={label || 'Custom Range'}
    >
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} >
            <DatePickerWithText
              label="Start Date"
              date={startDate}
              onChange={setStartDate}
              maxDate={endDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePickerWithText
              label="End Date"
              date={endDate}
              onChange={setEndDate}
              minDate={startDate}
            />
          </Grid>
        </Grid>
        <Stack mt={4} direction={'row'} justifyContent={'flex-end'} >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setValue({startDate, endDate})
              handleClose()
            }}
          >
            Select
          </Button>
        </Stack>
      </Box>
    </DialogWrapper>
  )
}

export default CustomDateRange