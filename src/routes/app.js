const { Router } = require("express");
const fs = require("fs");

const router = Router();
router.get("/", (req, res) => {
  res.sendFile(__dirname + "../");
});

//GET ALL
router.get("/api/productos", async (req, res) => {
  const lista = new Contenedor("archivo.txt");
  const response = await lista.getAll();
  res.json(response);
});

//GET BY ID
router.get("/api/productos/:id", async (req, res) => {
  const lista = new Contenedor("archivo.txt");
  const response = await lista.getByID(Number(req.params.id));
  await res.json(response);
});
//POST
router.post("/api/productos", async (req, res) => {
  const lista = new Contenedor("archivo.txt");

  const response = await lista.save(req.body);
  await res.json(response);
});

// PUT BY ID

router.put("/api/productos/:id", async (req, res) => {
  const lista = new Contenedor("archivo.txt");
  const response = await lista.getAll();
  console.log(typeof response);

  const anterior = await lista.getByID(Number(req.params.id));

  const nuevo = await lista.updateById(Number(req.params.id), req.body);

  console.log(typeof anterior);
  console.log(typeof nuevo);

  if (anterior) {
    res.json({ anterior, nuevo });
  } else {
    res.json("El producto que se intenta actualizar no existe.");
  }
});

//GET RANDOM
router.get("/api/productoRandom", async (req, res) => {
  getRandomItem();
  await res.json("test");
});

const p1 = {
  title: "Escuadra",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

const p2 = {
  title: "Calculadora",
  price: 234.56,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

const p3 = {
  title: "Globo Terráqueo",
  price: 345.67,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
};
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.id = 0;
    this.data = [p1, p2, p3];
  }
  stringifiar = (array) => JSON.stringify(array, null, 2); // Método para stringifiar el Array y evitar la repetición del código.

  async saveTxt(productos) {
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
    } catch (error) {}
  }
  async save(obj) {
    await this.getAll();
    this.id++;
    this.data = [...this.data, { ...obj, id: this.id }];
    try {
      await this.saveTxt(this.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getByID(id) {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (!data) return;
      const producto =
        JSON.parse(data).find((producto) => producto.id === id) ||
        "{ error : 'producto no encontrado' }";
      return producto;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data) {
        this.data = JSON.parse(data);
        this.data.map((producto) => {
          if (this.id < producto.id) this.id = producto.id;
        });
        return this.data;
      }
    } catch (error) {
      return;
    }
  }
  async deleteById(id) {
    try {
      let data = await fs.promises.readFile(this.archivo, "utf-8");
      data = JSON.parse(data);
      if (!data) return;
      const productoIndex = data.findIndex((element) => element.id === id);
      if (productoIndex === -1) return;

      data.splice(productoIndex, 1);
      await this.saveTxt(data);
    } catch (error) {}
  }
  deleteAll() {
    this.saveTxt([]);
  }

  updateById = async (id, newProduct) => {
    let lista = await this.getAll();

    // Buscar qué posición en el Array de productos tiene el producto con el id buscado:

    const index = lista.findIndex((product) => product.id == id);

    let producto = lista[index];

    // Verificar primero si el producto con ese id existe.

    if (producto) {
      // Desestructuración de las propiedades del nuevo producto:

      const { title, price, thumbnail } = newProduct;

      // Actualizar los datos:

      producto.title = title;
      producto.price = price;
      producto.thumbnail = thumbnail;

      // Insertar el producto modificado en la lista:

      lista[index] = producto;
      const nuevaListaJson = this.stringifiar(lista);
      console.log(typeof producto);
      await this.saveTxt(nuevaListaJson);

      return producto;
    } else {
      return null;
    }
  };
}
async function getRandomItem() {
  fs.readFile("archivo.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
    } else {
      data = JSON.parse(data);
      const getRandom = data[Math.floor(Math.random() * data.length)];
      return getRandom;
    }
  });
}

module.exports = router;
