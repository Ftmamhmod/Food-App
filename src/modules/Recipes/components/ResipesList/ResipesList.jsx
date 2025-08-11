import { useEffect, useState } from "react";
import Header from "../../../Shared/components/Header/Header";
import List from "./../../../Shared/components/List/List";
import { getResipes } from "../../../../api/Resipes/Resipes";

const ResipesList = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getResipes(setRecipes);
  }, []);
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
      />
    </>
  );
};

export default ResipesList;
