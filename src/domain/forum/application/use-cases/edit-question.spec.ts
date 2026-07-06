import { InMemoryQuestionsRepository } from '../../../../../test/respositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// SUT -> System Under Test
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get edit a question', async () => {
    // Aqui usamos a factory de question pra gerar uma nova
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Test question',
      content: 'Test content',
    })

    // Confirmando que não existem objetos no array
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Test question',
      content: 'Test content',
    })
  })

  it('should NOT be able to get edit a question from another user', async () => {
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
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Test question',
        content: 'Test content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
