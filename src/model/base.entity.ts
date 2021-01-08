import { UserRoles } from 'src/roles/user.roles'
import { TypeEntity } from 'src/shared/@types/base.type'
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseEntity implements TypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'varchar', length: 300, default: UserRoles.SYSTEM })
  createdBy: string

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date

  @Column({ type: 'varchar', length: 300, default: UserRoles.SYSTEM })
  updatedBy: string
}
