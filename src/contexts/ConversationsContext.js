import React, { useContext, useState, useEffect, useCallback } from "react";

import LocalStorage from "../hooks/LocalStorage";
import { useContacts } from "./ContactsContext";
import { useSocket } from "./SocketContext";

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export function ConversationsProvider({ sender, children }) {
  const [conversations, setConversations] = LocalStorage("conversations", []);
  const [selectedConversationInd, setSelectedConversationInd] = useState(0);

  const { contacts } = useContacts();
  const { socket } = useSocket();

  const createConversations = (receivers) => {
    setConversations((oldConversations) => {
      return [...oldConversations, { receivers, messages: [] }];
    });
  };

  const addMessageToConversation = useCallback(
    ({ receivers, sender, text }) => {
      setConversations((oldConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };

        const newConversations = oldConversations.map((conversation) => {
          if (arrayEquals(conversation.receivers, receivers)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...oldConversations, { receivers, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  const sendMessage = ({ receivers, text }) => {
    socket.emit("send-message", {
      receivers,
      text,
    });

    addMessageToConversation({ receivers, sender, text });
  };

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on("receive-message", addMessageToConversation);
    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  const formattedConversations = conversations.map((conversation, ind) => {
    const receivers = conversation.receivers.map((receiver) => {
      const contact = contacts.find((contact) => {
        return contact.id === receiver;
      });

      const name = (contact && contact.name) || receiver;

      return { id: receiver, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = sender === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = ind === selectedConversationInd;

    return {
      ...conversations,
      messages,
      receivers,
      selected,
    };
  });

  const ret = {
    conversations: formattedConversations,
    selectConversationInd: setSelectedConversationInd,
    selectedConversation: formattedConversations[selectedConversationInd],
    createConversations,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={ret}>
      {children}
    </ConversationsContext.Provider>
  );
}

const arrayEquals = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};
