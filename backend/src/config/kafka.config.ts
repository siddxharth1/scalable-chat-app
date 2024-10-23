import { Kafka, logLevel } from "kafkajs";
import fs from "fs";

export const kafka = new Kafka({
  brokers: ["kafka-33c1a71c-vsssiddharth-cfad.h.aivencloud.com:10952"],

  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync("./ca.pem", "utf-8")],
  },
  sasl: {
    mechanism: "scram-sha-256",
    username: "avnadmin",
    password: "AVNS_kod4l0V7SsOlDdcJct7",
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats" });

export const kafkaConnectProducer = async () => {
  await producer.connect();
  console.log("kafka producer connected");
};
