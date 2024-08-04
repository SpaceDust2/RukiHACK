import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { chatsAtom, selectedChatAtom } from '@/atoms/chatAtoms';
import { userAtom } from '@/atoms/userAtom';

const ChatList: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [chats, setChats] = useAtom(chatsAtom);
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/chats?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user, setChats]);

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-bold p-4">Чаты</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selectedChat === chat.id ? 'bg-blue-100' : ''
            }`}
            onClick={() => setSelectedChat(chat.id)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;