import { Box, Button, Card, Divider, Grid, Stack, Typography } from "@mui/material"
import { IFeedback } from "../../../types/feedback"
import { FC, useMemo } from "react"
import { getFeedbackStatusInfo } from "./FeedbackList"
import dayjs from "dayjs"
import { DATE_FORMAT_WITHOUT_MIN } from "../../../constants/common"
import CustomChip from "../../common/CustomChip"
import TextareaWithLabel from "../../common/TextareaWithLabel"
import { RequiredItem } from "../../audit/audit-schedule/AuditScheduleDetail"

interface IResultContainerProps {
  text: string
  textArea?: boolean
}
const ResultContainer:FC<IResultContainerProps> = ({
  text,
  textArea
}) => {
  return (
    <>
    {
      textArea ?
      <Box height={'100px'} overflow={'auto'} display={'flex'} py={1} px={2} borderRadius={'6px'} sx={{background: theme => theme.palette.grey[100]}} >
        <Typography fontWeight={500}>{text}</Typography>
      </Box>
      :
      <Box height={'36px'} display={'flex'} alignItems={'center'} px={2} borderRadius={'6px'} sx={{background: theme => theme.palette.grey[100]}} >
        <Typography fontWeight={500}>{text}</Typography>
      </Box>
    }
    </>
  )
}

interface IProps {
  feedback: IFeedback
}

const FeedbackDetails:FC<IProps> = ({
  feedback
}) => {
  const { feedbackId, statusInfo, receivedAt, source, tat, leftItems, rightItems} =
    useMemo(() => {
      const feedbackId = feedback?.id ?? '-'
      const statusInfo = getFeedbackStatusInfo(feedback?.status ?? '')
      const receivedAt = feedback?.submittedAt
      const source = feedback?.source ?? '_'
      const tat = feedback?.tat ?? '_'


      const leftItems = [
        { label: 'Feedback Type', value: feedback?.feedbackType ?? '_' },
        { label: 'Remark', value: feedback?.remark ?? '-' },
        { label: 'Acknowledge by', value: '-' },
        { label: 'Closed by', value: '-' },
        { label: 'Triggered date & time', value: feedback?.submittedAt || '_' },
        { label: 'Closed date & time', value: feedback?.closedAt || '_' }
      ]

      const rightItems = [
        { label: 'Project', value: feedback?.project?.name || '_' },
        { label: 'Location', value: feedback?.location?.name || '_' },
        { label: 'Building', value: '_' },
        { label: 'Level', value: '_' },
        { label: 'Area', value: '_' },
        { label: 'Unit', value: '_' },
      ]

      return {
        feedbackId,
        statusInfo,
        receivedAt,
        source,
        tat,
        leftItems,
        rightItems
      }
    }, [feedback])


  return (
    <Box>
      <Card sx={{ mt: 3.5, py: 4.25, pr: { lg: 8, xs: 3.75 }, pl: 3.75 }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} flexWrap={'wrap'} >
          <Typography fontSize={'19px'}><Box component={'span'} color={'text.primary'} fontWeight={'600'}>Feedback ID:</Box> F3456978</Typography>
          <CustomChip
            type={statusInfo ? statusInfo.chipType : 'error'}
            text={statusInfo ? statusInfo.label : '-'}
          />
        </Stack>
        <Stack direction={'row'} gap={2} flexWrap={'wrap'} mt={2} >
          <Stack maxWidth={'180px'} justifyContent={'space-between'} gap={1} flex={1} border={theme => `1px dashed ${theme.palette.divider}`} borderRadius={'6px'} py={1.5} px={2} >
            <Typography variant="h4" >{source}</Typography>
            <Typography>Source</Typography>
          </Stack>
          <Stack maxWidth={'180px'} justifyContent={'space-between'} gap={1} flex={1} border={theme => `1px dashed ${theme.palette.divider}`} borderRadius={'6px'} py={1.5} px={2} >
            <Typography variant="h4" >{tat}</Typography>
            <Typography>TAT</Typography>
          </Stack>
          <Stack maxWidth={'180px'} justifyContent={'space-between'} gap={1} flex={1} border={theme => `1px dashed ${theme.palette.divider}`} borderRadius={'6px'} py={1.5} px={2} >
            <Typography variant="h4" >{receivedAt}</Typography>
            <Typography>Feedback Received</Typography>
          </Stack>
        </Stack>
      </Card>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: 2.5 }} >
        <Grid container>
          <Grid item lg={6} xs={12}>
            <Grid container direction={'column'} rowSpacing={2.5} sx={{ p: 3.5 }}>
              {leftItems.map((item, idx) => {
                const label = item.label
                const value = item.value
                const isArray = Array.isArray(value)
                return (
                  <Grid key={idx} item container spacing={1}>
                    <Grid item lg={5} xs={12}>
                      <Typography variant='h4'>{label}</Typography>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                      {isArray ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            rowGap: 2.5,
                            columnGap: 3,
                            '> div': {
                              borderRadius: 2.5,
                              py: 1,
                            },
                          }}
                        >
                          {value.map((t, valueIdx) => {
                            return (
                              <CustomChip
                                key={`recipient-${valueIdx}`}
                                type={'default'}
                                text={t}
                              />
                            )
                          })}
                        </Box>
                      ) : (
                        <Typography
                          variant='h5'
                          sx={{ color: (theme) => theme.palette.grey[600] }}
                        >
                          {value}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            sx={{
              borderLeft: { lg: '1px dashed rgba(161, 165, 183, 0.3)', xs: 'none' },
              borderTop: { xs: '1px dashed rgba(161, 165, 183, 0.3)', lg: 'none' },
            }}
          >
            <Grid container direction={'column'} rowSpacing={2.5} sx={{ p: 3.5 }}>
              {rightItems.map((item, idx) => {
                const label = item.label
                const value: any = item.value
                const isArray = Array.isArray(value)
                return (
                  <Grid key={idx} item container spacing={1}>
                    <Grid item lg={5} xs={12}>
                      <Typography variant='h4'>{label}</Typography>
                    </Grid>
                    <Grid item lg={7} xs={12}>
                      {isArray ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            rowGap: 2.5,
                            columnGap: 3,
                            '> div': {
                              borderRadius: 2.5,
                              py: 1,
                            },
                          }}
                        >
                          {value.map((t, valueIdx) => {
                            return (
                              <CustomChip
                                key={`recipient-${valueIdx}`}
                                type={'default'}
                                text={t}
                              />
                            )
                          })}
                        </Box>
                      ) : (
                        <Typography
                          variant='h5'
                          sx={{ color: (theme) => theme.palette.grey[600] }}
                        >
                          {value}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: 2.5 }} >
        <Box
          sx={{
            px: 5,
            pt: 5.25,
            pb: 2.5,
            display: 'flex',
            flex: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3'>Maintenance Info</Typography>
        </Box>
        <Divider light />
        <Stack gap={3} mx={5} mt={2.5} mb={5} >
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Feedback Type</Typography>
            <ResultContainer text={feedback?.feedbackType || '_'} />
          </Box>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Source</Typography>
            <ResultContainer text={feedback?.source || '_'} />
          </Box>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={4} flexWrap={'wrap'} >
            <Box flex={1}>
              <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Submission Date</Typography>
              <ResultContainer text={'25/08/2022'} />
            </Box>
            <Box flex={1}>
              <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Submission Time</Typography>
              <ResultContainer text={'12:00 PM'} />
            </Box>
          </Stack>
          <Divider light />
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
              Salutation
              <RequiredItem />
            </Typography>
            <ResultContainer text={'MS'} />
          </Box>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={4} flexWrap={'wrap'} >
            <Box flex={1}>
              <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
                First Name
                <RequiredItem />
              </Typography>
              <ResultContainer text={'Jia Yi'} />
            </Box>
            <Box flex={1}>
              <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
                Last Name
                <RequiredItem />
              </Typography>
              <ResultContainer text={'Chan'} />
            </Box>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={4} flexWrap={'wrap'} >
            <Box flex={1}>
              <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
                Contact Number
              </Typography>
              <ResultContainer text={'98721345'} />
            </Box>
            <Box flex={1}>
              <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
                Email
              </Typography>
              <ResultContainer text={'jiayi@gmail.com'} />
            </Box>
          </Stack>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
              Location
              <RequiredItem />
            </Typography>
            <Stack gap={2}>
              <ResultContainer text={'Nanyang Junior College'} />
              <ResultContainer text={'Building 1'} />
              <ResultContainer text={'Level 3'} />
              <ResultContainer text={'Female Toilet 3 '} />
            </Stack>
          </Box>
          <Box >
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
              Feedback
            </Typography>
            <ResultContainer textArea text={'feedback'} />
          </Box>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >
              Photo(s)
            </Typography>
            <Stack direction={'row'} gap={3} flexWrap={'wrap'} >
              {
                feedback?.images?.map((url, idx) => {
                  return (
                    <Box 
                      sx={{
                        '& img': {width:'inherit', height: 'inherit', objectFit: 'cover'},
                        boxShadow: '0px 2px 24px -6px rgba(0,0,0,0.5)',
                        width:'117px',
                        height: '117px',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}
                      key={`i-${idx}`}
                      >
                        <img src={url}/>
                      </Box>
                  )
                })
              }
            </Stack>
          </Box>
        </Stack>
      </Card>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: 2.5 }} >
        <Box
          sx={{
            px: 5,
            pt: 5.25,
            pb: 2.5,
            display: 'flex',
            flex: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3'>Initial Comments</Typography>
        </Box>
        <Divider light />
        <Stack gap={3} px={5} py={2.5}>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Action Taken/Further Remarks</Typography>
            <TextareaWithLabel
              hiddenLabel
              name={'action-taken'}
              placeholder={'N/A'}
              rows={4}
            />
          </Box>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Process Improvement (if none, state why)</Typography>
            <TextareaWithLabel
              hiddenLabel
              name={'process'}
              placeholder={'N/A'}
              rows={4}
            />
          </Box>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Delay due to</Typography>
            <TextareaWithLabel
              hiddenLabel
              name={'delay'}
              placeholder={'N/A'}
              rows={4}
            />
          </Box>
          <Box>
            <Typography fontWeight={500} fontSize={'18px'} mb={1.5} >Remarks</Typography>
            <TextareaWithLabel
              hiddenLabel
              name={'action-taken'}
              placeholder={'N/A'}
              rows={4}
            />
          </Box>
        </Stack>
        <Divider light />
        <Box
          sx={{
            px: 3.75,
            pt: 2.5,
            pb: 3.75,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 3,
          }}
        >
          <Button
            variant='text'
            color='inherit'
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  )
}

export default FeedbackDetails