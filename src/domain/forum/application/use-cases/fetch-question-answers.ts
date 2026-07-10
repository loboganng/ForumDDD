import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

//  Creating a response type for the answer
interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class FetchQuestionAnswersUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private answersRepository: AnswersRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
