import toast from 'react-hot-toast'
import { gql, useMutation } from '@apollo/react-hooks'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const phoneNumberRegex = /^\d{11}$/

export function useMutationExecutor (mutation, extractVariables) {
  const [mutate, { loading, error }] = useMutation(mutation)

  loadDevMessages()
  loadErrorMessages()

  const executeMutation = async values => {
    const variables = extractVariables(values)
    const { data } = await mutate({ variables })

    const { status, message } = data ? data[Object.keys(data)] : { status: '', message: '' }
    return { status, message }
  }

  return { executeMutation, loading, error }
}

export const handleResponse = (result, navigate) => {
  switch (result.status) {
    case 200:
      if (window.location.hash === '#/weblog/create' || window.location.hash === '#/weblog/edit') {
        navigate('/weblog')
      }
      window.location.reload()
      toast.success(result.message)
      break
    case 404:
      navigate('/page404')
      toast.error(`Status ${result.status}: ${result.message}`)
      break
    case 500:
      navigate('/page500')
      toast.error(`Status ${result.status}: ${result.message}`)
      break
    default:
      toast.error(`Status ${result.status}: ${result.message}`)
  }
}

export const fetchFunction = async (data, setDataSource, navigate, dataKey) => {
  try {
    if (data) {
      const { status, message } = data
      const items = data[dataKey]

      if (status === 200) {
        toast.success(`Successful fetching`)
        setDataSource(items)
      } else if (status === 404) {
        navigate('/page404')
        toast.error(`Status ${status}: ${message}`)
      } else if (status === 500) {
        navigate('/page500')
        toast.error(`Status ${status}: ${message}`)
      } else {
        toast.error(`Status ${status}: ${message}`)
      }
    }
  } catch (err) {
    toast.error(`Fetch error: ${err}`)
  }
}

export const extractFields = (values, fields) => {
  const extracted = {}
  fields.forEach(field => {
    // if (values[field] && values[field].length === 1 && values[field][0].originFileObj) {
    //   extracted[field] = values[field][0].originFileObj
    // } else {
    extracted[field] = values[field]
    // }
  })
  return extracted
}
