import { Box, Button, Stack, Typography } from "@mui/material"
import ButtonBack from "../../modules/common/ButtonBack"
import { To } from "react-router-dom"
import FeedbackFormDetails from "../../modules/feedback/form-template/FeedbackFormDetails"
import { useState } from "react"
import QrCodeGenerator from "../../modules/feedback/form-template/QrCodeGenerator"


const FeedbackFormDetailsPage = () => {
  const [qrCodeOn, setQrCodeOn] = useState(false)

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Stack direction={'row'} justifyContent={'space-between'} gap={2} flexWrap={'wrap'} mt={3.5} >
        <Typography variant="h3">Feedback Form Details</Typography>
        <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
          <Button
            variant="contained"
            color="yellow"
          >
            Preview Form
          </Button>
          <Button
            variant="contained"
            color="primary"
          >
            Edit Form
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setQrCodeOn(true)}
          >
            Generate QR Code
          </Button>
        </Stack>
      </Stack>
      <FeedbackFormDetails />
      <QrCodeGenerator
        open={qrCodeOn}
        onClose={() => setQrCodeOn(false)}
      />
    </Box>
  )
}

export default FeedbackFormDetailsPage