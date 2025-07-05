const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

// Load Swagger documentation
const swaggerDocument = YAML.load("./swagger/combined.yaml");

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Proxy Auth Service
app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/auth": "" },
  })
);

// Proxy Employee Service
app.use(
  "/employees",
  createProxyMiddleware({
    target: process.env.EMPLOYEE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/employees": "" },
  })
);

// Proxy Task Service
app.use(
  "/tasks",
  createProxyMiddleware({
    target: process.env.TASK_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/tasks": "" },
  })
);

// Health Check
app.get("/", (req, res) => {
  res.send("API Gateway is up and running.");
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/docs`);
});
