import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
export function createApp(baseUrlOverride) {
    const app = express();
    const codeSpaceName = process.env.CODESPACE_NAME;
    const baseUrl = baseUrlOverride || (codeSpaceName
        ? `https://${codeSpaceName}-8000.app.github.dev`
        : 'http://localhost:8000');
    app.get(['/api/users', '/api/users/'], async (_req, res) => {
        const users = await User.find({}).lean();
        res.json({
            baseUrl,
            users,
        });
    });
    app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
        const activities = await Activity.find({}).lean();
        res.json({
            baseUrl,
            activities,
        });
    });
    app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
        const teams = await Team.find({}).lean();
        res.json({ teams });
    });
    app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
        const leaderboard = await LeaderboardEntry.find({}).lean();
        res.json({ leaderboard });
    });
    app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
        const workouts = await Workout.find({}).lean();
        res.json({ workouts });
    });
    return app;
}
