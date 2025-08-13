import { useForm } from "react-hook-form";
import SecHeader from "../../../Shared/components/sec-header/SecHeader";
import { addResipes } from "../../../../api/Resipes/Resipes";

const ResipesData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data) => {
    addResipes(data);
  };
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
                <option value="">1</option>
                <option value="">2</option>
                <option value="">6</option>
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
                {...register("categoryId")}
              >
                <option value="">1</option>
                <option value="">2</option>
                <option value="">5049</option>
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
