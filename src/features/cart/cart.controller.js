import cartmodel from "./cart.model.js";


export default class cartcontroller{
    add(req,res){
        const {productID,quantity} = req.query;
        const userID = req.userID;
        const error = cartmodel.add(productID,userID,quantity);
        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(201).send('item added successfully');
        }


    }
    delete(req,res){
        const cartid = req.params.id;
        const userID = req.userID;
        const error = cartmodel.delete(cartid,userID);
        if(error){
            return res.status(404).send(error)
        }else{
            return res.status(200).send('item deleted');
        }
    }
}