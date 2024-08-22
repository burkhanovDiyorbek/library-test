import axios from "axios";
import { useEffect, useState } from "react";
import BookUser from "../../components/BookUser";

const Home = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://d38686458ba89a5d.mokky.dev/books")
          .then((req) =>
            setBooksData(req.data.filter((item) => item.isPublished))
          );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="title">Home Page for user</h2>
      </div>
      <div className="container">
        <div className="books">
          {booksData?.map((book) => {
            return (
              <BookUser
                key={book?.id}
                book={book}
                setBooksData={setBooksData}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
