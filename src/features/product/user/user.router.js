import express from 'express';
import userController from './user.controller.js';
const userrouter = express.Router();


const UserController = new userController;


userrouter.post('/signup',(req,res)=>{
    UserController.signup(req,res)
})
userrouter.post('/signin',(req,res)=>{
    UserController.signin(req,res)
})

export default userrouter;