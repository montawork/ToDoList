const input = document.querySelector('.add-task input'),
  addBtn = document.querySelector('.add-task .plus'),
  tasksContainer = document.querySelector('.tasks-content');

let tasksCount = document.querySelector('.tasks-count span'),
  tasksCompleted = document.querySelector('.tasks-completed span');

// focus in input
window.addEventListener('load', () => input.focus());

// add task
addBtn.addEventListener('click', () => {
  if (input.value == '') {
    swal({
      title: 'Try Again',
      text: 'You need to add valid task!',
      icon: 'error',
      button: 'ok',
    });
  } else {
    let noTasksMsg = document.querySelector('.no-tasks-message');
    if (noTasksMsg) {
      noTasksMsg.remove();
    }
    // swal('Good job!', 'You task added with success!', 'success');

    // local storage
    //saveInLocalStorage(input.value);

    let span = document.createElement('span');
    let deleteBtn = document.createElement('span');
    let text = document.createTextNode(input.value);
    let deletText = document.createTextNode('Delete');

    span.appendChild(text);
    span.className = 'task-box';

    deleteBtn.appendChild(deletText);
    deleteBtn.className = 'delete';

    span.appendChild(deleteBtn);

    // console.log(span.firstChild.textContent);

    tasksContainer.appendChild(span);

    let allTasksArr = Array.from(tasksContainer.children);
    let checkArr = [];

    allTasksArr.forEach((task) => {
      checkArr.push(task.firstChild.textContent);
    });

    if (checkArr.length != new Set(checkArr).size) {
      swal({
        title: 'Add New',
        text: 'You are already add this task!!',
        icon: 'error',
        button: 'done',
      });
      span.remove();
    }

    input.value = '';
    input.focus();

    clacTasks();

    // clear All tasks && check all tasks
    const clearAllBtn = document.querySelector('.clear-all');
    const checkAllBtn = document.querySelector('.check-all');
    const allTasksElement = Array.from(document.querySelectorAll('.task-box'));

    clearAllBtn.addEventListener('click', () => {
      allTasksElement.forEach((child) => child.remove());
    });
    checkAllBtn.addEventListener('click', () => {
      allTasksElement.forEach((child) => child.classList.add('finiched'));
    });
  }
});

document.addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    e.target.parentElement.remove();

    if (tasksContainer.childElementCount == 0) {
      addNoTasksMsg();
    }
  }

  if (e.target.classList.contains('task-box')) {
    e.target.classList.toggle('finiched');
  }
  clacTasks();
});

// create no tasks message
function addNoTasksMsg() {
  const msgSpan = document.createElement('span');
  const msg = document.createTextNode('No Tasks Yet !!');

  msgSpan.appendChild(msg);
  msgSpan.className = 'no-tasks-message';

  tasksContainer.appendChild(msgSpan);
}

// calculate tasks
function clacTasks() {
  // all tasks
  tasksCount.textContent = document.querySelectorAll('.task-box').length;
  // finished tasks
  tasksCompleted.textContent = document.querySelectorAll(
    '.task-box.finiched'
  ).length;
}

function saveInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}
