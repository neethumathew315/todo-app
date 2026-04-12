const inputText = document.getElementById("input-text");

const addButton = document.getElementById("add-button");

const listItems = document.getElementById("list-items")

//Enter key support

inputText.addEventListener("keydown", (e)=> {
    if(e.key === "Enter"){
        addButton.click();
    }
});


// Add Task

addButton.addEventListener("click", ()=>{
    const input = inputText.value.trim();

    if(!input){
        alert("Please enter list items");
        return;
    };



    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = input;

    //complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = " ✔ ";


    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = " x ";

    li.append(span, completeBtn, deleteButton);
    
    listItems.appendChild(li);

    inputText.value = "";
    inputText.focus();
});


listItems.addEventListener("click", (e) => {
    const li = e.target.closest("li");

    if(!li) return;

    if(e.target.textContent === " ✔ ") {
        li.classList.toggle("completed");

    }

    if(e.target.textContent === " x ") {
        li.remove();
    }

});