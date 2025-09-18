const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getIngredients(searchTerm, page = 1, limit = 10) {
  try {
    let url = `${BASE_URL}/ingredients?page=${page}&limit=${limit}`;

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
    console.error('Error fetching ingredients:', error);
    throw error;
  }
}

export async function getIngredientById(id) {
  try {
    const response = await fetch(`${BASE_URL}/ingredients/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ingredient with id ${id}:`, error);
    throw error;
  }
}
