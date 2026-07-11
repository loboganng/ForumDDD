import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

//  Creating a response type for the answer
interface DeleteQuestionCommentUseCaseResponse {}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class DeleteQuestionCommentUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
