const fs = require("fs");
const csv = require("csvtojson");
const Table = require("cli-table");
var color = require("colors-cli");

// async/await required for to read csv from file
const viewTodo = async () => {
  const csvFilePath = "./todoList.csv";

  // Read todoList.csv and convert to json using csvtojson
  const todoJson = await csv().fromFile(csvFilePath);

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
  todoJson.forEach((item) => {
    // First value = col1, Second value = col2, etc
    table.push([
      color.yellow(item.Title),
      color.blue(item.Description),
      item.Date,
    ]);
  });

  console.log(table.toString());
};

module.exports = viewTodo;
