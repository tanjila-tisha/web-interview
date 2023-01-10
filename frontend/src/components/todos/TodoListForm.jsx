import React, { useState, useContext } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { TodoContext } from './TodoLists'
import DatePickerField from '../fields/DatePicker'
import { calculateRemaningDays } from '../../utils/todos'
import '../../styles/index.css'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const { saveButton, message } = useContext(TodoContext)
  const [isButtonDisabled, setIsButtonDisabled] = saveButton
  const [confirmationMsg, setConfirmationMsg] = message

  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, todos)
  }

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
    setIsButtonDisabled(false)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography variant='h5'>{todoList.title}</Typography>
        {Object.keys(confirmationMsg).length !== 0 && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={confirmationMsg.status}>{confirmationMsg.message}</Alert>
          </Stack>
        )}
        <form onSubmit={handleSubmit} className='todosForm'>
          {todos.map(({ task, completed, dueDate }, index) => {
            const remainingDays = calculateRemaningDays(todos[index].dueDate)
            return (
              <div key={index} className='todoItem'>
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
                  sx={{ flexGrow: 1, marginTop: '1rem', width: '40%' }}
                  label={completed ? 'Completed' : 'What to do?'}
                  color={completed ? 'success' : 'primary'}
                  value={task}
                  onChange={(event) => updateTodos('task', event.target.value, index)}
                />
                <Box className='todoItem__datePicker'>
                  <DatePickerField
                    label='Due date'
                    value={dueDate}
                    setValue={(newDate) => {
                      updateTodos('dueDate', newDate, index)
                    }}
                  />
                </Box>
                <Box
                  className='todoItem__reminder'
                  sx={{ color: remainingDays >= 0 ? 'primary.main' : 'error.main' }}
                >
                  {remainingDays >= 0 ? `${remainingDays} days remaining` : 'Overdue'}
                </Box>
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
                    setIsButtonDisabled(false)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            )
          })}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() =>
                setTodos([...todos, { task: '', completed: false, dueDate: new Date() }])
              }
            >
              Add Todo <AddIcon />
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
