// Find all html elements
const container = document.querySelector(".container");
const task_form = document.querySelector("#task_form");
const order_input = document.querySelector("#order_input");
const budge_input = document.querySelector("#budge_input");
const client_input = document.querySelector("#client_input");
const btn = document.querySelector("#btn");
const lists = document.querySelector("#lists");
const messages = document.querySelector("#message");


// show message
const showMessage = (text, status) => {
    messages.innerHTML = text;
    messages.classList.add(`${status}`);

    setTimeout(() => {
        messages.innerHTML = "";
        messages.classList.remove(`${status}`);
    }, 1000);
}

// delete tasks
const deleteTask = (e) => {
    const selectTask = e.target.parentElement.parentElement.parentElement;

    lists.removeChild(selectTask);

    showMessage("Task deleted successfully", "danger");


    localStorage.removeItem("mytask");
}


// create Task
const createTask = (order_value, budge_value, client_value) => {
    const liElement = document.createElement("li");
    liElement.classList.add("li-style")
    liElement.innerHTML = `
    <span>${order_value}</span>
    <span>${budge_value}</span>
    <span>${client_value}</span>
    <span> <button id="deleteButton"> <i class="fa fa-trash"></i> </button> </span>
    `;

    lists.appendChild(liElement);

    // delete task
    const deleteButton = liElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTask);
}

// add task
const addtask = (e) => {
    e.preventDefault();

    const order_value = order_input.value;
    const budge_value = budge_input.value;
    const client_value = client_input.value;

    createTask(order_value, budge_value, client_value);
    showMessage("Task added successfully", "success");

    // add task locatlstroge
    const task = gettasklocalstorge();
    task.push({order_value, budge_value, client_value});
    localStorage.setItem("mytask", JSON.stringify(task));

    // clear input
    order_input.value = "";
    budge_input.value = "";
    client_input.value = "";
}

// gettasklocalstorge
const gettasklocalstorge = () => {
    return localStorage.getItem("mytask")
      ? JSON.parse(localStorage.getItem("mytask"))
      : [];
}

// load to task
const loadTask = () => {
    const task = gettasklocalstorge()
    task.map(task => {
        createTask(task.order_value, task.budge_value, task.client_value);
    });
    
}

// add listeners
task_form.addEventListener("submit", addtask);
window.addEventListener("DOMContentLoaded", loadTask)
