// Fábrica pra criação de respostas novas para os testes

import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
// import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

// Tornamos as propriedades opcionais para a utilização da Facoty
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      // slug: Slug.create('example-answer'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
