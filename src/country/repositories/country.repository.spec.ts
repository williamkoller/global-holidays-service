import { Test, TestingModule } from '@nestjs/testing'
import { CountryRepository } from './country.repository'

describe('CountryRepository', () => {
  let repository: CountryRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryRepository],
    }).compile()

    repository = module.get<CountryRepository>(CountryRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
