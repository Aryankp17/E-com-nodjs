import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../error-handling/applicationError.js";

class UserRepository{
    async signup(newUser){
        try{
            const db = getDB();
            const collection = db.collection('users');
            await collection.insertOne(newUser);
            return newUser ;
        }catch(err){
            console.log(err)
            
            throw new ApplicationError('Something went wrong' ,500);
        }
    }
    async signin(email,password){
        try{
            const db = getDB();
            const collection = db.collection('users');
            return await collection.findOne({email,password});
        }catch(err){
            console.log(err)
            throw new ApplicationError('Something went wrong' ,500);
        }
    }
    async findByEmail(email){
        try{
            const db = getDB();
            const collection = db.collection('users');
            return await collection.findOne({email});
        }catch(err){
            console.log(err)
            throw new ApplicationError('Something went wrong' ,500);
        }
    }

}
export default UserRepository;