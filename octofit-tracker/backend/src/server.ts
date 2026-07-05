import { createApp } from './app.js';

const app = createApp();
const port = Number(process.env.PORT || 8000);

app.listen(port, () => {
  console.log(`Octofit API listening on port ${port}`);
});
