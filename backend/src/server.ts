import express from "express";

const PORT = 3000;
const app = express();

//router
app.get("/", (req, res) => {
  res.send("Hello world");
});

//starting server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
