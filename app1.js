const ADDB = document.querySelector('.addButton');
const TEXTF = document.querySelector('.textBox');

function editTask(element) {
  //if edit is clicked then uncheck the checkbox
  var p = element.parentNode.parentNode;
  var checkBox = p.querySelector('.checkBox');
  if (checkBox.checked)
    checkBox.checked = false;
  crossOutIfCheked(p.childNodes[1]);
  //now edit the task
  p.cells[0].getElementsByTagName('label')[0].setAttribute('contenteditable', 'true');
  p.cells[0].getElementsByTagName('label')[0].focus();
}

//When task name is tabbed out it should no longer be editable
function outOfFocus(element) {
  element.setAttribute('contenteditable', 'false');
}

//delete button function
function deleteTask(element) {
  var p = element.parentNode.parentNode;
  p.parentNode.removeChild(p);
}

//checkbox crosses the taskName
function crossOutIfCheked(element) {
  var p = element.parentNode;
  var checkBox = p.querySelector('.checkBox');
  if (checkBox.checked) {
    p.getElementsByTagName('label')[0].style.textDecoration = 'line-through';
  } else {
    p.getElementsByTagName('label')[0].removeAttribute('style');
  }
}

//addbutton creating and adding new tasks
ADDB.addEventListener('click',
      function (e) {
        addTaskButton(e, this)
      },
      false);
//crete space for a new task and add it to the table via the ADDbutton
 function addTaskButton(e, current) {
   e.preventDefault();
   current = TEXTF.value;
   if (current == "") {
     alert("Pease enter a task");
   } else {
     var table = document.getElementById("table1");
     var row = table.insertRow(0);
     var c1 = row.insertCell(0);
     var c2 = row.insertCell(1);
     var c3 = row.insertCell(2);
     var newInputAndLabel = ('<input type="checkbox" class="checkBox" value="false"' +
       'onchange= "crossOutIfCheked(this);"><label onfocusout = "outOfFocus(this);">') +
       current + ('</label></div>');
     var newEdit = ('<input type="button" value="edit" class="editButton" onclick="editTask(this);">');
     var newDelete = ('<input type="button" value="delete" class="deleteButton" onclick="deleteTask(this)">');
     c1.innerHTML = newInputAndLabel;
     c2.innerHTML = newEdit;
     c3.innerHTML = newDelete;
     TEXTF.value = "";
   }
 }

 //textfield adds a new taks
 TEXTF.addEventListener('keyup',
       function(e) {
           addTask(e, this);
       },
       false);
//create space for a new task and add it to the table via the text field
function addTask(e, current) {
  e.preventDefault();
  current = TEXTF.value;
  if (current == "") {
    alert("Pease enter a task");
  } else {
    if (e.keyCode === 13) {//this is the diff from the addbutton
      var table = document.getElementById("table1");
      var row = table.insertRow(0);
      var c1 = row.insertCell(0);
      var c2 = row.insertCell(1);
      var c3 = row.insertCell(2);
      var newInputAndLabel = ('<input type="checkbox" class="checkBox" value="false"' +
        'onchange= "crossOutIfCheked(this);"><label onfocusout = "outOfFocus(this);">') +
        current + ('</label></div>');
      var newEdit = ('<input type="button" value="edit" class="editButton" onclick="editTask(this);">');
      var newDelete = ('<input type="button" value="delete" class="deleteButton" onclick="deleteTask(this)">');
      c1.innerHTML = newInputAndLabel;
      c2.innerHTML = newEdit;
      c3.innerHTML = newDelete;
      TEXTF.value = "";
    }
  }
}
