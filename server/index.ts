import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";

import { MediaRouter } from "./controllers/media/MediaRouter";

const app = express();
const apiPort = process.env.API_PORT;
const clientPort = process.env.PORT;

app.use(cors({ origin: `http://localhost:${clientPort}` }));

app.use(express.static(path.join(__dirname, "../build")));

const httpInstance = app.listen(apiPort, function () {
  console.log("server running on port:", apiPort);
});

app.use("/api/media", new MediaRouter().getRouter());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Hello");
});

const exitEvents = ["SIGINT", "SIGHUP", "SIGTERM", "SIGUSR1", "SIGUSR2"];
exitEvents.forEach((event) => {
  process.on(event, () => {
    httpInstance.close();
    console.log("Graceful shutdown.");
    process.exit(0);
  });
});
