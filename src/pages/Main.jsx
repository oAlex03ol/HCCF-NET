import { useEffect } from "react";
import '../styles/Main.css'

function Main() {
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
            <main className="Main">
                <section className="site-Main">
                    <h1 className="text-4xl font-bold text-white">首頁</h1>

                    <p className="text-white text-lg max-w-xl text-center">
                        在這邊先簡單介紹一下網頁是怎麼分類的
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-white max-w-xl text-left">
                        <li>
                        <span className="font-semibold">public 資料夾:</span> 存放網頁中的靜態資源
                        </li>
                        <li>
                        <span className="font-semibold">assets 資料夾:</span> 存放網頁中的靜態資源<br />
                        <span className="text-sm text-gray-300">(與 public 不同的是這裡不會預設載入，是透過打包帶進去)</span>
                        </li>
                        <li>
                        <span className="font-semibold">components 資料夾:</span> 各式大元件區
                        </li>
                        <li>
                        <span className="font-semibold">features 資料夾:</span> 額外的小物件
                        </li>
                        <li>
                        <span className="font-semibold">pages 資料夾:</span> 將大頁面歸類
                        </li>
                    </ul>

                    <section >
                        <h2 className="text-2xl font-semibold mb-6 tracking-wide border-b border-gray-300 pb-2">
                            重要檔案 :
                        </h2>
                        <dl className="space-y-6">
                            <div>
                            <dt className="font-medium text-lg mb-1 ">App.jsx</dt>
                            <dd className="leading-relaxed text-base ">
                                主要的 React 元件入口，組合各個元件並管理整體應用程式架構。
                            </dd>
                            </div>
                            <div>
                            <dt className="font-medium text-lg mb-1">main.jsx</dt>
                            <dd className="leading-relaxed text-base ">
                                React 應用的渲染起點，負責將 App 組件掛載到 DOM 上。
                            </dd>
                            </div>
                            <div>
                            <dt className="font-medium text-lg mb-1">index.html</dt>
                            <dd className="leading-relaxed text-base ">
                                靜態 HTML 檔案，提供 React 應用程式的根節點容器 (root div)。
                            </dd>
                            </div>
                        </dl>
                    </section>
                </section>
                
                <section className="site-Main">
                    <h1>關於我們</h1>
                    <p>Never Gonna Give You Up! never gonna let you down ! never gonna run around and desert you</p>
                </section>
            
            
                <section className="site-Main">
                    <h1>公開講義</h1>
                    <p>Never Gonna Give You Up! never gonna let you down ! never gonna run around and desert you</p>
                </section>
            
            
                <section className="site-Main">
                    <h1>活動花絮</h1>
                    <p>Never Gonna Give You Up! never gonna let you down ! never gonna run around and desert you</p>
                </section>
            
                <section className="site-Main">
                    <h1>榮譽榜</h1>
                    <p>Never Gonna Give You Up! never gonna let you down ! never gonna run around and desert you</p>
                </section>
            </main>
        </>
    );
}

export default Main;
