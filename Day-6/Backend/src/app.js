const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from Backend/public/dist
app.use(express.static(path.join(__dirname, "../public/dist")));

// API Endpoints
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;
    await noteModel.create({ title, description });
    res.status(201).json({ message: "Note created successfully" });
});

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
});

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json(notes);
});

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    await noteModel.findByIdAndUpdate(id, { title, description });
    res.status(200).json({ message: "Note updated successfully" });
});

// Catch-all route to serve the React SPA
app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

module.exports = app;