import { IAnswer } from './Answer'

export interface IQuestion {
  nickname: string
  content: string
  createdAt: string
  updatedAt?: string
  title: string
  category: number
  recommend: number
  view: number
  answerList: IAnswer[]
}
