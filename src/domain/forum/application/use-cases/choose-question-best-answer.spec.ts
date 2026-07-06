import { makeAnswer } from '../../../../../test/factories/make-answer'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryAnswersRepository } from '../../../../../test/respositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/respositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemmoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
// SUT -> System Under Test
let sut: ChooseQuestionBestAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemmoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemmoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should choose questions best answer', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemmoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    // Confirmando que não existem objetos no array
    expect(inMemmoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should NOT be able to choose another users questions best answer', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemmoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
