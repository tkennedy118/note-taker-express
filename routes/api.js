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

        if (data) {
            res.json(JSON.parse(data))
        } else {
            res.end();
        }
    });

    // route for posting new note to db.json
    app.post("/api/notes", (req, res) => {

        // retrieve request body and retrieve json file
        const newNote = req.body;
        const data = fs.readFileSync(filePath, "utf8");
        let newData;

        // update values
        newNote.id = uniqid();

        if (data) {
            newData = JSON.parse(data);
            newData.push(newNote);
        } else {
            newData = [newNote];
        }

        fs.writeFileSync(filePath, JSON.stringify(newData), "utf8");
        res.json(newNote);
    });

    // route for deleting a note from the db.json file
    app.delete("/api/notes/:id", (req, res) => {

        // retrieve id and retrive json file
        const id = req.params.id;
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        // remove file with specified id
        const notes = data.filter(o => o.id !== id);

        fs.writeFileSync(filePath, JSON.stringify(notes), "utf8");
        res.json({ ok: true });
    });
}