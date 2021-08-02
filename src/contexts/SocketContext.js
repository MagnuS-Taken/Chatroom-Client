import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export function SocketProvider({ children, id }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  const ret = {
    socket,
  };

  return (
    <SocketContext.Provider value={ret}>{children}</SocketContext.Provider>
  );
}
