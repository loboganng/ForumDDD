// Ao invés de criar um polimorfimos para cada tipo de cada comentário, sendo que cada comentário pode ser tanto da resposta ou da pergunta. Ao invés de criar um commentário para cada um, utilizaremos a classe comment, daí as outras classes de comment, vão extender a partir dessa

import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

// Classes abstratas não podem ser instanciada diretamente
export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  // Method to update 'updatedAt' attribute automatically
  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
