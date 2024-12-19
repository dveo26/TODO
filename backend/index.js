const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [
  {
    id: 1,
    desc: "Learn Node.js",
    status: "done",
  },
];

function Middleware(req, res, next) {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log(new Date());
  next();
}

app.use(Middleware);

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === Number(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const { desc, status } = req.body;

  if (!desc || !status) {
    return res.status(400).json({ error: "Invalid input" });
  }

  todos.push({ id: todos.length + 1, desc, status });
  res.json(todos);
});

app.put("/todos/:id", (req, res) => {
  const { desc, status } = req.body;

  if (!desc || !status) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const todo = todos.find((todo) => todo.id === Number(req.params.id));
  if (todo) {
    todo.desc = desc;
    todo.status = status;
    return res.json(todo);
  }

  res.status(404).json({ error: "Todo not found" });
});

app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.id === Number(req.params.id)
  );
  if (todoIndex !== -1) {
    const removedTodo = todos.splice(todoIndex, 1);
    res.json(removedTodo[0]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
