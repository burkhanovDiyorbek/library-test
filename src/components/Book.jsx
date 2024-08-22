import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import EditModal from "./EditModal";

const Book = ({ book, setBooksData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const delBtnClickFunc = async (id) => {
    try {
      await axios
        .delete(`https://d38686458ba89a5d.mokky.dev/books/${id}`)
        .then((res) => {
          setBooksData((prev) =>
            prev?.filter((item) => item?.id != res.data?.id)
          );
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
    setShowAlert(false);
  };

  return (
    <div className="book">
      {showAlert ? (
        <div className="modal-container">
          <div className="alert">
            <h2>
              Do u really want to delete <q>{book?.title}</q>?
            </h2>
            <div>
              <button
                onClick={() => {
                  setShowAlert(false);
                }}
              >
                No , cancel it
              </button>
              <button
                className="del-btn"
                onClick={() => delBtnClickFunc(book?.id)}
              >
                Yes , do it
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="book-cover_img">
        <img src={`/public/${book?.cover_img}`} />
      </div>
      <span className={book?.isPublished ? "published" : "draft"}>
        {book?.isPublished ? "Published" : "Draft"}
      </span>
      <h2>
        {book?.title?.length > 200 ? book?.title?.slice(0, 200) : book?.title}
      </h2>
      <p>
        Sales : <span>{book?.sales}</span>
      </p>
      <div className="book-data">
        <div>
          <span>PRICE</span>
          <p>$ {book?.price}</p>
        </div>
        <button onClick={() => setShowEditModal(true)}>EDIT</button>
        <button
          className="del-btn"
          onClick={() => {
            setShowAlert(true);
          }}
        >
          DELETE
        </button>
        {showEditModal ? (
          <EditModal
            book={book}
            setShowModal={setShowEditModal}
            setBooksData={setBooksData}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Book;

Book.propTypes = {
  book: PropTypes.object,
  setBooksData: PropTypes.func,
};
