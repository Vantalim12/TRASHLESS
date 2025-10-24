import React from "react";
import "./MobileMenu.css";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onPageChange?: (page: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  onPageChange,
}) => {
  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className={`mobile-menu-button ${isOpen ? "open" : ""}`}
        onClick={onToggle}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-menu">
            <li>
              <a
                href="#home"
                onClick={() => {
                  onToggle();
                  onPageChange?.("home");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => {
                  onToggle();
                  onPageChange?.("home");
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#team"
                onClick={() => {
                  onToggle();
                  onPageChange?.("home");
                }}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#roadmap"
                onClick={() => {
                  onToggle();
                  onPageChange?.("home");
                }}
              >
                Roadmap
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => {
                  onToggle();
                  onPageChange?.("home");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
