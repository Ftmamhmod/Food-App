import { getCategories } from "../../../../api/Categories/Categories";
import List from "../../../Shared/components/List/List";
import Header from "./../../../Shared/components/Header/Header";
import { useEffect, useState } from "react";
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <>
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
      />
    </>
  );
};

export default CategoriesList;
