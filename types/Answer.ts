export interface IAnswer {
  answerId: number
  nickname: string
  content: string
  createdAt: string
  updatedAt?: string
  type: string
  recommend: number
  questionId: number
  adopted: boolean
}
