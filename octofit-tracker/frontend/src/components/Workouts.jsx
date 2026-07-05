import { useEffect, useState } from 'react';
import { API_ENDPOINTS, getApiUrl, readApiData } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await readApiData(getApiUrl(API_ENDPOINTS.workouts));
        setWorkouts(Array.isArray(data) ? data : data.workouts || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.name}>
            <strong>{workout.name}</strong>
            <div className="text-muted">{workout.focus}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
