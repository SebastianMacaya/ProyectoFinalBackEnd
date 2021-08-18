const express = require("express");
const morgan = require("morgan");
const routes = require("./src/routes/routes");

const PORT = 8080;

//middleware
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use("/static", express.static(__dirname + "/public"));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Server on localhost:" + PORT);
});
