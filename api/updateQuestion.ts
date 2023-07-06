import axios from 'axios'

const updateQuestion = async (questionId, data) => {
  try {
    console.log(`데이터는 ? ${JSON.stringify(data)}`)

    await axios.put(`http://localhost:8080/v1/question/${questionId}`, data)
  } catch (error) {
    console.error('Update failed:', error)
  }
}

export default updateQuestion
