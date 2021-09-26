import { Router } from "express";
import { cartControllers } from "../controllers/index.js";

const cartsRouter = Router();

cartsRouter
  .get("/:cartId?", cartControllers.getCarts)
  .get("/products/:cartId", cartControllers.getProductsInCart)
  .post("/", cartControllers.newCart)
  .delete("/:cartId", cartControllers.deleteCartById)
  .post("/products/:cartId/:productId", cartControllers.addProductToCart)
  .delete(
    "/products/:cartId/:productId",
    cartControllers.deleteProductFromCart
  );

export default cartsRouter;
