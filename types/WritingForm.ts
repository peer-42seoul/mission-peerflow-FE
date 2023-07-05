export interface WritingForm {
  type: string // o
  title: string // o
  nickname: string // o
  password: string // o
  content: string // o
  category: { value: string | number; name: string } // o
  created: string // x
}
