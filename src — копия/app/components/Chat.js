'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Chat({ roomId, senderId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    async function loadMessages() {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      
      if (data) setMessages(data);
    }

    loadMessages();

    const channel = supabase
      .channel('chat_room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        if (payload.new.room_id === roomId) {
          setMessages((prev) => [...prev, payload.new]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  async function sendMessage(e) {
    e.preventDefault();
    if (text === '') return;

    await supabase
      .from('chat_messages')
      .insert([{ 
        room_id: roomId, 
        sender_id: senderId, 
        text: text 
      }]);

    setText('');
  }

  return (
    <div className="chat-wrapper">

      <div className="message-list">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={String(msg.sender_id) === String(senderId) ? 'my-msg' : 'their-msg'}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="chat-form">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Напишите сообщение..."
        />
        <button type="submit">Отправить</button>
      </form>

      <style jsx>
        {`
            .chat-wrapper { height: 400px; display: flex; flex-direction: column; background: #0a0a0a; border: 1px solid #222; border-radius: 8px; }
            .message-list { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
            .my-msg { align-self: flex-end; background: #ffffff; color: #000; padding: 6px 20px; border-radius: 2px; }
            .their-msg { align-self: flex-start; background: #222; color: #fff; padding: 6px 20px; border-radius: 2px; }
            .chat-form { display: flex; padding: 10px; border-top: 1px solid #222; gap: 10px; }
            input { flex: 1; background: #111; border: 1px solid #333; color: #fff; padding: 8px; border-radius: 4px; }
            button { background: #fff; color: #000; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
        `}
      </style>

    </div>
  );
}