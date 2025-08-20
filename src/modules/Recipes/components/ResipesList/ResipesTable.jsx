import NoData from "./../../../Shared/components/NoData/NoData";
import { useEffect, useState } from "react";
import { deleteResipes, getResipes } from "../../../../api/Resipes/Resipes";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Shared/Delete-modal/DeleteModal";
import resipeImg from "./../../../../assets/images/1041373.png";
import { baseImgURL } from "../../../../utils/axios";
import Loader from "../../../Shared/Loader/Loader";

const ResipesTable = () => {
  const navigate = useNavigate();
  const tableHeaderCell = [
    "Name",
    "Image",
    "Price",
    "Description",
    "Category",
    "Actions",
  ];
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getResipes(setRecipes, 5, 1, (pages) => {
      const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
      setNumberOfPages(pagesArray);
      setIsLoading(false);
    });
  }, []);
  const handleAdd = () => {
    navigate("/dashboard/recipe-data");
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemId = (id) => {
    setSelectedItem(id);
  };
  const handleDelete = () => {
    deleteResipes(selectedItem);
    const updatedData = recipes.filter((item) => item.id !== selectedItem);
    setRecipes(updatedData);
  };

  return (
    <div>
      <DeleteModal handleDelete={handleDelete} itemName={"recipe"} />
      <div className="title d-flex justify-content-between align-items-center p-2 mt-2 mb-2">
        <div className="title-text pt-2 pb-2">
          <h4>Recipe Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={handleAdd}
            type="submit"
            className=" btn w-100 pe-5 ps-5 pt-3 pb-3 login-btn  login-btn  "
          >
            Add New Item
          </button>
        </div>
      </div>
      <table className="table table-hover rounded-4 ">
        <thead className="table-light ">
          <tr>
            {tableHeaderCell?.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody className="m-auto">
          {isLoading && <Loader />}
          {recipes?.length > 0 &&
            recipes?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.name}</td>
                <td className="w-25 h-25">
                  <div className=" w-50 h-50 rounded-3">
                    <img
                      className="w-25 h-25 rounded-3"
                      src={
                        item?.imagePath
                          ? `${baseImgURL}${item?.imagePath}`
                          : resipeImg
                      }
                      alt=""
                    />
                  </div>
                </td>
                <td>{item?.price}</td>
                <td>{item?.description}</td>
                <td>{item?.category[0]?.name}</td>

                <td className="cursor-pointer">
                  <i
                    onClick={() =>
                      navigate(`/dashboard/recipe-data`, {
                        state: { recipeData: item },
                      })
                    }
                    className="fa-solid fa-edit p-1 "
                  ></i>
                  <i
                    onClick={() => handleItemId(item.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="fa-solid fa-trash text-danger p-1"
                  ></i>
                </td>
              </tr>
            ))}
          {recipes?.length === 0 && !isLoading && (
            <tr>
              <td colSpan="4">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/** Pagination */}
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-end"
      >
        <ul className="pagination">
          <li className="page-item text-muted">
            <a className="page-link text-muted" href="#">
              Previous
            </a>
          </li>

          {numberOfPages?.map((page) => (
            <li
              onClick={(e) => {
                document.querySelectorAll(".page-item").forEach((item) => {
                  item.style.backgroundColor = "";
                });
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                getResipes(setRecipes, 5, page, (pages) => {
                  const pagesArray = Array.from(
                    { length: pages },
                    (_, i) => i + 1
                  );
                  setNumberOfPages(pagesArray);
                });
              }}
              className="page-item text-muted"
              key={page}
            >
              <a className="page-link text-muted" href="#">
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link text-muted" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ResipesTable;
