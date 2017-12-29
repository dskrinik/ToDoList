var TEXTF = document.querySelector('.textBox');

//uncheck the checkbox when edit button is clicked
//and make its tasks editable
var editTask = function (element) {
  //element is inside 2nd td (table cell)

  var pointer = $(element).closest('tr');//this row level

  //uncheck the checkbox incase it's checked
  $(pointer).find('input').prop('checked', false);

  //remove crossOut line by calling crossOutIfCheked
  var argument = $(pointer).find('input:first');//checkbox element level
  crossOutIfCheked(argument);

  //make task editable
  $(pointer).find('label').attr('contenteditable', true);
  $(pointer).find('label').focus();
};

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
var crossOutIfCheked = function (element) {
  //element need to point to 1sr td div
  //when crossOutIfCheked is called directly from html,element is inside 1rs td
  //when other functions call crossOutIfCheked, pass element as div
  var pointer;
  if ($(element).is('div')) {
    pointer = element;
  }
  pointer = $(element).parent();//1st td div level
  var cBox = $(pointer).find('input');//input element is where checkbox located
  if (cBox.is(':checked')) {
    $(pointer).find('label').css({ 'text-decoration': 'line-through' });
  } else {
    $(pointer).find('label').css({ 'text-decoration': '' });
  }
};

//addbutton creating and adding new tasks
var addButton = document.querySelector('.addButton');
addButton.addEventListener('click',
  function (e) {
    buttonAddsTask(e, this);
  }, false);

//crete space for a new task and add it to the table via the addButton
var buttonAddsTask = function (e, current) {

  //prevent from textbox to instantly process
  e.preventDefault();
  current = TEXTF.value;
  if (current == '') {
    alert('Pease enter a task');
  } else {
    var table = document.getElementById('table1');
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
    TEXTF.value = '';
  }
}

//textfield adds a new taks
TEXTF.addEventListener('keyup',
  function (e) {
    enterAddsTask(e, this);
  },

  false);

//create space for a new task and add it to the table via the text field
function enterAddsTask(e, current) {
  e.preventDefault();
  current = TEXTF.value;
  if (current == '') {
    alert('Pease enter a task');
  } else {
    if (e.keyCode === 13) { //this is the diff from the addbutton
      var table = document.getElementById('table1');
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
      TEXTF.value = '';
    }
  }
}
