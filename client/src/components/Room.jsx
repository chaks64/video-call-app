import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../utils/peer";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketID, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    setRemoteSocketId(id);
  }, []);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      console.log({ from, offer });
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      setRemoteSocketId(from);
      console.log(`Incoming Call`, from, offer);
      peer
        .getAnswer(offer)
        .then((ans) => {
          console.log(ans);
          socket.emit("call:accepted", { to: from, ans });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [socket]
  );

  const handleCallAccepted = useCallback(({ from, ans }) => {
    peer.setLocalDescription(ans);
    console.log("call accepted: ", { from, ans });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
    };
  }, [handleCallAccepted, handleIncomingCall, handleUserJoined, socket]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketID, offer });
    setMyStream(stream);
  }, [remoteSocketID, socket]);

  return (
    <div>
      Room
      <h1>{remoteSocketID ? "Connected" : "no one in the room"}</h1>
      {remoteSocketID && <button onClick={handleCallUser}>Call</button>}
      <>
        <h4>My Stream</h4>
        {myStream && (
          <ReactPlayer playing muted height={100} width={200} url={myStream} />
        )}
      </>
    </div>
  );
};

export default Room;
