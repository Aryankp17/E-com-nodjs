import ProductModel from "../product/product.model.js";
import usermodel from "../product/user/user.model.js";
let carts = [];
export default class CartModel{
    constructor(productID,userID,quantity,id){
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id
    }
    static add(productID,userID,quantity){

        const product = ProductModel.products.find(p=>p.id===productID);
        if(!product){
            return 'product not found';
        }
        const user = usermodel.getAll().find(u=>u.id===user);
        if(!user){
            return 'user not found';
        }
        const cart = new CartModel(productID,userID,quantity,carts.length+1);
        carts.push(cart);
        return carts;

    }
    static get(userID){
        const userCarts = carts.filter(u=>u.userID===userID);
        if(userCarts.length===0){
            return 'user not found';
        }else{
            return userCarts;
        }
    }
    static delete(cartID,userID){
        const cartIndex = carts.findIndex(i=>i.id===cartID && i.userID===userID);
        if(cartIndex===-1){
            return 'item not found';
        }else{
             carts.splice(cartIndex,1);
             return carts;
        }
    }
    
}
// var carts = [ new cartmodel(1,2,1)];
carts.push(new CartModel(1,2,1,1));