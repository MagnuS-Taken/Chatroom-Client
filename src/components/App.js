import React from "react";

import Login from "./Login";
import DashBoard from "./DashBoard";
import LocalStorage from "../hooks/LocalStorage";
import { ContactsProvider } from "../contexts/ContactsContext";
import { ConversationsProvider } from "../contexts/ConversationsContext";
import { SocketProvider } from "../contexts/SocketContext";

function App() {
  const [id, setId] = LocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider sender={id}>
          <DashBoard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
