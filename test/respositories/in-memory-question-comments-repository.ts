import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionsComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionsComment[] = []

  // Create
  async create(questionsComment: QuestionsComment) {
    this.items.push(questionsComment)
  }
}
