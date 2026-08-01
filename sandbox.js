const listTags = document.querySelector('#List-items')

const alertPop = document.querySelector('#Alert')

const button = document.querySelector('#input-button')
// console.log(button.innerText);

const getInput = document.querySelector('#input-field') 

let userArray = JSON.parse(localStorage.getItem('todoList'));
if (!userArray) {
  userArray = [];
}



button.addEventListener('click', clickButton);


function clickButton(e) {
    if (getInput.value === '') {
        alertPop.innerText = 'Please Enter Text';
        getInput.focus();
    }else if (getInput.value != '') {
        e = getInput.value;
        
        let IsPresent = false;

        userArray.forEach((element) =>{
            if(element.item === getInput.value){
                IsPresent = true;
            }
        });

        if(IsPresent){
            alertPop.innerText = 'This item is already present in list!';
            return;
        }
        
        let li = document.createElement('li');
        
        const star = `<div>${e}</div><div>
        <img onclick='deleteToDo(this)' src= 'images/delete_img.png' />
        <img onclick='updateToDo(this)' src= 'images/pen_img.png' /></div></div>`;
        
        li.innerHTML = star;
        listTags.appendChild(li);

        if (!userArray) {
            userArray = [];
        }
        
        let itemList = {item: e, status: false};
        
        userArray.push(itemList);
        storeAtLocalStorage();
        
        alertPop.innerText = 'Task Successfully Added!';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        
        if (getInput.value){
            getInput.value = '';
            getInput.focus();
        }
    }
}

function storeAtLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(userArray));
    // localStorage.removeItem('todoList');
}

// To read items that has already been stored in the local storage
function readToDoList() {
    userArray.forEach((element) => {
        let li = document.createElement('li');
        style = "" ;
        if(element.status) {
            style = "style = 'text-decoration: line-through' ";
        }
        // console.log('error:', element.item);
        const todoItems = `<div ${style} ondblclick='completeButton(this)' ;
>${
            element.item
        }${
            style === ""
            ? ''
            : "<img class='todo-control' src='images/check_mark.png' />"
        }</div><div>${
            style === ""
            ? "<img class='edit todo-control' onclick='updateToDo(this)' src= 'images/pen_img.png' />"
            : ""
        }
        <img onclick='deleteToDo(this)' src='images/delete_img.png' /></div></div>`;

        li.innerHTML = todoItems;
        listTags.appendChild(li);

    });
}

readToDoList();


function updateToDo(e) {    
    if (e.parentElement.parentElement.querySelector('div').style.textDecoration === '') {
        getInput.value = e.parentElement.parentElement.querySelector('div').innerText;
        updateText = e.parentElement.parentElement.querySelector('div');

        button.textContent = '' ;
        
        button.setAttribute('style', 'background-image: url(images/update_btn.png); background-size: cover; width: 50px; height: 50px; border: none');
        // console.log(button);

        button.removeEventListener('click', clickButton);

        button.addEventListener('click', updateSelectionOnItems);
        
        getInput.focus();
       
        function updateSelectionOnItems() {
            // console.log('this is mine!');

            let IsPresent = false;
            userArray.forEach((element) => {
                if (element.item == getInput.value) {
                IsPresent = true;
                }
            });
            
            if (IsPresent) {
                alertPop.innerText = "This item already present in the list!";
                return;
            }
            
            userArray.forEach((element) => {
                if (element.item == updateText.innerText.trim()) {
                element.item = getInput.value;
                }
            });
            storeAtLocalStorage();
            
            updateText.innerText = getInput.value;

            button.removeAttribute('style');
            button.removeEventListener('click', updateSelectionOnItems)
            button.textContent = '+' ;
            button.addEventListener('click', clickButton);
            
            getInput.value = "";
            alertPop.innerText = "Todo item Updated Successfully!";

        }
    }
    
}

function deleteToDo(e) {
    console.log('This is mine!');
    deleteTask = e.parentElement.parentElement.querySelector('div').innerText;

    if(confirm(`Are you sure, you want to delete "${deleteTask}" Task?`)) {
        // console.log('Action activated!');
        e.parentElement.parentElement.setAttribute('class', 'delete-items');
        getInput.focus();
        
        userArray.forEach((element) =>{
            if(element.item === deleteTask.trim()){
                userArray.splice(element, 1);
            }
        });

        setTimeout(() => {
            e.parentElement.parentElement.remove();
        }, 1000);

        storeAtLocalStorage();
        
    }
}


function completeButton(e) {
    console.log('come over here!');
    if(e.parentElement.querySelector('div').style.textDecoration === ''){
        const img = document.createElement('img');
        img.src = 'images/check_mark.png'
        console.log('This RN!', img.src);
        img.className = 'todo-control'

        e.parentElement.querySelector('div').style.textDecoration === 'line-through';
        e.parentElement.querySelector('div').appendChild('img');
        e.parentElement.querySelector('img.edit').remove();

        userArray.forEach((element) =>{
            if(e.parentElement.querySelector('div').innerText.trim() === element.item) {
                element.status = true;
            }
        });

        storeAtLocalStorage();
        alertPop.innerText = 'ToDo item completed successfully!' ;
    }
}


// const todoDiv = document.querySelector('.todo-items');
// const editBtn = document.querySelector('.edit');
// const deleteBtn = document.querySelector('.delete');

// if (todoDiv){
//     todoDiv.addEventListener('dblclick', function() {
//         completeButton(this);
//     });
// }
// if (editBtn){
//     editBtn.addEventListener('click', function() {
//         updateToDo(this);
//     });
// }
// if (deleteBtn){
//     deleteBtn.addEventListener('click', function() {
//         deleteToDo(this);
//     });
// }