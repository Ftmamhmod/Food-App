import { useState } from "react";

import { updateResipes } from "../../../../api/Resipes/Resipes";
import NoData from "../../../Shared/components/NoData/NoData";
import { baseImgURL } from "../../../../utils/axios";
import userImg from "./../../../../assets/images/abstract-user-flat-4.png";
import { deleteUser } from "../../../../api/Users/Users";
import DeleteModal from "./../../../Shared/Delete-modal/DeleteModal";
import Loader from "../../../Shared/Loader/Loader";

const List = ({
  title,
  paragraph,
  data,
  tableHeaderCell,
  isLoading,
  getNameValue,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemId = (id) => {
    setSelectedItem(id);
  };
  const handleDelete = () => {
    deleteUser(selectedItem);
  };

  const handleEditRecipe = (id, updatedData) => {
    updateResipes(id, updatedData);
  };
  return (
    <div>
      <DeleteModal handleDelete={handleDelete} itemName={"user"} />

      <div className="title d-flex justify-content-between align-items-center p-2 mt-2 mb-2">
        <div className="title-text pt-2 pb-2">
          <h4>{title}</h4>
          <p>{paragraph}</p>
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
            {isLoading && (
              <tr>
                <td colSpan={tableHeaderCell?.length || 1} className="p-0">
                  <Loader height={240} label="Loading users..." />
                </td>
              </tr>
            )}
            {!isLoading &&
              data?.length > 0 &&
              data?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.id}</td>
                  <td>{item?.userName}</td>
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
                          : userImg
                      }
                      alt=""
                    />
                  </td>
                  <td>{item?.email}</td>
                  <td>{item?.creationDate}</td>
                  <td>{item?.phoneNumber}</td>

                  <td className="cursor-pointer">
                    <i
                      onClick={() => handleEditRecipe(item.id, item)}
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
              ))}
            {!isLoading && data?.length === 0 && (
              <tr>
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
