import { citizenships } from '../constants/countries'

export const getCountryLabel = (citizenship?: string) => {
  return citizenships.find((item) => item.value === citizenship)?.label
}
