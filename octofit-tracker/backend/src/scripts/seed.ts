import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        age: 36,
        fitnessGoal: 'Marathon training',
      },
      {
        name: 'Grace Hopper',
        email: 'grace@example.com',
        age: 42,
        fitnessGoal: 'Strength building',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Alpha Squad',
        sport: 'Running',
        captain: users[0].name,
      },
      {
        name: 'Beta Crew',
        sport: 'Cycling',
        captain: users[1].name,
      },
    ]);

    await Activity.insertMany([
      {
        type: 'Run',
        duration: '30 min',
        distance: 5,
        userId: users[0]._id,
      },
      {
        type: 'Cycling',
        duration: '45 min',
        distance: 18,
        userId: users[1]._id,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'HIIT Circuit',
        focus: 'Cardio',
        durationMinutes: 25,
      },
      {
        name: 'Core Strength',
        focus: 'Abs',
        durationMinutes: 20,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userName: users[0].name, score: 120, rank: 1 },
      { userName: users[1].name, score: 105, rank: 2 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
