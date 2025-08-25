import { useForm } from "react-hook-form";
import SecHeader from "../../../Shared/components/sec-header/SecHeader";
import { addResipes, updateResipes } from "../../../../api/Resipes/Resipes";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories } from "../../../../api/Categories/Categories";
import { useLocation, useNavigate } from "react-router-dom";
const ResipesData = () => {
  const location = useLocation();
  const item = location.state?.recipeData || null;
  const editMode = !!item;
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: editMode
      ? {
          name: item.name,
          tagId: item.tagId,
          price: item.price,
          categoriesIds: item.categoriesIds,
          description: item.description,
          recipeImage: item.recipeImage,
        }
      : {},
  });

  useEffect(() => {
    if (editMode && item) {
      setValue("name", item?.name);
      setValue("tagId", item?.tagId);
      setValue("price", item?.price);
      setValue("categoriesIds", item?.categoriesIds);
      setValue("description", item?.description);
      setValue("recipeImage", item?.recipeImage);
    }
  }, [editMode, item, setValue]);
  const onSubmit = (data) => {
    if (editMode) {
      handleEditRecipe(item.id, appendToFormData(data));
      navigate("/dashboard/recipes");
    } else {
      addResipes(appendToFormData(data)).then(() => {
        navigate("/dashboard/recipes");
      });
    }
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
  const handleEditRecipe = (id, updatedData) => {
    updateResipes(id, updatedData);
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
          <div className="col-md-8  m-auto">
            <div className="input-group mt-2">
              <input
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
                type="text"
                className="form-control"
                placeholder="Recipe Name"
                defaultValue={editMode ? item.name : ""}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
            <div className="input-group mt-2">
              <select
                className="form-control"
                id="tagId"
                {...register("tagId", {
                  required: {
                    value: true,
                    message: "Tag is required",
                  },
                })}
              >
                <option value="">Select a tag</option>
                {tagId?.map((tag) => (
                  <option
                    key={tag.id}
                    value={tag.id}
                    selected={editMode && item.tagId === tag.id}
                  >
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.tagId && (
              <span className="text-danger">{errors.tagId.message}</span>
            )}
            <div className="input-group mt-2">
              <input
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price is required",
                  },
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                })}
                type="number"
                className="form-control"
                placeholder="Recipe price"
                defaultValue={editMode ? item.price : ""}
              />
            </div>
            {errors.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
            <div className="input-group mt-2">
              <select
                className="form-control"
                id="cat"
                {...register("categoriesIds", {
                  required: {
                    value: true,
                    message: "Category is required",
                  },
                })}
              >
                <option value="">Select a category</option>
                {cat?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    selected={editMode && item.categoriesIds === category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoriesIds && (
              <span className="text-danger">
                {errors.categoriesIds.message}
              </span>
            )}
            <div className="input-group mt-2">
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                className="form-control"
                placeholder="Recipe description"
                defaultValue={editMode ? item.description : ""}
              />
            </div>
            {errors.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
            <div className="input-group mt-2">
              <input
                {...register("recipeImage", {
                  required: !editMode,
                  message: "Image is required",
                })}
                type="file"
                className="form-control"
                accept="image/*"
              />
              {editMode && item.imagePath && (
                <div className="mt-2 w-25 h-25 rounded-3">
                  <img
                    className="w-25 h-25 rounded-3"
                    src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                    alt="Current recipe"
                  />
                </div>
              )}
            </div>
            {errors.recipeImage && (
              <span className="text-danger">{errors.recipeImage.message}</span>
            )}
            <div className="mt-4 text-end">
              <button
                onClick={() => navigate("/dashboard/recipes")}
                type="button"
                className="btn me-2  p-2 btn-outline-danger fw-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="btn ms-2 p-2 login-btn fw-bold"
                disabled={isSubmitting}
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResipesData;
