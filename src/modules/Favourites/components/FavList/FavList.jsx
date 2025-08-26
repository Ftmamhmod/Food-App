import Header from "./../../../Shared/components/Header/Header";
import FavoritesTable from "./FavoritesTable";

const FavList = () => {
  return (
    <>
      <Header
        title={"Favorites items!"}
        pargraph={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <FavoritesTable />
    </>
  );
};

export default FavList;
