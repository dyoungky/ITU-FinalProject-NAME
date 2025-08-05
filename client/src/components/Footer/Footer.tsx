import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-link">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
        <div className="footer-menu">
          <ul>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>
        <div className="footer-content">
          <div className="site-logo">NAME</div>
          <span>
            NAME is a Danish street/fashion brand influenced by youth culture and street style. Founded in 2002, NAME currently ships to 97 markets and has stores in 16 countries, offering a unique
            retail experience and a curated mix of women’s and men’s assortments as well as a small selection of external brands.
          </span>
        </div>
        <div className="copyright">© 2024 Frameworks and Architectures for the Web, MSc - Group 8</div>
      </div>
    </footer>
  );
}

export default Footer;
