import express from 'express';
import cartcontroller from './cart.controller.js';
const cartrouter = express.Router();


const Cartcontroller = new cartcontroller;
cartrouter.post('/',Cartcontroller.add);
cartrouter.delete('/',Cartcontroller.delete);

export default cartrouter;