const input = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');
const clearButton = document.getElementById('apaga-tudo');
const clearDonedTasks = document.getElementById('remover-finalizados');
const audio = document.getElementById('task-doned');
// const concluidas = document.getElementById('concluidas');

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
  const lis = document.querySelectorAll('#lista-tarefas li');
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
      saveTasks();
    } else {
      task.parentElement.classList.remove('completed');
      saveTasks();
    }
  }
});

// Recupera Tasks do LocalStorage
const loadingTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach((task) => {
    const taskElement = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    checkbox.className = 'task';
    checkbox.type = 'checkbox';
    label.innerText = task.text;
    taskElement.appendChild(checkbox);
    taskElement.appendChild(label);

    list.appendChild(taskElement);
  });
};

// Restaura checkbox marcadas e desmarcadas
const checkFromStorage = () => {
  loadingTasks();
  if (localStorage.getItem('tasks')) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
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

window.onload = () => {
  checkFromStorage();
};
