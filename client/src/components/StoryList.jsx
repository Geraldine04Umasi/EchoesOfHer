import StoryCard from "./StoryCard";

function StoryList({ stories, onLike }) {
  if (stories.length === 0) {
    return <p className="text-gray-500">No stories yet.</p>;
  }

  return (
    <>
      {stories.map((story) => (
        <StoryCard
          key={story._id}
          story={story}
          onLike={onLike}
        />
      ))}
    </>
  );
}

export default StoryList;