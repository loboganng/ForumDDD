import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/respositories/in-memory-answer-comments'
import { InMemoryAnswersRepository } from '../../../../../test/respositories/in-memory-answers-repository'
import { CommentOnAnswernUseCase } from './comment-on-answer'

let inMemmoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
// SUT -> System Under Test
let sut: CommentOnAnswernUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemmoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswernUseCase(
      inMemmoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const answer = makeAnswer()

    await inMemmoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Test comment',
    })

    // Confirmando que não existem objetos no array
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'Test comment',
    )
  })
})
