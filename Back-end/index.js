const express = require("express");
const path = require("path");
const cors = require("cors");
let Todo = require("../Back-end/db/schemas/todoSchema");
const dbConnection = require("../Back-end/db/todoDB_Connect");
let PORT = process.env.PORT || 8005;
const app = express();

// database connection
dbConnection;

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//views

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes

app.get("/todos", async (req, res) => {
  try {
    const getTodo = await Todo.find();
    return res.status(200).json(getTodo);
  } catch (error) {
    console.error(error);
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  try {
    const addTodo = await Todo.create({
      title: title,
      description: description,
      // completed: completed,
    });
    return res.status(200).json({ Message: "Added Todo successfully" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

app.delete("/todos/:_id", async (req, res) => {
  try {
    let todoId = req.params._id;
    let deleteTodo = await Todo.findByIdAndDelete(todoId);
    if (!deleteTodo) {
      return res.status(404).json({ error: "Todo Not Found" });
    }
    return res.status(200).json({ message: "Todo Delete Successfully" });
  } catch (error) {
    console.error("Error In Deleting The Todo", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/todos/:_id", async (req, res) => {
  try {
    let todoId = req.params._id;
    let { title, description } = req.body;
    let updateTodo = await Todo.findByIdAndUpdate(
      todoId,
      { title: title, description: description },
      { new: true }
    );
    if (!updateTodo) {
      return res.status(404).json({ error: "Todo Not Found" });
    }
    return res.status(200).json({ message: "Todo Update Successfully" });
  } catch (error) {
    console.error("Error In UpdateTodo", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/todos/:_id", async (req, res) => {
  try {
    let todoId = req.params._id;
    let isCompleted = Boolean(req.body.completed);
    let markComplete = await Todo.findByIdAndUpdate(todoId, {
      completed: isCompleted,
    });
    if (!markComplete) {
      return res.status(404).json({ error: "Todo Not Found" });
    } else {
      return res.status(200).json({ message: "Todo Marked Completed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Running On http://localhost:${PORT}`);
});
