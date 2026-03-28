import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import SmoothScroll from '../utils/smoothScrolling';

let externalOpenDebug = null;
export function openDebugPanel() {
  if (externalOpenDebug) externalOpenDebug();
}

export default function Debug() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // 1. 註冊開啟函式
  useEffect(() => {
    externalOpenDebug = () => setIsOpen(true);
    return () => { externalOpenDebug = null; };
  }, []);

  // 2. 初次載入：從 API 抓 message.json
  useEffect(() => {
    const fetchMessages = () => {
      fetch('/api/messages')
        .then(r => r.json())
        .then(data => setMessages(data))
        .catch(e => console.error('Fetch failed', e));
    };

    fetchMessages(); // 進來先拉一次

    const intervalId = setInterval(fetchMessages, 3000); // 每 3 秒拉一次

    return () => clearInterval(intervalId); // 元件 unmount 時清除 interval
  }, []);

  // 3. 面板開／關時鎖定背景滾動並停用／恢復 SmoothScroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      SmoothScroll.disable();
    } else {
      document.body.style.overflow = '';
      SmoothScroll.enable();
    }
  }, [isOpen]);

  const closePanel = () => setIsOpen(false);

  // 新增訊息 (POST 到 API)
  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg = {
      id: Date.now(),
      text,
      time: new Date().toLocaleString(),
    };
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg),
    })
    .then(r => r.json())
    .then(saved => setMessages(prev => [saved, ...prev]))
    .catch(e => console.error('Failed to add message', e));
    setInput('');
  };

  // 刪除訊息 (DELETE 到 API)
  const handleDelete = (id) => {
    fetch(`/api/messages/${id}`, { method: 'DELETE' })
      .then(() => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      })
      .catch(e => console.error('Failed to delete message', e));
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 10000,
      }}
      onClick={closePanel}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '600px', maxWidth: '90vw',
          maxHeight: '80vh', overflow: 'hidden',
          backgroundColor: '#282c34', color: '#e0e0e0',
          borderRadius: '10px', padding: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <button
          onClick={closePanel}
          style={{
            position: 'absolute', top: '12px', right: '16px',
            background: 'transparent', border: 'none',
            fontSize: '24px', color: '#ff5555', cursor: 'pointer'
          }}
        >×</button>

        <h3 style={{ margin: 0, marginBottom: '12px' }}>除錯面板</h3>

        {/* 輸入區 */}
        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入除錯訊息..."
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            style={{
              flex: 1, padding: '8px', borderRadius: '4px',
              border: '1px solid #555', backgroundColor: '#1e2228',
              color: '#e0e0e0', marginRight: '8px'
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              padding: '8px 16px', borderRadius: '4px',
              border: 'none', backgroundColor: '#E4B363',
              color: '#282c34', cursor: 'pointer'
            }}
          >送出</button>
        </div>

        {/* 訊息列表 */}
        <div style={{ flex: 1, overflowY: 'auto'}}>
          {messages.length === 0
            ? <p style={{ color: '#777' }}>尚無訊息</p>
            : messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    backgroundColor: '#1e2228',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '10px',
                    position: 'relative'
                  }}
                >
                  <small style={{ color: '#888', display: 'block', marginBottom: '4px' }}>
                    {msg.time}
                  </small>
                  <span>{msg.text}</span>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    style={{
                      position: 'absolute', top: '8px', right: '8px',
                      background: 'transparent', border: 'none',
                      color: '#ff5555', cursor: 'pointer'
                    }}
                  >×</button>
                </div>
              ))
          }
        </div>
      </div>
    </div>,
    document.body
  );
}
