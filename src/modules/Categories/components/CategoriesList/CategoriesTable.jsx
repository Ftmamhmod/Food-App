import NoData from "../../../Shared/components/NoData/NoData";
import { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../../api/Categories/Categories";
import DeleteModal from "../../../Shared/Delete-modal/DeleteModal";
import { useForm } from "react-hook-form";
import Loader from "../../../Shared/Loader/Loader";

const CategoriesTable = () => {
  const tableHeaderCell = ["Id", "Name", "Creation Date", "Actions"];
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleEdit = (id) => {
    const categoryToEdit = categories.find((item) => item.id === id);
    reset({ name: categoryToEdit.name });
    setIsEdit(true);
    setSelectedItem(id);
  };
  const getNameValue = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(value)
    );
    if (value === "") {
      getCategories(setCategories, 5, 1, (pages) => {
        const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
        setNumberOfPages(pagesArray);
      });
    } else {
      setCategories(filteredCategories);
    }
  };
  const getFormTitle = () => (isEdit ? "Edit Category" : "Add Category");

  const onSubmit = (data) => {
    if (isEdit) {
      updateCategory(selectedItem, data);
      setIsEdit(false);
      reset();
    } else {
      addCategory(data);
    }
    getCategories(setCategories, 5, 1, (pages) => {
      const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
      setNumberOfPages(pagesArray);
    });
    reset();
  };
  const handleItemId = (id) => {
    setSelectedItem(id);
  };
  useEffect(() => {
    setIsLoading(true);
    getCategories(setCategories, 5, 1, (pages) => {
      const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);
      setNumberOfPages(pagesArray);
      setIsLoading(false);
    });
  }, []);

  const handleDelete = () => {
    deleteCategory(selectedItem);
    const updatedData = categories.filter((item) => item.id !== selectedItem);
    setCategories(updatedData);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {getFormTitle()}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mt-4">
                  <input
                    {...register("name", {
                      required: "Category name is required",
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    aria-label="Category"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal handleDelete={handleDelete} itemName={"Category"} />
      <div className="title d-flex justify-content-between align-items-center p-2 mt-2 mb-2">
        <div className="title-text pt-2 pb-2">
          <h4>Categories Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            type="submit"
            className="btn w-100 pe-3 pe-md-5 ps-3 ps-md-5 pt-2 pt-md-3 pb-2 pb-md-3 login-btn"
          >
            Add New Category
          </button>
        </div>
      </div>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search by name..."
        onChange={getNameValue}
      />
      <div className="table-responsive">
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
            {!isLoading &&
              categories?.length > 0 &&
              categories?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.id}</td>
                  <td>{item?.name}</td>
                  <td>{item?.creationDate}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)} className="btn">
                      <i
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        className="fa-solid fa-edit "
                      ></i>
                    </button>
                    <button
                      onClick={() => handleItemId(item.id)}
                      className="btn"
                    >
                      <i
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="fa-solid fa-trash text-danger "
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
            {categories?.length === 0 && !isLoading && (
              <tr>
                <td colSpan="4">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
                getCategories(setCategories, 5, page, (pages) => {
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

export default CategoriesTable;
