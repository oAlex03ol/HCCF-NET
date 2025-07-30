import '../styles/Header.css'

export default function Header() {
  return (
    <header>
        <nav className="w-full" aria-label="Main navigation">
            {/* Desktop Navigation */}
            <div className="site-header">
                <button className="menu-toogle"><p>≡</p></button>
                <div><p className="logo">L O G O</p></div> {/* 這是未來放 LOGO 的地方 */}
                <ul>
                    <li><a href="#">首頁</a></li>
                    <li><a href="#">關於我們</a></li>
                    <li><a href="#">公開講義</a></li>
                    <li><a href="#">活動花絮</a></li>
                    <li><a href="#">榮譽榜</a></li>
                    <li><a href="#">設定</a></li>
                </ul>
            </div>
        </nav>
    </header>
  );
}
