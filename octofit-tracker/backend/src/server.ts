import { createApp } from './app.js';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = createApp(baseUrl);
const port = Number(process.env.PORT || 8000);

app.listen(port, () => {
  console.log(`Octofit API listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
