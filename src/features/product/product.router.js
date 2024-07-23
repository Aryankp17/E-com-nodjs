import express from "express";
import ProductController from "./product.controller.js";
import {upload} from '../../middleware/fileupload.middleware.js';

const ProductRouter = express.Router();
const productController = new ProductController;

ProductRouter.get('/', (req,res)=>{
   productController.getAllproducts(req,res)
});
ProductRouter.get('/filter',(req,res)=>{
    productController.filterProduct(req,res)
});
ProductRouter.post('/',upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res)
});
ProductRouter.get('/:id',(req,res)=>{
    productController.getOneProduct(req,res)
});
ProductRouter.post('/rate',(req,res)=>{
    productController.rateproducts(req,res)
});
export default ProductRouter;