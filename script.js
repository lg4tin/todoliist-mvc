//MODEL

let projects = [
  {
    title: 'Chores',
    id: new Date().getTime(),
    projectTodos: [
      {
        title: 'Get groceries',
        date: '10-29-2023',
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


