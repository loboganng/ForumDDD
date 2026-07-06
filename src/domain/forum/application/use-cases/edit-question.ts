import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

//  Creating a response type for the answer
// As we're deleting a question, this response will be void
interface EditQuestionUseCaseResponse {
  question: Question
}

// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class EditQuestionUseCase {
  // Injetando a dependência do repositório aqui
  constructor(private questionsRepository: QuestionsRepository) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    // If question not exist
    if (!question) {
      throw new Error('Question not found')
    }

    // If person trying to edit is not author
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    // Edição dos campos desejados
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
