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
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import ReorderIcon from '@mui/icons-material/Reorder'
import { TodoListForm } from './TodoListForm'
import Tooltip from '@mui/material/Tooltip'
import { fetchTodoLists, saveTodoList } from '../../data/todoServices'
import { isTodoListCompleted } from '../../utils/todos'

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const [confirmationMsg, setConfirmationMsg] = useState({})

  useEffect(() => {
    fetchTodoLists().then(setTodoLists)
  }, [])

  const handleSave = (id, todos) => {
    const listToUpdate = todoLists[id]
    const updatedList = {
      ...todoLists,
      [id]: { ...listToUpdate, todos },
    }

    saveTodoList(updatedList).then((status) => {
      if (status === 201) {
        setIsButtonDisable(true)
        setConfirmationMsg({ status: 'success', message: 'Todos has been saved successfully' })
      } else {
        setIsButtonDisable(false)
        setConfirmationMsg({
          status: 'error',
          message: 'Unfortunately There is en error. Please try again.',
        })
      }
    })
    setTodoLists(updatedList)
  }

  if (!Object.keys(todoLists).length) return null

  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => {
              const isCompleted =
                todoLists[key].todos.length && isTodoListCompleted(todoLists[key].todos)
              return (
                <ListItem
                  key={key}
                  button
                  onClick={() => {
                    setActiveList(key)
                    setConfirmationMsg({})
                  }}
                >
                  <Tooltip title={isCompleted ? 'Completed' : 'In progress'}>
                    <ListItemIcon>
                      {isCompleted ? (
                        <PlaylistAddCheckIcon fontSize='large' color='primary' />
                      ) : (
                        <ReorderIcon />
                      )}
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary={todoLists[key].title} />
                </ListItem>
              )
            })}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={handleSave}
          isButtonDisable={isButtonDisable}
          setIsButtonDisable={setIsButtonDisable}
          confirmationMsg={confirmationMsg}
          setConfirmationMsg={setConfirmationMsg}
        />
      )}
    </Fragment>
  )
}