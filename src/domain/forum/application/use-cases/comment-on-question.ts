import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionsComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface CommentOnQuestionnUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

//  Creating a response type for the answer
interface CommentOnQuestionnUseCaseResponse {
  questionComment: QuestionsComment
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
  }: CommentOnQuestionnUseCaseRequest): Promise<CommentOnQuestionnUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionsComment.create({
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
