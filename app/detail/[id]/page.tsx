'use client'

import Answer from './Answer'
import PageInfo from './InfoPage'
import Question from './Question'
import { Container } from '@mui/material'
import { useContext, useEffect } from 'react'
import GnbContext from '../../../hooks/GnbContext'

// async function getData(id: number) {
//   const res = await fetch(`paul.ryu9309.ddns.net/question/${id}`)
//   if (!res.ok) throw new Error('Failed to load page')

//   return res.json
// }

export default function Page({ params }: { params: { id: number } }) {
  const { setGnb } = useContext(GnbContext)
  // const fetchData = getData(params.id)

  // const [questionData] = await Promise.all([fetchData])

  useEffect(() => {
    setGnb({ title: '', back: true, add: false })
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
