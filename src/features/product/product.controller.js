import { ApplicationError } from "../../error-handling/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository();
    }
    
    async getAllproducts(req,res){
        try{
            const products = await  this.productRepository.GetAll();
            res.status(200).send(products);

        }catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);

        }
    }
    async addProduct(req, res) {
        try{
            const { name,desc, price, sizes,imageURL } = req.body;
            const newProduct = new ProductModel(name,desc,imageURL,null, parseFloat(price),
                sizes.split(',')
            );
            const result = await this.productRepository.add(newProduct);
            res.status(201).send(result);
        }catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);
        }
    }
    async getOneProduct(req,res){
        try{
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if(!product){
                res.status(404).send('product not found');
            }else{
                return res.status(200).send(product);
            }

        }catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);

        }
    }
    async filterProduct(req,res){
        try{
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxprice;
            const category = req.query.category ;
            const result = await this.productRepository.filter(minPrice,maxPrice,category);
            res.status(200).send(result);
        }catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);

        }
    }
    async rateproducts(req,res){
        try{
            const userID = req.userID;
            const productID = req.query.productID;
            const rating =req.query.rating;
            const error = await this.productRepository.rate(userID,productID,rating);
            if(error){
                return res.status(400).send(error);
            }else{
                return res.status(200).send('rating added successfully');
            }
        }catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);

        }
    }

}