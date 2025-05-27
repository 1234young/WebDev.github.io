document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    loadTodos();

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    todoList.addEventListener('click', handleListClick);

    function addTodo() {
        const todoText = todoInput.value.trim();

        if (todoText === '') {
            alert('Please enter a todo item.');
            return;
        }

        const todoItem = createTodoElement(todoText);
        todoList.appendChild(todoItem);
        saveTodos();
        todoInput.value = ''; // Clear input after adding
    }

    function createTodoElement(text, completed = false) {
        const li = document.createElement('li');
        if (completed) {
            li.classList.add('completed');
        }

        const todoTextSpan = document.createElement('span');
        todoTextSpan.classList.add('todo-text');
        todoTextSpan.textContent = text;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-button');
        completeButton.textContent = 'Complete';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(deleteButton);

        li.appendChild(todoTextSpan);
        li.appendChild(actionsDiv);

        return li;
    }

    function handleListClick(e) {
        const target = e.target;
        const li = target.closest('li');

        if (!li) return; // Click wasn't on a list item

        if (target.classList.contains('complete-button')) {
            li.classList.toggle('completed');
            saveTodos();
        } else if (target.classList.contains('delete-button')) {
            li.remove();
            saveTodos();
        }
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.querySelector('.todo-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.forEach(todo => {
            const todoItem = createTodoElement(todo.text, todo.completed);
            todoList.appendChild(todoItem);
        });
    }
});
