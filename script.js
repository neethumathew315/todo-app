//DOM Selections

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const category = document.getElementById("categorySelect");
const priority = document.getElementById("prioritySelect");
const dueDate = document.getElementById("dueDate");


const emtyState = document.querySelector(".empty-state");
const taskContainer =document.getElementById("taskContainer");


//states
let taskData = [];


//events

//Add task from submit

taskForm.addEventListener("submit", (e)=> {

    e.preventDefault();

    const inputTask = taskInput.value.trim();

    if(!inputTask) {
        return
    }

    const taskObj = {
        id: Date.now(),
        title: inputTask,
        category: category.value || "No category",
        priority: priority.value || "No priority",
        dueDate: dueDate.value || "No dueDate",
        completed: false
    }

    taskData.push(taskObj);

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

   renderTasks();

   console.log(taskData)
});


//delete task

taskContainer.addEventListener("click", (e)=> {
    if(!e.target.classList.contains("delete-btn")){
        return;
    }

    const taskId = Number(e.target.getAttribute("data-id"));
    taskData = taskData.filter((elem)=> elem.id !== taskId);

    renderTasks();
});


//functions

//rendering function 

function renderTasks() {

    taskContainer.innerHTML = "";

    if(taskData.length === 0){
        emtyState.style.display ="flex"
    }else{
        emtyState.style.display ="none";
    }


    for(let task of taskData) {

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
        editBtn.textContent = "Edit";


        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.setAttribute("data-id", task.id);
        deleteBtn.textContent = "Delete";


        taskActions.append(editBtn, deleteBtn);
        taskCard.append(taskInfo, taskActions);
        taskContainer.appendChild(taskCard);
    }
}

renderTasks();






