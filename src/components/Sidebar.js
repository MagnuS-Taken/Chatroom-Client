import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";

import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversation from "./NewConversation";
import NewContact from "./NewContact";

import "./Sidebar.css";

const conversations_KEY = "conversations";
const contacts_KEY = "contacts";

export default function Sidebar({ id }) {
  const [active, setActive] = useState(conversations_KEY);
  const [showModal, setShowModal] = useState(false);

  const modalClose = () => setShowModal(false);

  const conversationOpen = active === conversations_KEY ? true : false;

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={active} onSelect={setActive}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={conversations_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contacts_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="tab-example">
          <Tab.Pane eventKey={conversations_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={contacts_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="info">
          <strong>Your ID: </strong>
          <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setShowModal(true)} className="new-btn">
          New {conversationOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>
      <Modal backdrop="static" show={showModal} onHide={modalClose} centered>
        {conversationOpen ? (
          <NewConversation modalClose={modalClose} />
        ) : (
          <NewContact modalClose={modalClose} />
        )}
      </Modal>
    </div>
  );
}
