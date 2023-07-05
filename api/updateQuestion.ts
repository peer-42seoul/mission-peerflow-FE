import axios from 'axios'

const updateQuestion = async (questionId, data) => {
  try {
    console.log(`데이터는 ? ${JSON.stringify(data)}`)

    await axios.put(
      `http://paulryu9309.ddns.net:80/v1/question/${questionId}`,
      data,
    )
  } catch (error) {
    console.error('Update failed:', error)
  }
}

export default updateQuestion
