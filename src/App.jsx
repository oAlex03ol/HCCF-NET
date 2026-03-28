/* App.jsx */
import { useState } from "react";

// 各個大頁面元件
import Main from "./pages/Main";
import About from "./pages/About";
import Course from "./pages/Course";
import Event from "./pages/Event";
import Achievement from "./pages/Achievement";
import ProblemSearch from "./pages/ProblemSearch";

// 共用元件
import Header from "./components/Header";
import Footer from "./components/Footer";
import Setting from "./features/Setting"
import Debug from "./features/Debug";

// HOOK
import { usePageLoaded } from "./utils/usePageLoaded";

// 全域樣式
import "./App.css";

function App() {
    // 定義 currentPage 為函數 setCurrentPage 的變數，用於選擇頁面 (初始化為 Main頁面)
    const [currentPage, setCurrentPage] = useState("Main");

    // 根據 currentPage 渲染對應頁面
    const renderPage = () => {
        switch (currentPage) {
            case "Main": return <Main />
            case "About": return <About />
            case "Course": return <Course />
            case "Event": return <Event />
            case "Achievement": return <Achievement />
            case "ProblemSearch": return <ProblemSearch />
            // 找不到對應頁面 -> 顯示錯誤訊息
            default: return <div className="bg-black justify-center item-center"><h1>頁面不存在</h1></div>;
        }
    };

    // 判斷頁面是否完全載入
    const isPageLoaded = usePageLoaded();

    return (
        <>
            {/* 主容器，包住整體網頁的結構 */}
            <div className="main-container">
                {/* 網格、光暈背景 */}
                <div className="background-grid-effect"></div>
                <div className="glow-blob bg-[var(--blob-purple)] w-[600px] h-[600px] -top-48 -left-24"></div>
                <div className="glow-blob bg-[var(--blob-cyan)] w-[600px] h-[600px] -bottom-48 -right-24"></div>

                {/* 設定 <head> 的標籤：標題、描述、icon 等 */}
                <title>HCCF main page</title>
                <link rel="icon" href="./public/vite.svg" />
                <meta name="description" content="This is the HCCF official website made by React app." />

                <p className="upper-text">測試 Header 是否套用 Sticky 屬性成功附著在頂端，或許之後可以變成小通知 (待刪) </p>
                <Header onNavigate={setCurrentPage} isPageLoaded={isPageLoaded} /> {/* 上方導航列 */}
                {renderPage()} {/* 頁面渲染處 */}
                <Footer /> {/* 頁尾 */}
            </div>
            <Setting /> {/* 設定面板 */}
            <Debug />   {/* 除錯面板 */}
        </>
    );
}

export default App;