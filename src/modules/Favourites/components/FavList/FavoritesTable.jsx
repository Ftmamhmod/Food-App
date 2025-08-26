import React, { useEffect, useState } from "react";
import { axiosInstance, baseImgURL, endpoints } from "../../../../utils/axios";
import NoData from "./../../../Shared/components/NoData/NoData";
import { toast } from "react-toastify";
import { toastConfig } from "../../../../utils/toast-config";
import Loader from "../../../Shared/Loader/Loader";
import resipeImg from "./../../../../assets/images/1041373.png";

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
        <div className="row g-4">
          {isLoading && <Loader />}
          {favorites?.length == 0 && <NoData />}
          {favorites?.map((item) => (
            <div className="col-lg-4 col-md-4 col-sm-12" key={item?.recipe?.id}>
              <div className="card h-100 shadow-sm rounded-4">
                <div className="position-relative">
                  <div className="position-absolute top-0 end-0 m-2">
                    <button
                      className="btn btn-light rounded-circle"
                      onClick={() => handleDelete(item?.id)}
                    >
                      <i className="fa fa-heart text-danger"></i>
                    </button>
                  </div>
                  <div className="overflow-hidden" style={{ height: "250px" }}>
                    <img
                      className="w-100 h-100 object-fit-cover rounded-top-4"
                      src={
                        item?.recipe?.imagePath
                          ? `${baseImgURL}${item?.recipe?.imagePath}`
                          : resipeImg
                      }
                      alt={item?.recipe?.name}
                    />
                  </div>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{item?.recipe?.name}</h4>
                  <p className="card-text">{item?.recipe?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesTable;
