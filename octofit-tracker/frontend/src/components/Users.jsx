import { useEffect, useState } from 'react';
import { getApiBaseUrl, readApiData } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await readApiData(`${getApiBaseUrl()}/api/users/`);
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        setError(err.message || 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.name}>
            <strong>{user.name}</strong>
            <div className="text-muted">{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
