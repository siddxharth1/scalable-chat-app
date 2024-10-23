import express, { Application } from "express";
import cors from "cors";
import Routes from "./routes/index";
import { Server } from "socket.io";
import http from "http";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config";
import "dotenv/config";
import { kafkaConnectProducer } from "./config/kafka.config";
import { consumeMessage } from "./helper";

const app: Application = express();
const port = process.env.PORT;

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
  // adapter: createAdapter(redis),
});

setupSocket(io);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

kafkaConnectProducer().catch((err) => {
  console.log(err);
});

consumeMessage("chat-app").catch((err) => {
  console.log(err);
});

app.use("/api", Routes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
