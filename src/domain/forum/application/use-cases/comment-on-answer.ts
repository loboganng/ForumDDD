import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

//  Creating a response type for the answer
interface CommentOnAnswernUseCaseResponse {
  answerComment: AnswerComment
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class CommentOnAnswernUseCase {
  // Injetando a dependência do repositório aqui
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswernUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })
    await this.answerCommentsRepository.create(answerComment)

    return {
      answerComment,
    }
  }
}
