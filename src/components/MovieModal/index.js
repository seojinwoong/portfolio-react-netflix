import React, { useRef } from "react";
import "./MovieModal.scss";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setIsModalOpen,
}) => {
  const ref = useRef();

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span className="modal-close" onClick={() => setIsModalOpen(false)}>
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal_details">
              <span className="modal__user_perc">100% for you</span>
              개봉일 : {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
        <div className="modal-shadow" onClick={()=>setIsModalOpen(false)}></div>
      </div>
    </div>
  );
};

export default MovieModal;
