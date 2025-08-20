import { useEffect, useState } from "react";
import { getUsers } from "../../../../api/Users/Users";
import Header from "../../../Shared/components/Header/Header";
import List from "./List";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getUsers(setUsers, 5, 1, (pages) => {
      const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
      setNumberOfPages(pagesArray);
    });
  }, []);
  return (
    <div>
      <title>User List</title>
      <Header
        title="User List"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <List
        title={"Users Table Details"}
        paragraph={"You can check all details"}
        buttonText={"add"}
        data={users}
        tableHeaderCell={[
          "ID",
          "User name",
          "Image",
          "Email",
          "Country",
          "Phone",
          "Action",
        ]}
      />
      <nav aria-label="Page navigation example" className="text-muted">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link text-muted"
              href="#"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              Previous
            </a>
          </li>

          {numberOfPages
            ?.slice(
              Math.max(0, currentPage - 3),
              Math.min(currentPage + 2, numberOfPages.length)
            )
            .map((page) => (
              <li
                onClick={() => {
                  setCurrentPage(page);
                  getUsers(setUsers, 5, page, (pages) => {
                    const pagesArray = Array.from(
                      { length: pages },
                      (_, i) => i + 1
                    );
                    setNumberOfPages(pagesArray);
                  });
                }}
                className={`page-item ${currentPage === page ? "active" : ""}`}
                key={page}
              >
                <a className="page-link text-muted" href="#">
                  {page}
                </a>
              </li>
            ))}
          <li className="page-item">
            <a
              className="page-link text-muted"
              href="#"
              onClick={() =>
                setCurrentPage(Math.min(numberOfPages.length, currentPage + 1))
              }
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
