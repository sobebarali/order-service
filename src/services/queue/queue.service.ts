import { QueueOptions } from "bullmq";

export const queueConfig: QueueOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};
