document.addEventListener('DOMContentLoaded', () => {
    const newListButton = document.querySelector('.newList');
    const listNameInput = document.querySelector('.listName');
    const listContainer = document.querySelector('.listContainer');
    const toDoList = document.querySelector('.toDoList');
    const tasksContainer = document.querySelector('.tasks');
    const addTaskButton = document.querySelector('.addTask');
    const taskNameInput = document.querySelector('.taskName');

    let lists = {};
    let currentList = null;

    newListButton.addEventListener('click', () => {
        const listName = listNameInput.value.trim();
        if (listName && !lists[listName]) {
            createNewList(listName);
            listNameInput.value = '';
        } else {
            alert('Please enter a unique list name');
        }
    });

    addTaskButton.addEventListener('click', () => {
        const taskName = taskNameInput.value.trim();
        if (taskName && currentList) {
            createNewTask(taskName);
            taskNameInput.value = '';
        } else {
            alert('Please enter a task name and select a list');
        }
    });

    function createNewList(name) {
        lists[name] = [];

        const listItem = document.createElement('div');
        listItem.classList.add('listItem');
        listItem.textContent = name;

        listItem.addEventListener('click', () => {
            selectList(name);
        });

        listContainer.appendChild(listItem);
    }

    function selectList(name) {
        currentList = name;
        toDoList.querySelector('h3').textContent = name;
        renderTasks();
    }

    function renderTasks() {
        tasksContainer.innerHTML = '';
        if (currentList) {
            lists[currentList].forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task');

                const taskCheckbox = document.createElement('input');
                taskCheckbox.type = 'checkbox';
                taskCheckbox.checked = task.completed;
                taskCheckbox.addEventListener('change', () => {
                    task.completed = taskCheckbox.checked;
                });

                const taskLabel = document.createElement('label');
                taskLabel.textContent = task.name;

                taskItem.appendChild(taskCheckbox);
                taskItem.appendChild(taskLabel);
                tasksContainer.appendChild(taskItem);
            });
        }
    }

    function createNewTask(name) {
        const task = { name: name, completed: false };
        lists[currentList].push(task);
        renderTasks();
    }
});
