import React from "react";
import { ListGroup } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsContext";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((c) => {
        return <ListGroup.Item key={c.id}>{c.name}</ListGroup.Item>;
      })}
    </ListGroup>
  );
}
