import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import MovieModal from '../../components/MovieModal';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css';

const SearchPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const debouncedSearchTerm = useDebounce(query.get('q'), 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
  }, [searchMovies]);

  const fetchMovies = async (movietitle) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${movietitle}`
      );
      const onlyMovies = request.data.results.filter(result => {
        return result.media_type === 'movie' || result.media_type === 'tv'
      });
      setSearchMovies(onlyMovies);
    } catch (error) {
      console.log('에러발생', error);
    }
  } 

  const openMovieModal = (movie) => {
    setIsModalOpen(true);
    setMovieInfo(movie);
  }

  const renderSearchMovies = () => {
    return searchMovies.length > 0 ? (
      <div className='search-result-movies-wrap'>
        {
          searchMovies.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== 'person') {
              const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <div className="search-movie-poster" key={movie.id}>
                  <img 
                  className="row__poster row__posterMedium" 
                  src={movieImageUrl} 
                  alt={movie.title || movie.name || movie.original_name}
                  onClick={() => openMovieModal(movie)}
                  />
                  <p className="movie-title">{movie.title || movie.name || movie.original_name}</p>
                </div>
              )
            }
          })
        }
        {
          isModalOpen && (
            <MovieModal 
              {...movieInfo}
              setIsModalOpen={setIsModalOpen}
            />
          )

        }
      </div>
    ) : (
      <section className='no-results'>
        <div className="no-results__text">
          <h2>찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.</h2>
          <ul>
            <li>오타 혹은 띄어쓰기를 다시 한번 확인해보세요.</li>
            <li>다른 키워드로 찾아보세요.</li>
          </ul>
        </div>
      </section>
    )
  }

  return renderSearchMovies()
}

export default SearchPage