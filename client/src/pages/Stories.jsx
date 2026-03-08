import { useEffect, useState } from "react";
import StoryForm from "../components/StoryForm";
import StoryList from "../components/StoryList";
import { getStories } from "../services/api";

function Stories() {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchStories = async () => {
    try {
      const data = await getStories();
      setStories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleNewStory = () => {
    fetchStories();
  };

  const filteredStories =
    filter === "all"
      ? stories
      : stories.filter((story) => story.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 py-16">
      {/* SHARE STORY SECTION */}
      <section className="max-w-2xl mx-auto px-6 mb-24">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-700 mb-3">
            Share Your Story
          </h1>
          <p className="text-gray-500">
            Your experience matters. This is a safe space.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-md border border-purple-100">
          <StoryForm onStoryCreated={handleNewStory} />
        </div>
      </section>

      {/* EXPLORE STORIES SECTION */}
      <section className="max-w-screen-2xl mx-auto px-20">
        <div className="mb-14">
          <h2 className="text-3xl font-semibold text-purple-700 mb-4">
            Explore Stories
          </h2>

          <p className="text-gray-500 mb-4">Filter by Category</p>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-xl border border-gray-200 
            focus:outline-none focus:ring-2 focus:ring-purple-400 
            transition duration-200"
          >
            <option value="all">All</option>
            <option value="discrimination">Discrimination</option>
            <option value="career_growth">Career Growth</option>
            <option value="first_job">First Job</option>
            <option value="impostor_syndrome">Impostor Syndrome</option>
            <option value="advice">Advice</option>
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <StoryList stories={filteredStories} onLike={fetchStories} />
        </div>
      </section>
    </div>
  );
}

export default Stories;
