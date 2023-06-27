'use client'

import { useState } from 'react'
import WritingForm from './WritingForm'
import EditForm from '@/components/EditForm'

export default function Home() {
  let qid = 42
  const [test, setTest] = useState(true)
  return <>{test ? <WritingForm /> : <EditForm questionId={qid} />}</>
}
