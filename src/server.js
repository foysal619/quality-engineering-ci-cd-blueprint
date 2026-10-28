import { createServer } from 'node:http';
import { route } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const server = createServer((request, response) => {
  const result = route(request);
  response.writeHead(result.status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(result.body));
});

server.listen(port, () => console.log(`quality-blueprint listening on ${port}`));
