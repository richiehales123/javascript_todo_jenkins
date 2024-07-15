const fs = require("fs");
const csv = require("csvtojson");
const Table = require("cli-table");
var color = require("colors-cli");

// async/await required for to read csv from file
const viewTodo = async (answer) => {
  const today = new Date();
  let todosToView = [];

  // Read todoList.csv and convert to json using csvtojson
  const csvFilePath = "./todoList.csv";
  const todoJson = await csv().fromFile(csvFilePath);

  // Filter/sort data from users selection
  if (answer === "missed") {
    sortedTodos = todoJson.filter((todo) => new Date(todo.Date) < today);
  } else if (answer === "urgentFirst") {
    sortedTodos = todoJson.sort((a, b) => new Date(a.Date) - new Date(b.Date));
  } else if (answer === "urgentLast") {
    sortedTodos = todoJson.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  } else {
    sortedTodos = todoJson.filter((todo) => new Date(todo.Date) > today);
  }

  // Display todoJson in table
  // https://www.npmjs.com/package/cli-table

  // Table Setup / layout
  const table = new Table({
    // Set headers
    head: ["Title", "Description", "Due Date"],
    // Set table column widths
    colWidths: [25, 50, 15],
  });

  // Add rows to the table
  sortedTodos.forEach((item) => {
    // First value = col1, Second value = col2, etc
    table.push([color.yellow(item.Title), color.blue(item.Description), item.Date])
  });

  console.log(table.toString());
};

module.exports = viewTodo;
