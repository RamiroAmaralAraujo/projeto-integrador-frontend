import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API;
const socket = io(apiUrl, {
  autoConnect: false,
});

export default socket;
