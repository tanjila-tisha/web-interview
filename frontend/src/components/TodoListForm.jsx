import React, { useState, useEffect } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export const TodoListForm = ({
  todoList,
  saveTodoList,
  isButtonDisable,
  setIsButtonDisable,
  confirmationMsg,
  setConfirmationMsg,
}) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, todos)
  }

  //Auto save task
  /*useEffect(() => {
    saveTodoList(todoList.id, todos)
  }, [todos])*/

  const updateTodos = (key, value, index) => {
    const updatedTask = [
      // immutable update
      ...todos.slice(0, index),
      {
        ...todos[index],
        [key]: value,
      },
      ...todos.slice(index + 1),
    ]
    setConfirmationMsg({})
    setTodos(updatedTask)
    setIsButtonDisable(false)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        {Object.keys(confirmationMsg).length !== 0 && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={confirmationMsg.status}>{confirmationMsg.message}</Alert>
          </Stack>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todos.map(({ task, completed }, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={completed ? 'Completed' : 'In progress'}>
                <Checkbox
                  onChange={(event) => updateTodos('completed', !completed, index)}
                  checked={completed}
                />
              </Tooltip>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label={completed ? 'Completed' : 'What to do?'}
                value={task}
                onChange={(event) => {
                  updateTodos('task', event.target.value, index)
                }}
              />
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => setTodos([...todos, { task: '', completed: false }])}
            >
              Add Todo <AddIcon />
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              disabled={isButtonDisable}
            >
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
