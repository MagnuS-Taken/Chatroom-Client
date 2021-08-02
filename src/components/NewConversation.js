import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsContext";
import { useConversations } from "../contexts/ConversationsContext";

export default function NewConversation({ modalClose }) {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const { contacts } = useContacts();
  const { createConversations } = useConversations();

  const handleChange = (id) => {
    setSelectedContacts((old) => {
      if (old.includes(id)) {
        return old.filter((oldId) => {
          return oldId !== id;
        });
      } else {
        return [...old, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversations(selectedContacts);
    modalClose();
  };

  return (
    <React.Fragment>
      <Modal.Header closeButton>
        <Modal.Title>Create a new conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((c) => {
            return (
              <Form.Group controlId={c.id} key={c.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContacts.includes(c.id)}
                  label={c.name}
                  onChange={() => {
                    handleChange(c.id);
                  }}
                ></Form.Check>
              </Form.Group>
            );
          })}
          <Button variant="outline-success" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </React.Fragment>
  );
}
