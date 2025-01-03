import mongoose from 'mongoose';
import app from './app.js';
import logger from "./configs/logger.config.js"
import 'colors';

// Envs Variables
const { DATABASE_URL, PORT, NODE_ENV } = process.env
const port = PORT || 5000

// exit on mongodb error 
mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
})

// mongodb debug mode
if (NODE_ENV !== "production") {
    mongoose.set('debug', true)
}


// mongoDb Connection
// required libs : mongoose | colors
// run the following command
// npm i mongoose colors

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// MongoDB Connection
mongoose.connect(DATABASE_URL)
    .then(() => logger.info(`> Connected... ${NODE_ENV !== 'production' ? DATABASE_URL : ""}`.bgCyan))
    .catch(err => logger.error(`> Error while connecting to MongoDB: ${err.message}`.underline.red));

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

let server;
server = app.listen(port, () => {
    logger.info('> Server is up and running on port : ' + port)
    console.log(process.pid, "Process Id")
    // throw new Error("Error in Server."); // if any server error so server closed
})

//** Handle Server Errors
// ** handling Sevver closing when facing uncaughException, uncatchRejection errors.
const exitHandler = () => {
    if (server) {
        logger.info("Server Closed!")
        process.exit(1); // 1 means exit server and 0 means runnning accurate
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler()
}

// Incall Exceptions
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);


// ** SIGTERM signal
// Signal Terminate
process.on("SIGTERM", () => {
    if (server) {
        logger.info("Server Closed!")
        process.exit(1); // 1 means exit server and 0 means runnning accurate
    }
})