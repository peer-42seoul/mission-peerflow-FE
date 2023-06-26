import WritingForm from '@/app/WritingForm'
import axios, { AxiosResponse } from 'axios'
import React from 'react'

interface EditWritingFormProps {
  questionId: string
}
const EditWritingForm = ({ questionId }: EditWritingFormProps) => {
  const submitHandler = (formData: any) => {
    axios
      .put(`/v1/question/${questionId}`, formData)
      .then((res: AxiosResponse<any>) => {
        console.log(`res : ${res}`)
      })
      .catch((err) => {
        console.log(`error : ${err}`)
      })
  }
  return <WritingForm onSubmit={submitHandler} />
}

export default EditWritingForm
