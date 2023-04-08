const User = require('../models/User')

exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({
                msg: "success", 
                movies: user.likedMovies 
            });
        } else
            return res.status(400).json({ 
                        msg: "User with given email not found." 
                    });
    } catch (error) {
        return res.json({ 
                    msg: "Error fetching movies." 
                });
    }
};

exports.addToLikedMovies = async(req, res) => {
    try{
        const {email, data} = req.body
        const user = await User.findOne({email: email})
        if(user){
            const {likedMovies} = user;
            const movieLikedArr = likedMovies.find(({id}) => id === data.id)

            if(!movieLikedArr){
                await User.findByIdAndUpdate( user._id, {
                    likedMovies: [...user.likedMovies, data]
                },
                {new: true}
                )
            } else{
                res.status(200).json({
                    status: 'success',
                    message: "Movie already added to the liked list."
                })
            }
        } else{
            await User.create({email, likedMovies: [data]})
        }

    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}


exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const movies = user.likedMovies;
            const movieIndex = movies.findIndex(({ id }) => id === movieId);
            if (!movieIndex) {
            return res.status(400).json({ 
                msg: "Movie not found." 
            });
        }
            movies.splice(movieIndex, 1);
            await User.findByIdAndUpdate(
            user._id,
            {
                likedMovies: movies,
            },
            { new: true }
            );
            return res.status(200).json({ 
                msg: "Movie successfully removed.", 
                movies 
            });
      } else {
            return res.status(404).json({ 
                msg: "User with given email not found." 
            });}
    } catch (error) {
        return res.status(400).json({
            msg: "Error removing movie to the liked list"
        });
    }
};
  