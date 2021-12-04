import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Slider from "./components/Slider";
import Movies from "./components/Movies";
import Trending from "./components/Trending";
import Series from "./components/Series";
import Search from "./components/Search";
import Genre from "./components/Genre";

// https://image.tmdb.org/t/p/w500
// https://api.themoviedb.org/3/discover/movie?api_key=ba2c4197571d8407367a5829442834fa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const POPULAR =
  "https://api.themoviedb.org/3/movie/popular?api_key=ba2c4197571d8407367a5829442834fa&language=en-US&page=1";
const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=ba2c4197571d8407367a5829442834fa&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
const TRENDING_API =
  "https://api.themoviedb.org/3/trending/all/day?api_key=ba2c4197571d8407367a5829442834fa";
const GET_GENRE_MOVIE =
  "https://api.themoviedb.org/3/discover/movie?api_key=ba2c4197571d8407367a5829442834fa&with_genres=";
const GET_PAGE =
  "https://api.themoviedb.org/3/discover/movie?api_key=ba2c4197571d8407367a5829442834fa&page=";
const SEARCH_TV_API =
  "https://api.themoviedb.org/3/search/tv?api_key=ba2c4197571d8407367a5829442834fa&query=";
const SEARCH_MOVIE_API =
  "https://api.themoviedb.org/3/search/movie?api_key=ba2c4197571d8407367a5829442834fa&query=";
const VIDEO_FRONT_MOV = `https://api.themoviedb.org/3/movie/`;
const VIDEO_FRONT_TV = `https://api.themoviedb.org/3/tv/`;
const VIDEO_END = "/videos?api_key=ba2c4197571d8407367a5829442834fa";
const GENRE_LIST =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=ba2c4197571d8407367a5829442834fa&language=en-US";
const RELEASE_DATE_FRONT_MOV = "https://api.themoviedb.org/3/movie/";
const RELEASE_DATE_FRONT_TV = "https://api.themoviedb.org/3/tv/";
const RELEASE_DATE_END =
  "/release_dates?api_key=ba2c4197571d8407367a5829442834fa";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [family, setFamily] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [science, setScience] = useState([]);
  const [video, setVideo] = useState([]);
  const [clickedVideo, setClickedVideo] = useState({});
  const [click, setClicked] = useState(false);
  const [homeIconClicked, setHomeIconClicked] = useState(false);
  const [movieDone, setMovieDone] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(async () => {
    let mounted = true;
    await fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setMovies(data.results);
          setMovieDone(true);
        }
      });
    await fetch(TRENDING_API)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setTrending(data.results);
      });
    await fetch(GET_PAGE)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) console.log(data.results);
      });
    await fetch(POPULAR)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setPopular(data.results);
      });
    // await fetch(GENRE_LIST)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (mounted) console.log(data);
    //   });
    await fetch(GET_GENRE_MOVIE + 10751)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setFamily(data.results);
        }
      });
    await fetch(GET_GENRE_MOVIE + 878)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setScience(data.results);
      });
    await fetch(GET_GENRE_MOVIE + 16)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setAnimation(data.results);
      });

    return () => (mounted = false);
  }, []);

  const handleClicked = () => {
    setClicked((prevState) => !prevState);
  };

  const handleGetValue = async (page) => {
    await fetch(GET_PAGE + page)
    .then((res) => res.json())
    .then((data) => setMovies(data.results));
    setPageNumber(page);
  };

  const handledClicked = async (movie, media) => {
    setClickedVideo(movie);
    await fetch(
      movie.media_type === "tv" || media === "Series"
        ? VIDEO_FRONT_TV + movie.id + VIDEO_END
        : VIDEO_FRONT_MOV + movie.id + VIDEO_END
    )
      .then((res) => res.json())
      .then((data) => {
        setVideo(data.results[0] ? data.results[0].key : 1);
      });
  };

  const handleHomeClicked = (clicked) => {
    setHomeIconClicked(clicked);
  };

  return (
    <>
      <NavBar
        click={click}
        handleClicked={handleClicked}
        homeIconClicked={homeIconClicked}
        handleHomeClicked={handleHomeClicked}
      />
      <Routes>
        <Route
          path="//*"
          element={
            <Slider
              done={movieDone}
              movies={movies}
              moviesTrend={trending}
              api={IMAGE_API}
              popular={popular}
              family={family}
              video={video}
              science={science}
              handleClicked={handledClicked}
              animation={animation}
            />
          }
        />
        <Route
          path="/movies/*"
          element={
            <Movies
              api={IMAGE_API}
              clickedVideo={clickedVideo}
              done={movieDone}
              movies={movies}
              handleClicked={handledClicked}
              video={video}
              handleGetValue={handleGetValue}
              pageNumber={pageNumber}
            />
          }
        />
        <Route
          path="/family"
          element={
            <Genre
              api={IMAGE_API}
              clickedVideo={clickedVideo}
              done={movieDone}
              movies={family}
              handleClicked={handledClicked}
              video={video}
              text={`Family`}
            />
          }
        />
        <Route
          path="/animation"
          element={
            <Genre
              api={IMAGE_API}
              clickedVideo={clickedVideo}
              done={movieDone}
              movies={animation}
              handleClicked={handledClicked}
              video={video}
              text={`Animation`}
            />
          }
        />
        <Route
          path="/science-fiction"
          element={
            <Genre
              api={IMAGE_API}
              clickedVideo={clickedVideo}
              done={movieDone}
              movies={science}
              handleClicked={handledClicked}
              video={video}
              text={`Science Fiction`}
            />
          }
        />
        <Route
          path="/trending"
          element={
            <Trending
              clickedVideo={clickedVideo}
              done={movieDone}
              movies={trending}
              apiImage={IMAGE_API}
              handleClicked={handledClicked}
              video={video}
            />
          }
        />
        <Route path="/series" element={<Series />} />
        <Route
          path="/search"
          element={
            <Search
              apiImage={IMAGE_API}
              clickedVideo={clickedVideo}
              handleClicked={handledClicked}
              video={video}
              apiMovie={SEARCH_MOVIE_API}
              apiTv={SEARCH_TV_API}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
