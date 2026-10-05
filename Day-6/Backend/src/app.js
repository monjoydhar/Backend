//server created in app.js file 


const express = require("express");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());


//api/notes created new notes and saved in mongodb database

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

     await noteModel.create({ 
        title, description 
      })

      res.status(201).json({ message: "Note created successfully" });
});

//api/notes / deleted notes from mongodb database

app.delete('/api/notes/:id', async (req, res) => {
   
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);
    

    res.status(200).json({ message: "Note deleted successfully" });
});

//api/notes /get all notes from mongodb database

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json(notes);
    notes
});

//api/notes / patch / update notes from mongodb database

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    await noteModel.findByIdAndUpdate(id, { title, description });

    res.status(200).json({ message: "Note updated successfully" });
});




module.exports = app;


