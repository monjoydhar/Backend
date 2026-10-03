const express = require('express');
const app = express();

const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect("mongodb+srv://monjoy:Monjoy12345@cluster0.bt5cixb.mongodb.net/Day-5")
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}
connectDB();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});