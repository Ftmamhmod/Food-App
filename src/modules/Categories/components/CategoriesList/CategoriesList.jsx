import Header from "./../../../Shared/components/Header/Header";
import CategoriesTable from "./CategoriesTable";

const CategoriesList = () => {
  return (
    <>
      <title>Categories</title>
      <Header
        title="Categories"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <CategoriesTable />
    </>
  );
};

export default CategoriesList;
