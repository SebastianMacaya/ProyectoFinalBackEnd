import { Router } from "express";

import { productsControllers } from "../controllers/index.js";

const productsRouter = Router();
productsRouter
  .get("/:id?", productsControllers.getProducts)
  .post("/", productsControllers.saveProduct)
  .delete("/:id", productsControllers.deleteProduct)
  .put("/:id", productsControllers.updateProduct);

export default productsRouter;
