import { io } from "socket.io-client";


const messageInput = document.getElementById("message-input");
const form = document.getElementById("form");

const socket = io("http://localhost:3000", { transports : ['websocket'] });

socket.on("connect", () => {
  console.log("connected to socket");
//   displayMessage(`You connected with id ${socket.id}`);
});

socket.on('received-message' , message => {
    displayMessage(message);
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  if (message === "") return;
  displayMessage(message);
  socket.emit("send-message", message);
  messageInput.value = "";
});

const displayMessage = (message) => {
  const div = document.createElement("div");
  div.textContent = message;
  // console.log(message);
  document.getElementById("message-container").append(div);
};
