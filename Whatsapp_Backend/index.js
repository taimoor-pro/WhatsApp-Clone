import dotenv from "dotenv";
import app from './app.js';


// DotEnv Config
dotenv.config()

// Envs
const port = process.env.PORT || 5000

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

app.listen(port, () => console.log('> Server is up and running on port : ' + port))
