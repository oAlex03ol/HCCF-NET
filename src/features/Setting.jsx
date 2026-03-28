import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

let externalOpen = null;
export function openSettingsPanel() {
  if (externalOpen) externalOpen();
}

export default function SettingPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState('zh-TW');
  const [notifications, setNotifications] = useState(true);

  // 註冊開啟函式
  useEffect(() => {
    externalOpen = () => setIsOpen(true);
    return () => { externalOpen = null; };
  }, []);

  // 控制背景不滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const closePanel = () => setIsOpen(false);

  return createPortal(
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 10000,
      }}
      onClick={closePanel}
    >
      {/* 阻止背後內容互動 */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          cursor: 'default'
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'relative',
          width: '600px', maxWidth: '90vw',
          backgroundColor: darkMode ? '#2c2f33' : '#f9f9f9',
          color: darkMode ? '#eaeaea' : '#222222',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          fontFamily: 'Arial, sans-serif',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Settings(還不能交互)</h2>
          <button onClick={closePanel} style={{
            background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888',
          }}>×</button>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Dark Mode Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(prev => !prev)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>

          {/* Font Size Slider */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Font Size: {fontSize}px</label>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Language Select */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="zh-TW">中文 (繁體)</option>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>

          {/* Notifications Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(prev => !prev)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={closePanel}
            style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #aaa', background: darkMode ? '#444' : '#e0e0e0', cursor: 'pointer' }}
          >Cancel</button>
          <button
            onClick={() => { /* TODO: Persist settings */ closePanel(); }}
            style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
          >Save</button>
        </div>
      </div>
    </div>,
    document.body
  );
}