import ProductServices from "../services/products.services.js";
import { productModel } from "../models/product.model.js";

const productServices = new ProductServices(productModel);

export const getProducts = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const product = await productServices.getProductsById(id);
    if (product) {
      res.status(200).send({ product });
    } else {
      res.send("el producto que busco no existe");
    }
  } else {
    try {
      const products = await productServices.getProducts();
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
    }
  }
};

export const saveProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await productServices.createProduct(newProduct);
    res.status(200).send(`Producto creado: ${product}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const borrado = await productServices.deleteProductById({ _id: productId });
    if (borrado) {
      res.status(200).send({ borrado });
    } else {
      res.send("el producto no existe");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const productoNuevo = req.body;

  try {
    const modificado = await productServices.updateProductById(
      productId,
      productoNuevo
    );
    res.status(200).send({ modificado });
  } catch (error) {
    console.log(error);
  }
};
