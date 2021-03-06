// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Example POST method implementation:

async function postData(url = '', data = {}, headers) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: headers
      ? headers
      : {
          'Content-Type': 'application/json',
        },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })
  return response.json() // parses JSON response into native JavaScript objects
}

async function postMarkdown(
  data = {},
  url = 'https://api.github.com/markdown',
  headers,
) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: headers
      ? headers
      : {
          'Content-Type': 'application/vnd.github.v3+json',
        },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  })
  return response.text()
}

export { postData, postMarkdown }
