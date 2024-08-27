import express from "express";
import cors from "cors";
import helmet from "helmet";

import config from "./config/config";
import { CommonRoutesConfig } from "./common/commonRouteConfig";
import { ApiRoutes } from "./api/apiRoutes";
import { requestLogger } from "./config/requestLogger";

const app = express();
const routes: CommonRoutesConfig[] = [];
const port = config.port;

// Middleware that enables Cross-Origin Resource Sharing (CORS) for the server.
// This allows the server to handle requests from different domains or origins.
app.use(cors());

// Middleware that sets various HTTP headers for enhanced security.
// This helps protect our application from well-known web vulnerabilities.
app.use(helmet());

// adds middleware to parse incoming JSON data in HTTP requests
// and limits the size of the JSON payload to 5 megabytes to prevent 
// server overload.
app.use(express.json({ limit: "5mb" }));

// Enable parsing of URL-encoded data with extended syntax, 
// allowing rich objects and arrays to be encoded into the URL - encoded format
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "test") {
  app.use(requestLogger);
}

// routes definition
routes.push(new ApiRoutes(app));

export { app, routes, port };
