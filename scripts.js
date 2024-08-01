document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('task-title');
    const detailInput = document.getElementById('task-detail');
    const dateInput = document.getElementById('task-date');
    const levelInput = document.getElementById('task-level');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    addTaskButton.addEventListener('click', addTask);
    darkModeToggle.addEventListener('change', toggleDarkMode);

    function addTask() {
        const title = titleInput.value.trim();
        const detail = detailInput.value.trim();
        const date = dateInput.value;
        const level = levelInput.value;

        if (title && detail && date && level) {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span><strong>Title:</strong> ${title}</span>
                <span><strong>Task:</strong> ${detail}</span>
                <span><strong>Date:</strong> ${date}</span>
                <span><strong>Level:</strong> ${level}</span>
                <div class="task-buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
            saveTasks();
            clearInputs();
        }
    }

    function clearInputs() {
        titleInput.value = '';
        detailInput.value = '';
        dateInput.value = '';
        levelInput.value = 'Low';
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            removeTask(e.target);
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target);
        }
    });

    function editTask(button) {
        const taskItem = button.parentElement.parentElement;
        const title = taskItem.querySelector('span:nth-child(1)').textContent.replace('Title: ', '');
        const detail = taskItem.querySelector('span:nth-child(2)').textContent.replace('Task: ', '');
        const date = taskItem.querySelector('span:nth-child(3)').textContent.replace('Date: ', '');
        const level = taskItem.querySelector('span:nth-child(4)').textContent.replace('Level: ', '');

        const newTitle = prompt('Edit Title', title);
        const newDetail = prompt('Edit Task', detail);
        const newDate = prompt('Edit Date', date);
        const newLevel = prompt('Edit Level', level);

        if (newTitle && newDetail && newDate && newLevel) {
            taskItem.querySelector('span:nth-child(1)').textContent = `Title: ${newTitle}`;
            taskItem.querySelector('span:nth-child(2)').textContent = `Task: ${newDetail}`;
            taskItem.querySelector('span:nth-child(3)').textContent = `Date: ${newDate}`;
            taskItem.querySelector('span:nth-child(4)').textContent = `Level: ${newLevel}`;
            saveTasks();
        }
    }

    function removeTask(button) {
        const taskItem = button.parentElement.parentElement;
        taskItem.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const title = taskItem.querySelector('span:nth-child(1)').textContent.replace('Title: ', '');
            const detail = taskItem.querySelector('span:nth-child(2)').textContent.replace('Task: ', '');
            const date = taskItem.querySelector('span:nth-child(3)').textContent.replace('Date: ', '');
            const level = taskItem.querySelector('span:nth-child(4)').textContent.replace('Level: ', '');
            tasks.push({ title, detail, date, level });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(({ title, detail, date, level }) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span><strong>Title:</strong> ${title}</span>
                <span><strong>Task:</strong> ${detail}</span>
                <span><strong>Date:</strong> ${date}</span>
                <span><strong>Level:</strong> ${level}</span>
                <div class="task-buttons">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    function initializeDarkMode() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark-mode', darkMode);
        darkModeToggle.checked = darkMode;
    }

    loadTasks();
    initializeDarkMode();
});
