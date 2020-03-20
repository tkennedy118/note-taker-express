/********************************** DEPENDENCIES **********************************/
const express = require("express");


/****************************** EXPRESS CONFIGURATION *****************************/

// tell node to create an 'express' server
const app = express();

// set initial port
const PORT = process.env.PORT || 3000

// set Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/************************************* ROUTER *************************************/

// point to series of route files
// require("./routes/api")(app);
require("./routes/html")(app);


/************************************ LISTENER ************************************/
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});