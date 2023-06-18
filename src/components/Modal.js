import React, { useState } from "react";
import "../styles/Modal.css";

const Modal = (props) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <img
        className="card__image modal_img"
        src={`https://ui-avatars.com/api/?name=${props.value.movie?.title}&rounded=true&size=250`}
        alt=""
        onClick={toggleModal}
      />
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>
              &#x2716;
            </button>
            <img
              src={`https://ui-avatars.com/api/?name=${props.title}&rounded=true&size=180`}
              alt="It's just a modal"
              className="mod_img"
            />
            <div class="meal-tags">
              {props.value.movie.genres ? (
                <span class="tag tag--genre">{props.value.movie?.genres}</span>
              ) : (
                <span class="tag tag--genre">None</span>
              )}
            </div>
            <b>
              <h2>{props.value.movie.title} </h2>
            </b>
            <p>{props.value.movie.description}</p>
            <div style={{ display: "flex", alignItems: "center" }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
