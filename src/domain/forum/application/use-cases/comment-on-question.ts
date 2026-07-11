import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

//  Creating a response type for the answer
interface CommentOnQuestionnUseCaseResponse {
  questionComment: QuestionComment
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class CommentOnQuestionnUseCase {
  // Injetando a dependência do repositório aqui
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionnUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })
    await this.questionCommentsRepository.create(questionComment)

    return {
      questionComment,
    }
  }
}
