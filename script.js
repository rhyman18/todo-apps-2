/** @return {array} load data from storage */
function loadData() {
  if (!localStorage.getItem('todoList')) {
    const todoListDefault = ['Belajar Javascript', 'Belajar HTML'];
    localStorage.setItem('todoList', JSON.stringify(todoListDefault));
  }

  return JSON.parse(localStorage.getItem('todoList'));
}

/** save data to storage */
function saveData() {
  localStorage.removeItem('todoList');
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

/** array todo list */
const todoList = loadData();

/** add todo list */
function tambahTodo() {
  if (todoList.indexOf(inputTodo.value) === -1) {
    todoList.push(inputTodo.value);

    saveData();

    inputTodo.value = '';
    btnTambah.classList = '';
  } else {
    window.alert('Todo List sudah terdaftar.');
  }

  showToDocument();
}

/** @param {number} index edit todo list */
// eslint-disable-next-line no-unused-vars
function ubahTodo(index) {
  if (inputTodo.value !== todoList[index]) {
    todoList[index] = inputTodo.value;

    saveData();

    resetEditBtn();
  } else {
    window.alert('Todo List sudah terdaftar.');
  }

  showToDocument();
}

/** @param {number} index delete todo list */
function hapusTodo(index) {
  if (index > todoList.length) {
    alert('Todo tersebut tidak ada.');
    console.log('✘ Todo gagal dihapus.');
  } else {
    todoList.splice(index, 1);
    saveData();
    console.log('✔ Todo berhasil dihapus.');
  }

  showToDocument();
}

function resetEditBtn() {
  inputTodo.value = '';

  btnCancel.classList = 'hide active';
  btnEdit.classList = 'hide active';
  btnTambah.classList = '';
}

// ambil element
const listUl = document.getElementById('list');
const btnTambah = document.getElementById('add');
const btnEdit = document.getElementById('edit');
const btnCancel = document.getElementById('cancel');
const inputTodo = document.getElementById('todo');

// event input todo list
inputTodo.addEventListener('input', function() {
  const btnAdd = document.getElementById('add');

  if (!inputTodo.value) {
    btnAdd.classList = '';
  } else if (btnEdit.className == 'active') {
    btnAdd.classList = 'hide';
  } else {
    btnAdd.classList = 'active';
  }
});

// tampilkan ke html
function showToDocument() {
  // clear todo list before first
  while (listUl.hasChildNodes()) {
    listUl.removeChild(listUl.firstChild);
  }

  todoList.forEach((todo) => {
    const createList = document.createElement('li');
    createList.innerText = todo;

    const createBtn = document.createElement('span');
    createBtn.classList = 'icon';

    const createBtnEdit = document.createElement('span');
    createBtnEdit.classList = 'icon-item edit';
    createBtnEdit.innerHTML = `<i class="fas fa-pen" aria-hidden="true"></i>`;
    createBtnEdit.addEventListener('click', function() {
      inputTodo.value = todo;

      btnTambah.classList = 'hide active';
      btnCancel.classList = 'active';
      btnEdit.classList = 'active';
      btnEdit.setAttribute('onclick', `ubahTodo(${todoList.indexOf(todo)})`);
    });

    const createBtnDelete = document.createElement('span');
    createBtnDelete.classList = 'icon-item delete';
    createBtnDelete.innerHTML = `<i class="fas fa-trash" aria-hidden="true"></i>`;
    createBtnDelete.addEventListener('click', function() {
      const result = confirm('Are you sure you want to delete?');

      if (result) {
        return hapusTodo(todoList.indexOf(todo));
      }
    });

    createList.appendChild(createBtn);
    createBtn.appendChild(createBtnEdit);
    createBtn.appendChild(createBtnDelete);
    listUl.appendChild(createList);
  });
}

btnTambah.addEventListener('click', tambahTodo);

btnCancel.addEventListener('click', resetEditBtn);

showToDocument();
