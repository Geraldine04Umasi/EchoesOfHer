const API_URL = "http://localhost:5000/stories";

export const getStories = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error fetching stories");
  return response.json();
};

export const createStory = async (story) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(story),
  });

  if (!response.ok) throw new Error("Error creating story");
  return response.json();
};

export const likeStory = async (id) => {
  const res = await fetch(`${API_URL}/${id}/like`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Error liking story");

  return res.json();
};

export const getAiSupport = async (id) => {
  const res = await fetch(`${API_URL}/${id}/ai-support`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error getting AI support");
  return res.json();
};