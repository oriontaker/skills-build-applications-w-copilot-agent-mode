import { useEffect, useState } from 'react';
import { API_ENDPOINTS, getApiUrl, readApiData } from '../utils/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await readApiData(getApiUrl(API_ENDPOINTS.activities));
        setActivities(Array.isArray(data) ? data : data.activities || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.type}>
            <strong>{activity.type}</strong>
            <div className="text-muted">{activity.duration}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
