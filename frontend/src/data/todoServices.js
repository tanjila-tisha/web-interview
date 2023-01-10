import { BASE_URL } from '../constant/backend'

// Get all todos with existing list
export const fetchTodoLists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todos`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Unable to fetch data', error)
  }
}

// Send to backend for saving todos with list
export const saveTodoList = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  try {
    const response = await fetch(`${BASE_URL}/todos`, requestOptions)
    const status = response.status
    return status
  } catch (error) {
    console.log('Unable to save data', error)
  }
}
