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
  const [groupedBooks, setGroupedBooks] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
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

  // Filter books by search query
  const filteredBooks = Object.keys(groupedBooks).reduce(
    (acc, categoryName) => {
      const filtered = groupedBooks[categoryName].filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[categoryName] = filtered;
      }
      return acc;
    },
    {}
  );

  // Check if there are any filtered books
  const hasBooks = Object.keys(filteredBooks).length > 0;

  return (
    <div className="container-fluid mt-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search books by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {hasBooks ? (
        Object.keys(filteredBooks).map((categoryName) => (
          <div key={categoryName} className="mb-5">
            <h3 className="text-primary">{categoryName}</h3>
            <div className="row">
              {filteredBooks[categoryName].map((book) => (
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
        ))
      ) : (
        <div className="text-center mt-5">
          <h4>No books found</h4>
        </div>
      )}
    </div>
  );
}

export default Home;
