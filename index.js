const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/movies', {});

const MovieSchema = new mongoose.Schema({
    name: String,
    img: String,
    summary: String,
});

const MovieModel = mongoose.model("movie", MovieSchema);

app.use(express.json());

// Read Function
app.get("/getmovies", (req, res) => {
    MovieModel.find({})
        .then(movies => {
            res.json(movies);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch movies" });
        });
});

// Create Function
app.post("/createmovie", (req, res) => {
    const movie = new MovieModel(req.body);

    movie.save()
        .then(() => {
            res.json({ message: "Movie created successfully!" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to create movie" });
        });
});

// Update Function
app.put("/updatemovie/:id", (req, res) => {
    const { id } = req.params;

    MovieModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(updatedMovie => {
            res.json(updatedMovie);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to update movie" });
        });
});

// Delete Function
app.delete("/deletemovie/:id", (req, res) => {
    const { id } = req.params;

    MovieModel.findByIdAndDelete(id)
        .then(() => {
            res.json({ message: "movie deleted successfully!" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Failed to delete movie" });
        });
});

app.listen(3001, () => {
    console.log("Server is running");
});