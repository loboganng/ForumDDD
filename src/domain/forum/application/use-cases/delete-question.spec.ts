import { InMemoryQuestionsRepository } from '../../../../../test/respositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT -> System Under Test
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get delete a question', async () => {
    // Aqui usamos a factory de question pra gerar uma nova
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    console.log(newQuestion)

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    // Confirmando que não existem objetos no array
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to get delete a question from another user', async () => {
    // Aqui usamos a factory de question pra gerar uma nova
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    // console.log(newQuestion)

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
