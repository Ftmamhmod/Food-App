const ListModal = ({ openModal }) => {
  return (
    <>
      {openModal && (
        <ul className="list-group position-fixed top-50 start-50 translate-middle">
          <li className="list-group-item d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-2">
              <button className="btn btn-sm btn-info">
                <i className="fas fa-eye"></i>
              </button>
              <button className="btn btn-sm btn-warning">
                <i className="fas fa-edit"></i>
              </button>
              <button className="btn btn-sm btn-danger">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default ListModal;
