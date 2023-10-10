//MODEL

let projects = [
  {
    title: 'Chores',
    id: new Date().getTime(),
    projectTodos: [
      {
        title: 'Get groceries',
        dueDate: '10-29-2023',
        id: new Date().getTime()
      }
    ]
  }
]

function addProject(title) {
  projects.push({
    title: title,
    id: new Date().getTime(),
    projectTodos: []
  })
}

function removeProject(id) {
  projects = projects.filter(project => {
    if(project.id == id) {
      return false;
    } else {
      return true;
    }
  })
}

function addTodoToProject(projectID, title, dueDate) {
  projects.forEach(project => {
    if(project.id == projectID) {
      project.projectTodos.push({
        title: title,
        dueDate: dueDate,
        id: new Date().getTime()
      })
    }
  })
}

function removeTodoFromProject(projectID, todoID) {
  projects.forEach(project => {
    if(project.id == projectID) {
      project.projectTodos = project.projectTodos.filter(todo => {
        if(todo.id == todoID) {
          return false;
        } else {
          return true;
        }
      })
    }
  })
}

addProject('poop');



