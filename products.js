const fs = require("fs");
const archivo = JSON.parse(fs.readFileSync("./data.json", (encoding = "utf8")));
const archivoCarrito = JSON.parse(
  fs.readFileSync("./carrito.json", (encoding = "utf8"))
);
class Product {
  async create(req, res) {
    const dataTemporal = archivo;
    const newProduct = req.body;
    newProduct.id = dataTemporal.length + 1;
    dataTemporal.push(newProduct);
    await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
    res.json({ data: newProduct, status: "Fue creado el producto" });
  }

  async updateById(req, res) {
    const dataTemporal = archivo;
    const id = req.params.id;
    const temporal = req.body;
    temporal.id = id;
    if (id <= dataTemporal.length) {
      dataTemporal[id - 1] = temporal;
      await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
      res.json({ nota: "Fue modificado el producto" });
    } else {
      res.json({ nota: "No existe ese producto" });
    }
  }
  async deleteById(req, res) {
    const dataTemporal = archivo;
    const id = req.params.id;
    const temporal = {
      id: id,
    };
    dataTemporal[id - 1] = temporal;
    await fs.promises.writeFile("./data.json", JSON.stringify(dataTemporal));
    res.json({ nota: "Fue borrado el producto" });
  }

  async getAll(req, res) {
    const dataTemporal = archivo;
    res.json(dataTemporal);
  }

  async findById(req, res) {
    const dataTemporal = archivo;
    let id = req.params.id;
    let text = dataTemporal.find((val) => id == val.id);
    return res.json(text ? text : { error: "Producto no encontrado" });
  }
  async insertarProductoEnCarrito(req, res) {
    const productosCarrito = archivoCarrito; //leo carrito.json
    const productos = archivo; //leo productos.json
    let id = req.body.id; //id del producto
    let idJson = Number(req.params.id); //
    let text = productos.find((val) => id == val.id); //busco el producto por id
    const newProduct = text; //Producto encontrado por el id
    console.log(productosCarrito[idJson - 1]);
    productosCarrito[idJson - 1].productos.push(newProduct);
    await fs.promises.writeFile(
      "./carrito.json",
      JSON.stringify(productosCarrito)
    );
    res.json({
      data: newProduct,
      status: "Fue creado el producto dentro del carrito",
    });
  }
}

module.exports = new Product();
