import { IEntity } from 'src/shared/@types/base.type'
import { IRolesContainer } from './roles-container.interface'

export interface IUser extends IEntity, IRolesContainer {
  name: string
  email: string
}
