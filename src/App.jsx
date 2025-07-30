import { Helmet } from "react-helmet";
import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  {/* 這邊需要大修 */}
  useEffect(() => {
    const main = document.querySelector(".Main");
    const sections = main.querySelectorAll(".site-Main");
    let index = 0;
    let scrollCount = 0;
    const scrollThreshold = 2; // 滾動 3 次才觸發
    let scrollDirection = 0;

    let isScrolling = false;

    const onWheel = (e) => {
      e.preventDefault();

      const direction = e.deltaY > 0 ? 1 : -1;

      // 不同方向時重置計數器
      if (direction !== scrollDirection) {
        scrollCount = 0;
        scrollDirection = direction;
      }

      scrollCount++;

      if (scrollCount >= scrollThreshold && !isScrolling) {
        isScrolling = true;

        if (direction === 1 && index < sections.length - 1) {
          index++;
        } else if (direction === -1 && index > 0) {
          index--;
        }

        sections[index].scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          isScrolling = false;
        }, 300); // 解鎖時間
        scrollCount = 0; // 重置次數
      }
    };

    main.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      main.removeEventListener("wheel", onWheel);
    };
  }, []);


  return (
    <>
      <Helmet>
        <title>HCCF main page</title>
        <link rel="icon" href="./public/vite.svg" />
        <meta name="description" content="This is the HCCF official website made by React app." />
      </Helmet>
      <div className="main-container">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;