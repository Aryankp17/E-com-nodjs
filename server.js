import './env.js';
import express from 'express';
import swagger from 'swagger-ui-express';
import bodyparcer from 'body-parser';
import  ProductRouter from './src/features/product/product.router.js';
import userrouter from './src/features/product/user/user.router.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import cartrouter from './src/features/cart/cart.router.js';
import apidocs from './swagger.json' assert{type:'json'};
import loggerMiddleware from './src/middleware/logger.middleware.js';
import { ApplicationError } from './src/error-handling/applicationError.js';
import {connectToMangoDB} from './src/config/mongodb.js';


// server.get('/products', ProductController.getAllproducts)
const server = express();
server.use(bodyparcer.json());
server.use('/api-docs',swagger.serve,swagger.setup(apidocs));
server.use(loggerMiddleware);
server.use('/api/cart', jwtAuth,cartrouter);
server.use('/api/products', loggerMiddleware, jwtAuth,ProductRouter);
server.use('/api/user',userrouter);

server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send('Oops! Something went wrong... Please try again later!');

})

// server.get('/',(req,res)=>{
//     res.send("welcome to Ecommerce APIS")

// });

server.listen(3200,()=>{
    console.log("server is listening to 3200")
    connectToMangoDB();
})