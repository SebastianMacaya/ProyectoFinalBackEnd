const fs = require("fs");

class Carrito {
  carritos;
  constructor() {
    this.carritos = JSON.parse(
      fs.readFileSync("./carrito.json", (encoding = "utf8"))
    );
  }
  async crearCarrito(req, res) {
    const nuevoCarrito = {};
    nuevoCarrito.id = this.carritos.length + 1;
    nuevoCarrito.productos = [];
    this.carritos.push(nuevoCarrito);
    await fs.promises.writeFile(
      "./carrito.json",
      JSON.stringify(this.carritos)
    );
    res.json({
      data: nuevoCarrito,
      status: `Fue creado el carrito su id es ${nuevoCarrito.id}`,
    });
  }

  async borrarCarritoPorId(req, res) {
    const id = Number(req.params.id);
    const result = this.carritos.filter((carrito) => carrito.id !== id);
    console.log(result);
    await fs.promises.writeFile("./carrito.json", JSON.stringify(result));
    res.json({ nota: `Fue borrado el carrito id : ${id}` });
  }
  async buscarCarritoPorId(req, res) {
    let id = Number(req.params.id);
    let text = this.carritos.find((val) => id == val.id);
    return res.json(text ? text : { error: "Carrito no encontrado" });
  }
}

module.exports = Carrito;
