


import { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Form from './Component/Form';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("news");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = (index) => {
    const updatedData = data.filter((_, idx) => idx !== index);
    setData(updatedData);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const newTotalPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(newTotalPages);

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages || 1);
    }
  }, [data, itemsPerPage, currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Hi Readers!</h4>
              <p className="text-gray-600">Here is your news.</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800">View Toggle</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveButton("news")}
                  className={`p-2 rounded-lg transition ${activeButton === "news"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  📰
                </button>
                <button
                  onClick={() => setActiveButton("doc")}
                  className={`p-2 rounded-lg transition ${activeButton === "doc"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  📃
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800">Have Feedback?</h4>
              <p
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={onOpenModal}
              >
                We are listening!
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <h3 className="text-xl text-gray-700">Loading...</h3>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${activeButton === "news" ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
            >
              {currentItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.id} - {item.title.slice(0, 25)}
                      </h3>
                      <p className="text-gray-600 mt-2">{item.body.slice(0, 40)}...</p>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={onCloseModal} center>
        < Form setOpen={setOpen} />
      </Modal>
    </div>
  );
}

export default App;