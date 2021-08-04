import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Send } from "@material-ui/icons";

import { useConversations } from "../contexts/ConversationsContext";

import "./OpenConversation.scss";

export default function OpenConversation() {
  const [text, setText] = useState("");

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const { sendMessage, selectedConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage({
      receivers: selectedConversation.receivers.map((receiver) => {
        return receiver.id;
      }),
      text,
    });
    setText("");
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto main-body" style={{}}>
        <div className="d-flex flex-column align-items-start justify-content-end px-3 ">
          {selectedConversation.messages.map((message, ind) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === ind;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={ind}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe
                      ? "bg-light text-black"
                      : "bg-success text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit} style={{ backgroundColor: "#2ecc40" }}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              style={{ height: "75px", resize: "none" }}
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="outline-primary"
              style={{ backgroundColor: "white" }}
            >
              <Send />
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
