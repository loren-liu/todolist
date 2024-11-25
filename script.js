let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const dateInput = document.getElementById('dateInput');
    
    if (todoInput.value && dateInput.value) {
        todos.push({
            text: todoInput.value,
            date: dateInput.value
        });
        todoInput.value = '';
        dateInput.value = '';
        renderTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function filterTodos(period) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    renderTodos(period);
}

function renderTodos(period = 'all') {
    const todoList = document.getElementById('todoList');
    const todoCount = document.getElementById('todoCount');
    let filteredTodos = [...todos];
    
    if (period !== 'all') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);  // 设置为今天开始时间
        
        filteredTodos = todos.filter(todo => {
            const todoDate = new Date(todo.date);
            todoDate.setHours(0, 0, 0, 0);  // 设置为当天开始时间
            
            switch (period) {
                case 'month': {
                    // 获取本月起始和结束时间
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    return todoDate >= startOfMonth && todoDate <= endOfMonth;
                }
                case 'halfYear': {
                    // 获取半年内的时间范围
                    const startDate = today;
                    const endDate = new Date(today);
                    endDate.setMonth(today.getMonth() + 6);
                    return todoDate >= startDate && todoDate <= endDate;
                }
                case 'year': {
                    // 获取本年的起始和结束时间
                    const startOfYear = new Date(today.getFullYear(), 0, 1);
                    const endOfYear = new Date(today.getFullYear(), 11, 31);
                    return todoDate >= startOfYear && todoDate <= endOfYear;
                }
                default:
                    return true;
            }
        });
    }

    // 按日期排序
    filteredTodos.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 渲染待办事项列表
    todoList.innerHTML = filteredTodos.map((todo, index) => `
        <div class="todo-item">
            <div>
                <span>${todo.text}</span>
                <span style="color: #666; margin-left: 10px;">${todo.date}</span>
            </div>
            <button class="delete-btn" onclick="deleteTodo(${index})">删除</button>
        </div>
    `).join('');

    todoCount.textContent = `待办数量: ${filteredTodos.length}`;
}

// 添加一个用于测试的函数
function addTestTodos() {
    const testTodos = [
        { text: "本月待办", date: "2024-03-15" },
        { text: "半年内待办", date: "2024-06-20" },
        { text: "今年待办", date: "2024-12-25" },
        { text: "明年待办", date: "2025-01-01" }
    ];
    
    todos.push(...testTodos);
    renderTodos('all');
}
