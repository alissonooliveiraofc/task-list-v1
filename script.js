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
