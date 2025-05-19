const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Expose opentelemetry metrics using a Prometheus exporter on
// http://localhost:9464/metrics. See packages/backend/prometheus.yml for
// more information on how to scrape it.
const prometheus = new PrometheusExporter();

const sdk = new NodeSDK({
  // traceExporter: ...,
  metricReader: prometheus,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
