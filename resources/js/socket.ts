import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", { autoConnect: false });

export const connectSocket = () => {
  const token = localStorage.getItem('imsToken');
  socket.io.opts.extraHeaders = { authorization: `Bearer ${token}` };
  socket.connect();
}