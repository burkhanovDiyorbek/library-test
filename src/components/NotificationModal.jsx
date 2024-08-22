import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NotificationModal = ({ dataArr, setData, setShowModal }) => {
  const handleClick = async (id) => {
    try {
      await axios
        .delete("https://d38686458ba89a5d.mokky.dev/notifications/" + id)
        .then(() => setData((prev) => prev.filter((item) => item.id != id)));
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
          <div className="not-cards">
            {dataArr.length > 0 ? (
              dataArr?.map((item) => {
                return (
                  <label
                    className="not-card"
                    key={item?.id}
                    onClick={() => handleClick(item?.id)}
                  >
                    <Link to={"/admin/orders"}>
                      <div>
                        <h2>{item?.title}</h2>
                        <p>
                          ${item?.price} x {item?.count} = $
                          {item?.price * item?.count}
                        </p>
                      </div>
                    </Link>
                  </label>
                );
              })
            ) : (
              <p>You have not any notifications...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;

NotificationModal.propTypes = {
  dataArr: PropTypes.array,
  setData: PropTypes.func,
  setShowModal: PropTypes.func,
};
