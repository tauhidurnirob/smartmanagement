import { Box, SelectChangeEvent, Typography } from "@mui/material"
import SimpleSelect from "../../../../common/SimpleSelect"
import { ISelectItem } from "../../../../../types/common"
import { FC, useState } from "react"


interface IProps {
  name: string
  fieldName: string
  placeholder: string
  options: ISelectItem[]
  preview?: boolean
}

const DropdownField:FC<IProps> = ({
  name,
  fieldName,
  placeholder,
  options,
  preview
}) => {
  const[selected, setSelected] = useState<any>(undefined)
  
  const placeholderItem = {label: placeholder, value: ''}
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>{fieldName}</Typography>
      <SimpleSelect
        width={'100%'}
        value={selected}
        placeholder={placeholderItem}
        options={options}
        onChange={(val) => setSelected(val)}
        sx={{
          '& .MuiSelect-select': (preview ? {py: '10px', background: theme => theme.palette.grey[100]} : {background: '#fff', border: theme =>`1px solid ${theme.palette.divider}`, py: '10px'}),
        }}
      />
    </Box>
  )
}

export default DropdownField