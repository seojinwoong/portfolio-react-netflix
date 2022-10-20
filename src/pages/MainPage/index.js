import React, { useState, useEffect } from 'react';
import Banner from '../../components/Banner';
import MovieRow from '../../components/MovieRow';
import requests from '../../api/requests';

const config = {
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.5
}

const MainPge = () => {
  const [detect, setDetect] = useState(Array.from({length: 5}, () => false));

  useEffect(() => {
    let observer = new window.IntersectionObserver(function (entries, self) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setDetect(prev => {
            let copy = [...prev];
            copy[entry.target.dataset.row] = true;
            return copy
          });
        }
      });
    }, config);
    const movieRows = document.querySelectorAll('.main-movie-list');
    movieRows.forEach(row => {
      observer.observe(row);
    });
    
    return () => {
      movieRows.forEach(row => {
        observer.unobserve(row);
      });
    }
  }, []);
  
  return (
    <>
      <Banner />
      <div className="main-movie-list" data-row="0">
        <MovieRow
          title="NETFLIX ORIGINALS"
          id="movierow_NO"
          fetchURL={requests.fetchNetflixOriginals}
          isLargePoster
          detect={detect[0]}
        />
      </div>
      <div className="main-movie-list" data-row="1">
        <MovieRow
          title="TRENDING NOW"
          id="movierow_TN"
          fetchURL={requests.fetchTrending}
           detect={detect[1]}
        />
      </div>
      <div className="main-movie-list" data-row="2">
        <MovieRow
          title="TOP RATED"
          id="movierow_TR"
          fetchURL={requests.fetchTopRated}
           detect={detect[2]}
        />
      </div>
      <div className="main-movie-list" data-row="3">
        <MovieRow
          title="ACTION MOVIES"
          id="movierow_AM"
          fetchURL={requests.fetchActionMovies}
           detect={detect[3]}
        />
      </div>
      <div className="main-movie-list" data-row="4">
        <MovieRow
          title="COMEDY MOVIES"
          id="movierow_CM"
          fetchURL={requests.fetchComedyMovies}
           detect={detect[4]}
        />
      </div>

    </>
  )
}

export default MainPge