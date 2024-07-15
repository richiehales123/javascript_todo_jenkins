const { Select } = require("enquirer");
const editSelectedTodoField = require("./editSelectedTodoField");

const editSelectedTodo = async (todoJson, todoToEdit) => {
  // Find todo to be updated using todoToEdit selected by user
  const selectedTodo = todoJson.find((item) => item.Title === todoToEdit);

  if (!selectedTodo) {
    console.log(`Todo with title '${todoToEdit}' not found.`);
    return;
  }

  // Map keys for choices
  const choices = Object.keys(selectedTodo);

  // Get field to edit from user
  const select = new Select({
    name: "todoFieldToEdit",
    message: "Which field do you want to edit?",
    choices: choices,
  });

  const todoFieldToEdit = await select.run();
  await editSelectedTodoField(todoJson, todoFieldToEdit, todoToEdit);
};

module.exports = editSelectedTodo;
