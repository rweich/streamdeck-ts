import { Server } from 'ws';

export function closeServer(server: Server): void {
  server.close();
  for (const ws of server.clients) {
    ws.terminate();
  }
}
