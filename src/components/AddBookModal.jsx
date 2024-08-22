import axios from "axios";
import PropTypes from "prop-types";
import { useRef } from "react";

const AddBookModal = ({ setShowModal, setBooksData }) => {
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const publishedRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      isPublished: publishedRef.current.checked,
      cover_img: "1.jpg",
      sales: 0,
    };
    try {
      await axios
        .post("https://d38686458ba89a5d.mokky.dev/books", data)
        .then((req) => setBooksData((prev) => [...prev, req.data]));
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
            <input type="file" />
          </label>
          <label>
            <p>Book title</p>
            <input type="text" ref={titleRef} />
          </label>
          <label>
            <p>Book price</p>
            <input type="number" ref={priceRef} />
          </label>
          <label>
            <p>IsPublished</p>
            <input type="checkbox" ref={publishedRef} />
          </label>
          <button className="buy-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;

AddBookModal.propTypes = {
  setShowModal: PropTypes.func,
  setBooksData: PropTypes.func,
};
