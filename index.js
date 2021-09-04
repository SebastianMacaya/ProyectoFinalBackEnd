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

app.use("/static", express.static(__dirname + "/index.html"));
app.use(express.static("public"));

//404 Route (default)
app.get("*", function (req, res) {
  res
    .status(404)
    .send(
      `{Error: -2, descripcion ruta : ${req.path} metodo : ${req.method} no implementada}`
    );
});
app.listen(PORT, () => {
  console.log("Server on localhost:" + PORT);
});
