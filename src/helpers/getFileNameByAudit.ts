import dayjs from "dayjs";
import { IAudit } from "../types/audit";


export default function getFileNameByAudit(audit: IAudit) {
  const locationName = audit.location?.name || '';
  const projectName = audit.location?.locationCategory?.project?.name || '';
  const formTemplateName = audit.formTemplate?.name || '';
  const fileDate = audit.submittedAt ? dayjs(audit.submittedAt).format('YYYY_MM_DD') : '';
  const auditNumber = audit.auditNumber || 0;

  // const fileName = [formTypeName, locationName.replace(/\s/g, '_'), fileDate, auditNumber].join('-');
  const fileName = [
    formTemplateName.replace(/\s/g, '_'),
    projectName.replace(/\s/g, '_'),
    locationName.replace(/\s/g, '_'),
    fileDate,
    auditNumber.toString().padStart(2, '0'),
  ].join('-');

  return fileName;
}