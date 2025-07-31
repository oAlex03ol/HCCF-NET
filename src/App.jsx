import { Helmet } from "react-helmet";
import { useState } from "react";
import Main from "./pages/Main";
import About from "./pages/About";
import Course from "./pages/Course";
import Event from "./pages/Event";
import Achievement from "./pages/Achievement";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("Main");

    const renderPage = () => {
        switch (currentPage) {
            case "Main": return <Main />
            case "About": return <About />
            case "Course": return <Course />
            case "Event": return <Event />
            case "Achievement": return <Achievement />
            default: return <div>頁面不存在</div>;
        }
    };
    return (
        <>
            <Helmet>
                <title>HCCF main page</title>
                <link rel="icon" href="./public/vite.svg" />
                <meta name="description" content="This is the HCCF official website made by React app." />
            </Helmet>
            <div className="main-container">
                <Header onNavigate={setCurrentPage} />
                {renderPage()}
                <Footer />
            </div>
        </>
    );
}

export default App;