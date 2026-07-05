import { Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5">Octofit Tracker</h1>
        <p className="text-muted">
          VITE_CODESPACE_NAME must be defined in .env.local for Codespaces URLs.
        </p>
      </header>

      <nav className="nav nav-pills mb-4">
        <Link className="nav-link" to="/users">Users</Link>
        <Link className="nav-link" to="/activities">Activities</Link>
        <Link className="nav-link" to="/teams">Teams</Link>
        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
        <Link className="nav-link" to="/workouts">Workouts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
