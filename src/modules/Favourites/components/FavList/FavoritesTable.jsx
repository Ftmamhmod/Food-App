import React, { useEffect, useState } from "react";
import { axiosInstance, baseImgURL, endpoints } from "../../../../utils/axios";
import NoData from "./../../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";
import { toastConfig } from "../../../../utils/toast-config";
import Loader from "../../../Shared/Loader/Loader";

const FavoritesTable = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const getFavorites = async () => {
    try {
      const response = await axiosInstance.get(endpoints.userRecipe.list);
      setFavorites(response?.data.data);
      console.log(response?.data.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getFavorites();
    setIsLoading(false);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(
        `${endpoints.userRecipe.delete.replace("{id}", id)}`
      );
      toast.success("Favorite deleted successfully", toastConfig);
      getFavorites();
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };
  return (
    <>
      <div className="container">
        <input
          className="form-control mb-3 mt-3"
          type="text"
          placeholder="Search by name..."
        />
        <div className="row">
          {isLoading && <Loader />}
          {favorites?.length == 0 && <NoData />}
          {favorites?.map((item) => (
            <div
              className="col-md-4 shadow-sm rounded-4 "
              key={item?.recipe?.id}
            >
              <div className="w-100 h-50 rounded-4 overflow-hidden position-relative">
                <div className="text-center position-absolute bg-white  end-0 m-2 rounded-5">
                  <button
                    className="btn"
                    onClick={() => handleDelete(item?.id)}
                  >
                    <i className="fa fa-heart text-danger  "></i>
                  </button>
                </div>

                <img
                  className="img-fluid rounded-4 w-100"
                  src={`${baseImgURL}${item?.recipe?.imagePath}`}
                  alt={item?.recipe?.name}
                />
              </div>
              <h4 className="pt-3">{item?.recipe?.name}</h4>
              <p className="pt-3">{item?.recipe?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesTable;
