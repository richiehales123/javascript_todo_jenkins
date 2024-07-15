const { Select } = require("enquirer");
const addTodo = require("./addTodo");
const deleteTodo = require("./deleteTodo");
const editTodoSelect = require("./editTodoSelect");
const color = require("colors-cli");
const figlet = require("figlet");
const selectView = require("./selectView");

let displayMainMenu = true;

// async/await required for functions containing enquirer modules
// Run correct function specified by user
const runSelection = async (menuSelection) => {
  if (menuSelection === color.green("Add todo")) {
    await addTodo();
  } else if (menuSelection === color.red("Delete todo")) {
    await deleteTodo();
  } else if (menuSelection === color.blue("View todo")) {
    await selectView();
  } else if (menuSelection === color.yellow("Edit todo")) {
    await editTodoSelect();
  } else {
    console.log("Exit selected");
    // Exit main menu loop
    displayMainMenu = false;
  }
};

const startApp = async () => {
  // Ascii art display
  figlet("Richie's Todo CLI App", async function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(color.yellow(data));

    // Display main menu until Exit selected
    // Run inside figlet to ensure figlet completes before menu is displayed
    while (displayMainMenu) {
      const prompt = new Select({
        name: "todo",
        message: "Select from below:",
        choices: [
          color.green("Add todo"),
          color.red("Delete todo"),
          color.blue("View todo"),
          color.yellow("Edit todo"),
          "Exit",
        ],
      });

      // Set menuSelection when user selects an option
      const menuSelection = await prompt.run();
      // runSelection with users selected option
      await runSelection(menuSelection);
    }

    // Exit app when while loop completes
    console.log("Exiting...");
  });
};

startApp();

