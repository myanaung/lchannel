const Pagination = ({handleGetValue , pageNumber}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li> */}
        <li className="page-item" onClick={() => handleGetValue(1)}>
          <a className={pageNumber === 1 ? "page-link active" : "page-link"} href="#">
            1
          </a>
        </li>
        <li className="page-item" onClick={() => handleGetValue(2)}>
          <a className={pageNumber === 2 ? "page-link active" : "page-link"} href="#">
            2
          </a>
        </li>
        <li className="page-item" onClick={() => handleGetValue(3)}>
          <a className={pageNumber === 3 ? "page-link active" : "page-link"} href="#">
            3
          </a>
        </li>
        <li className="page-item" onClick={() => handleGetValue(4)}>
          <a className={pageNumber === 4 ? "page-link active" : "page-link"} href="#">
            4
          </a>
        </li>
        <li className="page-item" onClick={() => handleGetValue(5)}>
          <a className={pageNumber === 5 ? "page-link active" : "page-link"} href="#">
            5
          </a>
        </li>
        <li className="page-item" onClick={() => handleGetValue(6)}>
          <a className={pageNumber === 6 ? "page-link active" : "page-link"} href="#">
            6
          </a>
        </li>
        {/* <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
