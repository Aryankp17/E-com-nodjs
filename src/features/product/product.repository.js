import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handling/applicationError.js";

class ProductRepository{
    constructor(){
        this.collection = "products" ;
    }
    async add(newProduct){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;

        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with datadase' ,500);
        }

    }
    async GetAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
             return await collection.find().toArray();
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with datadase' ,500);
        }
        

    }
    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id:new ObjectId(id)})
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with datadase' ,500);

        }

    }
    async filter(minPrice,maxPrice,category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price ={$gte: parseFloat(minPrice)};
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price,$lte: parseFloat(maxPrice)};
            }
            if(category){
                filterExpression.price = category;
            }
            return collection.find(filterExpression).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with datadase' ,500);

        }

    }
    rate(userID, productID, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            collection.updateOne({
                _id: new ObjectId(productID)
            },{
                $push:{rating:{userID:new ObjectId(userID),rating}}
            })
        }catch(err){
            console.log(err);
            throw new ApplicationError('Something went wrong with datadase' ,500);
            
        }
    }
    
    


}
export default ProductRepository;