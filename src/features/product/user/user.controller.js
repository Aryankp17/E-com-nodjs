import { ApplicationError } from "../../../error-handling/applicationError.js";
import usermodel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export   default class userController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signup(req,res){
        try{
            const{id,name,email,password,type} = req.body;
            const hashedpassword  = await bcrypt.hash(password,12);
            const user = new usermodel(id,name,email,hashedpassword,type);
            await this.userRepository.signup(user);
            res.status(201).send(user);
        }catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);
        }
        

    }
    async signin(req,res){
        try{
            const user = await this.userRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(404).send('Invalid Email');

            }else{
                const result = await  bcrypt.compare(req.body.password,user.password);
                if(result){
                    const token = jwt.sign(
                        {
                            UserID: result.id,
                            email: result.email,
                        },
                    
                        'BNddarguHc39iIZ6U3EjOQank4zetVYo'
                        ,
                        {
                            expiresIn:'10h',
                        }
                    );
                    return res.status(200).send(token);
                }else{
                    return res.status(404).send('Invalid Credentials');
                }
            }
        }
        catch(err){
            console.log(err)
            throw new ApplicationError("something went wrong",400);
        }
        
    }
}