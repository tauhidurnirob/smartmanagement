import { Box, LinearProgress, LinearProgressProps, Stack, Typography, linearProgressClasses } from "@mui/material";
import { useMemo } from "react";

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number; maxValue: number }
) => {
  const { value, maxValue } = props

  const percent = useMemo(() => {
    return Math.floor((value / maxValue) * 100)
  }, [maxValue, value])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.75, position: 'relative' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant='determinate'
          sx={{
            height: 15,
            borderRadius: '41px',
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: '#ffffff',
              border: '1px solid #50CD89',
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: '#50CD89',
            },
          }}
          value={percent}
        />
        <Stack
          direction={'row'}
          gap={2}
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={1}
        >
          <Typography variant='h6' color='grey.800' fontWeight={700}>
            0
          </Typography>
          <Typography
            variant='h6'
            color='grey.800'
            fontWeight={700}
          >{`${maxValue} mins`}</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: -17,
          left: `${percent}%`,
          transform: percent > 5 ? 'translateX(-100%)' : 0,
          pr: 1,
        }}
      >
        <Typography variant='h6' color='grey.800' fontWeight={700}>{`${value.toFixed(
          0
        )} mins`}</Typography>
      </Box>
    </Box>
  )
}

export default LinearProgressWithLabel