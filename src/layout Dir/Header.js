import { Link } from "react-router-dom";
import frog from "../img/1654810783_1-papik-pro-p-cute-drawing-of-a-frog-on-a-mushroom-1.png";

const Header = () => {
  return (
    <header className="top-header">
      <Link to="/" className="links-boi">
        <h1>Redux Blog Frog</h1>
      </Link>

      <img
        src={frog}
        alt=""
        style={{ height: "3.9rem", marginRight: "6rem" }}
      />
      <nav>
        <ul>
          <li>
            <Link to="/" className="links-boi">
              Home
            </Link>
          </li>
          <li>
            <Link to="post" className="links-boi">
              Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
