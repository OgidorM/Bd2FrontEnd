// Use Case: Get Products
export class GetProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    return await this.productRepository.getProducts();
  }
}

