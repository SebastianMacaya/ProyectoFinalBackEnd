const express = require("express");
const app = express();
const fs = require("fs");

app.get("/productos", (req, res) => {
  const lista = new Contenedor("archivo.txt");
  res.json(lista.data);
});
app.get("/productoRandom", async (req, res) => {
  res.json(await getRandomItem());
});

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en ${PORT}`);
});

server.on("error", (error) => console.log(error));

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

  async saveTxt(productos) {
    try {
      console.log(productos);
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
        JSON.parse(data).find((producto) => producto.id === id) || null;
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
}

async function getRandomItem() {
  const lista = new Contenedor("archivo.txt");
  const getRandom = lista.data[Math.floor(Math.random() * lista.data.length)];
  return getRandom;
}
