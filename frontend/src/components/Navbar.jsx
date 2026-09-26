import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.png";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ABOUT US", path: "/about" },
  { name: "VENUES", path: "/venues" },
  { name: "OUR TEAM", path: "/team" },
  { name: "OUR ACHIEVEMENTS", path: "/achievements" },
  { name: "GALLERY", path: "/gallery" },
  { name: "NEWS", path: "/news" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (!menuOpen) return;

      const navbar = event.target.closest(".navbar");

      if (!navbar) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="KAS Foundation" />
        </Link>

        <nav className="desktop-navigation">
          <div className="navigation-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `navigation-link ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <Link to="/contact" className="navbar-contact-button">
            CONTACT US
          </Link>
        </nav>

        <button
          className="mobile-menu-button"
          onClick={(event) => {
            event.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`mobile-navigation ${menuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `mobile-navigation-link ${isActive ? "active" : ""}`
            }
          >
            {item.name}
          </NavLink>
        ))}

        <Link
          to="/contact"
          className="mobile-contact-button"
          onClick={() => setMenuOpen(false)}
        >
          CONTACT US
        </Link>
      </div>
    </header>
  );
}

export default Navbar;