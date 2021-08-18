const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes/app");
const app = express();
app.use(express.static("public"));

const PORT = 3000;

//middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use(routes);
app.use("/static", express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("Server on localhost:" + PORT);
});
