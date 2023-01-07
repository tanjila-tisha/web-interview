import React, { Fragment, useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import ReorderIcon from '@mui/icons-material/Reorder'
import { TodoListForm } from './TodoListForm'
import Tooltip from '@mui/material/Tooltip'

const fetchTodoLists = async () => {
  try {
    const response = await fetch('http://localhost:3001/todos')
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Unable to fetch data', error)
  }

  /*return sleep(1000).then(() =>
    Promise.resolve({
      '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [
          {
            task: 'First todo of first list!',
            completed: false,
          },
        ],
      },
      '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [
          {
            task: 'First todo of second list!',
            completed: false,
          },
        ],
      },
    })
  )*/
}

const saveTodoList = async (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  try {
    const response = await fetch('http://localhost:3001/todos', requestOptions)
    const status = await response.json()
    return status
  } catch (error) {
    console.log('Unable to save data', error)
  }
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const isTodoListCompleted = (todos) => !todos.filter((todo) => todo.completed === false).length

  const handleSave = (id, todos) => {
    const listToUpdate = todoLists[id]
    const updatedList = {
      ...todoLists,
      [id]: { ...listToUpdate, todos },
    }
    console.log('updatedList:', updatedList)
    saveTodoList(updatedList)
    setTodoLists(updatedList)
  }

  if (!Object.keys(todoLists).length) return null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <Tooltip
                  title={isTodoListCompleted(todoLists[key].todos) ? 'Completed' : 'In progress'}
                >
                  <ListItemIcon>
                    {isTodoListCompleted(todoLists[key].todos) ? (
                      <PlaylistAddCheckIcon fontSize='large' color='primary' />
                    ) : (
                      <ReorderIcon />
                    )}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary={todoLists[key].title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={handleSave}
        />
      )}
    </Fragment>
  )
}
