import React, { useState } from "react";
import { Tab, Nav, Button, Modal, Alert } from "react-bootstrap";
import { Info, Chat, Contacts as ContactIcon, Add } from "@material-ui/icons";

import Conversations from "./Conversations";
import Contact from "./Contacts";
import NewConversation from "./NewConversation";
import NewContact from "./NewContact";

const conversations_KEY = "conversations";
const contacts_KEY = "contacts";

export default function Sidebar({ id }) {
  const [active, setActive] = useState(conversations_KEY);
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const modalClose = () => setShowModal(false);

  const conversationOpen = active === conversations_KEY ? true : false;

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={active} onSelect={setActive}>
        <Nav
          variant="tabs"
          className="justify-content-center"
          style={{ backgroundColor: "lightblue", fontSize: "large" }}
        >
          <Nav.Item>
            <Nav.Link eventKey={conversations_KEY}>
              <Chat />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contacts_KEY}>
              <ContactIcon />
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content
          className="tab-example"
          style={{
            borderRight: "1px solid #eee",
            overflow: "auto",
            flexGrow: "1",
          }}
        >
          <Tab.Pane eventKey={conversations_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={contacts_KEY}>
            <Contact />
          </Tab.Pane>
        </Tab.Content>

        <Alert show={showInfo} variant="secondary" className="m-0">
          <Alert.Heading>Profile ID:</Alert.Heading>
          <p>{id}</p>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setShowInfo(false)}
              variant="outline-success"
            >
              Hide Info
            </Button>
          </div>
        </Alert>
        {!showInfo && (
          <Button variant="outline-secondary" onClick={() => setShowInfo(true)}>
            Show Info <Info />
          </Button>
        )}

        <Button
          onClick={() => setShowModal(true)}
          style={{ borderRadius: "0" }}
        >
          New {conversationOpen ? "Conversation" : "Contact"}
          <Add className="m-2" />
        </Button>
      </Tab.Container>
      <Modal show={showModal} onHide={modalClose} centered>
        {conversationOpen ? (
          <NewConversation modalClose={modalClose} />
        ) : (
          <NewContact modalClose={modalClose} />
        )}
      </Modal>
    </div>
  );
}
