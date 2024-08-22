import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "./Modal";

const BookUser = ({ book, setBooksData }) => {
  const [showModal, setShowModal] = useState(false);
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      setShowModal(false);
    }
  });
  return (
    <div className="book" key={book?.id}>
      <div className="book-cover_img">
        <img src={`/public/${book?.cover_img}`} />
      </div>
      <h2>
        {book?.title?.length > 200 ? book?.title?.slice(0, 200) : book?.title}
      </h2>
      <div className="book-data">
        <div>
          <span>PRICE</span>
          <p>$ {book?.price}</p>
        </div>
        <button onClick={() => setShowModal(true)}>BUY</button>
      </div>
      {showModal ? (
        <Modal
          book={book}
          setShowModal={setShowModal}
          setBooksData={setBooksData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BookUser;

BookUser.propTypes = {
  book: PropTypes.object,
  setBooksData: PropTypes.func,
};
