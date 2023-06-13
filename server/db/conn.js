import mongoose from "mongoose";

const connDB = (url) => {
    return mongoose.connect(url, {
        dbName: "task-manager",
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

export default connDB;