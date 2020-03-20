/********************************** DEPENDENCIES **********************************/
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");


/******************************** ROUTING FUNCTIONS *******************************/

module.exports = function(app) {

    const filePath = path.join(__dirname, "../db/db.json");

    // route for getting saved notes from db.json
    app.get("/api/notes", (req, res) => {

        const data = fs.readFileSync(filePath, "utf8");
        res.json(data);
    });

    // route for posting new note to db.json
    app.post("/api/notes", (req, res) => {

        // retrieve request body and add id to newNote object
        const newNote = req.body;
        newNote.id = uniqid();

        fs.appendFileSync(filePath, newNote, "utf8");
        res.json(newNote);
    });

    // route for deleting a note from the db.json file
    app.delete("/api/notes/:id", (req, res) => {

        const id = req.params.id;
        const data = fs.readFileSync(filePath, "utf8");
        const notes = data.filter(o => o.id !== id);

        fs.writeFileSync(filePath, notes, "utf8");
        res.json({ ok: true });
    });
}