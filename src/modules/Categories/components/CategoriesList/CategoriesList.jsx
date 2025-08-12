import { useForm } from "react-hook-form";
import {
  addCategory,
  getCategories,
} from "../../../../api/Categories/Categories";
import List from "../../../Shared/components/List/List";
import Header from "./../../../Shared/components/Header/Header";
import { useEffect, useState } from "react";
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const tableHeaderCell = ["Id", "Name", "Creation Date", "Actions"];
  useEffect(() => {
    getCategories(setCategories);
  }, []);
  const handleAdd = () => {
    console.log("hi");
  };
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    addCategory(data);
    getCategories(setCategories);
    reset();
  };
  return (
    <>
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
                Add Category
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                data-bs-dismiss="modal"
                type="button"
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <title>Categories</title>
      <Header
        title="Categories"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <List
        title={"Categories Table Details"}
        paragraph={"You can check all details"}
        buttonText={"Add New Category"}
        data={categories}
        tableHeaderCell={tableHeaderCell}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default CategoriesList;
