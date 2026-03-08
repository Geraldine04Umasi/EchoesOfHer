import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/logo-Photoroom.png";

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/stories", label: "Stories" },
    { to: "/guidelines", label: "Guidelines" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .navbar-float {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(168, 85, 247, 0.15);
          box-shadow: 0 4px 24px rgba(168, 85, 247, 0.08), 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease;
        }

        .navbar-float:hover {
          box-shadow: 0 8px 32px rgba(168, 85, 247, 0.13), 0 1px 4px rgba(0,0,0,0.06);
        }

        .nav-link {
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          color: #6B7280;
          padding: 6px 4px;
          transition: color 0.2s ease;
          text-decoration: none;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #A855F7, #EC4899);
          transition: width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-link:hover {
          color: #A855F7;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #A855F7;
          font-weight: 600;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .nav-cta {
          background: linear-gradient(135deg, #A855F7, #EC4899);
          color: white !important;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 8px 18px;
          border-radius: 99px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 3px 12px rgba(168,85,247,0.3);
        }

        .nav-cta:hover {
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 6px 20px rgba(168,85,247,0.4);
        }
      `}</style>

      {/* Floating wrapper */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6">
        <nav className="navbar-float rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logoImg}
              alt="Echoes of Her"
              style={{ height: "50px", width: "122px", objectFit: "contain" }}
            />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link to="/stories" className="nav-cta shrink-0">
            Share Your Story
          </Link>

        </nav>
      </div>

      {/* Spacer para que el contenido no quede debajo del navbar fixed */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;