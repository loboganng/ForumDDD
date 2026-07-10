import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/respositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/respositories/in-memory-questions-repository'
import { CommentOnQuestionnUseCase } from './comment-on-question'

let inMemmoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
// SUT -> System Under Test
let sut: CommentOnQuestionnUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemmoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionnUseCase(
      inMemmoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const question = makeQuestion()

    await inMemmoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Test comment',
    })

    // Confirmando que não existem objetos no array
    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Test comment',
    )
  })
})
