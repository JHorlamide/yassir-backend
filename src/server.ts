import http from "http";
import { app, routes, port } from "./app";
import { onError } from "./config/requestLogger";
import DBConnectWithRetry from "./config/DBConfig";
import { startParisAirQualityCron } from "./config/cronJobs";
import { CommonRoutesConfig } from "./common/commonRouteConfig";

function createServer(): http.Server {
  app.set("port", port);

  const server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Server listening on ${bind}... 🚀`);

    if (process.env.NODE_ENV !== "test") {
      routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for -> ${route.getName()}`);
      });
    }
  });

  return server;
}

export default async function main(): Promise<http.Server> {
  /* Start the database connection */
  await DBConnectWithRetry();
  /* Start the CRON job */
  startParisAirQualityCron();

  const server = createServer();
  return server;
}

if (process.env.NODE_ENV !== "test") {
  main();
}
