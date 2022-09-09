
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Nav.css';

const Nav = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery().get('q');

  const [isNavActive, setIsNavActive] = useState(false);
  const [searchMovie, setSearchMovie] = useState(query || '');

  const navigate = useNavigate();
  
  useEffect(() => {
    navScroll();
    window.addEventListener('scroll', () => {
      navScroll();
    });

    return () => {
        window.removeEventListener('scroll', () => {});
    }
  }, []);

  const navScroll = () => {
    if (window.scrollY > 100) setIsNavActive(true);
    else setIsNavActive(false);
  }

  const handleSearchMovie = (e) => {
    setSearchMovie(e.target.value);
    if (e.target.value === "") navigate('');
    else navigate(`/search?q=${e.target.value}`);
  }

  const resetSearchMovie = () => {
    setSearchMovie(''); 
    navigate(`/`);
  }
  
  return (
    <nav className={`nav ${isNavActive && 'scroll-active'}`}>
        <img 
        className='nav_logo'
        onClick={resetSearchMovie}
        src={require('../assets/images/netflix_logo.png')} alt="netflix logo" />

        <div className="search-movie-wrapper">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text" value={searchMovie} onChange={handleSearchMovie} placeholder='영화를 검색해보세요.'/>
          { searchMovie && <i className="fa fa-times" aria-hidden="true" onClick={resetSearchMovie}></i> }
        </div>
        
        <img 
        className='nav_user_profile'
        src={require('../assets/images/netflix_avatar.png')} alt="유저프로필" />
    </nav>
  )
}

export default Nav