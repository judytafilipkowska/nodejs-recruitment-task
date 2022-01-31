const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    Title: String,
    Released: Date,
    Genre: String,
    Director: String,
    createdBy: String,
},
    {
        timestamps:
        {
            createdAt: 'created_at', updatedAt: 'updated_at'
        }
    }

);

module.exports = model("Movie", movieSchema);
