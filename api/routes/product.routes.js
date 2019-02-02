import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
const router = new Router();

// add product
router.route('/product/add').post(ProductController.addProduct);

// get all Products
router.route('/product/getProducts').post(ProductController.getProducts);

export default router;
