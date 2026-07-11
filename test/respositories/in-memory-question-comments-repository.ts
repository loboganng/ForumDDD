import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  // Find by ID
  async findById(id: string) {
    const questioncomment = this.items.find((item) => item.id.toString() === id)

    if (!questioncomment) {
      return null
    }

    return questioncomment
  }

  // Create
  async create(questioncComment: QuestionComment) {
    this.items.push(questioncComment)
  }

  // Delete
  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
