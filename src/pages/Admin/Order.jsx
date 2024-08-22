import axios from "axios";
import { useEffect, useState } from "react";

const Order = () => {
  const [ordersData, setOrdersData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://d38686458ba89a5d.mokky.dev/orders")
          .then((req) => setOrdersData(req.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="title">Orders List (admin)</h2>
      </div>
      <div className="container orders">
        <div className="column">
          <b>Product</b>
          <b>Purchase Date</b>
          <b>Price</b>
          <b>Count</b>
          <b>Total</b>
          <b>Status</b>
        </div>
        {ordersData?.map((item) => {
          return (
            <div className="column" key={item?.id}>
              <div>
                <img src={"/public/" + item?.cover_img} />
                <h2>
                  {item?.title?.length > 70
                    ? item?.title?.slice(0, 70) + "..."
                    : item?.title}
                </h2>
              </div>
              <p>{item?.purchased_date}</p>
              <p>${item?.price}</p>
              <p>{item?.count}</p>
              <p>${item?.price * item?.count}</p>
              <li className={item?.isPaid ? "paid" : "created"}>
                {item?.isPaid ? "Paid" : "Created"}
              </li>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Order;
