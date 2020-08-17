import { postData } from './fetchHelpers'

const baseUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? 'https://me-api.sonnerberg.me/login'
    : '/login'

const login = async (credentials) => {
  const response = await postData(baseUrl, credentials)
  return response.data
}

export default { login }
