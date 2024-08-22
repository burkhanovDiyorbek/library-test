import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const EditModal = ({ setShowModal, book, setBooksData }) => {
  const [title, setTitle] = useState(book?.title);
  const [price, setPrice] = useState(book?.price);
  const [isPublished, setIsPublished] = useState(book?.isPublished);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch("https://d38686458ba89a5d.mokky.dev/books/" + book?.id, {
          ...book,
          title: title,
          price: price,
          isPublished: isPublished,
          cover_img: "1.jpg",
        })
        .then(({ data }) =>
          setBooksData((prev) =>
            prev.map((item) => {
              return item?.id == data?.id ? data : item;
            })
          )
        );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => setShowModal(false)}>❌</button>
        <form className="modal-content" onSubmit={handleSubmit}>
          <label>
            <p>Book cover img</p>
            <input type="file" placeholder="select cover img" />
          </label>
          <label>
            <p>Book title</p>
            <input
              type="text"
              value={title}
              onInput={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <p>Book price</p>
            <input
              type="number"
              value={price}
              onInput={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <p>IsPublished</p>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </label>
          <button className="sub-btn">EDIT</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

EditModal.propTypes = {
  book: PropTypes.object,
  setShowModal: PropTypes.func,
  setBooksData: PropTypes.func,
};
