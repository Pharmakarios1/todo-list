let todos = [];

// CREATE Todo
function addTodo() {
  const todoInput = document.getElementById("todoInput");
  if (todoInput.value.trim() === "") return;

  const newTodo = {
    id: Date.now(),
    text: todoInput.value.trim(),
    status: "pending",
    subtasks: [],
    tags: [],
    categories: [],
    isEditing: false,
  };

  todos.push(newTodo);
  renderTodos();
  todoInput.value = "";
}

// TOGGLE edit mode for Todo
function toggleEditTodo(todoId) {
  const todo = todos.find((t) => t.id === todoId);
  todo.isEditing = !todo.isEditing;
  renderTodos();
}

// SAVE updated Todo
function saveTodo(todoId) {
  const todoInput = document.getElementById(`editTodo-${todoId}`);
  const todo = todos.find((t) => t.id === todoId);
  if (todoInput.value.trim() !== "") {
    todo.text = todoInput.value.trim();
  }
  todo.isEditing = false;
  renderTodos();
}

// DELETE Todo
function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  renderTodos();
}

// ADD Tag (only show input when clicked)
function showTagInput(todoId) {
  const tagInputDiv = document.getElementById(`tagInputDiv-${todoId}`);
  tagInputDiv.style.display =
    tagInputDiv.style.display === "none" ? "block" : "none";
}

// SAVE Tag
function addTag(todoId) {
  const tagInput = document.getElementById(`tagInput-${todoId}`);
  const tagText = tagInput.value.trim();
  if (tagText && !todos.find((t) => t.id === todoId).tags.includes(tagText)) {
    const todo = todos.find((t) => t.id === todoId);
    todo.tags.push(tagText);
    tagInput.value = ""; // Clear input field
    renderTodos();
  }
}

// DELETE Tag
function deleteTag(todoId, tag) {
  const todo = todos.find((t) => t.id === todoId);
  todo.tags = todo.tags.filter((t) => t !== tag);
  renderTodos();
}

// ADD Category (only show input when clicked)
function showCategoryInput(todoId) {
  const categoryInputDiv = document.getElementById(
    `categoryInputDiv-${todoId}`
  );
  categoryInputDiv.style.display =
    categoryInputDiv.style.display === "none" ? "block" : "none";
}

// SAVE Category
function addCategory(todoId) {
  const categoryInput = document.getElementById(`categoryInput-${todoId}`);
  const categoryText = categoryInput.value.trim();
  if (
    categoryText &&
    !todos.find((t) => t.id === todoId).categories.includes(categoryText)
  ) {
    const todo = todos.find((t) => t.id === todoId);
    todo.categories.push(categoryText);
    categoryInput.value = ""; // Clear input field
    renderTodos();
  }
}

// DELETE Category
function deleteCategory(todoId, category) {
  const todo = todos.find((t) => t.id === todoId);
  todo.categories = todo.categories.filter((c) => c !== category);
  renderTodos();
}

// TOGGLE subtask input visibility
function toggleSubtaskInput(todoId) {
  const div = document.getElementById(`subtaskInputDiv-${todoId}`);
  div.style.display = div.style.display === "none" ? "block" : "none";
}

// CREATE subtask
function addSubtask(todoId) {
  const subtaskInput = document.getElementById(`subtaskInput-${todoId}`);
  if (subtaskInput.value.trim() === "") return;

  const todo = todos.find((t) => t.id === todoId);
  todo.subtasks.push({
    id: Date.now(),
    text: subtaskInput.value.trim(),
    status: "pending",
    isEditing: false,
  });

  subtaskInput.value = "";
  renderTodos();
}

// TOGGLE edit mode for subtask
function toggleEditSubtask(todoId, subtaskId) {
  const todo = todos.find((t) => t.id === todoId);
  const subtask = todo.subtasks.find((s) => s.id === subtaskId);
  subtask.isEditing = !subtask.isEditing;
  renderTodos();
}

// SAVE updated subtask
function saveSubtask(todoId, subtaskId) {
  const input = document.getElementById(`editSubtask-${subtaskId}`);
  const todo = todos.find((t) => t.id === todoId);
  const subtask = todo.subtasks.find((s) => s.id === subtaskId);

  if (input.value.trim() !== "") {
    subtask.text = input.value.trim();
  }
  subtask.isEditing = false;
  renderTodos();
}

// DELETE subtask
function deleteSubtask(todoId, subtaskId) {
  const todo = todos.find((t) => t.id === todoId);
  todo.subtasks = todo.subtasks.filter((s) => s.id !== subtaskId);
  renderTodos();
}

// CHANGE status for Todos/Subtasks
function changeStatus(item) {
  if (item.status === "pending") item.status = "progress";
  else if (item.status === "progress") item.status = "done";
  else item.status = "pending";
  renderTodos();
}

// RENDER Todos and Subtasks with status classes
function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");

    const todoStatusClass =
      todo.status === "pending"
        ? "pending"
        : todo.status === "progress"
        ? "progress"
        : "done";

    if (todo.isEditing) {
      todoItem.innerHTML = `
        <input type="text" id="editTodo-${todo.id}" value="${todo.text}">
        <button onclick="saveTodo(${todo.id})">Save</button>
        <button onclick="toggleEditTodo(${todo.id})">Cancel</button>
      `;
    } else if (todo.addSubtask) {
      todoItem.innerHTML = `
        <input type="text" id="editTodo-${todo.id}" value="${todo.text}">
        <button onclick="saveTodo(${todo.id})">Save</button>
        <button onclick="toggleEditTodo(${todo.id})">Cancel</button>
      `;
    } else {
      todoItem.innerHTML = `
          <div class="todo-list-display">
           <div class="todo-list-status">
              <span>${todo.text}</span>
              <em class="${todoStatusClass}">${todo.status}</em>
              </div>
         <div class="operation-btn">
        <button onclick="changeStatus(todos.find(t => t.id === ${
          todo.id
        }))">Change Status</button>
        <button onclick="toggleEditTodo(${todo.id})">Update</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
        <button onclick="toggleSubtaskInput(${todo.id})">Add Subtask</button>
       
        <div id="subtaskInputDiv-${todo.id}" style="display: none;">
          <input type="text" id="subtaskInput-${
            todo.id
          }" placeholder="Add a subtask">
          <button onclick="addSubtask(${todo.id})">Add</button>
        </div>
        <div>
          <button onclick="showTagInput(${todo.id})">Add Tag</button>
          <div id="tagInputDiv-${todo.id}" style="display: none;">
            <input type="text" id="tagInput-${todo.id}" placeholder="Add a tag">
            <button onclick="addTag(${todo.id})">Save Tag</button>
          </div>
          <ul id="tags-${todo.id}">
            ${todo.tags
              .map(
                (tag) =>
                  `<li>${tag} <button onclick="deleteTag(${todo.id}, '${tag}')">Delete</button></li>`
              )
              .join("")}
          </ul>
        </div>
        <div>
          <button onclick="showCategoryInput(${todo.id})">Add Category</button>
          <div id="categoryInputDiv-${todo.id}" style="display: none;">
            <input type="text" id="categoryInput-${
              todo.id
            }" placeholder="Add a category">
            <button onclick="addCategory(${todo.id})">Save Category</button>
          </div>
          <ul id="categories-${todo.id}">
            ${todo.categories
              .map(
                (category) =>
                  `<li>${category} <button onclick="deleteCategory(${todo.id}, '${category}')">Delete</button></li>`
              )
              .join("")}
          </ul>
           </div>
        </div>
      `;
    }

    if (todo.subtasks.length > 0) {
      const subtaskList = document.createElement("ul");
      subtaskList.classList.add("subtask-list");

      todo.subtasks.forEach((subtask) => {
        const subtaskItem = document.createElement("li");
        subtaskItem.classList.add("subtask");

        const subtaskStatusClass =
          subtask.status === "pending"
            ? "pending"
            : subtask.status === "progress"
            ? "progress"
            : "done";

        if (subtask.isEditing) {
          subtaskItem.innerHTML = `
            <input type="text" id="editSubtask-${subtask.id}" value="${subtask.text}">
            <button onclick="saveSubtask(${todo.id}, ${subtask.id})">Save</button>
            <button onclick="toggleEditSubtask(${todo.id}, ${subtask.id})">Cancel</button>
          `;
        } else {
          subtaskItem.innerHTML = `
            ${subtask.text}
            <em class="${subtaskStatusClass}">[${subtask.status}]</em>
            <button onclick="changeStatus(todos.find(t => t.id === ${todo.id}).subtasks.find(s => s.id === ${subtask.id}))">Change Status</button>
            <button onclick="toggleEditSubtask(${todo.id}, ${subtask.id})">Update</button>
            <button onclick="deleteSubtask(${todo.id}, ${subtask.id})">Delete</button>
          `;
        }

        subtaskList.appendChild(subtaskItem);
      });

      todoItem.appendChild(subtaskList);
    }

    todoList.appendChild(todoItem);
  });
}

// Open/Close Settings Modal
function toggleSettings() {
  const modal = document.getElementById("settingsModal");
  modal.style.display = modal.style.display === "none" ? "block" : "none";
}

// Show Color Picker Modal
function showColorPickerModal() {
  const modal = document.getElementById("colorPickerModal");
  modal.style.display = "block";
  toggleSettings(); // Close the settings modal
}

// Close Color Picker Modal
function toggleColorPickerModal() {
  const modal = document.getElementById("colorPickerModal");
  modal.style.display = "none";
}

// Set the theme (light, dark, or custom)
function setTheme(theme) {
  // Remove any previously applied theme classes
  document.body.classList.remove("light-theme", "dark-theme", "custom-theme");
  document.body.classList.add(`${theme}-theme`);
  toggleSettings(); // Close the settings modal after selecting theme
}

// Apply Custom Colors from Color Picker
function applyCustomColors() {
  const bgColor = document.getElementById("bgColor").value;
  const textColor = document.getElementById("textColor").value;

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;

  // Optionally, save the theme in localStorage to persist across page reloads
  localStorage.setItem("custom-theme-bg", bgColor);
  localStorage.setItem("custom-theme-text", textColor);

  toggleColorPickerModal(); // Close the color picker modal
}

// Set custom theme from localStorage (if it exists)
function loadCustomTheme() {
  const bgColor = localStorage.getItem("custom-theme-bg");
  const textColor = localStorage.getItem("custom-theme-text");

  if (bgColor && textColor) {
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
  }
}

// Run on page load
window.onload = () => {
  loadCustomTheme(); // Load any saved custom theme from localStorage
};
