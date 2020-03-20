/********************************** DEPENDENCIES **********************************/
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");


/******************************** ROUTING FUNCTIONS *******************************/

module.exports = function(app) {

    const filePath = path.join(__dirname, "../db/db.json");

    // route for getting saved notes from db.json
    app.get("/api/notes", (req, res) => {
        console.log("inside get");
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        res.json(data);
    });

    // route for posting new note to db.json
    app.post("/api/notes", (req, res) => {
        console.log("inside post");

        // retrieve request body and add id to newNote object
        const newNote = req.body;
        newNote.id = uniqid();

        console.log(newNote);

        fs.appendFileSync(filePath, newNote, "utf8");
        res.json(newNote);
    });

    // route for deleting a note from the db.json file
    app.delete("/api/notes/:id", (req, res) => {
        console.log("inside delete");
        console.log(req.params.id);
        const id = req.params.id;
        const data = fs.readFileSync(filePath, "utf8");
        console.log(data);
        const notes = data.filter(o => o.id !== id);
        console.log(notes);

        fs.writeFileSync(filePath, notes, "utf8");
        res.json({ ok: true });
    });
}