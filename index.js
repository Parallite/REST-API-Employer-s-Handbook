import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import logger from 'morgan';

import 'dotenv/config';

import UsersRouter from './routes/users.js'
import EmployeesRouter from './routes/employees.js'
import { errorMiddleware } from './middlewares/error-middleware.js'

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const app = express();

app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.get('/status', (_, res) => res.send('OK'));
app.use('/api/user', UsersRouter);
app.use('/api/employees', EmployeesRouter);

app.use(errorMiddleware);

app.all("*", (_, res) => {
    res.status(404);
    res.json({ error: 404 })
})

const start = async () => {
    try {
        await mongoose.connect(DB_URL), {
            useNewURLParser: true,
            useUnifiedTopology: true
        }
        console.log('Mongoose connected');
        app.listen(PORT || 5000, () => console.log(`server has been started to http://localhost:${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start()