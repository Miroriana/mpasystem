const mongoose = require('mongoose');

const connectDb = ()=>{
    return mongoose.connect(process.env.MONGO);
}

module.exports= {connectDb};
