const Movie = require("../models/movie.model");

const userType = async (req, res, next) => {
    const currentUser = req.user
    const userId = currentUser.userId
    const role = currentUser.role
    const movieCount = 5;

    if (role === "basic") {
        const createdMovies = await Movie.find({ createdBy: userId });
        const calendarMonth = new Date().getMonth();
        const createdMoviesCalnedarMonth = createdMovies.filter((oneMovie) => {
            const movieAdded = new Date(oneMovie.created_at)
            console.log(movieAdded)
            return movieAdded.getMonth() === calendarMonth
        })

        if (createdMoviesCalnedarMonth.length > movieCount) {
            return res.status(400).json({
                message: "You've reached the monthly limit of five movies. Upgrade to premium today and add as many movies as you want!"
            })
        } else {
            next()
        }
    } else {
        next()
    }
}

module.exports = userType;