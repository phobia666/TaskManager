
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getDatabase, set, get, ref, remove} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
  //when you want to store data in database -> set
  //when you want to get data from database -> get
  //when you want to get data through the reference -> ref
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD9jzYe4gh5xyx1R5-AJp8wv9WFVr9_EMM",
    authDomain: "taskmanager-d7b17.firebaseapp.com",
    projectId: "taskmanager-d7b17",
    storageBucket: "taskmanager-d7b17.firebasestorage.app",
    messagingSenderId: "859096672114",
    appId: "1:859096672114:web:600531c4df27f833b11feb",
    measurementId: "G-CLBXFM5G9Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
//   console.log(database);

//for the string representation of the object we use JSON.stringify



const inTask = document.querySelector('#intask');
const form = document.querySelector('form');
const taskList = document.querySelector('.taskList');
var c = 0;
var taskArray = [];

const listItem = document.createElement('ul');
// const task = document.createElement('li');
// console.log(List);
listItem.setAttribute('id', 'list');

taskList.appendChild(listItem);

  function setData(TaskID, taskNum, taskName){
    set(ref(database, 'tasks/' + TaskID),{
        taskName : taskName,
        taskNum : taskNum
    })
  }
// console.log(localStorage);

function createTask(taskText, c){
  const taskDiv = document.createElement('div');
  const taskLi = document.createElement('li');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const br = document.createElement('br');

  taskDiv.id = `task${c}`
  taskDiv.className = 'task';
  taskDiv.style.display = 'flex';
  taskDiv.style.gap = '10px';
  taskLi.innerHTML = `${taskText}`;
  editButton.innerHTML = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerHTML = 'Delete';
  // deleteButton.id = `del${c}`
  deleteButton.className = 'del'
  // br.className = `${c}`;

  taskDiv.appendChild(taskLi);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);
  listItem.appendChild(taskDiv);
  listItem.appendChild(br); 

  divSearch();
  // taskArray.push(taskText);
  // localStorage.setItem(`taskArray`, JSON.stringify(taskArray));

}

  function getData(c){
    get(ref(database, 'tasks')).then((tasks) =>{
        tasks.forEach((task) => {
          if(task.val().taskNum == c){
            const taskText = `${task.val().taskNum}. ${task.val().taskName}`;
            // console.log(taskText);
            createTask(taskText, c);
          }
        })
    })
  }

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(inTask.value == ''){
        alert("Enter a Valid task");
    }
    else{
        c++;
        localStorage.setItem('count', JSON.stringify(c));
        setData(`task${c}`, c, inTask.value);
        getData(c);
        inTask.value = "";
    }
} )

// function loopTasks(taskArray) {
//   c = JSON.parse(localStorage.getItem('count'));
//   tasks.forEach((task) => {
//       createTask(`taskArray[c]`);
//     })
  
// }
// window.onload = loopTasks(JSON.parse(localStorage.getItem('taskArray')));


function getAllTasks(){
  get(ref(database, 'tasks')).then((tasks) => {
    tasks.forEach((task) => {
      c = task.val().taskNum;
      createTask(`${task.val().taskNum}. ${task.val().taskName}`, c);
    })
  }).then(divSearch());
}

window.onload = getAllTasks();

//search the clicked Div element
function divSearch(){
  const taskDivs = document.querySelectorAll('.task');
    // console.log(taskDivs);
    taskDivs.forEach((taskDiv)=>{
      taskDiv.querySelector('.del').addEventListener('click', (e) => {
        // console.log(e);
        delDiv(taskDiv);
        delData(taskDiv);
      })
      taskDiv.querySelector('.edit').addEventListener('click', (e) => {
        // console.log(e);
        editDiv(taskDiv);
      })
    })
}
//edit function
function editDiv(taskDiv){

  const li = taskDiv.querySelector('li');
  const count = li.textContent.split('.')[0].trim();
  console.log(count);
  const editBox = document.createElement('input');
  editBox.setAttribute('type', 'text');
  const okButton = document.createElement('button');
  okButton.className = 'ok';
  okButton.innerHTML = 'Ok';
  taskDiv.children[0].remove();
  taskDiv.prepend(editBox);
  taskDiv.children[1].remove();
  taskDiv.insertBefore(okButton, taskDiv.children[1]);

  taskDiv.querySelector('.ok').addEventListener('click', (e)=>{
    const editBoxValue = editBox.value;
    if(editBoxValue == ''){
      alert('Enter a valid task');
    }
    else{
      const editButton = document.createElement('button');
      editButton.className = 'edit';
      editButton.innerHTML = 'Edit';
      editBox.remove();
      const newLi = document.createElement('li');
      newLi.innerHTML = `${count}. ${editBoxValue}`;
      taskDiv.prepend(newLi);
      okButton.remove();
      taskDiv.insertBefore(editButton, taskDiv.children[1]);
      editData(count, taskDiv, editBoxValue);
    }
  })
  divSearch();
}
function editData(count, taskDiv, editBoxValue){
  delData(taskDiv);
  setData(`task${count}`, `${count}`, `${editBoxValue}`);
}
//delete function
function delData(taskDiv){
  remove(ref(database, `tasks/${taskDiv.id}`)).then(()=>{
    console.log(`task deleted successfully`);
  })
}
function delDiv(taskDiv){
  taskDiv.nextElementSibling.remove();
  taskDiv.remove();
}

