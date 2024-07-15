const ObjectsToCsv = require("objects-to-csv");
const { prompt, Select } = require("enquirer");
const csv = require("csvtojson");
const viewTodo = require("./viewTodo");
var validateDate = require("validate-date");

// Input new todos and add to existing .csv file
const addTodo = async () => {
  let addEntry = true;

  // Questions for user to add new todo
  const questions = [
    {
      type: "input",
      name: "Title",
      message: "Todo Title",
    },
    {
      type: "input",
      name: "Description",
      message: "Todo Description",
    },
    {
      type: "input",
      name: "Date",
      message: "Due Date yyyy-mm-dd",
    },
  ];


  // Display current todolist
  await viewTodo();

  // Read todoList.csv and convert to json using csvtojson
  const csvFilePath = "./todoList.csv";
  const todoJson = await csv().fromFile(csvFilePath);

  // Allow user to input todo's until n is entered
  while (addEntry) {
    const select = new Select({
      name: "add",
      message: "Would you like to add a todo?",
      choices: ["y", "n"],
    });

    // Set add y or n when user selects an option
    const addResponse = await select.run();

    // if user answers n - exit add todo loop
    if (addResponse === "n") {
      addEntry = false;
      continue;
    }

    // Prompt the user for todo details
    let answers = [];
    let correctDate = false;
    while (!correctDate) {
      answers = await prompt(questions);
      correctDate = validateDate(answers.Date, responseType="boolean"); // validateDate returns true or false
      console.log(correctDate)
      if (!correctDate) {
        console.log("Invalid date format. Please enter the date in yyyy-mm-dd format.");
      }
    }

    // Push answers to todoJson
    todoJson.push(answers);

    // Convert todoList to csv
    const csvTodoList = new ObjectsToCsv(todoJson);

    // Save / push csvTodoList to existing todoList.csv
    await csvTodoList.toDisk("./todoList.csv");

    // Display updated todo list with additional todos
    await viewTodo();
  }

  console.log("Exiting...");
};

module.exports = addTodo;
