import React, { useState } from "react";
import "./ChatRoom.css";

const chatrooms = [
  { id: 1, name: "General" },
  { id: 2, name: "Doctors" },
  { id: 3, name: "Patients" },
];

const messagesData = {
  1: [
    { id: 1, user: "Alice", text: "Hello everyone!" },
    { id: 2, user: "Bob", text: "Hi Alice!" },
  ],
  2: [],
  3: [],
};

const ChatApp = () => {
  const [selectedRoom, setSelectedRoom] = useState(chatrooms[0].id);
  const [messages, setMessages] = useState(messagesData[selectedRoom]);
  const [newMessage, setNewMessage] = useState("");

  const handleRoomSelect = (id) => {
    setSelectedRoom(id);
    setMessages(messagesData[id]);
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = { id: Date.now(), user: "You", text: newMessage };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    messagesData[selectedRoom] = updatedMessages; // update mock data
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h2>Chatrooms</h2>
        {chatrooms.map((room) => (
          <div
            key={room.id}
            className={`chat-room ${selectedRoom === room.id ? "active" : ""}`}
            onClick={() => handleRoomSelect(room.id)}
          >
            {room.name}
          </div>
        ))}
      </div>

      <div className="chat-main">
        <div className="chat-window">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.user === "You" ? "self" : ""}`}
            >
              <span className="chat-user">{msg.user}:</span> {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
          />
          <button className="chat-send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
