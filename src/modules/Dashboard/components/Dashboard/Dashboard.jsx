import Header from "./../../../Shared/components/Header/Header";
import SecHeader from "./../../../Shared/components/sec-header/SecHeader";

const Dashboard = ({ loginUser }) => {
  return (
    <>
      <title>Home</title>
      <Header
        title={`Welcome ${loginUser?.userName}! `}
        pargraph={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <div className="pt-4">
        <SecHeader />
      </div>
    </>
  );
};

export default Dashboard;
