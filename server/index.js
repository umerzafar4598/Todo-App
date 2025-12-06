import express from "express";
import cors from "cors";
import pool from "./db.js";
import authRouter from './routes/auth.js';
import todosRouter from './routes/todos.js';
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import initPassport from "./passportConfig.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

const PgSession = connectPgSimple(session);

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use((req, res, next) => {
    console.log("Origin:", req.headers.origin);
    next();
});

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true
}));



app.use(express.json());

const isProd = process.env.NODE_ENV === "production"
app.use(session({
    store: new PgSession({
        pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax'
    }
}));

initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Todo Backend' })
})



app.listen(port, () => {
    console.log(`Server is running on port. ${port} `);
});