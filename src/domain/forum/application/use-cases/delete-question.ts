import { QuestionsRepository } from '../repositories/questions-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

//  Creating a response type for the answer
// As we're deleting a question, this response will be void
interface DeleteQuestionUseCaseResponse {}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class DeleteQuestionUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private questionsRepository: QuestionsRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    // If question not exist
    if (!question) {
      throw new Error('Question not found')
    }

    // If person trying to delete is not author
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
