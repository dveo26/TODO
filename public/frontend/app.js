const API_URL = "http://localhost:3000/todos"; // Ensure this URL is correct

const todolist = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const desc = document.getElementById("todo-input");

async function getTodos() {
  try {
    const res = await axios.get(API_URL); // Make sure this URL matches your backend
    rendertodos(res.data);
  } catch (err) {
    console.error(err);
  }
}

function rendertodos(todos) {
  todolist.innerHTML = ""; // Clear the list
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.desc; // Display 'desc' (assuming 'desc' is the correct field)

    // Add a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(todo.id);

    // Add a checkbox for status
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.status === "done";
    checkbox.onchange = () => updateTodoStatus(todo.id, checkbox.checked);

    li.appendChild(checkbox);
    li.appendChild(deleteBtn);
    todolist.appendChild(li);
  });
}

// Add event listener to form to handle new todo submissions
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTodo = { desc: desc.value, status: "pending" };
  try {
    await axios.post(API_URL, newTodo); // POST request to create a new todo
    desc.value = ""; // Clear the input field
    getTodos(); // Refresh the list
  } catch (err) {
    console.error(err);
  }
});

// Update the status of a todo
async function updateTodoStatus(id, isDone) {
  const status = isDone ? "done" : "pending";
  try {
    await axios.put(`${API_URL}/${id}`, { desc: "", status }); // PUT request to update todo status
    getTodos(); // Refresh the list after status change
  } catch (err) {
    console.error(err);
  }
}

// Delete a todo
async function deleteTodo(id) {
  try {
    await axios.delete(`${API_URL}/${id}`); // DELETE request to remove todo
    getTodos(); // Refresh the list after deletion
  } catch (err) {
    console.error(err);
  }
}

// Initial fetch of todos
getTodos();
