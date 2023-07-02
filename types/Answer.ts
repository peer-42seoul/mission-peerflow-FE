export interface Answer {
  question_id: number
  answer_id: number
  nickname: string
  password: string
  content: string
  created: string
  updated?: string
  is_adopted: boolean
  recommended: number
}
