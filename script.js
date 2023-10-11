//MODEL

let projects;

const savedTodos = JSON.parse(localStorage.getItem('projects'));
if (Array.isArray(savedTodos)) {
  projects = savedTodos;
} else {
  projects = [
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
}

function addProject(title) {
  projects.push({
    title: title,
    id: new Date().getTime(),
    projectTodos: []
  })

  saveTodos()
}

function removeProject(id) {
  projects = projects.filter(project => {
    if(project.id == id) {
      return false;
    } else {
      return true;
    }
  })

  saveTodos()
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

  saveTodos()
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

  saveTodos()
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
          }
        } else {
          return todo = {
            title: todo.title,
            dueDate: todo.dueDate,
            id: todo.id
          }
        }
      })
    }
  })
  
  saveTodos()
}

const saveTodos = () => {
  localStorage.setItem('projects', JSON.stringify(projects));
}


//VIEW

function displayProjects() {
  const projectList = document.querySelector('#project-list');
  projectList.textContent = '';
  projects.forEach(project => {
    let element = document.createElement('div');
    element.innerText = project.title;;
    element.id = project.id;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
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
        element.innerText = todo.title + ' ' + todo.dueDate;
        element.id = todo.id;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
          removeTodoFromProject(currentProjectID, element.id);
          displayTodos(currentProjectID);
        }

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
          editButtons(currentProjectID, element.id)
        })
        element.appendChild(editButton);
        element.appendChild(deleteButton);

        todoList.appendChild(element);
      })
    }
  })
}

//CONTROLLER

let currentProjectID;
let currentProjectTitle;

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
  document.querySelector('#todo-list-title').textContent = event.target.innerText;
  displayTodos(currentProjectID);
}

function editButtons(projectID, todoID) {
  let updatedText = prompt('Change Todo');
  if(updatedText == '') return;

  editTodo(projectID, todoID, updatedText)

  displayTodos(currentProjectID);
}




