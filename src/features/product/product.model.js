import { ApplicationError } from "../../error-handling/applicationError.js";
import usermodel from "./user/user.model.js";

export default class ProductModel{
    constructor(name,desc,imageURL,category,price,sizes,id){
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageURL = imageURL;
        this.category = category;
        this.sizes = sizes;
    }

    static get(id){
         const Product = products.find(i=> i.id==id)
         return Product;

    };
    static add(product){
        product.id = products.length+1;
        products.push(product);
        return(product);

    }

    static GetAll(){
        return products;
    }
    static filter(minprice,maxprice,category){
        const result = products.filter((product)=>{
            return(
                (!minprice || product.price>=minprice)&&
                (!maxprice || product.price<=maxprice)&&
                (!category || product.category==category)
            );
        })
        return result;
    }

    static rateProducts(userID, productID, rating){
        const user = usermodel.getAll().find(u=> u.id==userID);
        if(!user){
            throw new ApplicationError( 'user not found',404);
        }

        const product = products.find(p=>p.id==productID);
        if(!product){
            throw new ApplicationError( 'product not found',400);
        }
        if(!product.ratings){
            product.ratings = [];
            product.ratings.push({
                userID:userID,
                rating:rating,
            });
            // console.log(products)

        }else{
            const existingrating = product.ratings.findIndex(r=>r.UserID==userID);
            if(existingrating>=0){
                product.ratings[existingrating]  = 
                {userID:userID,rating:rating};

            }else{
                product.ratings.push({userID:userID,rating:rating});
            }
        }

    }
}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://m.media-amazon.com/images/I/51KkT9Z1kGL._SY445_SX342_.jpg',
        'category 1'

    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        9.99,
        'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fbd%2F7c%2Fbd7cd7da4b28c5e829c45688fae31bdfac5e53e0.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
        'category 2',
        ['S','M','L']

    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        19.99,
        'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F97%2F11%2F9711b0c5a79e94058653672a68845079ad939cdb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]',
        'category 3',
        ['S','M','XL']

    ),
]