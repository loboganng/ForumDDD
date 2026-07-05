import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

//  Creating a response type for the answer
interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class GetQuestionBySlugUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private questionsRepository: QuestionsRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question,
    }
  }
}
