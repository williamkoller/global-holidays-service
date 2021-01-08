import { Exclude } from 'class-transformer'
import { UserRoles } from 'src/user/roles/user.roles'
import { Column, Entity } from 'typeorm'
import { IUser } from 'src/user/interfaces/user.interface'
import { IRolesContainer } from 'src/user/interfaces/roles-container.interface'
import { BaseEntity } from 'src/model/base.entity'

@Entity('user')
export class User extends BaseEntity implements IUser, IRolesContainer {
  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password?: string

  @Column({ type: 'enum', enum: UserRoles, array: true })
  roles: UserRoles[]

  @Column({ type: 'boolean', default: true })
  isActive: boolean
}
