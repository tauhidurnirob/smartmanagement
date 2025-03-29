import { FC } from "react"
import DialogWrapper from "../../common/DialogWrapper"
import { IFormulaGroup } from "../../../types/formula"
import ProjectFormulaGroupAddEdit from "./ProjectFormulaGroupAddEdit"

interface IProps {
  open: boolean
  onClose: () => void
  data: IFormulaGroup
}

const ProjectFormulaGroupDialog:FC<IProps> = ({
  open,
  onClose,
  data
}) => {
  
  return (
    <DialogWrapper
      maxWidth={'lg'}
      label={'Formula Group Details'}
      open={open}
      onClose={onClose}
    >
      <ProjectFormulaGroupAddEdit data={data} onCancel={onClose} />
    </DialogWrapper>
  )
}

export default ProjectFormulaGroupDialog