const ObjectsToCsv = require("objects-to-csv");
const { prompt } = require("enquirer");
const viewTodo = require("./viewTodo");

const editSelectedTodoField = async (todoJson, todoFieldToEdit, todoToEdit) => {
  // Get input for update from user
  const response = await prompt({
    type: "input",
    name: "updatedValue",
    message: `Update ${todoFieldToEdit} with:`,
  });

  // Update correct todo and field with user input
  todoJson.forEach((todo) => {
    if (todo.Title === todoToEdit) {
      todo[todoFieldToEdit] = response.updatedValue;
    }
  });

  // Convert todoList to csv
  const csvTodoList = new ObjectsToCsv(todoJson);

  // Save / push csvTodoList to existing todoList.csv
  await csvTodoList.toDisk("./todoList.csv");

  // Display updated csv file
  await viewTodo();
};

module.exports = editSelectedTodoField;
