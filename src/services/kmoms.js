import { postData } from './fetchHelpers'

const baseUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production'
    ? 'https://me-api.sonnerberg.me/reports'
    : '/reports'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// const getAll = async () => {
//   const response = await axios.get(baseUrl)
//   return response.data
// }

const create = async (newKmom) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token,
  })

  const response = await postData(baseUrl, newKmom, headers)
  return response.data
}

// const update = async (id, blogObject) => {
//   const config = {
//     headers: { Authorization: token }
//   }

//   const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
//   return response.data
// }

// const deleteBlog = async (id) => {
//   const config = {
//     headers: { Authorization: token }
//   }
//   const response = await axios.delete(`${baseUrl}/${id}`, config)
//   return response.data
// }

// const addComment = async (id, commentObject) => {
//   const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject)
//   return response.data
// }

// export default { getAll, create, setToken, update, deleteBlog, addComment }
export default { setToken, create }
