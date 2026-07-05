export const API_ENDPOINTS = {
  activities: '/api/activities/',
  leaderboard: '/api/leaderboard/',
  teams: '/api/teams/',
  users: '/api/users/',
  workouts: '/api/workouts/',
};

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(path) {
  return `${getApiBaseUrl()}${path}`;
}

export async function readApiData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  return data;
}
