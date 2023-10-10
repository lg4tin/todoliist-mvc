//MODEL

let projects = [
  {
    title: 'Chores',
    id: new Date().getTime(),
    projectTodos: [
      {
        title: 'Get groceries',
        dueDate: '10-29-2023',
        id: 1
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

//VIEW

function displayProjects() {
  const projectList = document.querySelector('#project-list');
  projectList.textContent = '';
  projects.forEach(project => {
    let element = document.createElement('div');
    element.innerText = project.title;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Project';
    //deleteButton.onclick = deleteProject;
    element.appendChild(deleteButton);

    projectList.appendChild(element);
  })
}

displayProjects()

function displayTodos(projectID) {
  const todoList = document.querySelector('#todo-list');
  projects.forEach(project => {
    if(project.id == projectID) {
      project.projectTodos.forEach(todo => {
        let element = document.createElement('div');
        element.innerText = todo.title;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Todo';
        //deleteButton.onclick = deleteTodo;
        element.appendChild(deleteButton);

        todoList.appendChild(element);
      })
    }
  })
}



