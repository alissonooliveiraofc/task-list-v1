const input = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');

// Adiciona tarefa na lista
button.addEventListener('click', () => {
  const task = document.createElement('li');
  task.innerText = input.value;
  list.appendChild(task);
  input.value = '';
});

// Adiciona cor cinza ao clicar na tarefa
list.addEventListener('click', (event) => {
  const selected = document.querySelector('.selected');
  if (selected !== null) {
    selected.classList.remove('selected');
  }
  event.target.classList.add('selected');
});

// Adiciona riscado ao clicar duas vezes na tarefa
list.addEventListener('dblclick', (event) => {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
});
