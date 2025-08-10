import axios from "axios";
import List from "../../../Shared/components/List/List";
import Header from "./../../../Shared/components/Header/Header";
import { useEffect, useState } from "react";
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=16&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCategories(response?.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
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
