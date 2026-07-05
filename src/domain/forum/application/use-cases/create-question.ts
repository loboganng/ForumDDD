import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

//  Creating a response type for the answer
interface CreateQuestionUseCaseResponse {
  question: Question
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class CreateQuestionUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private questionsRepository: QuestionRepository) { }

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
