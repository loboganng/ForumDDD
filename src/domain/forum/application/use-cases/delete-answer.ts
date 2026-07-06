import { AnswersRepository } from '../repositories/answers-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

//  Creating a response type for the answer
// As we're deleting a answer, this response will be void
interface DeleteAnswerUseCaseResponse {}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class DeleteAnswerUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private answersRepository: AnswersRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    // If answer not exist
    if (!answer) {
      throw new Error('Answer not found')
    }

    // If person trying to delete is not author
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
