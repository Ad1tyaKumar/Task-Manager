import express from 'express'
import router from './routes/task.js'
import connDB from './db/conn.js';
import 'dotenv/config.js'
import cors from 'cors'
const app = express();


//middlewares
app.use(express.json());
app.use(cors({
    origin:process.env.FRONT_END_URL,
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true,
}))
//routes
app.use('/api/v1/tasks', router)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connDB(process.env.MONGO_URI).then(() => {
            console.log("DB connected!");
        }).catch((e) =>
         console.log(e));
        app.listen(port, console.log(`Server is listening on Port : ${port}...`));
    } catch (e) {
        console.log(e);
    }
}

start();
