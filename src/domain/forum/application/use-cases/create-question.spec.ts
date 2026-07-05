import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from '../../../../../test/respositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT -> System Under Test
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
    })
    // Confirmando que o ID não é nulo
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
