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
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log("oke nè");
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
    }
    setValidated(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new User</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit} action="#">
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalAddNewUsers;
