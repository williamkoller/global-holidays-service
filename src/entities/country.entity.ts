import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Continent } from './continent.entity'

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  capitalContry: string

  @Column()
  territorialExtension: number

  @Column()
  localization: string

  @Column()
  language: string

  @Column()
  currency: string

  @Column('simple-array')
  @OneToMany(() => Continent, (continent) => continent.contries)
  continent: Continent

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
