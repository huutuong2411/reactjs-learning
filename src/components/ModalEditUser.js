import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { putEditUser } from "../services/UserService";

function ModalEditUsers(props) {
  const { handleClose, show, DataModal, handleTableAfterEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    setName(DataModal.first_name);
    setJob(DataModal.last_name);
  }, [DataModal]);

  const handleEdit = (id) => {
    putEditUser(id, name, job).then((response) => {
      if (response && response.data && response.data.updatedAt) {
        setName("");
        setJob("");
        handleClose();
        toast.success("Success! user has been updated");
        handleTableAfterEdit({ id: id, first_name: name, last_name: job });
      } else {
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit this User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={(event) => setName(event.target.value)}
            value={name || ""}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Job"
            value={job || ""}
            onChange={(event) => setJob(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="warning" onClick={() => handleEdit(DataModal.id)}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditUsers;
