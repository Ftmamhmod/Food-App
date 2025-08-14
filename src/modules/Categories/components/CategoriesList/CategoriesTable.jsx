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

const CategoriesTable = () => {
  const tableHeaderCell = ["Id", "Name", "Creation Date", "Actions"];
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (id) => {
    const categoryToEdit = categories.find((item) => item.id === id);
    reset({ name: categoryToEdit.name });
    setIsEdit(true);
    setSelectedItem(id);
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
    getCategories(setCategories);
    reset();
  };
  const handleItemId = (id) => {
    setSelectedItem(id);
  };
  useEffect(() => {
    getCategories(setCategories);
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
            className=" btn w-100 pe-5 ps-5 pt-3 pb-3 login-btn  login-btn  "
          >
            Add New Category
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
          {categories?.length > 0 ? (
            categories?.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.creationDate}</td>
                <td className="cursor-pointer">
                  <i
                    onClick={() => handleEdit(item.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
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

export default CategoriesTable;
