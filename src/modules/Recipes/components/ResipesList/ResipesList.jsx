import Header from "../../../Shared/components/Header/Header";
import List from "./../../../Shared/components/List/List";
import ResipesTable from "./ResipesTable";

const ResipesList = () => {
  return (
    <>
      <title>Recipes</title>
      <Header
        title="Recipes List"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <ResipesTable />
    </>
  );
};

export default ResipesList;
