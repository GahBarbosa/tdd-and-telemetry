import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { SequelizeInstrumentation } from "opentelemetry-instrumentation-sequelize";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const sdk = new NodeSDK({
  serviceName: "restaurantweek-api",
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4317",
    compression: "gzip",
  }),
  instrumentations: [new HttpInstrumentation(), new SequelizeInstrumentation()],
});

process.on("beforeExit", async () => {
  await sdk.shutdown();
});

export const initializeTracing = async () => {
  return sdk.start();
};
