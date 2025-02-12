const mongoose = require("mongoose");

const dbConnect = async ()=>{
    try {
        const db = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log(`DB connected successfully DB host : ${db.connection.host}`)
    } catch (error) {
        console.log("DATABASE connection Failed ",error);
        process.exit(1);
    }
}

module.exports = dbConnect