import React from 'react';
import Banner from '../../components/Banner';
import MovieRow from '../../components/MovieRow';
import requests from '../../api/requests';

const MainPge = () => {
  return (
    <>
      <Banner />
      <MovieRow
        title="NETFLIX ORIGINALS"
        id="movierow_NO"
        fetchURL={requests.fetchNetflixOriginals}
        isLargePoster
      />
      <MovieRow
        title="TRENDING NOW"
        id="movierow_TN"
        fetchURL={requests.fetchTrending}
      />
      <MovieRow
        title="TOP RATED"
        id="movierow_TR"
        fetchURL={requests.fetchTopRated}
      />
      <MovieRow
        title="ACTION MOVIES"
        id="movierow_AM"
        fetchURL={requests.fetchActionMovies}
      />
      <MovieRow
        title="COMEDY MOVIES"
        id="movierow_CM"
        fetchURL={requests.fetchComedyMovies}
      />
    </>
  )
}

export default MainPge