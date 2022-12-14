
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import '../assets/css/Banner.scss';
import MovieModal from './MovieModal';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [istrailerLoad, setIstrailerLoad] = useState(false);
  const [isTrailerPlay, setIsTrailerPlay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const request = await axios.get(requests.fetchNowPlaying);
    
    const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length)
    ].id;

    const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
        params: {append_to_response: 'videos'}
    });

    setMovie(movieDetail);
    setMovieInfo(movieDetail)
    setIstrailerLoad(true);
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + '...' : str;
  }

  if (!isTrailerPlay) {
    return (  
      <>
      {
       istrailerLoad ? (
          <div className='banner-wrapper' style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`}}>
          <div className="banner-content">
            <h1 className='movie-tit'>{movie.title || movie.name || movie.original_name}</h1>
            <div className='banner-btn-wrap'>
              {
                istrailerLoad && (
                  movie.videos?.results && movie.videos.results.length > 0
                  ? (
                    <button className='btns btn-play' onClick={() => setIsTrailerPlay(true)}>
                      <i className="fa fa-play-circle" aria-hidden="true"></i>
                      <span>Play</span>
                    </button>
                  ) 
                  : (
                    <button className='btns btn-warning'>
                      <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                      <span>???????????? ????????????!</span>
                    </button>
                  ) 
                )
              }
              <button className='btns btn-more-info'>
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                <span onClick={()=>setIsModalOpen(true)}>More Info</span>
              </button>
            </div>
            <p className='movie-desc'>{truncate(movie.overview, 200)}</p>
          </div>
          <div className="banner-fade-bottom"></div>
        </div>
        )
       : (
        <div className='skeleton-box' style={{height: '80vh'}}></div>
       )
      }
       {
            isModalOpen && (
              <MovieModal 
                {...movieInfo}
                setIsModalOpen={setIsModalOpen}
              />
            )
          }
      </>
    )
  } else {
    return (
      <TrailerContainer>
        <span className="modal-close" onClick={() => setIsTrailerPlay(false)}>
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </span>
        <TrailerMovie
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?autoplay=1&mute=0`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
        />
      </TrailerContainer>
    )
  }
};

const TrailerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  z-index: 2000;
  position: fixed;
  top:0;
  left:0;
  background:#000;

  .modal-close {
      font-size: 50px;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d91921;
      left: 50%;
      transform: translateX(-50%);
      top: 24px;
      border-radius: 50%;
      background: #fff;
      line-height: 1;

      @media (max-width: 600px) {
        width: 35px;
        height: 35px;
      }
  }
`;
const TrailerMovie = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;