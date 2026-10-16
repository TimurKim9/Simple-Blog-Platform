function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          Realworld Blog
        </a>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="#">Sign in</a>
          <a href="#">Sign up</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;