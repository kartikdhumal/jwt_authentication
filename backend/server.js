import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRoute from './routers/user.route.js'
import connectDB from './db/connect.js'
const app = express();
app.use(express.json());

connectDB();

app.use(cors({
    origin: "*"
}));
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
})

app.use('/api', userRoute);