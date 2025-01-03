import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from 'cors'
import createHttpError from "http-errors";
import routes from "./routes/index.js"

// DotEnv Config
dotenv.config()

// Create Express App
const app = express()

// **** Middlewares Start

// Morgan Middleware 
// ** Adding Morgon Middleware as an HTTP request loggoer middleware for nodeJs
// add dev for developement
if (process.env.NODE_ENV != 'production') {
    app.use(morgan("dev"))
}
// Helmet Middleware
// ** Add Helmet middleware, Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet())


// Parse Data
// ** Adding Express Json and urlencoded middleware to parse json request from body and url
// ** Parse Json request Url
app.use(express.json())

// ** Parse Json request body
app.use(express.urlencoded({ extended: true }))

// Sanitize request data 
// ** Adding Express mongo-sanitize middleware which sanitize user-supplied data to prevent MongoDB Operator Injecttion
app.use(mongoSanitize())

//Enable Cookies parser middleware
// Authenticatio, refresh token set cookies ..
// ** Adding cookie-parser middleware to parse cookie header and populate req.cookies with and object keyed by the cookie name
app.use(cookieParser())

// Compression
// Compress data body and less size
// ** Adding Compression middleware to compress response bodies for all request that raverse through middleware
app.use(compression())

// File-uploaded
// Accessable from req.files, I want to dirext acceess in any route like .req.files 
// ** Adding Express-fileupload middleware to make uploaded files accessable from req.files
app.use(fileUpload({
    useTempFiles: true // for add temprory files in your folder
}));

// cors
// front-end allow only you want to connect your sever 
// ** Adding cors middleware to protect and restrict accsess to the server
// app.use(cors({
//     origin: process.env.FronEndOriginUrl, // only this front-end connect others block no access 
// }))
app.use(cors());

// All API Routes
// api v1 routes
// ** changes and features add so something new v2 make life easier
app.use("/api/v1", routes)


// **** Custom logger, handle Server and http errors
// Packages we will use --> winston and Http-errors
app.post("/api/test", (req, res) => {
    throw createHttpError.BadRequest("This route has an error")
})

app.use(async (req, res, next) => {
    next(createHttpError.NotFound("This route does not exsit."))
})

// Set Error Modes from http-errors
// Error Handling
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
            author: "codewithtaimoor"
        }
    })
})

// **** Middlewares End
app.get('/api', (req, res) => {
    res.send('hello from simple server :)')
})

app.post('/api', (req, res) => {
    // res.status(409).json({ message: "there is a conflict" });
    res.send(req.body)
})

export default app