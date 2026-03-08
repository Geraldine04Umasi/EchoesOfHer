import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        
        <h1 className="text-5xl font-bold text-purple-600 mb-6 leading-tight">
          Your voice matters.
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          A safe and supportive space for women in tech to share
          experiences, struggles, victories, and strength.
        </p>

        <Link
          to="/stories"
          className="bg-purple-600 text-white px-8 py-4 rounded-2xl shadow-md hover:bg-purple-700 transition"
        >
          Share Your Story
        </Link>

      </div>
    </div>
  );
}

export default Landing;