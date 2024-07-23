import { MongoClient} from "mongodb";

const url = process.env.DB_URL;

let client;
export const connectToMangoDB =()=>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client = clientInstance
        console.log('Mongodb is connected');
    })
    .catch(err=>{
        console.log("err");
    })
}
export const getDB=()=>{
    return client.db();

}