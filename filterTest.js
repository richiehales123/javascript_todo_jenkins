let arr = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
  {
    id: 3,
    name: "Bob",
  },
  {
    id: 4,
    name: "Alice",
  },
];

arr = arr.filter((item) => item.id !== 2);

console.log(arr);
