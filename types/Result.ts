interface Post {
  questionId: number
  title: string
  answerCount: number
  category: string
  recommend: number
  view: number
  nickname: string
  createdAt: string
}

interface Pageable {
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  pageNumber: number
  pageSize: number
  paged: boolean
  unpaged: boolean
}

interface Result {
  content: Post[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  empty: boolean
}
