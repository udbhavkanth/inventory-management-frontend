import { NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/products', label: 'Products' },
  { to: '/customers', label: 'Customers' },
  { to: '/orders', label: 'Orders' },
];

function MainLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header__inner">
          <h1 className="app-logo">Inventory Management</h1>
          <nav className="app-nav" aria-label="Main navigation">
            <ul className="app-nav__list">
              {navLinks.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `app-nav__link${isActive ? ' app-nav__link--active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="app-main__inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
