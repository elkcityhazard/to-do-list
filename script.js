const form = document.querySelector('form');
const addTask = document.getElementById('task');
var storedList = [];
var counter = 0;
var dragItem;

 init();

/****************
**Functions
*****************/
function init() {


  storedList = JSON.parse(localStorage.getItem("todo-list"));
  if (storedList) {
   storedList.forEach(function (item, index) {
    const storedLI = document.createElement('li');
    const storedText = document.createTextNode(/*index + '. ' + */item);
    storedLI.id = 'taskID-' + counter;
    storedLI.draggable = "true";
    storedLI.classList = 'drag-me';
    storedLI.setAttribute("ondragstart", "drag(event)");
    storedLI.appendChild(storedText);
    document.getElementById('list-items').appendChild(storedLI);
    counter++;
  })
} else {
  return storedList = [];
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
  console.log(ev.target.id);
}

function drop(ev, el) {
  ev.preventDefault();
  el = document.getElementById('finished-task');
  var data = ev.dataTransfer.getData('text');
  el.appendChild(document.getElementById(data));
}

function putBack(ev, el) {
  ev.preventDefault();
  el = document.getElementById('new-task');
  var data = ev.dataTransfer.getData('text');
  el.appendChild(document.getElementById(data));
}

/****************
**Event Listeners
*****************/

// window.addEventListener('DOMContentLoaded', () => {
//   var dragItem = document.getElementsByClassName('drag-me');
// })

form.addEventListener('submit', function(e) {

  //  1. prevent default
  e.preventDefault();

  //  2. check to see if input is empty
  if (task.value === '') {
    document.querySelector('.small').style.display="block";
  } else {
    //  2. create new element
    var newLI = document.createElement('li');
    newLI.classList = 'drag-me';
    newLI.id = 'taskID-' + counter;
    newLI.draggable = "true";
    newLI.setAttribute("ondragstart", "drag(event)");
    var taskText = document.createTextNode(addTask.value);
    storedList.push(addTask.value);
    //  3. give element things
    newLI.appendChild(taskText);
    //  4. grab where the element goes
    var listContainer = document.getElementById('list-items');
    //  5. append to end of new element
    listContainer.appendChild(newLI);

    //  6. Reset Input, Increase Counter For ID
    addTask.value = '';
    document.querySelector('.small').style.display="none";
    localStorage.setItem('todo-list', JSON.stringify(storedList));
    counter ++;
  }
});

document.getElementById('reset-button').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.clear();
  location.reload();
  addTask.value = '';
});
