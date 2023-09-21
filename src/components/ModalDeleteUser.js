import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deletetUser } from "../services/UserService";

function ModalDeleteUser(props) {
  const { handleClose, show, DataModal, handleTableAfterDelete } = props;

  const handleDelete = (id) => {
    deletetUser(id).then((response) => {
      if (response && +response.status === 204) {
        handleClose();
        toast.success("Success! user has been deleted");
        handleTableAfterDelete(id);
      } else {
        toast.error("Error!");
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete this user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure to delete user:{" "}
          {DataModal.first_name + " " + DataModal.last_name}
        </p>
        <img src={DataModal.avatar} alt={`Avatar of ${DataModal.first_name}`} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => handleDelete(DataModal.id)}>
          Sure
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteUser;
