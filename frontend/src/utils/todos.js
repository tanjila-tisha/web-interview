// Check if all todos are completed in the todo list
export const isTodoListCompleted = (todos) => !todos.filter((todo) => todo.completed === false).length

// Calculate the remaning days left for the todo
export const calculateRemaningDays = (dueDate) => {
    const currentDate = new Date().getTime()
    const dateDiff = new Date(dueDate).getTime() - currentDate
    let remaningDays = Math.abs(dateDiff) / (1000 * 3600 * 24)
    
    if(dateDiff < 0){
        remaningDays = -remaningDays;
    }
   
    return Math.ceil(remaningDays)
  }
