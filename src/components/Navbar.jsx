import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationModal from "./NotificationModal";

const Navbar = () => {
  const { pathname } = useLocation();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationsData, setNotificationsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://d38686458ba89a5d.mokky.dev/notifications")
          .then(({ data }) => setNotificationsData(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav>
      <div className="container">
        <Link className="logo" to="/">
          LOGO
        </Link>
        <ul>
          <li>
            <Link to={"/"}>user</Link>
          </li>
          <li>
            <Link to={"/admin"}>admin</Link>
          </li>
          <li>
            <Link to={"/admin/orders"}>orders</Link>
          </li>
        </ul>
        <label htmlFor="">
          <input type="text" placeholder="Search" />
        </label>
        {pathname.startsWith("/admin") ? (
          <div className="notification">
            {notificationsData.length > 0 ? (
              <span>{notificationsData.length}</span>
            ) : (
              ""
            )}
            <p onClick={() => setShowNotificationModal(true)}>Notification</p>
            {showNotificationModal ? (
              <NotificationModal
                setShowModal={setShowNotificationModal}
                dataArr={notificationsData}
                setData={setNotificationsData}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
