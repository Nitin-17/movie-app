import React, { useContext, useState } from "react";
import "../App.css";
import Modal from "./Modal";
import "../styles/Style.css";

const Card = (item) => {
  return (
    <div className="cards" style={{ marginTop: "30px" }}>
      <div className="movie-card" key={item.id}>
        <Modal value={item}></Modal>
        <div class="movie-content">
          <div class="movie-tags">
            {item.movie.genres ? (
              <span class="tag tag--genre">{item.movie?.genres}</span>
            ) : (
              <span class="tag tag--genre">None</span>
            )}
          </div>
          <b>
            {" "}
            <p class="movie-title">{item.movie.title}</p>
          </b>
          <p className="description">{item.movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
