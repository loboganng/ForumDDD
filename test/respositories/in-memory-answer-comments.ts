import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments.repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  // Create
  async create(answersComment: AnswerComment) {
    this.items.push(answersComment)
  }
}
