"use client";

import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { messagesAtom, selectedChatAtom } from '@/atoms/chatAtoms';
import { userAtom } from '@/atoms/userAtom';
import ChatList from '@/app/components/ChatList';
import ChatWindow from '@/app/components/ChatWindow';

const ChatPage: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [messages, setMessages] = useAtom(messagesAtom);
  const [selectedChat] = useAtom(selectedChatAtom);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const response = await fetch(`/api/messages?chatId=${selectedChat}`);
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [selectedChat, setMessages]);

  const sendMessage = async (content: string) => {
    if (!user || !selectedChat) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          senderId: user.id,
          receiverId: selectedChat,
          developerId: user.role === 'developer' ? user.id : selectedChat,
          employeeId: user.role === 'employee' ? user.id : selectedChat,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r">
        <ChatList />
      </div>
      <div className="w-3/4">
        <ChatWindow messages={messages} onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;