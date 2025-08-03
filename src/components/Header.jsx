/* Header.jsx */
import { useEffect, useState } from 'react';

import { openSettingsPanel } from '../features/Setting';
import '../styles/Header.css'

{/* onNavigate 為自訂變數，用於選擇頁面 */}
export default function Header({ onNavigate, isPageLoaded }) {
    {/* 判斷 DOM 是否載入，給予開場動畫 */}
    return (
        <header className={`site-header ${isPageLoaded && 'opening-animation-first'}`}>
            <button className="menu-toogle"><p>≡</p></button>
            <div><p className="logo">L O G O</p></div> {/* 這是未來放 LOGO 的地方 */}
            <ul className={`${isPageLoaded && 'opening-animation-second'}`}>
                <li><button onClick={()=>onNavigate("Main")}>首頁</button></li>
                <li><button onClick={()=>onNavigate("About")}>關於我們</button></li>
                <li><button onClick={()=>onNavigate("Course")}>公開講義</button></li>
                <li><button onClick={()=>onNavigate("Event")}>活動花絮</button></li>
                <li><button onClick={()=>onNavigate("Achievement")}>榮譽榜</button></li>
                <li><button onClick={openSettingsPanel}>設定</button></li>
                <li><button onClick={()=>onNavigate("Debug")}>DEBUG</button></li>
            </ul>
        </header>
    );
}
