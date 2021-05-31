const todoText =document.querySelector(".todotext");
const todoInput =document.querySelector(".todobtn");
const todoList =document.querySelector(".todolistul");
const todoFilter=document.querySelector(".filter");

todoInput.addEventListener("click", createTodo);
todoList.addEventListener("click", deleteTodo);
todoFilter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getFromLocal);

function createTodo(event){

    event.preventDefault();

    const newDiv=document.createElement("div");
    newDiv.classList.add("todo");

    const newLi=document.createElement("li");
    newLi.classList.add("todoitem");
    newLi.innerText=todoText.value;
    saveToLocal(todoText.value);

    const newCheck=document.createElement("button");
    newCheck.classList.add("todocheck");
    newCheck.innerHTML="<i class='fas fa-check'></i>";

    const newDel=document.createElement("button");
    newDel.classList.add("tododel");
    newDel.innerHTML="<i class='fas fa-trash'></i>";

    newDiv.appendChild(newLi);
    newDiv.appendChild(newCheck);
    newDiv.appendChild(newDel);

    todoList.appendChild(newDiv); 

    todoText.value="";

};


function deleteTodo(event){
   const item=event.target;
    if (item.classList[0]==="tododel"){
        const todo=item.parentElement;
        todo.classList.add("removed");
        removeFromLocal(todo);
        todo.addEventListener("transitionend", function(){
        todo.remove();
       
        });
    };
    if(item.classList[0]==="todocheck"){
        item.classList.toggle("checkedtodo");
        const todo=item.parentElement;
        todo.classList.toggle("checkedparent")
    
    };
};

function filterTodo(event){
    const todos=todoList.children;
    for(i=0;i<todos.length;i++){
        switch(event.target.value){
            case "all":
                todos[i].style.display="flex";
                break;
            case "checked":
                if (todos[i].classList.contains ("checkedparent")){
                    todos[i].style.display= 'flex';
                } else {
                    todos[i].style.display="none";
                }
                break;
            case "unchecked":
                if (todos[i].classList.contains ("checkedparent")){
                    todos[i].style.display= 'none';
                } else {
                    todos[i].style.display="flex";
                }
                break;
        };
    };
    
};
function saveToLocal(todo){
    let todos;
    if (localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getFromLocal(){
    let todos;
    if (localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    };
todos.forEach(function(todo){
    const newDiv=document.createElement("div");
    newDiv.classList.add("todo");

    const newLi=document.createElement("li");
    newLi.classList.add("todoitem");
    newLi.innerText=todo;
    
    const newCheck=document.createElement("button");
    newCheck.classList.add("todocheck");
    newCheck.innerHTML="<i class='fas fa-check'></i>";

    const newDel=document.createElement("button");
    newDel.classList.add("tododel");
    newDel.innerHTML="<i class='fas fa-trash'></i>";

    newDiv.appendChild(newLi);
    newDiv.appendChild(newCheck);
    newDiv.appendChild(newDel);

    todoList.appendChild(newDiv); 
});
};

function removeFromLocal(todo){
    let todos;
    if (localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    };
    const toBeRemoved = todo.children[0].innerText;
    todos.splice(todos.indexOf(toBeRemoved),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}