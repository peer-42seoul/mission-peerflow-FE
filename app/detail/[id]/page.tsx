'use client'

import Answer from './Answer'
import PageInfo from './InfoPage'
import Question from './Question'
import { Container } from '@mui/material'

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <Container>
        <PageInfo />
        <Question />
        <br />
        <Answer />
      </Container>
    </>
  )
}

export default Page
