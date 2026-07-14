import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from '../../../../../test/respositories/in-memory-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
// SUT -> System Under Test
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    // Confirmando que não existem objetos no array
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    // Aqui usamos a factory de answer pra gerar uma nova
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
