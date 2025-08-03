/* Footer.jsx */
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} HCCF Website |
        <a href='https://github.com/oAlex03ol/HCCF-NET/blob/main/LICENSE' target="_blank" className="glow-effect"> 使用條款與隱私權</a>
      </p>
    </footer>
  );
}

export default Footer;
