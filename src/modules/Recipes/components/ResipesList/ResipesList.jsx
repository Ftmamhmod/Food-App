import { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import List from "./../../../Shared/components/List/List";
import { getResipes } from "../../../../api/Resipes/Resipes";
import { useNavigate } from "react-router-dom";

const ResipesList = () => {
  const navigate = useNavigate();
  const tableHeaderCell = [
    "ID",
    "Item name",
    "Image",
    "Price",
    "Description",
    "tag",
    "Actions",
  ];

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getResipes(setRecipes);
  }, []);
  const handleAdd = () => {
    navigate("/dashboard/recipe-data");
  };
  return (
    <>
      <title>Recipes</title>
      <Header
        title="Recipes List"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <List
        title={"Recipe Table Details"}
        paragraph={"You can check all details"}
        buttonText={"Add New Item"}
        data={recipes}
        tableHeaderCell={tableHeaderCell}
        handleAdd={handleAdd}
      />
    </>
  );
};

export default ResipesList;
