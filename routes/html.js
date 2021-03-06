/********************************** DEPENDENCIES **********************************/
const path = require("path");


/******************************** ROUTING FUNCTIONS *******************************/

module.exports = function(app) {

    // routes for visiting HTML page
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
}