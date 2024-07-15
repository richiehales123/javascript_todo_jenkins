const csv = require("csvtojson");
const { Select } = require("enquirer");
const ObjectsToCsv = require("objects-to-csv");
const viewTodo = require("./viewTodo");

const deleteTodo = async () => {
  // Display current todos
  await viewTodo();

  // Read todoList.csv and convert to json using csvtojson
  const csvFilePath = "./todoList.csv";
  const todoJson = await csv().fromFile(csvFilePath);

  // Extract todo titles and map to choices
  const choices = todoJson.map((item) => item.Title);

  // Add 'Cancel' to end of mapped choices
  choices.push("Cancel");

  // Define the prompt for selecting a todo to delete
  const prompt = new Select({
    name: "todo",
    message: "Select todo to delete from below:",
    choices: choices,
  });

  // Function to handle the deletion process
  const deleteSelection = async (todoToDelete) => {
    if (todoToDelete === "Cancel") {
      console.log("Delete Cancelled");
      return;
    }

    // Filter the todo list to remove the selected todo
    const updatedTodoList = todoJson.filter(
      (item) => item.Title !== todoToDelete
    );

    // Convert updated todo list to CSV
    const csvTodoList = new ObjectsToCsv(updatedTodoList);

    // Save updated CSV back to the file
    await csvTodoList.toDisk(csvFilePath);

    // Display updated todo list
    await viewTodo();
  };

  // Run the prompt and handle the selected todo
  const todoToDelete = await prompt.run();
  await deleteSelection(todoToDelete);
};

module.exports = deleteTodo;
