/* Header.jsx */
import { useEffect, useState } from 'react';

import { openSettingsPanel } from '../features/Setting';
import { openDebugPanel } from '../features/Debug';
import '../styles/Header.css'

{/* onNavigate 為自訂變數，用於選擇頁面 */}
export default function Header({ onNavigate, isPageLoaded }) {
    {/* 判斷 DOM 是否載入，給予開場動畫 */}

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    {/* 選單字典 */}
    {/* 榮譽榜改成機器人 */}
    const menuItems = [
        { label: "首頁", action: () => onNavigate("Main") },
        { label: "題庫檢索", action: () => onNavigate("ProblemSearch") },
        { label: "關於我們", action: () => onNavigate("About") },
        { label: "公開講義", action: () => onNavigate("Course") },
        { label: "機器人", action: () => onNavigate("Achievement") },
        { label: "設定", action: openSettingsPanel },
        { label: "開發", action: openDebugPanel },
    ];
    {/* label: "活動花絮", action: () => onNavigate("Event") */}

    return (
        <header className={`site-header ${isPageLoaded ? 'opening-animation-first' : ''}`}>
            <button className="menu-toogle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><p className="text-center justify-center align-center">≡</p></button>
            <div><p className="logo">L O G O</p></div> {/* 這是未來放 LOGO 的地方 */}

            {/*<ul className={isPageLoaded ? 'opening-animation-second' : ''}>*/}
            <ul className={`
                ${isPageLoaded ? 'opening-animation-second' : ''}
                ${mobileMenuOpen ? 'mobile-open' : ''}
            `}>
                {menuItems.map((item, i) => (
                    <li key={item.label} style={{ "--i": i }}>
                        <button onClick={() => {
                            item.action();
                            setMobileMenuOpen(false);
                        }}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

        </header>
    );
}
