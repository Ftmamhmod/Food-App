import NoData from "./../NoData/NoData";
const List = ({ title, paragraph, buttonText, data }) => {
  return (
    <div>
      <div className="title d-flex justify-content-between align-items-center p-2 mt-2 mb-2">
        <div className="title-text pt-2 pb-2">
          <h4>{title}</h4>
          <p>{paragraph}</p>
        </div>
        <div>
          <button
            type="submit"
            className=" btn w-100 pe-5 ps-5 pt-3 pb-3 login-btn  login-btn  "
          >
            {buttonText}
          </button>
        </div>
      </div>
      <table className="table table-hover ">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="m-auto">
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="cursor-pointer">
                  <i className="fa-solid fa-ellipsis "></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
