import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { TMDB_BASE_URL, API_KEY } from "../utils/constants";
import axios from 'axios'

const initialState = {
    movies: [],
    generesLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async() => {
    const {data: {genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
    return genres;
})

const createArrayFromRawData = (array, moviesArr, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({id}) => id === genre)
            if(name) movieGenres.push(name.name);
        })
        if(movie.backdrop_path){
            moviesArr.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0,3)
            })
        }
    })
}

const getRawData = async (api,genres,paging) => { 
    const moviesArr = [];
    for(let i = 1; moviesArr.length < 60 && i < 10; i++){
        const {data: {results}} = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
        createArrayFromRawData(results, moviesArr, genres);
    }
    return moviesArr
}

export const fetchMovies = createAsyncThunk("netflix/trending", async({type}, thunkpi) => {
    const {netflix: {genres}} = thunkpi.getState();
    return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
})

// getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`)

export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre",
    async ({ genre, type }, thunkAPI) => {
        const {
            netflix: { genres },
        } = thunkAPI.getState();
        return getRawData(
            `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
            genres
        );
    }
);

export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
        try{
            const {
                data: { movies },
            } = await axios.get(`https://netflix-clone-0698.onrender.com/api/user/liked/${email}`);
            console.log(movies)
            return movies;
        }catch(err) {
            return [];
        }
    }
);
  
export const removeMovieFromLiked = createAsyncThunk(
    "netflix/deleteLiked",
    async ({ movieId, email }) => {
        const {
            data: { movies },
        } = await axios.put("https://netflix-clone-0698.onrender.com/api/user/remove", {
                email,
                movieId,
            });
      return movies;
    }
);

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.generesLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
})

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer
    }
})


export const { setGenres, setMovies } = NetflixSlice.actions;