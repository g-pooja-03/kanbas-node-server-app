import Lab5 from "./Lab5.js";
import Hello from "./Hello.js"
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";

import UserRoutes from "./Kanbas/Users/routes.js";
import express from "express";
import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
console.log(process.env.CONNECTION_STRING);


const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)