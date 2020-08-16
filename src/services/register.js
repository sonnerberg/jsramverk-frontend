import { postData } from './fetchHelpers'

const baseUrl = 'http://localhost:3333/register'

const register = async (credentials) => {
  const response = await postData(baseUrl, credentials)
  return response.data
}

export default { register }
