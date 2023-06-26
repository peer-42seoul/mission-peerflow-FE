import updateQuestion from '@/api/updateQuestion'
import { Button, Stack } from '@mui/material'
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'

const EditForm = ({ questionId }) => {
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await axios.get(`/v1/question/${questionId}`)
        setQuestion(response.data)
      } catch (error) {
        console.error('Failed to fetch question data:', error)
      }
    }

    sendData()
  }, [questionId])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 수정된 데이터를 구성합니다.
    const updatedData = {
      // 필요한 데이터를 구성합니다.
    }
    updateQuestion(questionId, updatedData)
  }

  return (
    <Stack spacing={2}>
      {question && (
        <form onSubmit={handleSubmit}>
          {/* 수정 가능한 필드 추가 */}
          <Button type="submit" variant="outlined">
            수정 완료
          </Button>
        </form>
      )}
    </Stack>
  )
}

export default EditForm
