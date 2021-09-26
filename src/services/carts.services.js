import Services from "./all.services.js";

class CartServices extends Services {
  constructor(model) {
    super(model);
  }

  getCarts = async () => await this.getAll();

  getCartById = async (id) => await this.getById(id);

  createCart = async (cart) => await this.createDocument(cart);

  deleteCartById = async (id) => await this.deleteById(id);

  deleteProduct = async (cartId, productId) => {
    try {
      const cart = await this.model.findById(cartId);

      // Usar JavaScript básico para borrar el producto del carrito:
      const index = cart.products.findIndex(
        (product) => product._id == productId
      );
      cart.products.splice(index, 1);

      // Guardar el documento en MongoDB
      cart.save();

      return productId;
    } catch (error) {
      console.log(error);
    }
  };

  addProduct = async (cartId, newProduct) => {
    try {
      const cart = await this.model.findById(cartId);

      // Usar JavaScript común para agregar producto al carrito:
      cart.products.push(newProduct);

      // Guardar el Documento en MongoDB:
      cart.save();

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async (id) => {
    try {
      const cart = await this.model.findById(id);

      const productos = await cart.products;

      return productos;
    } catch (error) {
      console.log(error);
    }
  };
}

export default CartServices;
