import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-600">
          Echoes of Her
        </h1>

        <div className="space-x-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-purple-600 transition">
            Home
          </Link>
          <Link to="/stories" className="hover:text-purple-600 transition">
            Stories
          </Link>
          <Link to="/guidelines" className="hover:text-purple-600 transition">
            Guidelines
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;