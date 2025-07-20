import mongoose, {Mongoose} from 'mongoose'
import logger from './logger';

const MONGODB_URL = process.env.MONGODB_URL as string;

if(!MONGODB_URL){
    throw new Error("MONGODB_URL is not defined.")
}

interface MongooseCach{
    conn:Mongoose | null,
    promise:Promise<Mongoose> | null
}

declare global{
    var mongoose: MongooseCach;
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

const dbConnect = async():Promise<Mongoose>=>{
    if(cached.conn){
        logger.info("using existing mongoose connection")
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URL,{
            dbName:'devFlow'
        }).then((result)=>{
            logger.info("Connected to Mongo DB")
            return result;
        }).catch((error)=>{
            logger.error("Error to connecting Mongo DB", error)
            throw error;
        })
    }
    cached.conn = await cached.promise;

    return cached.promise;

}

export default dbConnect;