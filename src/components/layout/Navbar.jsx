function Navbar({ onMenuToggle }) {
  return (
    <header className="admin-navbar">
      <button
        type="button"
        className="admin-navbar__menu-btn"
        onClick={onMenuToggle}
        aria-label="Toggle navigation menu"
      >
        <span className="admin-navbar__menu-icon" />
      </button>
      <h1 className="admin-navbar__title">Inventory Management</h1>
    </header>
  );
}

export default Navbar;
