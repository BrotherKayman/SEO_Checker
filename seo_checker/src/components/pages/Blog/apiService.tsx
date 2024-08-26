export const fetchPosts = async () => {
    const response = await fetch('https://b6a6ffe4-d2e0-46d4-ae94-2c9c311b4417.mock.pstmn.io');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  };
  