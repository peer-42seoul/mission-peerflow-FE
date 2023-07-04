'use client'

import Answer from './Answer'
import PageInfo from './InfoPage'
import Question from './Question'
import { Container } from '@mui/material'
import { useContext, useEffect } from 'react'
import GnbContext from '../../../hooks/GnbContext'

const Page = ({ params }: { params: { id: number } }) => {
  const { setGnb } = useContext(GnbContext)

  useEffect(() => {
    setGnb({ title: null, back: true, add: false })
  }, [])

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
