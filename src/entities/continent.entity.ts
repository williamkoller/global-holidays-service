import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Country } from './country.entity'

@Entity('continents')
export class Continent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'jsonb' })
  area: {
    kilometers: number
    percentage: number
  }

  @Column({ type: 'jsonb' })
  population: {
    approximate: number
    percentage: number
  }

  @Column({ type: 'simple-array' })
  @ManyToOne(() => Country, (country) => country.continent)
  contries: Country[]

  @Column()
  totalContries: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
