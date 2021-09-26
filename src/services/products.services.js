import Services from "./all.services.js";

class ProductServices extends Services {
  constructor(model) {
    super(model);
  }
  getProducts = async () => await this.getAll();
  getProductsById = async (id) => await this.getById(id);
  createProduct = async (product) => await this.createDocument(product);
  deleteProductById = async (id) => await this.deleteById(id);
  updateProductById = async (id, product) => {
    const { title, description, price, stock, thumbnail } = product;
    try {
      await this.model.findByIdAndUpdate(id, {
        title,
        description,
        price,
        stock,
        thumbnail,
      });
      const updated = await productModel.findById(id);
      return updated;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProductServices;
