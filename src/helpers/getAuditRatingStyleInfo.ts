import { IRatingTemplate } from '../types/audit'
import { AUDIT_RATING_STYLES } from './constants'

export default function getAuditRatingStyleInfo(ratingTemplate: IRatingTemplate) {
  const style = ratingTemplate.style

  return AUDIT_RATING_STYLES.find((e) => e.value === style) || AUDIT_RATING_STYLES[0]
}
