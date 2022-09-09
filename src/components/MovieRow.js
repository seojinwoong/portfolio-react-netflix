import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import '../assets/css/MovieRow.css';
import MovieModal from './MovieModal';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MovieRow = ({id, title, fetchURL, isLargePoster}) => {

  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);
  
  const fetchMovieData = async () => {
    const request = await axios.get(fetchURL);
    setMovies(request.data.results);
  }

  const openMovieModal = (movie) => {
    setIsModalOpen(true);
    setMovieInfo(movie);
  }

  return (
    <section className='movie-row'>
        <h2 className='movie-row-tit'>{title}</h2>        
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              loop={true}
              spaceBetween={20}
              navigation
              breakpoints={{
                1378: {
                  slidesPerView: 6,
                  slidesPerGroup: 6,
                },
                998: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
                625: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                0: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
            >
              <div id={id} className='row__posters'>
                  {movies.map(movie => (
                    <SwiperSlide>
                      <img 
                          key={movie.id}
                          className={`row__poster ${isLargePoster ? 'row__posterLarge' : 'row__posterMedium'}`}
                          src={`https://image.tmdb.org/t/p/original/${isLargePoster ? movie.poster_path : movie.backdrop_path}`} 
                          alt={movie.name} 
                          onClick={() => openMovieModal(movie)}
                          />
                      </SwiperSlide>
                  ))}
              </div>
            </Swiper>
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