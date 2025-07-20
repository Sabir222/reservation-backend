import express from "express";
import checkDbConnection from "./utils/checkhealth";
import dotenv from "dotenv";
import cors, { type CorsOptions } from "cors";
import helmet from "helmet";
dotenv.config();

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello from Express with Bun!");
});

const PORT = process.env.PORT || 5000;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const origins = String(process.env.CORS_ORIGIN).split(",");
    if (!origin || origins.includes(String(origin))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed."), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

const startServer = async () => {
  await checkDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
};

startServer();
