
import usermodel from "../features/product/user/user.model.js";

const basicAuthizer = (req,res,next)=>{
    const Authheader = req.headers['authorization'];
    if( !Authheader){
        res.status(401).send("No authirization details found");
    }

    //decorded client credeltials
    const base43credentials = Authheader.replace('Basic','');

    const decordedCred = Buffer.from(base43credentials, 'base64').toString('utf8');
    const credentials = decordedCred.split(':');
    const usercreds = usermodel.getAll().find(u=> u.email==credentials[0] && u.password==credentials[1]);
    if(usercreds){
        next();
    }else{
        return res.status(401).send('Invalid Credentials');
    }


}

export default basicAuthizer;