import app from './app.js';
import logger from "./configs/logger.config.js"

// Envs
const port = process.env.PORT || 5000

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