import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

//  Creating a response type for the answer
interface DeleteAnswerCommentUseCaseResponse {}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class DeleteAnswerCommentUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
