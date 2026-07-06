import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../../test/respositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// SUT -> System Under Test
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to get delete a answer', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    console.log(newAnswer)

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    // Confirmando que não existem objetos no array
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should NOT be able to get delete a answer from another user', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    // console.log(newAnswer)

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
