import axios from 'axios'

const updateQuestion = async ({ questionId, data }) => {
  try {
    const response = await axios.put(
      `http://paulryu9309.ddns.net/v1/question/${questionId}`,
      data,
    )
    console.log('Update successful:', response)
    return response
  } catch (error) {
    console.error('Update failed:', error)
  }
}

export default updateQuestion
