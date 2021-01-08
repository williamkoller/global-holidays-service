export type TypeEntity = BaseEntity

export interface BaseEntity {
  id: string
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}
