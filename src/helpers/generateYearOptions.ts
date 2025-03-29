import dayjs from "dayjs"
import { ISelectItem } from "../types/common"

const year = dayjs().year()

export const generateYearOptions = () => {
  const maxYear = 5
  const years = []
  for (let i = 0; i < maxYear; i++) {
    const tmpItem = { label: String(year - i), value: String(year - i) }
    years.push(tmpItem)
  }
  return years as ISelectItem[]
}