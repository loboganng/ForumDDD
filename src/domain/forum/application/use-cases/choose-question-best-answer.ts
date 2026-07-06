import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

// Para ficar um pouco mais organizado, criamos uma interface que vai receber os atributos
interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}
interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}
// A partir dessa interface, utilizamos ela para recuperar os atributos da classe alvo
export class ChooseQuestionBestAnswerUseCase {
  // Injetando a dependência do repositório aqui
  constructor(
    // Aqui precisamos ter acesso tanto a resposta quanto a pergunta
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  // Usamos desestruturação pra recuperar os atributos
  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
