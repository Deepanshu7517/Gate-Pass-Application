export const fetchVisitors = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/visitors');
    if (!response.ok) {
      throw new Error('Failed to fetch visitors');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return [];
  }
};
