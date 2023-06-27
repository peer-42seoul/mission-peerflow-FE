import axios from 'axios'

const updateQuestion = async ({ questionId, data }) => {
  try {
    const response = await axios.put(`/v1/question/${questionId}`, data)
    console.log('Update successful:', response)
  } catch (error) {
    console.error('Update failed:', error)
  }
}

export default updateQuestion
