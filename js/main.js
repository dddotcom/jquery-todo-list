var LOCAL_STORAGE_KEY = "toDoList";
var todoDescriptions = [];

$(document).ready(function() {
  console.log("DOM loaded");
  //load things from local storage
  displayItemsFromLocalStorage();

  //prevent page from refreshing when enter is pressed
  $('#addTodoForm').submit(function(e){
      e.preventDefault();
 });

  $("#add-button").click(addToDoItem);

  $("#todo-list").on('click', 'button', removeToDoItem);
  $('#todo-list').on('click', '.todo-checkbox', crossOutToDoItem);

  $("#todo-list").sortable();
  $("#todo-list").disableSelection();

})

function crossOutToDoItem(){
  var ischecked= $(this).is(':checked');
  var crossOutItem = $(this).parent().parent().children(".todo-desc").children("p").text();
  if(ischecked){
    $(this).parent().parent().children(".todo-desc").children("p").html("<strike>" + crossOutItem + "</strike");
  } else {
    $(this).parent().parent().children(".todo-desc").children("p").html(crossOutItem);
  }
}

function removeToDoItem() {

  //remove the todo-item
  var todoItem = $(this).parent().parent();
  todoItem.remove();

  //get the toDoItemDescription that you are removing
  //remove from local storage
  var removeItem = $(this).parent().parent().children(".todo-desc").children("p").text();
  removeFromLocalStorage(  removeItem );

  $('#error-msg').css('visibility', 'visible').css('color', '#40bf79');
  $('#error-msg').html("Crossed " + removeItem + " off the list!");

}

function addToDoItem() {
  //only add if there is a value there
  if($("#newtodo").val()){
    var newToDo = $("#newtodo").val();

    //create new todo item
    var newItem = $("<div>").addClass("todo-item");
    var newItemDesc = $("<div>").addClass("todo-desc");
    var newRemove = $("<div>").addClass("todo-remove");
    var newButton = $("<button>").addClass("remove-button").text("Remove");
    var newDesc = $("<p>").text(newToDo);

    //add checkbox
    var newCheckbox = $('<input type="checkbox">').addClass("todo-checkbox");

    //add it to the todo list
    newItemDesc.append(newDesc);
    newRemove.append(newButton);
    newItem.append(newItemDesc);
    newItem.append(newRemove);
    newRemove.append(newCheckbox);
    $("#todo-list").append(newItem)

    $('#error-msg').css('visibility', 'visible').css('color', '#40bf79');
    $('#error-msg').html("Added " + newToDo + " to the list!");

    //add to local storage
    addToLocalStorage(newToDo);

    //reset input field
    resetInputField();
  } else {
    $('#error-msg').css('visibility', 'visible');
  }

}

function resetInputField() {
  $("#newtodo").val('');
  $("#newtodo").focus();
}

function displayItemsFromLocalStorage(){
  if(localStorage.getItem(LOCAL_STORAGE_KEY)){
      todoDescriptions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

      for(var i = 0; i < todoDescriptions.length; i++){

        //create new todo item
        var newItem = $("<div>").addClass("todo-item");
        var newItemDesc = $("<div>").addClass("todo-desc");
        var newRemove = $("<div>").addClass("todo-remove");
        var newButton = $("<button>").addClass("remove-button").text("Remove");
        var newDesc = $("<p>").addClass("todo-remove").text(todoDescriptions[i]);

        //add checkbox
        var newCheckbox = $('<input type="checkbox">').addClass("todo-checkbox");

        //add it to the todo list
        newItemDesc.append(newDesc);
        newRemove.append(newButton);
        newRemove.append(newCheckbox);
        newItem.append(newItemDesc);
        newItem.append(newRemove);
        $("#todo-list").append(newItem)
      }
  }
}

function addToLocalStorage(todoDesc){
  todoDescriptions.push(todoDesc);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoDescriptions));
}

function removeFromLocalStorage(todoDesc){
  //get index of description
  var index = todoDescriptions.indexOf(todoDesc);

  //delete that item from local storage
  todoDescriptions.splice(index, 1);

  //update local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoDescriptions));
}
