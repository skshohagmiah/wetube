import mongoose from 'mongoose';

export async function connectToDatabase(){
    try {
        const connection ={};
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONDODB_URI);
        connection.isConnected = db.connections[0].readyState;
        
    } catch (error) {
        console.log(error)
    }

}