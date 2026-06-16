import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/products', label: 'Products' },
  { to: '/customers', label: 'Customers' },
  { to: '/orders', label: 'Orders' },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`admin-sidebar${isOpen ? ' admin-sidebar--open' : ''}`}
      aria-label="Sidebar navigation"
    >
      <div className="admin-sidebar__header">
        <span className="admin-sidebar__brand">IMS</span>
      </div>

      <nav className="admin-sidebar__nav">
        <ul className="admin-sidebar__list">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
