import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../error-handling/applicationError.js";


export default  class usermodel{
    constructor(id,name,email,password,type){
        this._id = id;
        this.name = name,
        this.email = email,
        this.password = password,
        this.type = type
    }
    static getAll(){
        return users;
    }
}

var users = [
    {  
        id:'1',
        name:'seller user',
        email:'seller@ecom.com',
        password:'password1',
        type:'seller'

    },
    {  
        id:'2',
        name:'Customer user',
        email:'customerr@ecom.com',
        password:'password1',
        type:'customer'

    },
]