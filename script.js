//MODEL

let projects = [
  {
    title: 'Chores',
    id: 1,
    projectTodos: []
  },
  {
    title: 'Important',
    id: 2,
    projectTodos: []
  },
  {
    title: 'Today',
    id: 3,
    projectTodos: []
  },
];

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

function editTodo(projectID, todoID, updatedText) {
  projects.forEach(project => {
    if(project.id == projectID) {
      project.projectTodos = project.projectTodos.map(todo => {
        if(todo.id == todoID) {
          return todo = {
            title: updatedText,
            dueDate: todo.dueDate,
            id: todo.id
          };
        }
      })
    }
  }) 
}

//VIEW

function displayProjects() {
  const projectList = document.querySelector('#project-list');
  projectList.textContent = '';
  projects.forEach(project => {
    let element = document.createElement('div');
    element.innerText = project.title;
    element.id = project.id;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Project';
    deleteButton.onclick = () => {
      removeProject(element.id);
      displayProjects();
    };
    element.appendChild(deleteButton);
    element.addEventListener('click', getProject)

    projectList.appendChild(element);
  })
}

displayProjects()

function displayTodos(projectID) {
  const todoList = document.querySelector('#todo-list');
  todoList.textContent = '';
  projects.forEach(project => {
    if(project.id == projectID) {
      project.projectTodos.forEach(todo => {
        let element = document.createElement('div');
        element.innerText = todo.title;
        element.id = todo.id;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Todo';
        deleteButton.onclick = () => {
          removeTodoFromProject(currentProjectID, element.id);
          displayTodos(currentProjectID);
        }
        element.appendChild(deleteButton);

        todoList.appendChild(element);
      })
    }
  })
}

//CONTROLLER

let currentProjectID;

function addTodo() {
  const todo = document.querySelector('#todo-title');
  const title = todo.value;

  const date = document.querySelector('#date');
  const dueDate = date.value;

  if(title == '') {
    alert('Add title');
  } else {
    addTodoToProject(currentProjectID, title, dueDate);
    displayTodos(currentProjectID);
  }
}

function addProjectButton() {
  const project = document.querySelector('#project-title');
  const projectTitle = project.value;

  if(projectTitle == '') {
    alert('Add Project Title');
  } else {
    addProject(projectTitle);
    displayProjects();
  }
}

function getProject() {
  currentProjectID = this.id;
  displayTodos(currentProjectID);
}

function editButton() {
  this.contentEditable = true;

}




