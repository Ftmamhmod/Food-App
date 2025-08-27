import { useEffect, useState } from "react";
import { getUsers } from "../../../../api/Users/Users";
import Header from "../../../Shared/components/Header/Header";
import List from "./List";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Initial fetch & refetch when currentPage changes
  useEffect(() => {
    let isCancelled = false;
    const run = async () => {
      setIsLoading(true);
      await getUsers(setUsers, 5, currentPage, (pages) => {
        if (isCancelled) return;
        const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
        setNumberOfPages(pagesArray);
      });
      if (!isCancelled) setIsLoading(false);
    };
    run();
    return () => {
      isCancelled = true;
    };
  }, [currentPage]);
  const getNameValue = (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value === "") {
      // Restore original list for current page
      setCurrentPage(1); // reset to page 1 to avoid mismatch
      return; // effect will refetch
    }
    const filteredUsers = users.filter((user) =>
      user?.userName?.toLowerCase().includes(value)
    );
    setUsers(filteredUsers);
    setNumberOfPages([1]);
    setCurrentPage(1);
  };
  const handleRefreshUsers = () => {
    getUsers(setUsers, 5, currentPage, (pages) => {
      const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
      setNumberOfPages(pagesArray);
    });
  };
  return (
    <div>
      <title>User List</title>
      <Header
        title="User List"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <List
        handleRefreshUsers={handleRefreshUsers}
        isLoading={isLoading}
        title={"Users Table Details"}
        paragraph={"You can check all details"}
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
        getNameValue={getNameValue}
      />
      {/* Pagination */}
      <nav
        aria-label="Page navigation"
        className="text-muted d-flex justify-content-end"
      >
        <ul className="pagination mb-0">
          <li
            className={`page-item ${
              currentPage === 1 || isLoading ? "disabled" : ""
            }`}
          >
            <a
              className="page-link text-muted"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === 1 || isLoading) return;
                setCurrentPage(1);
              }}
            >
              «
            </a>
          </li>
          <li
            className={`page-item ${
              currentPage === 1 || isLoading ? "disabled" : ""
            }`}
          >
            <a
              className="page-link text-muted"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === 1 || isLoading) return;
                setCurrentPage((p) => Math.max(1, p - 1));
              }}
            >
              Previous
            </a>
          </li>
          {numberOfPages
            ?.slice(
              Math.max(0, Math.min(currentPage - 3, numberOfPages.length - 5)),
              Math.max(5, Math.min(currentPage + 2, numberOfPages.length))
            )
            .map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""} ${
                  isLoading ? "disabled" : ""
                }`}
              >
                <a
                  href="#"
                  className="page-link text-muted"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isLoading || page === currentPage) return;
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </a>
              </li>
            ))}
          <li
            className={`page-item ${
              currentPage === numberOfPages.length || isLoading
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link text-muted"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === numberOfPages.length || isLoading) return;
                setCurrentPage((p) => Math.min(numberOfPages.length, p + 1));
              }}
            >
              Next
            </a>
          </li>
          <li
            className={`page-item ${
              currentPage === numberOfPages.length || isLoading
                ? "disabled"
                : ""
            }`}
          >
            <a
              className="page-link text-muted"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage === numberOfPages.length || isLoading) return;
                setCurrentPage(numberOfPages.length);
              }}
            >
              »
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
