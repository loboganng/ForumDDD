import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
interface AnswerQuestionUseCaseResponse {
  answer: Answer
}
// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class AnswerQuestionUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private answerRepository: AnswersRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    // Após criar a answer, usamos o método CREATE pra salvar
    await this.answerRepository.create(answer)

    return {
      answer,
    }
  }
}
