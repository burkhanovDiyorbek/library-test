import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const Modal = ({ book, setShowModal, setBooksData }) => {
  const [count, setCount] = useState(1);
  const result = book?.sales + count;
  const date = new Date();

  const buyBtnClickFunc = async (id) => {
    try {
      await axios.post("https://d38686458ba89a5d.mokky.dev/orders", {
        title: book?.title,
        price: book?.price,
        count: count,
        isPaid: true,
        purchased_date: `${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`,
        ...book,
      });
      await axios.post("https://d38686458ba89a5d.mokky.dev/notifications ", {
        title: book?.title,
        price: book?.price,
        count: count,
      });
      await axios
        .patch("https://d38686458ba89a5d.mokky.dev/books/" + id, {
          ...book,
          sales: result,
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
        <div className="modal-content">
          <h2>{book?.title}</h2>
          <div>
            <p>$ {book?.price} *</p>
            <div>
              <button onClick={() => setCount((prev) => prev - 1)}>-</button>
              <p>{count}</p>
              <button onClick={() => setCount((prev) => prev + 1)}>+</button>
            </div>
            <p>
              Total Price : <span>$ {book?.price * count}</span>
            </p>
            <button
              onClick={() => buyBtnClickFunc(book?.id)}
              disabled={count < 1}
              className="buy-btn"
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  book: PropTypes.object,
  setBooksData: PropTypes.func,
  setShowModal: PropTypes.func,
};
