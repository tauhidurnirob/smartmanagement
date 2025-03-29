import { Box, Typography } from '@mui/material'
import { FC, useMemo } from 'react'
import Api from '../../../../../api'
import { AUDIT_RATING_STYLES } from '../../../../../helpers/constants'
import RatingNumberStyleList from '../../../audit-rating-template/rating-style-list/RatingNumberStyleList'
import RatingTextStyleList from '../../../audit-rating-template/rating-style-list/RatingTextStyleList'
import RatingEmojiStyleList from '../../../audit-rating-template/rating-style-list/RatingEmojiStyleList'
import { IRatingTemplate } from '../../../../../types/audit'

interface IProps {
  fieldName: string
  placeholder: string
  templateIds: number[]
}

const RatingContainer: FC<IProps> = ({ fieldName, placeholder, templateIds }) => {
  const { data, isLoading } = Api.useGetAuditRatingTemplateListByIdsQuery({
    ids: templateIds,
  })
  const templates: IRatingTemplate[] = []
  templateIds.forEach((templateId) => {
    const tmpData: IRatingTemplate = data?.find(
      (item) => Number(item.id) === Number(templateId)
    ) as IRatingTemplate
    if (tmpData) {
      templates.push(tmpData)
    }
  })
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>
        {fieldName}
      </Typography>
      <Typography fontWeight='500' fontSize={'12px'} mb='8px'>
        {placeholder}
      </Typography>
      <Box>
        <>
          {templates?.map((template, index) => {
            return (
              <Box my={3} key={`tem${index}`}>
                <Typography fontWeight='600' fontSize={'14px'} mb='8px'>
                  {template.inspectionUnit}
                </Typography>
                {template.style === AUDIT_RATING_STYLES[0].value && (
                  <RatingNumberStyleList data={template} />
                )}
                {template.style === AUDIT_RATING_STYLES[1].value && (
                  <RatingTextStyleList
                    ratingOfNumber={template?.numberOfRating || 0}
                    data={template}
                  />
                )}
                {template.style === AUDIT_RATING_STYLES[2].value && (
                  <RatingEmojiStyleList ratingOfNumber={5} />
                )}
              </Box>
            )
          })}
        </>
      </Box>
    </Box>
  )
}

export default RatingContainer
