const router = require("express").Router();
const axios = require("axios");
const Movie = require("../models/movie.model");
const userType = require("../userType.middleware.js/userType.middleware");
const authenticateToken = require("../userType.middleware.js/jwt.middleware");


router.post('/', authenticateToken, userType, async (req, res) => {
    try {
        const { searchQuery } = req.body;
        const currentUser = req.user
        const userId = currentUser.userId


        const { data:
            { Title,
                Released,
                Director,
                Genre }
        } = await axios.get
            (
                `https://www.omdbapi.com/?t=${searchQuery}&apikey=${process.env.OMDBAPI_KEY}`)

        if (!Title) {
            res.status(400).json({
                message: "No such movie"
            })
        }
        const movie = new Movie(
            {
                Title,
                Released,
                Director,
                Genre,
                createdBy: userId,
            });

        const savedMovie = await movie.save()
        res.status(201).json(savedMovie);

    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
})

router.get('/', authenticateToken, async (req, res) => {
    try {
        const currentUser = req.user
        const userId = currentUser.userId
        const moviesByUser = await Movie.find({ createdBy: userId })

        if (moviesByUser.length < 1) {
            res.status(200).json({
                message: "no movies"
            })
        }
        res.status(200).json(moviesByUser)
    } catch (error) {
        res.status(400).json({
            error
        })

    }
})

module.exports = router;
