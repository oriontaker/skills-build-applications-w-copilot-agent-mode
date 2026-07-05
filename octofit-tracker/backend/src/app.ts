import express, { type Express } from 'express';

export function createApp(baseUrlOverride?: string): Express {
  const app = express();

  const codeSpaceName = process.env.CODESPACE_NAME;
  const baseUrl = baseUrlOverride || (codeSpaceName
    ? `https://${codeSpaceName}-8000.app.github.dev`
    : 'http://localhost:8000');

  app.get('/api/users', (_req, res) => {
    res.json({
      baseUrl,
      users: [{ id: 1, name: 'Ada Lovelace' }],
    });
  });

  app.get('/api/activities', (_req, res) => {
    res.json({
      baseUrl,
      activities: [{ id: 1, type: 'Run', duration: '30 min' }],
    });
  });

  app.get('/api/teams', (_req, res) => {
    res.json({ teams: [{ id: 1, name: 'Alpha' }] });
  });

  app.get('/api/leaderboard', (_req, res) => {
    res.json({ leaderboard: [{ id: 1, name: 'Ada Lovelace', score: 100 }] });
  });

  app.get('/api/workouts', (_req, res) => {
    res.json({ workouts: [{ id: 1, name: 'HIIT' }] });
  });

  return app;
}
