/* Setting.jsx */
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

  useEffect(() => {
    externalOpen = () => setIsOpen(true);
    return () => (externalOpen = null);
  }, []);

  if (!isOpen) return null;

  const closePanel = () => setIsOpen(false);

  return createPortal(
    <div className="!fixed !inset-0 !z-50 !flex !items-center !justify-center !p-4 !m-0" >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-opacity-50"
        onClick={closePanel}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings (排版爛掉) </h2>
          <button onClick={closePanel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(prev => !prev)}
              className="h-5 w-5 rounded border border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
          </div>

          {/* Font Size Slider */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Font Size: {fontSize}px</label>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700"
            />
          </div>

          {/* Language Select */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="zh-TW">中文 (繁體)</option>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-200">Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(prev => !prev)}
              className="h-5 w-5 rounded border border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={closePanel}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // TODO: Persist settings
              closePanel();
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
