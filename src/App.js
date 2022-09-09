import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPge from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPge />}></Route>          
          <Route path=":movieId" element={<DetailPage />}></Route>          
          <Route path="search" element={<SearchPage />}></Route>          
        </Route>
      </Routes>
    </div>
  )
}

export default App;
