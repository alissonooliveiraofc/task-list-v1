const input = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');
const clearButton = document.getElementById('apaga-tudo');
const clearDonedTasks = document.getElementById('remover-finalizados');
// const audio = document.getElementById('task-doned');
const completadas = document.getElementById('concluidas');
const addTaskButton = document.querySelector('#adiciona-task');
const ulListas = document.querySelector('#menu-ul');

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
      // removi o som mas ative se quiser
      // audio.play();
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

// Botão adicionar nova lista
addTaskButton.addEventListener('click', () => {
  const inputTask = prompt('Digite o nome da Lista');
  const li = document.createElement('div');
  const div = document.createElement('div');
  const changeNameButton = document.createElement('button');
  const removeButton = document.createElement('button');
  const p = document.createElement('p');

  removeButton.innerText = 'Apagar';
  changeNameButton.innerText = 'Editar';
  p.innerText = inputTask;

  div.appendChild(changeNameButton);
  div.appendChild(removeButton);

  li.className = 'menu-tasks';
  changeNameButton.className = 'button-tasks';
  removeButton.classList.add('button-tasks');
  removeButton.classList.add('remove-button');
  div.className = 'div-tasks';

  li.style.cursor = 'pointer';
  li.appendChild(p);
  li.appendChild(div);
  ulListas.appendChild(li);
});

// Adiciona Listas ao LocalStorage
const saveLists = () => {
  const lists = document.querySelectorAll('.menu-tasks');
  const listsArray = [];

  lists.forEach((lista) => {
    const obj = {
      text: lista.firstElementChild.innerText,
    };

    listsArray.push(obj);
  });

  localStorage.setItem('lists', JSON.stringify(listsArray));
};

addTaskButton.addEventListener('click', saveLists);

const lists = JSON.parse(localStorage.getItem('lists'));
const loadingLists = () => {
  if (localStorage.getItem('lists')) {
    lists.forEach((lista) => {
      const li = document.createElement('div');
      const div = document.createElement('div');
      const changeNameButton = document.createElement('button');
      const removeButton = document.createElement('button');
      const p = document.createElement('p');

      removeButton.innerText = 'Apagar';
      changeNameButton.innerText = 'Editar';
      p.innerText = lista.text;

      div.appendChild(changeNameButton);
      div.appendChild(removeButton);

      li.className = 'menu-tasks';
      changeNameButton.className = 'button-tasks';
      removeButton.className = 'button-tasks';
      removeButton.classList.add('remove-button');
      div.className = 'div-tasks';

      li.style.cursor = 'pointer';
      li.appendChild(p);
      li.appendChild(div);
      ulListas.appendChild(li);
    });
  }
};

loadingLists();

// const deleteList = (event) => {
//   const lista = event.target.parentElement.parentElement;
//   lista.remove();
//   saveLists();
// };

// deleteList();

window.onload = () => {
  checkFromStorage();
};
