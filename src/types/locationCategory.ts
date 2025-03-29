import { IProject } from './project'

export interface ILocationCategory {
  id: number
  name: string
  projectId?: number
  project?: IProject
}
