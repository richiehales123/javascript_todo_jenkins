const today = new Date();
const desiredDate = new Date("2024-06-22");

if (desiredDate > today) {
  console.log("The desired date is in the future.");
} else if (desiredDate < today) {
  console.log("The desired date is in the past.");
} else {
  console.log("Today is the desired date!");
}
