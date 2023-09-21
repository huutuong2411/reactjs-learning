import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

function ModalAddNewUsers(props) {
  const { handleClose, show, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = () => {
    postCreateUser(name, job).then((response) => {
      if (response && response.data && response.data.id) {
        handleClose();
        setName("");
        setJob("");
        toast.success("Success! user has been created");
        handleUpdateTable({
          id: response.data.id,
          first_name: name,
          last_name: job,
        });
      } else {
        toast.error("Error!");
      }
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Job"
            value={job}
            onChange={(event) => setJob(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNewUsers;
