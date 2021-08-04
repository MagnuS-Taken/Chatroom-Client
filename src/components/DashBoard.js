import React from "react";

import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import FirstLanding from "./FirstLanding";
import { useConversations } from "../contexts/ConversationsContext";

export default function DashBoard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation ? <OpenConversation /> : <FirstLanding />}
    </div>
  );
}
