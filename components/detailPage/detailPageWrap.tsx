'use client'

import PageInfo from './InfoPage'
import Question from './Question'
import Answer from './Answer'
import { Container } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import GnbContext from '../../hooks/GnbContext'
import { IQuestion } from '../../types/Question'
import axios from 'axios'

async function getData(id: number) {
  try {
    const res = await fetch(`http://localhost:80/v1/question/${id}`)

    if (!res.ok) throw new Error('Failed to load')

    const data = res.json()
    console.log(data)
    return data
  } catch (e) {
    console.log('error: ', e)
    return null
  }
}

export default async function DetailPage({ param }: { param: number }) {
  const { setGnb } = useContext(GnbContext)
  const [data, setData] = useState<IQuestion>(null)

  async function fetchAndSet() {
    const fetchData = await getData(param)
    console.log(fetchData)
    setData(fetchData)
  }

  useEffect(() => {
    setGnb({ title: '', back: true, add: false })
  }, [])

  useEffect(() => {
    fetchAndSet()
  }, [])

  return (
    <>
      <Container>
        <PageInfo param={data} />
        <Question content={data?.content} recomment={data?.recommend} />
        <br />
        <Answer />
      </Container>
    </>
  )
}
