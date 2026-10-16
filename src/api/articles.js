const API_URL = 'https://realworld.habsida.net/api';

export async function getArticles(limit = 10, offset = 0) {
  const response = await fetch(
    `${API_URL}/articles?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  return response.json();
}

export async function getArticle(slug) {
  const response = await fetch(`${API_URL}/articles/${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }

  return response.json();
}