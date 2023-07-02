export interface WritingForm {
  type: string // x
  title: string // o
  nickname: string // o
  password: string // o
  content: string // o
  category: { value: number; name: string } // x
  created: string // x
}
