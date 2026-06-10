const taskForm = document.getElementById("task-form");
const inputText = document.getElementById("input-text");
const addButton = document.getElementById("add-button");
const listItems = document.getElementById("list-items");

const taskData = [];
let currentTask = {};

const reset = () => {
    inputText.value = "";
    currentTask = {};

}



// Add or update task
const addOrUpdateTask = () => {
    const input = inputText.value.trim();

    if(!input){
        alert("Please enter list items");
        return;
    }

    const dataArrIndex = taskData.findIndex(
        (item) => item.id === currentTask.id
    );

    const taskObj = {
        id: `${input.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: input
    };

    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    updateTaskContainer();
    reset();
};

// Update UI
const updateTaskContainer = () => {
    listItems.innerHTML = ""; 

    taskData.forEach(({id,title}) => {
        const li = document.createElement("li");
        li.id = `${id}`;
        li.className = "task";

        const span = document.createElement("span");
        span.textContent = title;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";

        li.append(span, completeBtn, editBtn, deleteButton);
        listItems.appendChild(li);
    });

};

// Add Task
addButton.addEventListener("click", () => {
    addOrUpdateTask();
    
});

completeBtn.addEventListener((e) => {
    completeTask(e.target.closest("li"));
});

const completeTask = (task) => {
    task.classList.toggle("completed");
}




