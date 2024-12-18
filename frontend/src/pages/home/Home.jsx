import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const groupByCategory = (data) => {
  return data.reduce((acc, book) => {
    const categoryName = book.category_id.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(book);
    return acc;
  }, {});
};

function Home() {
  const { loading, error, getAllBooks } = useAxios();
  const [groupedBooks, setGroupedBooks] = useState(null); // State for grouped books
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      if (data) {
        setGroupedBooks(groupByCategory(data));
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Something went wrong</h2>
        </div>
      </div>
    );
  }

  if (loading || !groupedBooks) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  const truncate = (text) => {
    return text.length > 34 ? text.slice(0, 34) + "..." : text;
  };

  return (
    <div className="container-fluid mt-4">
      {Object.keys(groupedBooks).map((categoryName) => (
        <div key={categoryName} className="mb-5">
          <h3 className="text-primary">{categoryName}</h3>
          <div className="row">
            {groupedBooks[categoryName].map((book) => (
              <div key={book._id} className="col-md-4 mb-2">
                <div className="card">
                  <img
                    src={book.cover_photo}
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "300px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{truncate(book.title)}</h5>
                    <p className="card-text">Price: ${book.price}</p>
                    <button
                      onClick={() => navigate(`book_details/${book._id}`)}
                      className="btn btn-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
