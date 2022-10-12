import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../assets/css/MovieRow.scss';
import MovieModal from './MovieModal';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MovieRow = ({id, title, fetchURL, isLargePoster, detect}) => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    if (detect) fetchMovieData();
  }, [detect]);
  
  const fetchMovieData = async () => {
    const request = await axios.get(fetchURL);
    const filterMovie = request.data.results.slice(0,10);
    setMovies(filterMovie);
  }

  const openMovieModal = (movie) => {
    setIsModalOpen(true);
    setMovieInfo(movie);
  }

  return (
    <section className='movie-row'>
        <h2 className='movie-row-tit'>{title}</h2>    
           {
            !detect 
            ? (
              <div className="empty-movie-list-wrap">
                <div className="skeleton-box" style={{height: '100px'}}></div>
                <div className="skeleton-box" style={{height: '30px'}}></div>
                <div className="skeleton-box" style={{height: '30px'}}></div>
              </div>
            )
            : (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              loop={true}
              spaceBetween={20}
              navigation
              breakpoints={{
                1000: { slidesPerView: 5 },
                700: { slidesPerView: 4 },
                500: { slidesPerView: 3 },
                320: { slidesPerView: 2 }
              }}
            >
              <div id={id} className='row__posters'>
                  {movies.map(movie => (
                    <SwiperSlide>
                      <img 
                          key={movie.id}
                          className={`row__poster ${isLargePoster ? 'row__posterLarge' : 'row__posterMedium'}`}
                          src={`https://image.tmdb.org/t/p/original/${isLargePoster ? movie.poster_path : movie.backdrop_path}`} 
                          alt={movie.title || movie.name} 
                          onClick={() => openMovieModal(movie)}
                          />
                       <p className="movie-title">{movie.title || movie.name}</p>
                      </SwiperSlide>
                  ))}
              </div>
            </Swiper>
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
    </section>
  )
}

export default MovieRow;