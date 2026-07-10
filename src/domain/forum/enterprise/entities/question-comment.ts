import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

// QuestionComment já extende CommentsProps, então só precisamos adicionar os atributos a mais (questionId)
export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId
}

// Classe comment já possui todas os getters/setters
export class QuestionsComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionsComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
