const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getRecipes(searchTerm, page = 1) {
  try {
    let url = `${BASE_URL}/recipes?page=${page}`;

    if (searchTerm) {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url);

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

export async function getRecipeById(id) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    throw error;
  }
}
