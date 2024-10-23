import Redis from "ioredis";

const redis = new Redis(
  // "rediss://default:AXL8AAIjcDE0MjE1OWFkMzBmOTY0MDFiYTk1YTY4ZDI0MjI3YWM3Y3AxMA@enormous-drum-29436.upstash.io:6379"
  "redis://default:AXMIAAIjcDE2NGUyOWMxNzAwYWI0NmUyOGViMGVmZjA0YWNjZGZiZXAxMA@diverse-narwhal-29448.upstash.io:6379"
);

export default redis;
