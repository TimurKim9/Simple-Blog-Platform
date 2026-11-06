
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


async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}


export async function registerUser(username, email, password) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: { username, email, password },
    }),
  });

  return handleResponse(response);
}


export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: { email, password },
    }),
  });

  return handleResponse(response);
}


export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return handleResponse(response);
}


export async function updateUser(token, userData) {
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      user: userData,
    }),
  });

  return handleResponse(response);
}
