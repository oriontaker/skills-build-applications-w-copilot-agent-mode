import { useEffect, useState } from 'react';
import { API_ENDPOINTS, getApiUrl, readApiData } from '../utils/api.js';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await readApiData(getApiUrl(API_ENDPOINTS.leaderboard));
        setRows(Array.isArray(data) ? data : data.leaderboard || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {rows.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id || entry.userName}>
            <strong>{entry.userName}</strong>
            <div className="text-muted">Score: {entry.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
