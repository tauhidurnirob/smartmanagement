export interface PostCreateTask {
  name: string
  remark: string
  locationId: number
  buildingId: number
  levelId: number
  areaId: number
  unitId: number
  date: string
  uploads: string[]
  staffIds: number[]
  assignArea: string
  taskType: number
  premiseCategoryId: number
}
