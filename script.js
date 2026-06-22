//DOM Selections

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const category = document.getElementById("categorySelect");
const priority = document.getElementById("prioritySelect");
const dueDate = document.getElementById("dueDate");


const emptyState = document.querySelector(".empty-state");
const emptyStateTitle = document.querySelector(".empty-state h3");
const emptyStateText = document.querySelector(".empty-state p");
const taskContainer =document.getElementById("taskContainer");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const searchInput = document.getElementById("searchInput");

const filterSelect = document.getElementById("filterSelect");

const clearCompletedBtn = document.getElementById("clearCompletedBtn");

//states
let taskData = [];

let editingTaskId = null;

let searchTerm = "";

let filterStatus = "All Tasks";


//functions

//rendering function 

function renderTasks() {

    taskContainer.innerHTML = "";

    let finalFilteredArr;

    const filteredTasks = taskData.filter((item)=> item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if(filterStatus === "All Tasks") {
        finalFilteredArr = filteredTasks;

    }else if(filterStatus === "Completed"){

        finalFilteredArr = filteredTasks.filter((item)=> item.completed);

    }else {
        finalFilteredArr = filteredTasks.filter((item)=> !item.completed);
    }


    if (taskData.length === 0) {

        emptyState.style.display ="flex";

        emptyStateTitle.textContent = "No tasks yet.";
        emptyStateText.textContent = "Start by adding your first task.";

    }else if (finalFilteredArr.length === 0) {

        emptyState.style.display ="flex";
        
        emptyStateTitle.textContent = "No matching tasks found.";
        emptyStateText.textContent = "Try a different search term.";

    }else {

        emptyState.style.display ="none";
    }


    for(let task of finalFilteredArr) {

        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");


        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");


        const checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("type","checkbox");
        checkboxInput.setAttribute("data-id", task.id);
        checkboxInput.checked = task.completed;
        checkboxInput.classList.add("task-check");
 

        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");


        const taskTitle = document.createElement("h3");
        taskTitle.classList.add("task-title");
        taskTitle.textContent = task.title;


        if(task.completed){
            taskCard.classList.add("completed-card");
            taskTitle.classList.add("completed-title");
        };


        const taskMeta = document.createElement("div");
        taskMeta.classList.add("task-meta");


        const taskCategory = document.createElement("p");
        taskCategory.classList.add("task-category");
        taskCategory.textContent = `Category: ${task.category}`;


        const taskPriority = document.createElement("p");
        taskCategory.classList.add("task-priority");
        taskPriority.textContent = `Priority: ${task.priority}`;


        const taskDate = document.createElement("p");
        taskDate.classList.add("task-date");
        taskDate.textContent = `Due Date: ${task.dueDate}`;


        taskMeta.append(taskCategory, taskPriority, taskDate);
        taskDetails.append(taskTitle, taskMeta);
        taskInfo.append(checkboxInput, taskDetails);


        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");


        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.setAttribute("data-id", task.id);
        editBtn.textContent = "Edit";


        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.setAttribute("data-id", task.id);
        deleteBtn.textContent = "Delete";


        taskActions.append(editBtn, deleteBtn);
        taskCard.append(taskInfo, taskActions);
        taskContainer.appendChild(taskCard);
    }

    updateStats();
}




function updateStats() {

    totalTasks.textContent = taskData.length;

    completedTasks.textContent = taskData.filter((item)=> item.completed).length;
    
    pendingTasks.textContent = taskData.filter((item)=> !item.completed).length;
    
};


//save tasks to local storage

function saveTasks() {
    const jsonStringArr = JSON.stringify(taskData);
    localStorage.setItem("taskData", jsonStringArr);
}


//load tasks from local storage

function loadTasks() {
    const storedTasks = localStorage.getItem("taskData");

    if (storedTasks){
        taskData = JSON.parse(storedTasks);
    }

    renderTasks();
}


//initial rendering

loadTasks();



//events

//Add task from submit

taskForm.addEventListener("submit", (e)=> {

    e.preventDefault();

    const inputTask = taskInput.value.trim();

    if(!inputTask) {
        return
    }

    if(editingTaskId !== null) {
        const particularTask = taskData.find((item) => item.id === editingTaskId);

        particularTask.title = inputTask;
        particularTask.category = category.value || "No category";
        particularTask.priority= priority.value || "No priority";
        particularTask.dueDate = dueDate.value || "No dueDate";

        editingTaskId = null;

    }else{

        const taskObj = {
        id: Date.now(),
        title: inputTask,
        category: category.value || "No category",
        priority: priority.value || "No priority",
        dueDate: dueDate.value || "No dueDate",
        completed: false
    }

    taskData.push(taskObj);

    }
    saveTasks();

    //reset the form

    taskForm.reset();
    renderTasks();

});


//completed task

taskContainer.addEventListener("change", (e)=> {

    if(!e.target.classList.contains("task-check")){
        return;
    }

    const taskId = Number(e.target.getAttribute("data-id"));

   const particularTask = taskData.find((item)=> item.id === taskId);
   particularTask.completed = e.target.checked;

   saveTasks();

   renderTasks();

});


//delete task

taskContainer.addEventListener("click", (e)=> {
    if(!e.target.classList.contains("delete-btn")){
        return;
    }

    const taskId = Number(e.target.getAttribute("data-id"));
    taskData = taskData.filter((elem)=> elem.id !== taskId);

    saveTasks();

    renderTasks();
});

//edit task

taskContainer.addEventListener("click", (e)=> {
    if(!e.target.classList.contains("edit-btn")){
        return;
    }

    const taskId = Number(e.target.getAttribute("data-id"));

    const particularTask = taskData.find((item)=> item.id === taskId);

    taskInput.value = particularTask.title;
    category.value = particularTask.category;
    priority.value = particularTask.priority;
    dueDate.value = particularTask.dueDate;

    editingTaskId = taskId;

})




searchInput.addEventListener("input", (e)=> {
    searchTerm = e.target.value.trim();

    renderTasks();
})



filterSelect.addEventListener("change", (e)=> {

    filterStatus = e.target.value;

    renderTasks();
})


clearCompletedBtn.addEventListener("click", ()=> {
    
    taskData = taskData.filter((item) => !item.completed)

    saveTasks();

    renderTasks();
})

