var TEXTF = document.querySelector('.textBox');

//When task name is tabbed out it should no longer be editable
$('label').focusout(function () {
  $(this).attr('contenteditable', false);
});

//delete button function
$('.deleteButton').click(function () {
  $(this).closest('tr').remove();
});

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

//addbutton add new task
var addButton = document.querySelector('.addButton');
addButton.addEventListener('click',
  function (e) {
    setUpNewRow(e, this);
  });

//textfield add new taks
TEXTF.addEventListener('keyup',
  function (e) {
    setUpNewRow(e, this);
  });

//new task via textfield
function setUpNewRow(e, current) {
  e.preventDefault();

  //is button calling this method
  if (current.type == 'button') {
    current = TEXTF.value;
    if (current == '')
      alert('Please enter a task');
    else buildNewRow(current);
  }

  //textfield is calling this method
  else {
    current = TEXTF.value;
    if (e.keyCode === 13 && current != '') {
      buildNewRow(current);
    }

    if (current == '') {
      alert('Please enter a task');
    }
  }
}

//build new row
function buildNewRow(current) {
  var table = document.getElementById('table1');
  var row = table.insertRow(0);
  var c1 = row.insertCell(0);
  var c2 = row.insertCell(1);
  var c3 = row.insertCell(2);
  var newInputAndLabel = ('<input type="checkbox" class="checkBox" value="false"' +
          'onchange= "crossOutIfCheked(this);"><label>') +
        current + ('</label></div>');
  var newEdit = ('<input type="button" value="edit" class="editButton" onclick="editTask(this);">');
  var newDelete = ('<input type="button" value="delete" class="deleteButton">');
  c1.innerHTML = newInputAndLabel;
  c2.innerHTML = newEdit;
  c3.innerHTML = newDelete;
  TEXTF.value = '';

  //When task name is tabbed out it should no longer be editable
  $('label').focusout(function () {
    $(this).attr('contenteditable', false);
  });

  //delete button function
  $('.deleteButton').click(function () {
    $(this).closest('tr').remove();
  });
}
