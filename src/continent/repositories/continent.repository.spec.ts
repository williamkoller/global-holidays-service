import { Test, TestingModule } from '@nestjs/testing'
import { ContinentRepository } from './continent.repository'

describe('ContinentRepository', () => {
  let repository: ContinentRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinentRepository],
    }).compile()

    repository = module.get<ContinentRepository>(ContinentRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
