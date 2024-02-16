const mongoose = require("mongoose");

let dbConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/Todo_Application")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error(`Error:${error}`);
  });

module.exports = dbConnection;
