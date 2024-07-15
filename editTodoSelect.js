const csv = require("csvtojson");
const { Select } = require("enquirer");
const viewTodo = require("./viewTodo");
const editSelectedTodo = require("./editSelectedTodo");

const editTodoSelect = async () => {
  // Display current todos
  await viewTodo();

  // Read todoList.csv and convert to json using csvtojson
  const csvFilePath = "todoList.csv";
  const todoJson = await csv().fromFile(csvFilePath);

  // Extract todo titles for choices
  const choices = todoJson.map((item) => item.Title);

  // Add 'Cancel' to end of mapped choices
  choices.push("Cancel");

  const select = new Select({
    name: "todoToEdit",
    message: "Select a todo to edit:",
    choices: choices,
  });

  const todoToEdit = await select.run();

  if (todoToEdit === "Cancel") {
    console.log("Edit Cancelled");
    return;
  }

  await editSelectedTodo(todoJson, todoToEdit);
};

module.exports = editTodoSelect;
