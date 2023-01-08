export const isTodoListCompleted = (todos) => !todos.filter((todo) => todo.completed === false).length
