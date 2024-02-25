import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketConext = createContext(null);
export const useSocket = () =>{
    const socket = useContext(SocketConext)
    return socket;
}

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("localhost:8000"), []);

  return (
    <SocketConext.Provider value={socket}>
      {props.children}
    </SocketConext.Provider>
  );
};
