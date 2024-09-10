const input = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');
const clearButton = document.getElementById('apaga-tudo');
const clearDonedTasks = document.getElementById('remover-finalizados');
const audio = document.getElementById('task-doned');
const completadas = document.getElementById('concluidas');
const h1 = document.querySelector('#colocar-h1');
const sidebar = document.querySelector('.sidebar');
const menu = document.querySelector('#menu-icon');
const addTaskButton = document.querySelector('add-task');

// Adiciona tarefa na lista
button.addEventListener('click', () => {
  const task = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');

  checkbox.className = 'task';
  checkbox.type = 'checkbox';
  label.innerText = input.value;
  task.appendChild(checkbox);
  task.appendChild(label);

  list.appendChild(task);
  input.value = '';
});

// Adiciona Tasks ao LocalStorage
const saveTasks = () => {
  const tasks = document.querySelectorAll('li');
  const tasksArray = [];

  tasks.forEach((task) => {
    const obj = {
      text: task.firstElementChild.nextElementSibling.innerText,
      completed: task.classList.contains('completed'),
    };

    tasksArray.push(obj);
  });

  localStorage.setItem('tasks', JSON.stringify(tasksArray));
};

button.addEventListener('click', saveTasks);

// Remove tarefas finalizadas
clearDonedTasks.addEventListener('click', () => {
  const completedTasks = document.querySelectorAll('.completed');
  completedTasks.forEach((task) => {
    task.remove();
    saveTasks();
  });
});

// Remove todas as tarefas
clearButton.addEventListener('click', () => {
  const lis = document.querySelectorAll('li');
  for (let index = 0; index < lis.length; index += 1) {
    lis[index].remove();
  }

  saveTasks();
});

// Adiciona riscado ao marcar checkbox
list.addEventListener('click', (event) => {
  const task = event.target;
  if (task.className === 'task') {
    if (task.checked) {
      task.parentElement.classList.add('completed');
      audio.play();
      const newTask = task.parentElement;
      completadas.appendChild(newTask);
      saveTasks();
    } else if (!task.checked) {
      task.parentElement.classList.remove('completed');
      saveTasks();
    }
  }
});

// Remove tarefa desmarcada de completadas
completadas.addEventListener('click', (event) => {
  const task = event.target;
  if (task.className === 'task') {
    if (!task.checked) {
      task.parentElement.classList.remove('completed');
      list.appendChild(task.parentElement);
      saveTasks();
    } else if (task.checked) {
      task.parentElement.classList.add('completed');
      saveTasks();
    }
  }
});

const tasks = JSON.parse(localStorage.getItem('tasks'));
// Recupera Tasks do LocalStorage
const loadingTasks = () => {
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    checkbox.className = 'task';
    checkbox.type = 'checkbox';
    label.innerText = task.text;
    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);
    if (task.completed === true) {
      completadas.appendChild(taskElement);
      completadas.lastElementChild.classList.add('completed');
      saveTasks();
    } else {
      list.appendChild(taskElement);
      saveTasks();
    }
  });
};

// Restaura checkbox marcadas e desmarcadas
const checkFromStorage = () => {
  loadingTasks();
  if (localStorage.getItem('tasks')) {
    // const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task, index) => {
      const taskElement = document.querySelectorAll('li')[index];
      if (task.completed === true) {
        taskElement.classList.add('completed');
        taskElement.firstElementChild.checked = true;
      }
    });
  }
};

// Adiciona tarefa ao pressionar Enter
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    button.click();
  }
});

let buttonAddTask = null;

// Menu lateral
menu.addEventListener('click', () => {
  if (!sidebar.classList.contains('show')) {
    sidebar.classList.add('show');
    if (!buttonAddTask) {
      buttonAddTask = document.createElement('button');
      sidebar.lastElementChild.appendChild(buttonAddTask);
      buttonAddTask.innerText = '+ Nova Lista de Tarefas';
      buttonAddTask.className = 'add-task';
    }
    h1.innerHTML = 'Task List';
    h1.classList.add('show');
    sidebar.style.width = '280px';
    sidebar.style.backgroundColor = '#e0e0e0';
    sidebar.style.boxShadow = '2px 0 5px rgba(0,0,0,0.1)';
    sidebar.style.height = '100%';
    sidebar.style.transition = '0.3s';
    sidebar.style.backgroundImage =
      'linear-gradient(to right, #516c6e 0%, #172749  51%, #000000  100%)';
    sidebar.style.opacity = '0.7';
  } else {
    sidebar.classList.remove('show');
    h1.classList.remove('show');
    sidebar.style.width = '';
    sidebar.style.backgroundColor = '';
    sidebar.style.boxShadow = '';
    sidebar.style.height = '';
    sidebar.style.transition = '';
    sidebar.style.backgroundImage = '';
    h1.innerHTML = '';
    if (buttonAddTask) {
      buttonAddTask.remove();
      buttonAddTask = null;
    }
  }
});

window.onload = () => {
  checkFromStorage();
};
