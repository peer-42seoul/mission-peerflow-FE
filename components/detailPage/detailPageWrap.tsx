'use client'

import PageInfo from './InfoPage'
import Question from './Question'
import Answer from './Answer'
import { Container } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import GnbContext from '../../hooks/GnbContext'
import { IQuestion } from '../../types/Question'
import NotFound from '../NotFound'

export async function getData(url: string) {
  try {
    const urlPath = 'http://paulryu9309.ddns.net:80/v1/'
    const test = 'http://localhost:80/v1/'

    const res = await fetch(urlPath + url)

    if (!res.ok) throw new Error('Failed to load')

    const data = res.json()

    console.log('all', data)

    return data
  } catch (e) {
    console.log('error: ', e)
    return null
  }
}

export default function DetailPage({ param }: { param: number }) {
  const { setGnb } = useContext(GnbContext)
  const [data, setData] = useState<IQuestion>(null)
  const [emptiness, setEmptiness] = useState(false)

  async function fetchAndSet() {
    const fetchData = await getData(`question/${param}`)
    if (!fetchData) {
      setEmptiness(true)
    }
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
<<<<<<< HEAD
      {emptiness ? (
        <NotFound />
      ) : (
        <Container>
          <PageInfo param={data} qid={param} />
          <Question
            content={data?.content}
            recomment={data?.recommend}
            questId={param}
          />
          <br />
          <Answer param={data?.answerList} quest_id={param} />
        </Container>
      )}
=======
      <Container>
        <PageInfo param={data} />
        <Question
          content={data?.content}
          recomment={data?.recommend}
          questId={param}
        />
        <br />
        <Answer
          param={data?.answerList}
          quest_id={param}
          trigger={fetchAndSet}
        />
      </Container>
>>>>>>> 20-detail-page
    </>
  )
}
