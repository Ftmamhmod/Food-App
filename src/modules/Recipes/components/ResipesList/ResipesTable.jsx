import NoData from "./../../../Shared/components/NoData/NoData";
import { useContext, useEffect, useState } from "react";
import { deleteResipes, getResipes } from "../../../../api/Resipes/Resipes";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Shared/Delete-modal/DeleteModal";
import resipeImg from "./../../../../assets/images/1041373.png";
import { axiosInstance, baseImgURL, endpoints } from "../../../../utils/axios";
import Loader from "../../../Shared/Loader/Loader";
import { AuthContext } from "../../../../context/AuthContext";
import { toastConfig } from "../../../../utils/toast-config";
import { toast } from "react-toastify";

const ResipesTable = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const tableHeaderCell = [
    "ID",
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
  const getNameValue = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(value)
    );
    if (value === "") {
      getResipes(setRecipes, 5, 1, (pages) => {
        const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
        setNumberOfPages(pagesArray);
      });
    } else {
      setRecipes(filteredRecipes);
    }
  };
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
  const handleAddToFavorites = async (id) => {
    try {
      await axiosInstance.post(endpoints.userRecipe.add, {
        recipeId: id,
      });
      toast.success("Recipe added to favorites", toastConfig);
    } catch (error) {
      toast.error("Error adding to favorites: " + error.message, toastConfig);
    }
  };
  return (
    <div>
      <DeleteModal handleDelete={handleDelete} itemName={"recipe"} />
      <div className="title d-flex justify-content-between align-items-center p-2 mt-2 mb-2">
        <div className="title-text pt-2 pb-2">
          <h4>Recipe Table Details</h4>
          <p>You can check all details</p>
        </div>
        {loginUser?.userGroup === "SuperAdmin" && (
          <div>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={handleAdd}
              type="submit"
              className="btn w-100 pe-3 pe-md-5 ps-3 ps-md-5 pt-2 pt-md-3 pb-2 pb-md-3 login-btn"
            >
              Add New Item
            </button>
          </div>
        )}
      </div>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search by name..."
        onChange={getNameValue}
      />
      <div className="table-responsive">
        <table className="table table-hover rounded-4">
          <thead className="table-light">
            <tr>
              {tableHeaderCell?.map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody className="m-auto">
            {isLoading && (
              <tr>
                <td colSpan={tableHeaderCell.length} className="p-0">
                  <Loader height={260} label="Loading recipes..." />
                </td>
              </tr>
            )}
            {!isLoading &&
              recipes?.length > 0 &&
              recipes?.map((item) => (
                <tr key={item?.id}>
                  <td className="text-nowrap">{item?.id}</td>
                  <td className="text-nowrap">{item?.name}</td>
                  <td>
                    <img
                      loading="lazy"
                      className="rounded-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      src={
                        item?.imagePath
                          ? `${baseImgURL}${item?.imagePath}`
                          : resipeImg
                      }
                      alt=""
                    />
                  </td>
                  <td className="text-nowrap">{item?.price}</td>
                  <td className="text-break">{item?.description}</td>
                  <td className="text-nowrap">{item?.category[0]?.name}</td>
                  <td className="text-nowrap">
                    {loginUser?.userGroup === "SuperAdmin" && (
                      <div className="d-flex ">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/recipe-data`, {
                              state: { recipeData: item },
                            })
                          }
                          className="btn btn-sm "
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleItemId(item.id)}
                          className="btn btn-sm "
                        >
                          <i
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            className="fa-solid fa-trash text-danger"
                          ></i>
                        </button>
                      </div>
                    )}
                    {loginUser?.userGroup != "SuperAdmin" && (
                      <div className="d-flex">
                        <button className="btn btn-sm ">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          onClick={() => handleAddToFavorites(item.id)}
                          className="btn btn-sm "
                        >
                          <i className="fa-solid fa-heart text-danger"></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            {!isLoading && recipes?.length === 0 && (
              <tr>
                <td colSpan="6">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
              onClick={async (e) => {
                if (isLoading) return;
                document
                  .querySelectorAll(".pagination .page-item")
                  .forEach((item) => {
                    item.style.backgroundColor = "";
                  });
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                setIsLoading(true);
                await getResipes(setRecipes, 5, page, (pages) => {
                  const pagesArray = Array.from(
                    { length: pages },
                    (_, i) => i + 1
                  );
                  setNumberOfPages(pagesArray);
                });
                setIsLoading(false);
              }}
              className={`page-item text-muted ${isLoading ? "disabled" : ""}`}
              key={page}
            >
              <a
                className="page-link text-muted"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
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
