import axios from "axios";
import { useEffect, useState } from "react";
import Book from "../../components/Book";
import AddBookModal from "../../components/AddBookModal";

const Bookslist = () => {
  const [booksData, setBooksData] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("https://d38686458ba89a5d.mokky.dev/books")
          .then((req) => setBooksData(req.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="title">Books List ( admin )</h2>
      </div>
      {showAddBookModal ? (
        <AddBookModal
          setShowModal={setShowAddBookModal}
          setBooksData={setBooksData}
        />
      ) : (
        ""
      )}
      <div className="container booklist-top">
        <p>{booksData?.length} books found</p>
        <button onClick={() => setShowAddBookModal(true)}>+ NEW BOOK</button>
      </div>
      <div className="container">
        <div className="books">
          {booksData?.map((book) => {
            return (
              <Book key={book?.id} book={book} setBooksData={setBooksData} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Bookslist;
