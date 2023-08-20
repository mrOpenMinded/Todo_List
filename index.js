

// varaibles used to fetch and give user functionality on an event occurrences
var inptField = document.getElementById("listType");//input field
var addIcon = document.getElementById('list-icon2');//add list-item
var disPlay = document.getElementById('todo-list-display');//display all task
var disPlayAll = document.getElementById('todo-list-display1');//display IT/CT
var numTask = document.getElementById('tod-list-record-num');//number task left
var clearComp = document.getElementById('task-histry-clear');//uncheck CT
var compTask = document.getElementById('task-histry-icon');//completed task event
var incomTask = document.getElementById('tod-list-record-survey2');//incomplete task event
const checkboxes = document.querySelectorAll('input[name="taskList"]');
var deleteAll = document.getElementById('tod-list-record-survey3');//delet all CT event
var clearList = document.getElementById('task-histry-del');
clearList.addEventListener('click', clearNotes1);
//function to clear all the todo list items
function clearNotes1() {
    let notes = localStorage.getItem("todo-list-display");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.forEach(function (index) {
        deleteNote(index);//delete function 1 called to delete all cT
    })
    showNotes();
}



deleteAll.addEventListener('click', deleteCT);//delete CT event listener
var flag = 0;
//delete all completed task function
function deleteCT() {
    let notes = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj1 = [];
    }
    else {
        notesObj1 = JSON.parse(notes);
    }
    notesObj1.forEach(function (index) {
        deleteNote1(index);//delete function 1 called to delete all cT
    })
    showNotes1();//show function 1 for showing all incomplete task left
}


//fetch all incomplete task function and event listener 
incomTask.addEventListener('click', displayUnCheck);
function displayUnCheck() {
    console.log("event called");
    let notes = localStorage.getItem("todo-list-display");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj1 = [];
    const checkboxes = document.querySelectorAll('input[name="taskList"]');
    console.log(checkboxes);
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == false) {
            if (!notesObj1.includes(checkboxes[i].value)) {
                notesObj1.push(checkboxes[i].value);
                checkboxes[i].checked = false;
                console.log(notesObj1);
            }
        }    
    }
    localStorage.setItem("todo-list-display1", JSON.stringify(notesObj1));
    console.log(notesObj1);
    disPlay.style.visibility = "hidden";
    disPlayAll.style.visibility = 'visible';
    showNotes2();//show function 2 is called to show all incomplete task left
}


//clear the localstorage on page loading
clearNotes();
function clearNotes() {
    localStorage.clear();
    console.log(localStorage);
    disPlay.style.visibility = 'hidden';
    disPlayAll.style.visibility = 'hidden';
    number = 0;
    numTask.textContent = number;

}


//function for completed tasks and event listener 
compTask.addEventListener('click', displayCheck);
// showNotes1();
notesObj1 = [];
function displayCheck() {
    console.log("event called");
    const checkboxes = document.querySelectorAll('input[name="taskList"]');
    console.log(checkboxes);
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == true) {
            if (!notesObj1.includes(checkboxes[i].value)) {
                notesObj1.push(checkboxes[i].value);
                checkboxes[i].checked = true;
            }
            console.log(notesObj1);
        }
        else if (checkboxes[i].type == 'checkbox' && checkboxes[i].checked == false) {
            if (notesObj1.includes(checkboxes[i].value)) {
                var index = notesObj1.indexOf(checkboxes[i].value);
                notesObj1.splice(index, 1);
            }
        }
    }
    localStorage.setItem("todo-list-display1", JSON.stringify(notesObj1));
    console.log(notesObj1);
    disPlay.style.visibility = "hidden";
    disPlayAll.style.visibility = 'visible';
    showNotes1();//show function 1 to show all task left after completed task are deleted from that section
}
//function to uncheck all checked lists and event listener
clearComp.addEventListener('click', check);
function check() {
    unCheck(false);
}

//uncheck function to uncheck all lists(completed)
function unCheck(checked = false) {
    const checkboxes = document.querySelectorAll('input[name="taskList"]');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = checked;
    });
}

//to fetch list type eneterd by used even listener
inptField.addEventListener('click', function () {
    addIcon.style.visibility = 'visible';
    disPlayAll.style.visibility = 'hidden';
    disPlay.style.visibility = 'visible';
})
var number = 0;//global variable to keep track of tasks left over to complete



//add list items on task display area
addIcon.addEventListener('click', function () {
    console.log("Btn clicked");
    disPlay.style.visibility = 'visible';


    // disPlay.textContent=inptField.value;
    let notes = localStorage.getItem("todo-list-display");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        console.log(notesObj);
    }
    if (inptField.value == '') {
        alert('Please enter any notes.!!!');
    }
    else {
        notesObj.push(inptField.value);
        number++;
        numTask.textContent = number;
        localStorage.setItem("todo-list-display", JSON.stringify(notesObj));
        inptField.value = "";
        console.log(notesObj);
        showNotes();//show all notes added by user
    }

})

//function to display all notes entered by user
function showNotes() {
    let notes = localStorage.getItem("todo-list-display");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (ele, index) {
        html += `<div style="display:inline-block;">
        <input type="checkbox" name="taskList" id="${index + 1}" style="display:inline-block;" value="${ele}" >
  <label for="${index + 1}"  style="display:inline-block;">${ele}
  </label>
 <button id="${index}" onclick="deleteNote(this.id)" href="#"style="color: #c2c2c2;display:inline-block;margin-left:350px;position:relative;top:-20px;height:20px;width:20px;border-radius:50%; background-color:black;color:white;font-size:10px;text-align:center;cursor:pointer;" >X</button>
  </div>
 `;
    });
    let notesEle = document.getElementById("todo-list-display");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to show. please use "add notes" section to add some notes.`;
    }
}

//function to show all checked/completed notes
function showNotes1() {
    let notes = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (ele, index) {
        html += `<div style="display:inline-block;">
       
            <input type="checkbox" name="taskList" id="${index + 1}" style="display:inline-block;" value="${ele}" checked="true">
  <label for="${index + 1}"  style="display:inline-block;">${ele}</label>

 <button id="${index}" onclick="deleteNote1(this.id)" href="#"style="color: #c2c2c2;display:inline-block;margin-left:350px;position:relative;top:-20px;height:20px;width:20px;border-radius:50%; background-color:black;color:white;font-size:10px;text-align:center;cursor:pointer;" >X</button>
  </div>
 `;
    });
    let notesEle = document.getElementById("todo-list-display1");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `All task are completed/Some task are Pending.!!! Keep Going Ninja's.`;
    }
}

//function to show all unchecked/incomplete tasks
function showNotes2() {
    let notes = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (ele, index) {
        html += `<div style="display:inline-block;">
        <form action="#"  style="display:inline-block;">
            <input type="checkbox" name="taskList" id="${index + 1}" style="display:inline-block;" value="${ele}" >
  <label for="${index + 1}"  style="display:inline-block;">${ele}</label>
 </form>
 <button id="${index}" onclick="deleteNote1(this.id)" href="#"style="color: #c2c2c2;display:inline-block;margin-left:350px;position:relative;top:-20px;height:20px;width:20px;border-radius:50%; background-color:black;color:white;font-size:10px;text-align:center;cursor:pointer;" >X</button>
  </div>
 `;
    });
    let notesEle = document.getElementById("todo-list-display1");
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `All task are completed/Some task are Pending.!!! Keep Going Ninja's.`;
    }
}


//delete tasks user wanna delete
function deleteNote(index,event) {
   
    deleteNote2(index);//delete from completed task section to if tehy;re there also there
    console.log("deleting the note", index);
    let notes = localStorage.getItem("todo-list-display");
    // let notes1 = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj = [];
        // notesObj1=[];
    }
    else {
        notesObj = JSON.parse(notes);
        //    notesObj1=JSON.parse(notes1);
    }



    notesObj.splice(index, 1);
    console.log(notesObj);
    // Get all checkboxes and their states



    localStorage.setItem("todo-list-display", JSON.stringify(notesObj));
    const checkboxes = document.querySelectorAll('input[name="taskList"]');
    const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);
    // Reset checkboxes based on the stored states


    // localStorage.setItem("todo-list-display1", JSON.stringify(notesObj1));
    if (number > 0) {
        number--;
        numTask.textContent = number;
    }
    checkboxes.forEach((checkbox, i) => {
        checkbox.checked = checkboxStates[i];
    });
    // event.preventDefault();
    showNotes();//show notes on display area of all tasks
    // showNotes1();


}

//function to delete all list from all task display also when deleted from complted task section
function deleteNote3(index) {
    // deleteNote2(index);
    console.log("deleting the note", index);
    let notes = localStorage.getItem("todo-list-display");
    // let notes1 = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj = [];
        // notesObj1=[];
    }
    else {
        notesObj = JSON.parse(notes);
        //    notesObj1=JSON.parse(notes1);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("todo-list-display", JSON.stringify(notesObj));
    // localStorage.setItem("todo-list-display1", JSON.stringify(notesObj1));
    if (number > 0) {
        number--;
        numTask.textContent = number;
    }
    showNotes();
    // showNotes1();
}

//function to delete all task from all task and completed section too
function deleteNote1(index) {
    deleteNote3(index);
    // number--;
    numTask.textContent = number;
    console.log("deleting the note", index);
    let notes = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj1 = [];

    }
    else {
        notesObj1 = JSON.parse(notes);
        // notesObj1=JSON.parse(notes1);
    }
    notesObj1.splice(index, 1);
    // notesObj1.splice(index,1);
    localStorage.setItem("todo-list-display1", JSON.stringify(notesObj1));
    showNotes1();
}
//function called from delete1 function to delete all checked function from completed section
function deleteNote2(index) {
    // number--;
    numTask.textContent = number;
    console.log("deleting the note", index);
    let notes = localStorage.getItem("todo-list-display1");
    if (notes == null) {
        notesObj1 = [];

    }
    else {
        notesObj1 = JSON.parse(notes);
        // notesObj1=JSON.parse(notes1);
    }
    notesObj1.splice(index, 1);
    // notesObj1.splice(index,1);
    localStorage.setItem("todo-list-display1", JSON.stringify(notesObj1));
    showNotes1();
}