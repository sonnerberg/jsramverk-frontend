import { postData } from './fetchHelpers'

const baseUrl = '/login'

const login = async (credentials) => {
  const response = await postData(baseUrl, credentials)
  return response.data
}

export default { login }
