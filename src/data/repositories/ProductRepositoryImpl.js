// Data Layer: Product Repository Implementation
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { productsData } from '../productsData';

export class ProductRepositoryImpl extends ProductRepository {
  async getProducts() {
    // Convert data to Product entities
    return productsData.map(product =>
      new Product(
        product.id,
        product.title,
        product.description,
        product.image,
        product.price,
        product.category
      )
    );
  }
}

