import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'

@Entity('user')
export class User {
  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password?: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean
}
