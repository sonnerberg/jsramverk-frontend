import { postData } from './fetchHelpers'

const baseUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? 'https://me-api.sonnerberg.me/register'
    : '/register'

const register = async (credentials) => {
  const response = await postData(baseUrl, credentials)
  return response.data
}

export default { register }
