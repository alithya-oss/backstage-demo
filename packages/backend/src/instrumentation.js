// Prevent from running more than once (due to worker threads)
const { isMainThread } = require('node:worker_threads');

const endpoint_url =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318';

if (isMainThread) {
  const { NodeSDK } = require('@opentelemetry/sdk-node');
  const {
    getNodeAutoInstrumentations,
  } = require('@opentelemetry/auto-instrumentations-node');
  const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
  const {
    OTLPTraceExporter,
  } = require('@opentelemetry/exporter-trace-otlp-proto');

  // By default exports the metrics on localhost:9464/metrics
  const prometheusExporter = new PrometheusExporter();
  // We post the traces to localhost:4318/v1/traces
  const otlpTraceExporter = new OTLPTraceExporter({
    // Default Jaeger URL trace endpoint.
    url: `${endpoint_url}/v1/traces`,
  });
  const sdk = new NodeSDK({
    metricReader: prometheusExporter,
    traceExporter: otlpTraceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
}