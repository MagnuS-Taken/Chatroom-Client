import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsContext";

export default function NewContact({ modalClose }) {
  const idRef = useRef();
  const nameRef = useRef();

  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    modalClose();
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Create a new Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </React.Fragment>
  );
}
