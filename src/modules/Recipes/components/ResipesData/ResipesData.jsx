import { useForm } from "react-hook-form";
import SecHeader from "../../../Shared/components/sec-header/SecHeader";
import { addResipes } from "../../../../api/Resipes/Resipes";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories } from "../../../../api/Categories/Categories";
import { useNavigate } from "react-router-dom";

const ResipesData = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    addResipes(data);
    navigate("/dashboard/recipes");
  };
  const [tagId, setTagId] = useState(null);
  const [cat, setCat] = useState(null);
  const getTagId = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTagId(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching tag ID:", error);
    }
  };

  useEffect(() => {
    getTagId();
    getCategories(setCat);
  }, []);
  return (
    <>
      <SecHeader />
      <div className="container mt-5 pe-5 ps-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-8 text-center m-auto">
            <div className="input-group mt-2">
              <input
                {...register("name")}
                type="text"
                className="form-control"
                placeholder="Recipe Name"
                aria-label="recipeName"
                aria-describedby="basic-addon1"
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="input-group mt-2">
              <select
                className="form-control"
                id="tagId"
                {...register("tagId")}
              >
                {tagId?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mt-2">
              <input
                {...register("price")}
                type="number"
                className="form-control"
                placeholder="Recipe price"
                aria-label="recipePrice"
                aria-describedby="basic-addon1"
              />
              {errors.price && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="input-group mt-2">
              <select
                className="form-control"
                id="cat"
                {...register("categoriesIds")}
              >
                {cat?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mt-2">
              <textarea
                {...register("description")}
                className="form-control"
                placeholder="Recipe description"
                aria-label="recipeDescription"
                aria-describedby="basic-addon1"
              />
              {errors.description && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="input-group mt-2">
              <input
                {...register("recipeImage")}
                type="file"
                className="form-control"
                placeholder="Enter your E-mail"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="mt-4 text-end">
              <button
                type="button"
                className="btn me-2  p-2 btn-outline-success fw-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="btn ms-2 p-2 login-btn fw-bold"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResipesData;
