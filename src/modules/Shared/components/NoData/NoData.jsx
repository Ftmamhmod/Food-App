import noData from "./../../../../assets/images/freepik--Character--inject-70.png";

const NoData = () => {
  return (
    <div className="text-center w-100 p-3">
      <img src={noData} alt="No Data" />
      <h4>No Data !</h4>
      <p className="text-muted">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
};

export default NoData;
