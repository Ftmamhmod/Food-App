import { useEffect, useState } from "react";
import { getUsers } from "../../../../api/Users/Users";
import Header from "../../../Shared/components/Header/Header";
import List from "./List";

const UserList = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    getUsers(setUsers);
  }, []);
  return (
    <div>
      <title>User List</title>
      <Header
        title="User List"
        pargraph="You can now add your items that any user can order it from the Application and you can edit"
      />
      <List
        title={"Users Table Details"}
        paragraph={"You can check all details"}
        buttonText={"add"}
        data={users}
        tableHeaderCell={[
          "ID",
          "User name",
          "Image",
          "Email",
          "Country",
          "Phone",
          "Action",
        ]}
      />
    </div>
  );
};

export default UserList;
