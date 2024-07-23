
import fs from 'fs';
import winston from 'winston';

const fsPromise =  fs.promises;

// async function log(logData){

//     try{
//         logData = `\n ${new Date().toString()} +${ logData}`;
//         await fsPromise.appendFile('log.txt',logData);
//     }catch(err){
//         console.log(err);

//     }
    
// }

const looger  = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports:[
        new winston.transports.File({filename:'logs.txt'}),
    ]

})

// const loggerMiddleware =  (req,res,next)=>{
//     const {email,password} = req.body;
//     const logData = `${req.url}-${JSON.stringify({email,password})}`;
//     log(logData);
//     next();

// }
const loggerMiddleware = (req,res,next)=>{
    const logData = `${req.url}-${JSON.stringify(req.body)}`;
    looger.info(logData);
    next();
}

export default loggerMiddleware;