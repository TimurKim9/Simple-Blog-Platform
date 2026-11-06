
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Realworld Blog
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
