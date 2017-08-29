import qs from 'qs'

function BinaryFormatData ({ data, fileId = 'upload', filename = '' }) { // 二进制走这个format函数
  const formData = new FormData()
  if (data && Object.keys(data).length) {
    for (let key in data) {
      formData.append(key, data[key])
    }
  }
  // 如果需要上传文件
  filename && formData.append(fileId, {uri: filename, name: filename})
  return formData
}

function myfetch ({ url, data, method = 'POST', headers = {}, dataType, filename, fileId }) {
  if (!url) {
    throw new Error('url is not defined!')
  }
  let options = {
    method: method.toUpperCase(),
    headers: {
      ...headers,
      // 'Content-Encoding': 'gzip',
      'Cache-Control': 'no-cache'
    }
  }
  console.log(fullUrl)
  if (filename) {
    options = {
      ...options,
      body: BinaryFormatData({data, filename, fileId}),
      headers: {
        ...options.headers,
        'Content-Type': 'multipart/form-data'
      }
    }
  } else {
    if (options.method === 'GET' || options.method === 'PUT') {
      fullUrl += `?${qs.stringify(data)}`
    } else {
      options = {
        ...options,
        body: qs.stringify(data),
        headers: {
          ...options.headers,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }
    if (dataType === 'json') {
      options = {
        ...options,
        body: JSON.stringify(data),
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      }
    }
  }
  const p = Promise.race([
    fetch(fullUrl, options),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('网络加载超时')), 20000)
    })
  ])
  return p.then((response) => {
    if (response.status === 401 || response.status === 400) {
      throw new Error(response.status)
    } else if (
      (response.status > 299 || response.status < 200) &&
      response.status !== 304
    ) {
      throw new Error('服务繁忙，请稍后再试')
    }
    console.log(response)
    return response.json()
  })
  .then((json) => {
    console.log(json)
    if (json.status) {
      const { code, userMessage } = json.status
      if (code !== '000000') {
        throw new Error(userMessage)
      }
    }
    return { response: json }
  })
  .catch((error) => {
    if (error && error.message === 'Network request failed') {
      return { error: { message: '网络不可用，请检查您的网络' } }
    }
    return { error }
  })
}

export default {
  fetch: myfetch
}