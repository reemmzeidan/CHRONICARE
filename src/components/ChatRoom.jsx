import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ChatRoom.css";

const ChatRoom = ({ userId }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState({});
  const chatWindowRef = useRef(null);

  const token = localStorage.getItem("token");


  const fetchChatRooms = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/chatrooms", {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const userRooms = res.data.filter((room) =>
        room.members.some((m) => m._id === userId)
      );
      setRooms(userRooms);

      if (userRooms.length > 0) setSelectedRoom(userRooms[0]._id);

     
      const map = {};
      userRooms.forEach((room) =>
        room.members.forEach((member) => {
          map[member._id] = member.firstName + " " + member.lastName;
        })
      );
      setParticipants(map);
    } catch (err) {
      console.log("Error fetching chat rooms:", err);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, [userId]);

  
  const fetchMessages = async () => {
    if (!selectedRoom) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/api/messages/room/${selectedRoom}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data || []);
    } catch (err) {
      console.log("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedRoom]);

  
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedRoom) return;
    try {
      const res = await axios.post(
        "http://localhost:3000/api/messages",
        {
          roomId: selectedRoom,
          senderId: userId,
          content: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };


  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  const formatChatDate = (date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return date.toLocaleDateString();
  };

  const groupMessagesByDate = (msgs) => {
    return msgs.reduce((acc, msg) => {
      const key = formatChatDate(new Date(msg.createdAt));
      if (!acc[key]) acc[key] = [];
      acc[key].push(msg);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-container">
     
      <div className="chat-sidebar">
        <h2>Chatrooms</h2>
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`chat-room ${selectedRoom === room._id ? "active" : ""}`}
            onClick={() => setSelectedRoom(room._id)}
          >
            {room.roomname}
          </div>
        ))}
      </div>

      
      <div className="chat-main">
        <div className="chat-window" ref={chatWindowRef}>
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No messages yet. Start the conversation 💬
            </p>
          ) : (
            Object.keys(groupedMessages).map((dateLabel) => (
              <div key={dateLabel}>
                <div className="chat-date-divider">— {dateLabel} —</div>
                {groupedMessages[dateLabel].map((msg) => (
                  <div
                    key={msg._id}
                    className={`chat-message ${
                      msg.senderId === userId ? "self" : ""
                    }`}
                  >
                    <span className="chat-user">
                      {participants[msg.senderId] || "User"}:
                    </span>{" "}
                    {msg.content}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

       
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="chat-input"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="chat-send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
