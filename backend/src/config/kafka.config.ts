import { Kafka, logLevel } from "kafkajs";
import fs from "fs";
import "dotenv/config";
export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!],

  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync("./ca.pem", "utf-8")],
  },
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const kafkaConnectProducer = async () => {
  await producer.connect();
  console.log("kafka producer connected");
};
