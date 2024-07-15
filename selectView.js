const { Select } = require("enquirer");
const viewTodo = require("./viewTodo");
const viewTodoByDate = require("./viewTodoByDate");
var color = require("colors-cli");

const selectView = async () => {
  // Define choices for various view options
  const choices = [
    color.green("All"),
    color.red("Missed"),
    color.blue("Current"),
    color.yellow("Due - urgent first"),
    "Due - urgent last",
  ];

  // Add 'Cancel' to end of choices
  choices.push("Cancel");

  // async/await required for functions containing enquirer modules
  // Run correct function specified by user
  const runSelection = async (answer) => {
    if (answer === color.green("All")) {
      await viewTodo();
    } else if (answer === color.red("Missed")) {
      await viewTodoByDate("missed");
    } else if (answer === color.yellow("Due - urgent first")) {
      await viewTodoByDate("urgentFirst");
    } else if (answer === "Due - urgent last") {
      await viewTodoByDate("urgentLast");
    } else {
      await viewTodoByDate("upcoming");
    }
  };

  // Get field to view from user
  const prompt = new Select({
    name: "todo",
    message: "Which todos do you want to view?",
    choices: choices,
  });


  // Exit if user selects Cancel
  const answer = await prompt.run();
  if (answer === "Cancel") {
    console.log("View Cancelled");
    return;
  // Run function for user choice
  } else {
  await runSelection(answer);
  };
};

module.exports = selectView;
