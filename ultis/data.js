import { getStoragedItem } from "./AsyncStorage";
import key from "./apikey";

let api_key = key.key2;
const imgUri = 'https://image.tmdb.org/t/p/original';


//* Get Top 100 Movies
async function getPopularMovies() {
	const url = `https://imdb-api.com/en/API/MostPopularMovies/${api_key}`
	const res = await fetch(url);
	const data = await res.json()

	return data
}

//* Get Top 100 TV Shows
async function getPopularTVS() {
	const url = `https://imdb-api.com/en/API/MostPopularTVs/${api_key}`
	const res = await fetch(url);
	const data = await res.json()

	return data
}

//* Get movies's detail by movieId
async function getDetail(imdbId) {
	const url = `https://imdb-api.com/en/API/Title/${api_key}/${imdbId}/Posters,Images`
	const res = await fetch(url)
	const data = await res.json()

	return data
}

//* Search movie by expression
async function searchMovie(query) {
	if(!query || query == '') return
	const url = `https://imdb-api.com/en/API/SearchTitle/${api_key}/${query}`
	const res = await fetch(url);
	const data = await res.json()

	return data
}

export {imgUri, getPopularMovies, getPopularTVS, searchMovie, getDetail };
