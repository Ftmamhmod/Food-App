import Header from "./../../../Shared/components/Header/Header";
import homeImg from "./../../../../assets/images/eating vegan food-rafiki.png";

const Dashboard = ({ loginUser }) => {
  return (
    <>
      <title>Home</title>
      <Header
        title={`Welcome ${loginUser?.userName}! `}
        pargraph={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        img={homeImg}
      />
    </>
  );
};

export default Dashboard;
