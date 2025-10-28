import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

type Config = {
  client: string | string[];
  port: number;
  db: {
    url: string;
  };
  fast2sms_api_key: string;
  jwt: {
    secret: string;
    expiresIn: StringValue | number;
  };
};

const _config: Config = {
  client: [
    "http://192.168.0.134:5173",
    "http://localhost:5173",
    "http://10.43.48.88:5173",
  ],
  port: 3000,
  db: {
    url: process.env.DB_URL,
  },
  fast2sms_api_key:
    "026WIDwSiQVeFAXfad4r37BvJuYsRcOo1p9bPMUyz5ZlmLjqxhAakybzEi0SjWqDNtReh1vQKlTwJmMd",
  jwt: {
    secret: "secret",
    expiresIn: "2d",
  },
};

const config = Object.freeze(_config);

export default config;
