/* ---------------------------- subclases import ---------------------------- */
import CartServices from "../services/carts.services.js";
import ProductServices from "../services/products.services.js";

/* ----------------------------- modelos import ----------------------------- */
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const cartServices = new CartServices(cartModel);
const productServices = new ProductServices(productModel);

export const newCart = async (req, res) => {
  try {
    const cartId = await cartServices.createCart();
    res.status(200).send(`Carrito creado con id: ${cartId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getCarts = async (req, res) => {
  const { cartId } = req.params;

  if (cartId) {
    const cart = await cartServices.getCartById(cartId);
    if (cart) {
      res.status(200).send({ cart });
    } else {
      res.send("el carrito buscado no existe");
    }
  } else {
    try {
      const carts = await cartServices.getCarts();
      res.status(200).send({ carts });
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteCartById = async (req, res) => {
  const { cartId } = req.params;
  try {
    const borrado = await cartServices.deleteCartById(cartId);
    if (borrado) {
      res.status(200).send({ borrado });
    } else {
      res.send("el carrito no existe");
    }
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const newProduct = await productServices.getProductsById(productId);
    const addedProduct = await cartServices.addProduct(cartId, newProduct);
    if (addedProduct) {
      res.status(200).send(`Producto agregado al carrito: ${addedProduct}`);
    } else {
      res.send("Carito inexistente");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductsInCart = async (req, res) => {
  const { cartId } = req.params;

  if (cartId) {
    const cart = await cartServices.getCartById(cartId);
    const productsById = await cartServices.getProducts(cartId);
    if (cart) {
      res.status(200).send({ productsById });
    } else {
      res.send("el carrito buscado no existe");
    }
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { cartId } = req.params;

  if (cartId) {
  }
};
