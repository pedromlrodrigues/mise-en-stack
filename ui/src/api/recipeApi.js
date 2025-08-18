const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function searchRecipes(searchTerm) {
  try {
    const response = await fetch(`${BASE_URL}/recipes?search=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}
