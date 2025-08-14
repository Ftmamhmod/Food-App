import deleteImg from "./../../../assets/images/freepik--Character--inject-70.png";

const DeleteModal = ({ handleDelete, itemName }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            {<img src={deleteImg} alt="Delete" />}
            <h4>Delete This {itemName} ?</h4>
            <p className="text-muted">
              are you sure you want to delete this {itemName} ? if you are sure
              just click on delete it
            </p>
          </div>
          <div className="modal-footer">
            <button
              data-bs-dismiss="modal"
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDelete}
            >
              {" "}
              Delete this {itemName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
