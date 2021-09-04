const { Router } = require("express");
const router = Router();
const Products = require("../../products");
const Carrito = require("../../carrito");
const carrito = new Carrito();
//Auth
function auth(req, res, next) {
  const { body } = req;
  if (body.user === "admin") {
    delete body.user;
    next();
  } else {
    res.status(400).send("No autorizado");
  }
}
//Routes Productos
router.post("/api/productos", auth, Products.create); //Only Admin Users
router.put("/api/productos/:id", auth, Products.updateById); //Only Admin Users
router.delete("/api/productos/:id", auth, Products.deleteById); //Only Admin Users
router.get("/api/productos", Products.getAll);
router.get("/api/productos/:id", Products.findById);

//Routes Carrito
router.post("/api/carrito", carrito.crearCarrito.bind(carrito));
router.delete(
  "/api/carrito/:id",
  auth,
  carrito.borrarCarritoPorId.bind(carrito)
);

module.exports = router;
