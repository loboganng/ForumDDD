import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

//  Creating a response type for the answer
// As we're deleting a answer, this response will be void
interface EditAnswerUseCaseResponse {
  answer: Answer
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class EditAnswerUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private answersRepository: AnswersRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    // If answer not exist
    if (!answer) {
      throw new Error('Answer not found')
    }

    // If person trying to edit is not author
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    // Edição dos campos desejados
    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer,
    }
  }
}
