import { postData } from './fetchHelpers'

const baseUrl = '/register'

const register = async (credentials) => {
  const response = await postData(baseUrl, credentials)
  return response.data
}

export default { register }
