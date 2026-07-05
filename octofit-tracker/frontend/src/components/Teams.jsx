import { useEffect, useState } from 'react';
import { getApiBaseUrl, readApiData } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await readApiData(`${getApiBaseUrl()}/api/teams/`);
        setTeams(Array.isArray(data) ? data : data.teams || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id || team.name}>
            <strong>{team.name}</strong>
            <div className="text-muted">{team.sport}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
