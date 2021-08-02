import React from "react";
import { ListGroup } from "react-bootstrap";

import { useConversations } from "../contexts/ConversationsContext";

export default function Conversations() {
  const { conversations, selectConversationInd } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((c, ind) => {
        return (
          <ListGroup.Item
            key={ind}
            onClick={() => selectConversationInd(ind)}
            active={c.selected}
            action
          >
            {c.receivers
              .map((r) => {
                return r.name;
              })
              .join(", ")}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
